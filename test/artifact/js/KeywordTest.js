import Keyword from "../../../src/artifact/js/Keyword.js";

QUnit.module("Keyword");

QUnit.test("Keyword properties Leadership", function(assert)
{
   var keywordKey = Keyword.SENTINEL;
   var properties = Keyword.properties[keywordKey];
   assert.equal(properties.name, "Sentinel");
   assert.equal(properties.key, "sentinel");
});

QUnit.test("keys and values", function(assert)
{
   // Setup.

   // Run.
   var result = Keyword.keys();
   var ownPropertyNames = Object.getOwnPropertyNames(Keyword);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      var key2 = Keyword[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(Keyword.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      var p = ownPropertyNames.filter(function(key)
      {
         return Keyword[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
});

QUnit.test("Keyword.keys()", function(assert)
{
   // Run.
   var result = Keyword.keys();

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 3);
   var i = 0;
   assert.equal(result[i++], Keyword.RANGED);
   assert.equal(result[i++], Keyword.RESTRICTED);
   assert.equal(result[i++], Keyword.SENTINEL);
});

var KeywordTest = {};
export default KeywordTest;