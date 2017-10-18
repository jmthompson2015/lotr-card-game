"use strict";

define(["common/js/InputValidator"],
   function(InputValidator)
   {
      function PlanningTask(store)
      {
         InputValidator.validateNotNull("store", store);

         this.store = function()
         {
            return store;
         };
      }

      PlanningTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         callback();
      };

      return PlanningTask;
   });
