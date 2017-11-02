"use strict";

define(["qunit", "artifact/js/LocationCard"], function(QUnit, LocationCard)
{
   QUnit.module("LocationCard");

   QUnit.test("LocationCard properties Enchanted Stream", function(assert)
   {
      var cardKey = LocationCard.ENCHANTED_STREAM;
      var properties = LocationCard.properties[cardKey];
      assert.equal(properties.name, "Enchanted Stream");
      assert.equal(properties.key, "enchantedStream");
   });

   QUnit.test("keys and values", function(assert)
   {
      // Setup.

      // Run.
      var result = LocationCard.keys();
      var ownPropertyNames = Object.getOwnPropertyNames(LocationCard);

      // Verify.
      ownPropertyNames.forEach(function(key)
      {
         var key2 = LocationCard[key];

         if (key !== "properties" && typeof key2 === "string")
         {
            assert.ok(LocationCard.properties[key2], "Missing value for key = " + key);
         }
      });

      result.forEach(function(value)
      {
         var p = ownPropertyNames.filter(function(key)
         {
            return LocationCard[key] === value;
         });

         assert.equal(p.length, 1, "Missing key for value = " + value);
      });
   });

   QUnit.test("traits", function(assert)
   {
      LocationCard.keys().forEach(function(cardKey)
      {
         var card = LocationCard.properties[cardKey];
         card.traitKeys.forEach(function(traitKey)
         {
            assert.ok(traitKey, "Missing traitKey for cardKey = " + cardKey);
         });
      });
   });

   QUnit.test("LocationCard.keys()", function(assert)
   {
      // Run.
      var result = LocationCard.keys();

      // Verify.
      assert.ok(result);
      var length = 38;
      assert.equal(result.length, length);
      assert.equal(result[0], LocationCard.AMON_HEN);
      assert.equal(result[length - 1], LocationCard.WOODMANS_GLADE);
   });
});
