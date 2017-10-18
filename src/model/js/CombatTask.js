"use strict";

define(["common/js/InputValidator", "artifact/js/Phase", "model/js/Action", "model/js/CombatAttackTask", "model/js/CombatDealShadowCardsTask", "model/js/CombatDefendTask"],
   function(InputValidator, Phase, Action, CombatAttackTask, CombatDealShadowCardsTask, CombatDefendTask)
   {
      function CombatTask(store, delayIn)
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

      CombatTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_DEAL_SHADOW_CARDS_START));
         var environment = store.getState().environment;
         this.queue(environment.agentQueue());
         this.processCombatQueue1(callback);
      };

      CombatTask.prototype.processCombatQueue1 = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.COMBAT_DEAL_SHADOW_CARDS_END));
            var phaseCallback = this.performCombatPhase2.bind(this);
            setTimeout(function()
            {
               phaseCallback(callback);
            }, this.delay());
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         var task = new CombatDealShadowCardsTask(store, agent);
         var queueCallback = this.processCombatQueue1.bind(this);
         var taskCallback = function()
         {
            queueCallback(callback);
         };

         setTimeout(function()
         {
            task.doIt(taskCallback);
         }, this.delay());
      };

      CombatTask.prototype.performCombatPhase2 = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_DEFEND_START));
         var environment = store.getState().environment;
         this.queue(environment.agentQueue());
         this.processCombatQueue2(callback);
      };

      CombatTask.prototype.processCombatQueue2 = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.COMBAT_DEFEND_END));
            var phaseCallback = this.performCombatPhase3.bind(this);
            setTimeout(function()
            {
               phaseCallback(callback);
            }, this.delay());
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         var task = new CombatDefendTask(store, agent);
         var queueCallback = this.processCombatQueue2.bind(this);
         var taskCallback = function()
         {
            queueCallback(callback);
         };

         setTimeout(function()
         {
            task.doIt(taskCallback);
         }, this.delay());
      };

      CombatTask.prototype.performCombatPhase3 = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();
         store.dispatch(Action.enqueuePhase(Phase.COMBAT_ATTACK_START));
         var environment = store.getState().environment;
         this.queue(environment.agentQueue());
         this.processCombatQueue3(callback);
      };

      CombatTask.prototype.processCombatQueue3 = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.COMBAT_ATTACK_END));
            var phaseCallback = this.finishCombatPhase.bind(this);
            setTimeout(function()
            {
               phaseCallback(callback);
            }, this.delay());
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         var task = new CombatAttackTask(store, agent);
         var queueCallback = this.processCombatQueue3.bind(this);
         var taskCallback = function()
         {
            queueCallback(callback);
         };

         setTimeout(function()
         {
            task.doIt(taskCallback);
         }, this.delay());
      };

      CombatTask.prototype.finishCombatPhase = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         callback();
      };

      return CombatTask;
   });
