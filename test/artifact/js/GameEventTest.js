"use strict";

define(["qunit", "artifact/js/GameEvent"], function(QUnit, GameEvent)
{
   QUnit.module("GameEvent");

   QUnit.test("GameEvent properties Quest card drawn", function(assert)
   {
      var eventKey = GameEvent.QUEST_CARD_DRAWN;
      var properties = GameEvent.properties[eventKey];
      assert.equal(properties.name, "Quest card drawn");
      assert.equal(properties.key, "questCardDrawn");
   });

   QUnit.test("keys and values", function(assert)
   {
      // Setup.

      // Run.
      var result = GameEvent.keys();
      var ownPropertyNames = Object.getOwnPropertyNames(GameEvent);

      // Verify.
      ownPropertyNames.forEach(function(key)
      {
         var key2 = GameEvent[key];

         if (key !== "properties" && typeof key2 === "string")
         {
            assert.ok(GameEvent.properties[key2], "Missing value for key = " + key);
         }
      });

      result.forEach(function(value)
      {
         var p = ownPropertyNames.filter(function(key)
         {
            return GameEvent[key] === value;
         });

         assert.equal(p.length, 1, "Missing key for value = " + value);
      });
   });

   QUnit.test("GameEvent.keys()", function(assert)
   {
      // Run.
      var result = GameEvent.keys();

      // Verify.
      assert.ok(result);
      var length = 5;
      assert.equal(result.length, length);
      var i = 0;
      assert.equal(result[i++], GameEvent.CARD_DRAWN);
      assert.equal(result[i++], GameEvent.QUEST_CARD_DRAWN);
      assert.equal(result[i++], GameEvent.QUEST_SUCCEEDED);
      assert.equal(result[i++], GameEvent.SHADOW_CARD_REVEALED);
      assert.equal(result[i++], GameEvent.TRAVELED);
   });
});
