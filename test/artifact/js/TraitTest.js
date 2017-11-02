"use strict";

define(["qunit", "artifact/js/Trait"], function(QUnit, Trait)
{
   QUnit.module("Trait");

   QUnit.test("Trait properties Archer", function(assert)
   {
      var cardKey = Trait.ARCHER;
      var properties = Trait.properties[cardKey];
      assert.equal(properties.name, "Archer");
      assert.equal(properties.key, "archer");
   });

   QUnit.test("keys and values", function(assert)
   {
      // Setup.

      // Run.
      var result = Trait.keys();
      var ownPropertyNames = Object.getOwnPropertyNames(Trait);

      // Verify.
      ownPropertyNames.forEach(function(key)
      {
         var key2 = Trait[key];

         if (key !== "properties" && typeof key2 === "string")
         {
            assert.ok(Trait.properties[key2], "Missing value for key = " + key);
         }
      });

      result.forEach(function(value)
      {
         var p = ownPropertyNames.filter(function(key)
         {
            return Trait[key] === value;
         });

         assert.equal(p.length, 1, "Missing key for value = " + value);
      });
   });

   QUnit.test("Trait.keys()", function(assert)
   {
      // Run.
      var result = Trait.keys();

      // Verify.
      assert.ok(result);
      var length = 75;
      assert.equal(result.length, length);
      assert.equal(result[0], Trait.ALLY);
      assert.equal(result[length - 1], Trait.WOODMAN);
   });
});
