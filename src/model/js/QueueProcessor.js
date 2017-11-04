"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   function QueueProcessor(queueIn, callback, elementFunctionIn, finishFunctionIn, delayIn)
   {
      InputValidator.validateIsArray("queue", queueIn);
      InputValidator.validateIsFunction("callback", callback);
      // elementFunction optional.
      // finishFunction optional.
      // delayIn optional.

      var queue = queueIn.slice();

      this.queue = function()
      {
         return queue;
      };

      this.callback = function()
      {
         return callback;
      };

      var elementFunction = (elementFunctionIn !== undefined ? elementFunctionIn : function(element, queueCallback)
      {
         queueCallback();
      });

      this.elementFunction = function()
      {
         return elementFunction;
      };

      var finishFunction = (finishFunctionIn !== undefined ? finishFunctionIn : function(finishCallback)
      {
         finishCallback();
      });

      this.finishFunction = function()
      {
         return finishFunction;
      };

      var delay = (delayIn !== undefined ? delayIn : 1000);

      this.delay = function()
      {
         return delay;
      };
   }

   QueueProcessor.prototype.processQueue = function()
   {
      if (this.queue().length === 0)
      {
         var finishFunction = this.finishFunction();
         var finishCallback = this.callback();

         setTimeout(function()
         {
            finishFunction(finishCallback);
         }, this.delay());
         return;
      }

      var element = this.queue().shift();
      var elementFunction = this.elementFunction();
      var processQueue = this.processQueue.bind(this);
      var queueCallback = function()
      {
         processQueue();
      };

      elementFunction(element, queueCallback);
   };

   return QueueProcessor;
});
