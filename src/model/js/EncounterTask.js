"use strict";

define(["common/js/InputValidator", "artifact/js/Phase", "model/js/Action", "model/js/EncounterEngagementCheckTask", "model/js/EncounterOptionalEngagementTask"],
   function(InputValidator, Phase, Action, EncounterEngagementCheckTask, EncounterOptionalEngagementTask)
   {
      function EncounterTask(store, delayIn)
      {
         InputValidator.validateNotNull("store", store);

         this.store = function()
         {
            return store;
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

      EncounterTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_START));
         var environment = store.getState().environment;
         this.queue(environment.agentQueue());
         this.processEncounterQueue1(callback);
      };

      EncounterTask.prototype.processEncounterQueue1 = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END));
            var phaseCallback = this.performEncounterPhase2.bind(this);

            setTimeout(function()
            {
               phaseCallback(callback);
            }, this.delay());
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         var task = new EncounterOptionalEngagementTask(store, agent);
         var queueCallback = this.processEncounterQueue1.bind(this);
         var taskCallback = function()
         {
            queueCallback(callback);
         };

         setTimeout(function()
         {
            task.doIt(taskCallback);
         }, this.delay());
      };

      EncounterTask.prototype.performEncounterPhase2 = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_ENGAGEMENT_CHECK_START));
         var environment = store.getState().environment;
         this.queue(environment.agentQueue());
         this.processEncounterQueue2(callback);
      };

      EncounterTask.prototype.processEncounterQueue2 = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();

         if (this.queue().length === 0)
         {
            var environment = store.getState().environment;
            var enemies = environment.stagingEnemies();
            var minEnemyEngagement = (enemies.size > 0 ? enemies.last().card().engagementCost : 1000);
            var maxAgentThreat = environment.agents().reduce(function(accumulator, agent)
            {
               return Math.max(accumulator, agent.threatLevel());
            }, 0);

            if (minEnemyEngagement > maxAgentThreat)
            {
               // We're done.
               store.dispatch(Action.setActiveAgent(undefined));
               store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_ENGAGEMENT_CHECK_END));
               var phaseCallback = this.finishEncounterPhase.bind(this);

               setTimeout(function()
               {
                  phaseCallback(callback);
               }, this.delay());
            }
            else
            {
               // We're not done yet.
               this.queue(environment.agentQueue());
               this.processEncounterQueue2(callback);
            }

            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         var task = new EncounterEngagementCheckTask(store, agent);
         var queueCallback = this.processEncounterQueue2.bind(this);
         var taskCallback = function()
         {
            queueCallback(callback);
         };

         setTimeout(function()
         {
            task.doIt(taskCallback);
         }, this.delay());
      };

      EncounterTask.prototype.finishEncounterPhase = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         callback();
      };

      return EncounterTask;
   });
