"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "model/js/Action"],
   function(InputValidator, CardType, Action)
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
         var enemies = environment.stagingArea(CardType.ENEMY);

         if (enemies.size > 0)
         {
            var agentThreat = agent.threatLevel();

            enemies = enemies.sort(function(a, b)
            {
               var engagementCostA = a.card().engagementCost;
               var engagementCostB = b.card().engagementCost;
               return engagementCostB - engagementCostA;
            });

            var firstEnemy = enemies.first();

            if (firstEnemy.card().engagementCost <= agentThreat)
            {
               store.dispatch(Action.agentEngageCard(agent, firstEnemy));
            }
         }

         callback();
      };

      return EncounterEngagementCheckTask;
   });
