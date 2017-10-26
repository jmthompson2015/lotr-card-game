"use strict";

define(["common/js/InputValidator", "model/js/Action"],
   function(InputValidator, Action)
   {
      function EncounterEngagementCheckTask(store, agent)
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

      EncounterEngagementCheckTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();
         var agent = this.agent();
         var environment = store.getState().environment;
         var enemies = environment.stagingEnemies();

         if (enemies.size > 0)
         {
            for (var i = 0; i < enemies.size; i++)
            {
               var enemy = enemies.get(i);

               if (enemy.card().engagementCost <= agent.threatLevel())
               {
                  store.dispatch(Action.agentEngageCard(agent, enemy));
                  store.dispatch(Action.setUserMessage(enemy.card().name + " engages " + agent.name()));
                  break;
               }
            }
         }

         callback();
      };

      return EncounterEngagementCheckTask;
   });
