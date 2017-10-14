"use strict";

define(["common/js/InputValidator", "artifact/js/Phase", "model/js/Action", "model/js/ResourceTask"],
   function(InputValidator, Phase, Action, ResourceTask)
   {
      function Engine(store, environment, delayIn, callback)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("environment", environment);
         // delayIn optional.
         // callback optional.

         this.store = function()
         {
            return store;
         };

         this.environment = function()
         {
            return environment;
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

            this.queue(this.agents());
            this.processResourceQueue();
         }
      };

      Engine.prototype.processResourceQueue = function()
      {
         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.RESOURCE_END));
            var phaseCallback = this.performPlanningPhase.bind(this);
            setTimeout(function()
            {
               phaseCallback();
            }, this.delay());
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         var task = new ResourceTask(store, agent, this.processResourceQueue.bind(this));

         setTimeout(function()
         {
            task.doIt();
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
            this.queue(this.agents());
            this.processPlanningQueue();
         }
      };

      Engine.prototype.processPlanningQueue = function()
      {
         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.PLANNING_END));
            var phaseCallback = this.performQuestPhase.bind(this);
            setTimeout(function()
            {
               phaseCallback();
            }, this.delay());
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         this.processPlanningQueue();
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
            this.queue(this.agents());
            this.processQuestQueue();
         }
      };

      Engine.prototype.processQuestQueue = function()
      {
         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.QUEST_END));
            var phaseCallback = this.performTravelPhase.bind(this);
            setTimeout(function()
            {
               phaseCallback();
            }, this.delay());
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         this.processQuestQueue();
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
            this.queue(this.agents());
            this.processTravelQueue();
         }
      };

      Engine.prototype.processTravelQueue = function()
      {
         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.TRAVEL_END));
            var phaseCallback = this.performEncounterPhase.bind(this);
            setTimeout(function()
            {
               phaseCallback();
            }, this.delay());
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         this.processTravelQueue();
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
            this.queue(this.agents());
            this.processEncounterQueue();
         }
      };

      Engine.prototype.processEncounterQueue = function()
      {
         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_END));
            var phaseCallback = this.performCombatPhase.bind(this);
            setTimeout(function()
            {
               phaseCallback();
            }, this.delay());
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         this.processEncounterQueue();
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
            this.queue(this.agents());
            this.processCombatQueue();
         }
      };

      Engine.prototype.processCombatQueue = function()
      {
         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.COMBAT_END));
            var phaseCallback = this.performRefreshPhase.bind(this);
            setTimeout(function()
            {
               phaseCallback();
            }, this.delay());
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         this.processCombatQueue();
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
            this.queue(this.agents());
            this.processRefreshQueue();
         }
      };

      Engine.prototype.processRefreshQueue = function()
      {
         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.REFRESH_END));
            var phaseCallback = this.performResourcePhase.bind(this);
            setTimeout(function()
            {
               phaseCallback();
            }, this.delay());
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         this.processRefreshQueue();
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      Engine.prototype.agents = function()
      {
         var store = this.store();
         var agentValues = store.getState().agents;
         var agents = agentValues.valueSeq().reduce(function(accumulator, values)
         {
            var id = values.get("id");
            var agentClass = values.get("agentClass");
            accumulator.push(agentClass.get(store, id));
            return accumulator;
         }, []);
         var agentIds = agentValues.valueSeq().reduce(function(accumulator, values)
         {
            accumulator.push(values.get("id"));
            return accumulator;
         }, []);

         var firstAgentId = (store.getState().firstAgentId ? store.getState().firstAgentId : agents[0].id());
         var index = agentIds.indexOf(firstAgentId);
         var answer = agents.lotrRotate(index);

         return answer;
      };

      Engine.prototype.isGameOver = function()
      {
         var store = this.store();

         return store.getState().round === 2;
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
