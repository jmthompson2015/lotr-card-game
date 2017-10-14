"use strict";

define(["common/js/InputValidator", "model/js/Action"],
   function(InputValidator, Action)
   {
      function ResourceTask(store, agent, callback)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("agent", agent);
         InputValidator.validateNotNull("callback", callback);

         this.store = function()
         {
            return store;
         };

         this.agent = function()
         {
            return agent;
         };

         this.callback = function()
         {
            return callback;
         };
      }

      ResourceTask.prototype.doIt = function()
      {
         LOGGER.trace("ResourceTask.doIt() start");

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

         var callback = this.callback();
         callback();

         LOGGER.trace("ResourceTask.doIt() end");
      };

      return ResourceTask;
   });
