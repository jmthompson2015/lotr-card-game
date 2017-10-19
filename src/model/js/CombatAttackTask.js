"use strict";

define(["common/js/InputValidator", "model/js/Action"],
   function(InputValidator, Action)
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

         if (enemies.size > 0)
         {
            var declareAttackersFunction = this.declareAttackers.bind(this);
            var myCallback = function(defender)
            {
               declareAttackersFunction(defender, callback);
            };

            agent.chooseEnemyDefender(enemies, myCallback);
         }
         else
         {
            this.finishCombatAttackTask(callback);
         }
      };

      CombatAttackTask.prototype.declareAttackers = function(defender, callback)
      {
         LOGGER.debug("CombatAttackTask defender = " + defender);

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

            agent.chooseCharacterAttackers(characters, defender, myCallback);
         }
         else
         {
            this.determineAttackStrength([], defender, callback);
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
            store.dispatch(Action.addCardDamage(defender, damage));
         }

         this.finishCombatAttackTask(callback);
      };

      CombatAttackTask.prototype.finishCombatAttackTask = function(callback)
      {
         // Discard shadow cards.
         var store = this.store();
         LOGGER.debug("0 cardShadowCard = " + store.getState().cardShadowCard);
         store.dispatch(Action.discardShadowCards());
         LOGGER.debug("encounterDiscard = " + store.getState().encounterDiscard);
         LOGGER.debug("1 cardShadowCard = " + store.getState().cardShadowCard);

         callback();
      };

      return CombatAttackTask;
   });
