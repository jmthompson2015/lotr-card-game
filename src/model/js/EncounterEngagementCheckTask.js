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
            LOGGER.debug("0 EncounterEngagementCheckTask enemies = " + enemies);
            var agentThreat = agent.threatLevel();

            enemies = enemies.sort(function(a, b)
            {
               var engagementCostA = a.card().engagementCost;
               var engagementCostB = b.card().engagementCost;
               return engagementCostB - engagementCostA;
            });
            LOGGER.debug("1 EncounterEngagementCheckTask enemies = " + enemies);

            var firstEnemy = enemies.first();
            LOGGER.debug("EncounterEngagementCheckTask firstEnemy = " + firstEnemy);

            if (firstEnemy.card().engagementCost <= agentThreat)
            {
               LOGGER.debug("EncounterEngagementCheckTask engaging");
               store.dispatch(Action.agentEngageCard(agent, firstEnemy));
            }
         }

         callback();
      };

      return EncounterEngagementCheckTask;
   });
