import ArrayAugments from "../../../src/common/js/ArrayAugments.js";

QUnit.module("ArrayAugments");

var ArrayAugmentsTest = {};

QUnit.test("lotrRandomElement()", function(assert)
{
   var array = [1, 2, 3, 4];

   for (var i = 0; i < 10; i++)
   {
      assert.ok(array.includes(array.lotrRandomElement()));
   }
});

QUnit.test("lotrRemove()", function(assert)
{
   // Setup.
   var array = [1, 2, 3, 4];

   // Run.
   array.lotrRemove(2);

   // Verify.
   assert.equal(array.length, 3);
   assert.equal(array[0], 1);
   assert.equal(array[1], 3);
   assert.equal(array[2], 4);
});

QUnit.test("lotrRotate()", function(assert)
{
   assert.equal([1, 2, 3, 4].lotrRotate(0).join(","), "1,2,3,4");
   assert.equal([1, 2, 3, 4].lotrRotate(1).join(","), "2,3,4,1");
   assert.equal([1, 2, 3, 4].lotrRotate(2).join(","), "3,4,1,2");
   assert.equal([1, 2, 3, 4].lotrRotate(3).join(","), "4,1,2,3");
   assert.equal([1, 2, 3, 4].lotrRotate(4).join(","), "1,2,3,4");
   assert.equal([1, 2, 3, 4].lotrRotate(5).join(","), "2,3,4,1");
});

QUnit.test("lotrShuffle()", function(assert)
{
   var array = [1, 2, 3, 4];

   for (var i = 0; i < 10; i++)
   {
      array.lotrShuffle();
      assert.equal(array.length, 4);
      assert.ok(0 < array[0] && array[0] < 5);
   }
});

export default ArrayAugmentsTest;