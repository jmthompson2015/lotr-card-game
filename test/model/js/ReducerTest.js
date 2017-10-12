"use strict";

define(["immutable", "qunit", "redux", "model/js/Action", "model/js/Reducer"],
   function(Immutable, QUnit, Redux, Action, Reducer)
   {
      QUnit.module("Reducer");

      QUnit.test("incrementNextCardId()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         assert.equal(store.getState().nextCardId, 1);

         // Run.
         store.dispatch(Action.incrementNextCardId());

         // Verify.
         assert.equal(store.getState().nextCardId, 2);

         // Run.
         store.dispatch(Action.incrementNextCardId());

         // Verify.
         assert.equal(store.getState().nextCardId, 3);
      });
   });
