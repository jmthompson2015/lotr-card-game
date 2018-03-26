import MathUtilities from "../../../src/common/js/MathUtilities.js";

QUnit.module("MathUtilities");

var MathUtilitiesTest = {};

QUnit.test("round()", function(assert)
{
   assert.equal(MathUtilities.round(12.3456, -1), 10);
   assert.equal(MathUtilities.round(12.3456, 0), 12);
   assert.equal(MathUtilities.round(12.3456, 1), 12.3);
   assert.equal(MathUtilities.round(12.3456, 2), 12.35);
   assert.equal(MathUtilities.round(12.3456, 3), 12.346);
   assert.equal(MathUtilities.round(12.3456, 4), 12.3456);
});

export default MathUtilitiesTest;