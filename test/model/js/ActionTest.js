import Action from "../../../src/model/js/Action.js";

QUnit.module("Action");

QUnit.test("incrementRound()", function(assert)
{
   // Run.
   var result = Action.incrementRound();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, Action.INCREMENT_ROUND);
});

var ActionTest = {};
export default ActionTest;