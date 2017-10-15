"use strict";

define(["common/js/InputValidator", "model/js/Action"],
   function(InputValidator, Action)
   {
      function ResourceTask(store, agent)
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

      ResourceTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         // Add one resource to each hero's pool.
         var store = this.store();
         var agent = this.agent();
         var cardInstances = agent.heroDeck();

         cardInstances.forEach(function(cardInstance)
         {
            var sphereKey = cardInstance.card().sphereKey;
            store.dispatch(Action.addCardResource(cardInstance, sphereKey));
         });

         // Draw one card.
         store.dispatch(Action.drawPlayerCard(agent));

         callback();
      };

      return ResourceTask;
   });
