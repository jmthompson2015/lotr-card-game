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
   assert.equal(store.getState().encounterDeck.size, 36);
   assert.equal(store.getState().stagingArea.size, 0);

   // Run.
   var result = TransferReducer.reduce(store.getState(), "encounterDeck", undefined, encounterInstance.id(), "stagingArea");

   // Verify.
   assert.ok(result);
   assert.equal(result.encounterDeck.size, 35);
   assert.equal(result.stagingArea.size, 1);
});

var TransferReducerTest = {};
export default TransferReducerTest;