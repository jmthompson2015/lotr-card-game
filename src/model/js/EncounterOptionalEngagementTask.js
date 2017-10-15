"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "model/js/Action"],
   function(InputValidator, CardType, Action)
   {
      function EncounterOptionalEngagementTask(store, agent)
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

      EncounterOptionalEngagementTask.prototype.doIt = function(callback)
      {
         InputValidator.validateIsFunction("callback", callback);

         var store = this.store();
         var agent = this.agent();
         var environment = store.getState().environment;
         var enemies = environment.stagingArea(CardType.ENEMY);

         if (enemies.size > 0)
         {
            var myFinishFunction = this.finish;
            var finishCallback = function(enemy)
            {
               myFinishFunction(callback, enemy);
            };
            agent.strategy().chooseOptionalEngagementEnemy(enemies, finishCallback);
         }
         else
         {
            callback();
         }
      };

      EncounterOptionalEngagementTask.prototype.finish = function(callback, enemy)
      {
         InputValidator.validateIsFunction("callback", callback);
         // enemy optional.

         if (enemy)
         {
            var store = this.store();
            var agent = this.agent();
            store.dispatch(Action.agentEngageCard(agent, enemy));
         }

         callback();
      };

      return EncounterOptionalEngagementTask;
   });
