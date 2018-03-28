import Action from "../../../src/model/js/Action.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import TransferReducer from "../../../src/model/js/TransferReducer.js";

QUnit.module("TransferReducer");

QUnit.test("drawEncounterCard()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   var encounterInstance = scenarioDeck.encounterInstances[0];
   store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
   assert.equal(store.getState().encounterDeck.length, 36);
   assert.equal(store.getState().stagingArea.length, 0);

   // Run.
   var result = TransferReducer.reduce(store.getState(), "encounterDeck", undefined, encounterInstance.id(), "stagingArea");

   // Verify.
   assert.ok(result);
   assert.equal(result.encounterDeck.length, 35);
   assert.equal(result.stagingArea.length, 1);
});

var TransferReducerTest = {};
export default TransferReducerTest;