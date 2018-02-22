import QueueProcessor from "../../../src/model/js/QueueProcessor.js";

QUnit.module("QueueProcessor");

QUnit.test("processQueue()", function(assert)
{
   // Setup.
   var queue = [0, 1, 2, 3, 4, 5];
   var elementQueue = [];
   var elementFunction = function(element, queueCallback)
   {
      // LOGGER.info("elementFunction() element = " + element);
      elementQueue.push(element);
      queueCallback();
   };
   var finishFunction = function(finishCallback)
   {
      // LOGGER.info("finishFunction()");
      finishCallback();
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(elementQueue.length, queue.length);
      for (var i = 0; i < queue.length; i++)
      {
         assert.equal(elementQueue[i], queue[i]);
      }
      done();
   };
   var processor = new QueueProcessor(queue, callback, elementFunction, finishFunction, 10);

   // Run.
   var done = assert.async();
   processor.processQueue();
});

QUnit.test("processQueue() defaults", function(assert)
{
   // Setup.
   var queue = [0, 1, 2, 3, 4, 5];
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      done();
   };
   var processor = new QueueProcessor(queue, callback, undefined, undefined, 10);

   // Run.
   var done = assert.async();
   processor.processQueue();
});

var QueueProcessorTest = {};
export default QueueProcessorTest;