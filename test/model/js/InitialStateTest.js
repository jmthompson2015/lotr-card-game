import Phase from "../../../src/artifact/js/Phase.js";
import InitialState from "../../../src/model/js/InitialState.js";

QUnit.module("InitialState");

QUnit.test("InitialState()", function(assert)
{
   // Run.
   var result = new InitialState();

   // Verify.
   assert.equal(result.nextCardId, 1);
   assert.equal(result.phaseKey, Phase.SETUP);
   assert.equal(result.round, 0);
   assert.ok(result.cardInstances);
   assert.equal(result.cardInstances.size, 0);
});

var InitialStateTest = {};
export default InitialStateTest;