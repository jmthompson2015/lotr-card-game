"use strict";

define(["common/js/InputValidator", "artifact/js/Phase",
  "model/js/Action", "model/js/CombatTask", "model/js/EncounterTask", "model/js/PlanningTask", "model/js/QuestTask", "model/js/RefreshTask", "model/js/ResourceTask", "model/js/TravelTask"],
   function(InputValidator, Phase, Action, CombatTask, EncounterTask, PlanningTask, QuestTask, RefreshTask, ResourceTask, TravelTask)
   {
      function Engine(store, environment, adjudicator, delayIn, callback)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         // delayIn optional. default: 1000 ms
         // callback optional.

         this.store = function()
         {
            return store;
         };

         this.environment = function()
         {
            return environment;
         };

         this.adjudicator = function()
         {
            return adjudicator;
         };

         var delay = (delayIn !== undefined ? delayIn : 1000);

         this.delay = function()
         {
            return delay;
         };

         this.callback = function()
         {
            return callback;
         };
      }

      //////////////////////////////////////////////////////////////////////////
      // Phase methods.

      Engine.prototype.performResourcePhase = function()
      {
         var store = this.store();
         store.dispatch(Action.incrementRound());

         if (this.isGameOver())
         {
            this.processGameOver();
         }
         else
         {
            store.dispatch(Action.enqueuePhase(Phase.RESOURCE_START));

            var task = new ResourceTask(store);
            var callback = this.finishResourceQueue.bind(this);

            setTimeout(function()
            {
               task.doIt(callback);
            }, this.delay());
         }
      };

      Engine.prototype.finishResourceQueue = function()
      {
         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.RESOURCE_END));
         var phaseCallback = this.performPlanningPhase.bind(this);

         setTimeout(function()
         {
            phaseCallback();
         }, this.delay());
      };

      Engine.prototype.performPlanningPhase = function()
      {
         if (this.isGameOver())
         {
            this.processGameOver();
         }
         else
         {
            var store = this.store();
            store.dispatch(Action.enqueuePhase(Phase.PLANNING_START));

            var task = new PlanningTask(store);
            var callback = this.finishPlanningQueue.bind(this);

            setTimeout(function()
            {
               task.doIt(callback);
            }, this.delay());
         }
      };

      Engine.prototype.finishPlanningQueue = function()
      {
         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.PLANNING_END));
         var phaseCallback = this.performQuestPhase.bind(this);

         setTimeout(function()
         {
            phaseCallback();
         }, this.delay());
      };

      Engine.prototype.performQuestPhase = function()
      {
         if (this.isGameOver())
         {
            this.processGameOver();
         }
         else
         {
            var store = this.store();
            store.dispatch(Action.enqueuePhase(Phase.QUEST_START));

            var task = new QuestTask(store);
            var callback = this.finishQuestQueue.bind(this);

            setTimeout(function()
            {
               task.doIt(callback);
            }, this.delay());
         }
      };

      Engine.prototype.finishQuestQueue = function()
      {
         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.QUEST_END));
         var phaseCallback = this.performTravelPhase.bind(this);

         setTimeout(function()
         {
            phaseCallback();
         }, this.delay());
      };

      Engine.prototype.performTravelPhase = function()
      {
         if (this.isGameOver())
         {
            this.processGameOver();
         }
         else
         {
            var store = this.store();
            store.dispatch(Action.enqueuePhase(Phase.TRAVEL_START));

            var task = new TravelTask(store);
            var callback = this.finishTravelPhase.bind(this);

            setTimeout(function()
            {
               task.doIt(callback);
            }, this.delay());
         }
      };

      Engine.prototype.finishTravelPhase = function()
      {
         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.TRAVEL_END));
         var phaseCallback = this.performEncounterPhase.bind(this);

         setTimeout(function()
         {
            phaseCallback();
         }, this.delay());
      };

      Engine.prototype.performEncounterPhase = function()
      {
         if (this.isGameOver())
         {
            this.processGameOver();
         }
         else
         {
            var store = this.store();
            store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_START));

            var task = new EncounterTask(store, this.delay());
            var callback = this.finishEncounterPhase.bind(this);

            setTimeout(function()
            {
               task.doIt(callback);
            }, this.delay());
         }
      };

      Engine.prototype.finishEncounterPhase = function()
      {
         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_END));
         var phaseCallback = this.performCombatPhase.bind(this);

         setTimeout(function()
         {
            phaseCallback();
         }, this.delay());
      };

      Engine.prototype.performCombatPhase = function()
      {
         if (this.isGameOver())
         {
            this.processGameOver();
         }
         else
         {
            var store = this.store();
            store.dispatch(Action.enqueuePhase(Phase.COMBAT_START));

            var task = new CombatTask(store, this.delay());
            var callback = this.finishCombatPhase.bind(this);

            setTimeout(function()
            {
               task.doIt(callback);
            }, this.delay());
         }
      };

      Engine.prototype.finishCombatPhase = function()
      {
         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_END));
         var phaseCallback = this.performRefreshPhase.bind(this);

         setTimeout(function()
         {
            phaseCallback();
         }, this.delay());
      };

      Engine.prototype.performRefreshPhase = function()
      {
         if (this.isGameOver())
         {
            this.processGameOver();
         }
         else
         {
            var store = this.store();
            store.dispatch(Action.enqueuePhase(Phase.REFRESH_START));

            var task = new RefreshTask(store);
            var callback = this.finishRefreshPhase.bind(this);

            setTimeout(function()
            {
               task.doIt(callback);
            }, this.delay());
         }
      };

      Engine.prototype.finishRefreshPhase = function()
      {
         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.REFRESH_END));
         var phaseCallback = this.performResourcePhase.bind(this);

         setTimeout(function()
         {
            phaseCallback();
         }, this.delay());
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      Engine.prototype.isGameOver = function()
      {
         return this.adjudicator().isGameOver();
      };

      Engine.prototype.processGameOver = function()
      {
         LOGGER.info("Game over.");

         var callback = this.callback();

         if (callback)
         {
            callback();
         }
      };

      return Engine;
   });
