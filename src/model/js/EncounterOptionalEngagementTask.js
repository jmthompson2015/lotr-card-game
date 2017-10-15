"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "model/js/Action"],
   function(InputValidator, CardType, Action)
   {
      function EncounterOptionalEngagementTask(store, agent, callback)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("agent", agent);
         InputValidator.validateNotNull("callback", callback);

         this.store = function()
         {
            return store;
         };

         this.agent = function()
         {
            return agent;
         };

         this.callback = function()
         {
            return callback;
         };
      }

      EncounterOptionalEngagementTask.prototype.doIt = function()
      {
         var store = this.store();
         var agent = this.agent();
         var environment = store.getState().environment;
         var enemies = environment.stagingArea(CardType.ENEMY);

         if (enemies.size > 0)
         {
            var enemy = agent.chooseOptionalEngagementEnemy(enemies);

            if (enemy)
            {
               store.dispatch(Action.agentEngageCard(agent, enemy));
            }
         }

         var callback = this.callback();
         callback();
      };

      return EncounterOptionalEngagementTask;
   });
