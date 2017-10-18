"use strict";

define(["common/js/InputValidator"],
   function(InputValidator)
   {
      function QuestTask(store)
      {
         InputValidator.validateNotNull("store", store);

         this.store = function()
         {
            return store;
         };
      }

      QuestTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         callback();
      };

      return QuestTask;
   });
