import ArrayUtilities from "../../../src/common/js/ArrayUtilities.js";

QUnit.module("ArrayUtilities");

var ArrayUtilitiesTest = {};

QUnit.test("randomElement()", function(assert)
{
   var array = [1, 2, 3, 4];

   for (var i = 0; i < 10; i++)
   {
      assert.ok(array.includes(ArrayUtilities.randomElement(array)));
   }
});

QUnit.test("remove()", function(assert)
{
   // Setup.
   var array = [1, 2, 3, 4];

   // Run.
   var result = ArrayUtilities.remove(array, 2);

   // Verify.
   assert.equal(result.length, 3);
   assert.equal(result[0], 1);
   assert.equal(result[1], 3);
   assert.equal(result[2], 4);
});

QUnit.test("rotate()", function(assert)
{
   var array = [1, 2, 3, 4];
   assert.equal(ArrayUtilities.rotate(array, 0).join(","), "1,2,3,4");
   assert.equal(ArrayUtilities.rotate(array, 1).join(","), "2,3,4,1");
   assert.equal(ArrayUtilities.rotate(array, 2).join(","), "3,4,1,2");
   assert.equal(ArrayUtilities.rotate(array, 3).join(","), "4,1,2,3");
   assert.equal(ArrayUtilities.rotate(array, 4).join(","), "1,2,3,4");
   assert.equal(ArrayUtilities.rotate(array, 5).join(","), "2,3,4,1");
});

QUnit.test("shuffle()", function(assert)
{
   var array = [1, 2, 3, 4];

   for (var i = 0; i < 10; i++)
   {
      let result = ArrayUtilities.shuffle(array);
      assert.equal(result.length, 4);
      assert.ok(0 < result[0] && result[0] < 5);
   }
});

export default ArrayUtilitiesTest;