"use strict";

define(["common/js/InputValidator", "model/js/Action", "model/js/CardAction"],
   function(InputValidator, Action, CardAction)
   {
      function RefreshTask(store)
      {
         InputValidator.validateNotNull("store", store);

         this.store = function()
         {
            return store;
         };
      }

      RefreshTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();
         store.dispatch(Action.setUserMessage(""));
         var environment = store.getState().environment;
         var agents = environment.agentQueue();

         agents.forEach(function(agent)
         {
            // 1. All exhausted cards ready.
            agent.tableau().forEach(function(cardInstance)
            {
               if (cardInstance.isExhausted())
               {
                  store.dispatch(CardAction.setReady(cardInstance, true));
               }
            });

            // 2. Each player increases his threat by 1.
            agent.addThreat(1);
         });

         // 3. The first player token passes to the next player clockwise.
         if (agents.length > 1)
         {
            var nextAgent = agents[1];
            store.dispatch(Action.setFirstAgent(nextAgent));
         }

         // Reset card used flag.
         var cardInstances = environment.cardsInPlay();

         cardInstances.forEach(function(cardInstance)
         {
            if (cardInstance.isUsed())
            {
               store.dispatch(CardAction.setUsed(cardInstance, false));
            }
         });

         callback();
      };

      return RefreshTask;
   });
