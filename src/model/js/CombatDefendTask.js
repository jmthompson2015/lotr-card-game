"use strict";

define(["common/js/InputValidator", "artifact/js/GameEvent",
  "model/js/Ability", "model/js/Action", "model/js/AgentAction", "model/js/CardAction", "model/js/QueueProcessor"],
   function(InputValidator, GameEvent, Ability, Action, AgentAction, CardAction, QueueProcessor)
   {
      function CombatDefendTask(store, agent, delayIn)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("agent", agent);
         // delayIn optional. default: 1000

         this.store = function()
         {
            return store;
         };

         this.agent = function()
         {
            return agent;
         };

         var delay = (delayIn !== undefined ? delayIn : 1000);

         this.delay = function()
         {
            return delay;
         };

         var queue = [];

         this.queue = function(queueIn)
         {
            if (queueIn !== undefined)
            {
               queue = queueIn;
            }

            return queue;
         };
      }

      CombatDefendTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         // 1. Choose an enemy.
         var agent = this.agent();
         this.queue(agent.engagementArea().toJS());
         this.processQueue(callback);
      };

      CombatDefendTask.prototype.processQueue = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         LOGGER.debug("CombatDefendTask.processQueue() this.queue().length = " + this.queue().length);

         if (this.queue().length === 0)
         {
            this.finishPhase(callback);
            return;
         }

         var attacker = this.queue().shift();
         LOGGER.debug("CombatDefendTask.processQueue() attacker = " + attacker);

         this.declareDefender(attacker, callback);
      };

      CombatDefendTask.prototype.declareDefender = function(attacker, callback)
      {
         var agent = this.agent();

         // 2. Declare defender.
         var characters = agent.defenders();
         LOGGER.debug("CombatDefendTask characters = " + characters);

         if (characters.size > 0)
         {
            var resolveShadowEffectFunction = this.resolveShadowEffect.bind(this);
            var myCallback = function(defender)
            {
               resolveShadowEffectFunction(attacker, defender, callback);
            };

            agent.chooseCharacterDefender(attacker, characters.toJS(), myCallback);
         }
         else
         {
            this.resolveShadowEffect(attacker, undefined, callback);
         }
      };

      CombatDefendTask.prototype.resolveShadowEffect = function(attacker, defender, callback)
      {
         LOGGER.debug("CombatDefendTask.resolveShadowEffect() defender = " + defender);

         var store = this.store();

         if (defender !== undefined)
         {
            store.dispatch(CardAction.setReady(defender, false));
         }

         // 3. Resolve shadow effect, if any.
         var shadowCards = attacker.shadowCards();

         if (shadowCards.size > 0)
         {
            var determineCombatDamage = this.determineCombatDamage.bind(this);
            var myCallback = function()
            {
               determineCombatDamage(attacker, defender, callback);
            };
            var elementFunction = function(cardInstance, queueCallback)
            {
               store.dispatch(CardAction.setFaceUp(cardInstance, true));
               var context = {
                  cardInstance: cardInstance,
               };
               store.dispatch(Action.enqueueEvent(GameEvent.SHADOW_CARD_REVEALED, context, queueCallback));
            };

            var queueProcessor = new QueueProcessor(shadowCards.toJS(), myCallback, elementFunction, undefined, this.delay());
            queueProcessor.processQueue();
         }
         else
         {
            this.determineCombatDamage(attacker, defender, callback);
         }
      };

      CombatDefendTask.prototype.determineCombatDamage = function(attacker, defender, callback)
      {
         // 4. Determine combat damage.
         var agent = this.agent();
         LOGGER.debug("CombatDefendTask attacker = " + attacker);
         LOGGER.debug("CombatDefendTask defender = " + defender);
         var attack = attacker.card().attack;

         if (defender !== undefined)
         {
            var defense = defender.card().defense;
            var damage = attack - defense;
            LOGGER.debug("CombatDefendTask damage = " + damage);
            var store = this.store();
            store.dispatch(Action.setUserMessage("Defender combat damage: " + damage));
            agent.addCardWounds(defender, damage);

            this.processQueue(callback);
         }
         else
         {
            // Undefended.
            var heroes = agent.tableauHeroes().toJS();
            if (heroes.length > 0)
            {
               var finishUndefendedDamageFunction = this.finishUndefendedDamage.bind(this);
               var myCallback = function(hero)
               {
                  finishUndefendedDamageFunction(attacker, hero, callback);
               };

               agent.chooseUndefendedAttackHero(heroes, myCallback);
            }
            else
            {
               this.processQueue(callback);
            }
         }
      };

      CombatDefendTask.prototype.finishUndefendedDamage = function(attacker, hero, callback)
      {
         var store = this.store();
         var agent = this.agent();
         var attack = attacker.card().attack;
         LOGGER.debug("CombatDefendTask undefended damage = " + attack);
         agent.addCardWounds(hero, attack);

         if (hero.remainingHitPoints() <= 0)
         {
            // Hero is dead.
            store.dispatch(Action.setUserMessage("Hero " + hero.card().name + " killed."));
            hero.prepareForDiscard(agent);
            store.dispatch(AgentAction.discardFromTableau(agent, hero));
         }

         this.processQueue(callback);
      };

      CombatDefendTask.prototype.finishPhase = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         callback();
      };

      return CombatDefendTask;
   });
