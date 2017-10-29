"use strict";

define(["qunit", "redux", "model/js/Action", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/TransferReducer"],
   function(QUnit, Redux, Action, Reducer, ScenarioDeckBuilder, TransferReducer)
   {
      QUnit.module("TransferReducer");

      QUnit.test("drawEncounterCard()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         var encounterInstance = scenarioDeck.encounterInstances[0];
         store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
         assert.equal(store.getState().encounterDeck.size, 36);
         assert.equal(store.getState().stagingArea.size, 0);

         // Run.
         var result = TransferReducer.reduce(store.getState(), "encounterDeck", undefined, encounterInstance.id(), "stagingArea");

         // Verify.
         assert.ok(result);
         assert.equal(result.encounterDeck.size, 35);
         assert.equal(result.stagingArea.size, 1);
      });
   });
