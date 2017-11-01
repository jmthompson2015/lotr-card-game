/*
 * @see https://github.com/reactjs/redux/issues/303#issuecomment-125184409
 */
"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   var Observer = {};

   Observer.observeStore = function(store, select, onChange)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("select", select);
      InputValidator.validateNotNull("onChange", onChange);

      var currentState;

      function handleChange()
      {
         var nextState = select(store.getState());

         if (nextState !== currentState)
         {
            currentState = nextState;
            onChange(nextState);
         }
      }

      var unsubscribe = store.subscribe(handleChange);

      handleChange();

      return unsubscribe;
   };

   if (Object.freeze)
   {
      Object.freeze(Observer);
   }

   return Observer;
});
