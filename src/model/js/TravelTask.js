"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "model/js/Action"],
   function(InputValidator, CardType, Action)
   {
      function TravelTask(store, callback)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("callback", callback);

         this.store = function()
         {
            return store;
         };

         this.callback = function()
         {
            return callback;
         };
      }

      TravelTask.prototype.doIt = function()
      {
         var store = this.store();

         if (store.getState().activeLocationId === undefined)
         {
            // Pick a location from the staging area.
            var environment = store.getState().environment;
            var locations = environment.stagingArea(CardType.LOCATION).toJS();

            // FIXME: ask a HumanAgent, if any, or the first agent.
            var cardInstance = locations.lotrRandomElement();

            if (cardInstance)
            {
               store.dispatch(Action.setActiveLocation(cardInstance));
            }
         }

         var callback = this.callback();
         callback();
      };

      return TravelTask;
   });
