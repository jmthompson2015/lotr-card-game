"use strict";

define(["common/js/InputValidator", "model/js/Action", "model/js/CardAction"],
   function(InputValidator, Action, CardAction)
   {
      function CombatAttackTask(store, agent)
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
      }

      CombatAttackTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         // 1a. Declare target of attack.
         var agent = this.agent();
         var enemies = agent.engagementArea();
         LOGGER.debug("CombatAttackTask enemies = " + enemies);

         if (enemies.size === 1)
         {
            this.declareAttackers(enemies.first(), callback);
         }
         else if (enemies.size > 1)
         {
            var declareAttackersFunction = this.declareAttackers.bind(this);
            var myCallback = function(defender)
            {
               declareAttackersFunction(defender, callback);
            };

            agent.chooseEnemyDefender(enemies.toJS(), myCallback);
         }
         else
         {
            this.finishCombatAttackTask(callback);
         }
      };

      CombatAttackTask.prototype.declareAttackers = function(defender, callback)
      {
         LOGGER.debug("CombatAttackTask defender = " + defender);

         if (defender)
         {
            // 1b. Declare attackers.
            var agent = this.agent();
            var characters = agent.attackers();
            LOGGER.debug("CombatAttackTask characters = " + characters);

            if (characters.size > 0)
            {
               var determineAttackStrengthFunction = this.determineAttackStrength.bind(this);
               var myCallback = function(attackers)
               {
                  determineAttackStrengthFunction(attackers, defender, callback);
               };

               agent.chooseCharacterAttackers(characters.toJS(), defender, myCallback);
            }
            else
            {
               this.determineAttackStrength([], defender, callback);
            }
         }
         else
         {
            this.finishCombatAttackTask(callback);
         }
      };

      CombatAttackTask.prototype.determineAttackStrength = function(attackers, defender, callback)
      {
         LOGGER.debug("CombatAttackTask attackers = " + attackers);

         // 2. Determine attack strength.
         var attack = attackers.reduce(function(accumulator, cardInstance, i)
         {
            LOGGER.debug(i + " CombatAttackTask attack = " + cardInstance + " " + cardInstance.card().attack);
            return accumulator + cardInstance.card().attack;
         }, 0);
         LOGGER.debug("CombatAttackTask attack = " + attack);

         // 3. Determine combat damage.
         var defense = defender.card().defense;
         LOGGER.debug("CombatAttackTask defense = " + defense);
         var damage = attack - defense;
         LOGGER.debug("CombatAttackTask damage = " + damage);

         if (damage > 0)
         {
            var store = this.store();
            store.dispatch(CardAction.addWounds(defender, damage));

            if (defender.remainingHitPoints() <= 0)
            {
               // Defender is dead.
               var agent = this.agent();
               store.dispatch(Action.agentDiscardEnemyCard(agent, defender));
            }
         }

         this.finishCombatAttackTask(callback);
      };

      CombatAttackTask.prototype.finishCombatAttackTask = function(callback)
      {
         // Discard shadow cards.
         var store = this.store();
         LOGGER.debug("0 cardShadowCards = " + store.getState().cardShadowCards);
         var agent = this.agent();
         var engagementArea = agent.engagementArea();
         engagementArea.forEach(function(cardInstance)
         {
            var shadowCards = cardInstance.shadowCards();

            shadowCards.forEach(function(shadowInstance)
            {
               store.dispatch(Action.discardShadowCard(agent, cardInstance, shadowInstance));
            });
         });
         LOGGER.debug("encounterDiscard = " + store.getState().encounterDiscard);
         LOGGER.debug("1 cardShadowCards = " + store.getState().cardShadowCards);

         callback();
      };

      return CombatAttackTask;
   });
