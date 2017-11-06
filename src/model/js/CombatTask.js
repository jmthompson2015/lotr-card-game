"use strict";

define(["common/js/InputValidator", "artifact/js/Phase", "model/js/Action", "model/js/CombatAttackTask", "model/js/CombatDealShadowCardsTask", "model/js/CombatDefendTask", "model/js/QueueProcessor"],
   function(InputValidator, Phase, Action, CombatAttackTask, CombatDealShadowCardsTask, CombatDefendTask, QueueProcessor)
   {
      function CombatTask(store)
      {
         InputValidator.validateNotNull("store", store);

         this.store = function()
         {
            return store;
         };
      }

      CombatTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_DEAL_SHADOW_CARDS_START));
         var environment = store.getState().environment;

         var queue = environment.agentQueue();
         var elementFunction = function(agent, queueCallback)
         {
            store.dispatch(Action.setActiveAgent(agent));
            var task = new CombatDealShadowCardsTask(store, agent);

            setTimeout(function()
            {
               task.doIt(queueCallback);
            }, delay);
         };
         var performCombatPhase2 = this.performCombatPhase2.bind(this);
         var finishFunction = function(finishCallback)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.COMBAT_DEAL_SHADOW_CARDS_END));
            performCombatPhase2(finishCallback);
         };
         var delay = store.getState().delay;

         var queueProcessor = new QueueProcessor(queue, callback, elementFunction, finishFunction, delay);
         queueProcessor.processQueue();
      };

      CombatTask.prototype.performCombatPhase2 = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_DEFEND_START));
         var environment = store.getState().environment;

         var queue = environment.agentQueue();
         var elementFunction = function(agent, queueCallback)
         {
            store.dispatch(Action.setActiveAgent(agent));
            var task = new CombatDefendTask(store, agent, delay);

            setTimeout(function()
            {
               task.doIt(queueCallback);
            }, delay);
         };
         var performCombatPhase3 = this.performCombatPhase3.bind(this);
         var finishFunction = function(finishCallback)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.COMBAT_DEFEND_END));
            performCombatPhase3(finishCallback);
         };
         var delay = store.getState().delay;

         var queueProcessor = new QueueProcessor(queue, callback, elementFunction, finishFunction, delay);
         queueProcessor.processQueue();
      };

      CombatTask.prototype.performCombatPhase3 = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_ATTACK_START));
         var environment = store.getState().environment;

         var queue = environment.agentQueue();
         var elementFunction = function(agent, queueCallback)
         {
            store.dispatch(Action.setActiveAgent(agent));
            var task = new CombatAttackTask(store, agent);

            setTimeout(function()
            {
               task.doIt(queueCallback);
            }, delay);
         };
         var finishCombatPhase = this.finishCombatPhase.bind(this);
         var finishFunction = function(finishCallback)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.COMBAT_ATTACK_END));
            finishCombatPhase(finishCallback);
         };
         var delay = store.getState().delay;

         var queueProcessor = new QueueProcessor(queue, callback, elementFunction, finishFunction, delay);
         queueProcessor.processQueue();
      };

      CombatTask.prototype.finishCombatPhase = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         callback();
      };

      return CombatTask;
   });
