import GameMode from "../../../src/artifact/js/GameMode.js";

QUnit.module("GameMode");

var GameModeTest = {};

QUnit.test("GameMode properties Easy", function(assert)
{
   var cardKey = GameMode.EASY;
   var properties = GameMode.properties[cardKey];
   assert.equal(properties.name, "Easy");
   assert.equal(properties.key, "easy");
});

QUnit.test("keys and values", function(assert)
{
   // Setup.

   // Run.
   var result = GameMode.keys();
   var ownPropertyNames = Object.getOwnPropertyNames(GameMode);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      var key2 = GameMode[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(GameMode.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      var p = ownPropertyNames.filter(function(key)
      {
         return GameMode[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
});

QUnit.test("GameMode.keys()", function(assert)
{
   // Run.
   var result = GameMode.keys();

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 3);
   var i = 0;
   assert.equal(result[i++], GameMode.EASY);
   assert.equal(result[i++], GameMode.STANDARD);
   assert.equal(result[i++], GameMode.NIGHTMARE);
});

export default GameModeTest;