import ObjectUtilities from "../../../src/common/js/ObjectUtilities.js";

QUnit.module("ObjectUtilities");

var ObjectUtilitiesTest = {};

QUnit.test("merge()", function(assert)
{
   // Setup.
   let a = {
      first: 1,
      second: 2,
      third: 3
   };
   let b = {
      third: 33,
      fourth: 44,
      fifth: 55,
   };

   // Run.
   var result = ObjectUtilities.merge(a, b);

   // Verify.
   assert.ok(result);
   assert.equal(result.first, 1);
   assert.equal(result.second, 2);
   assert.equal(result.third, 33);
   assert.equal(result.fourth, 44);
   assert.equal(result.fifth, 55);
});

export default ObjectUtilitiesTest;