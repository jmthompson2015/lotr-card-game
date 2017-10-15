"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "model/js/Action"],
   function(InputValidator, CardType, Action)
   {
      function TravelTask(store)
      {
         InputValidator.validateNotNull("store", store);

         this.store = function()
         {
            return store;
         };
      }

      TravelTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

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

         callback();
      };

      return TravelTask;
   });
