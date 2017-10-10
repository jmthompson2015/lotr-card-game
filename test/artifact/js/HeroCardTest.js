"use strict";

define(["qunit", "artifact/js/HeroCard"], function(QUnit, HeroCard)
{
   QUnit.module("HeroCard");

   QUnit.test("HeroCard properties Aragorn (Core)", function(assert)
   {
      var cardKey = HeroCard.ARAGORN_CORE;
      var properties = HeroCard.properties[cardKey];
      assert.equal(properties.name, "Aragorn");
      assert.equal(properties.key, "aragornCore");
   });

   QUnit.test("keys and values", function(assert)
   {
      // Setup.

      // Run.
      var result = HeroCard.keys();
      var ownPropertyNames = Object.getOwnPropertyNames(HeroCard);

      // Verify.
      ownPropertyNames.forEach(function(key)
      {
         var key2 = HeroCard[key];

         if (key !== "properties" && typeof key2 === "string")
         {
            assert.ok(HeroCard.properties[key2], "Missing value for key = " + key);
         }
      });

      result.forEach(function(value)
      {
         var p = ownPropertyNames.filter(function(key)
         {
            return HeroCard[key] === value;
         });

         assert.equal(p.length, 1, "Missing key for value = " + value);
      });
   });

   QUnit.test("traits", function(assert)
   {
      HeroCard.keys().forEach(function(cardKey)
      {
         var card = HeroCard.properties[cardKey];
         card.traitKeys.forEach(function(traitKey)
         {
            assert.ok(traitKey, "Missing traitKey for cardKey = " + cardKey);
         });
      });
   });

   QUnit.test("HeroCard.keys()", function(assert)
   {
      // Run.
      var result = HeroCard.keys();

      // Verify.
      assert.ok(result);
      var length = 75;
      assert.equal(result.length, length);
      assert.equal(result[0], HeroCard.AMARTHIUL);
      assert.equal(result[length - 1], HeroCard.TREEBEARD);
   });
});
