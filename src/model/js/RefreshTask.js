"use strict";

define(["common/js/InputValidator", "model/js/Action"],
   function(InputValidator, Action)
   {
      function RefreshTask(store, agent)
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

      RefreshTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         // 1. All exhausted cards ready.
         var store = this.store();
         var agent = this.agent();

         agent.heroDeck().forEach(function(cardInstance)
         {
            if (cardInstance.isExhausted())
            {
               store.dispatch(Action.setCardReady(cardInstance, true));
            }
         });

         agent.tableau().forEach(function(cardInstance)
         {
            if (cardInstance.isExhausted())
            {
               store.dispatch(Action.setCardReady(cardInstance, true));
            }
         });

         // 2. Each player increases his threat by 1.
         store.dispatch(Action.addAgentThreat(agent));

         // 3. The first player token passes to the next player clockwise.
         var environment = store.getState().environment;
         var agents = environment.agentQueue();

         if (agents.length > 1)
         {
            var nextAgent = agents[1];
            store.dispatch(Action.setFirstAgent(nextAgent));
         }

         callback();
      };

      return RefreshTask;
   });
