"use strict";

define(["common/js/InputValidator", "model/js/Action"],
   function(InputValidator, Action)
   {
      function CombatDefendTask(store, agent)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("agent", agent);

         this.store = function()
         {
            return store;
         };

         this.agent = function()
         {
            return agent;
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

            agent.chooseCharacterDefender(attacker, characters, myCallback);
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
            store.dispatch(Action.setCardReady(defender, false));
         }

         // 3. Resolve shadow effect, if any.
         var shadowCard = attacker.shadowCard();

         if (shadowCard !== undefined)
         {
            // Do something.
         }

         this.determineCombatDamage(attacker, defender, callback);
      };

      CombatDefendTask.prototype.determineCombatDamage = function(attacker, defender, callback)
      {
         // 4. Determine combat damage.
         var store = this.store();
         var agent = this.agent();
         LOGGER.debug("CombatDefendTask attacker = " + attacker);
         LOGGER.debug("CombatDefendTask defender = " + defender);
         var attack = attacker.card().attack;

         if (defender !== undefined)
         {
            var defense = defender.card().defense;
            var damage = attack - defense;
            LOGGER.debug("CombatDefendTask damage = " + damage);
            store.dispatch(Action.addCardDamage(defender, damage));

            this.processQueue(callback);
         }
         else
         {
            // Undefended.
            var heroes = agent.tableauHeroes();
            var finishUndefendedDamageFunction = this.finishUndefendedDamage.bind(this);
            var myCallback = function(hero)
            {
               finishUndefendedDamageFunction(attacker, hero, callback);
            };

            agent.chooseUndefendedAttackHero(heroes, myCallback);
         }
      };

      CombatDefendTask.prototype.finishUndefendedDamage = function(attacker, hero, callback)
      {
         var store = this.store();
         var attack = attacker.card().attack;
         LOGGER.debug("CombatDefendTask undefended damage = " + attack);
         store.dispatch(Action.addCardDamage(hero, attack));

         this.processQueue(callback);
      };

      CombatDefendTask.prototype.finishPhase = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         callback();
      };

      return CombatDefendTask;
   });
