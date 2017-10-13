"use strict";

define(["qunit", "redux", "model/js/Reducer", "model/js/SimpleAgent"],
   function(QUnit, Redux, Reducer, SimpleAgent)
   {
      QUnit.module("SimpleAgent");

      QUnit.test("SimpleAgent()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var name = "agent1";

         // Run.
         var result = new SimpleAgent(store, name);

         // Verify.
         assert.ok(result);
         assert.equal(result.id(), 1);
         assert.equal(result.name(), name);
      });
   });
