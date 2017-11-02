"use strict";

define(["qunit", "artifact/js/EncounterSet"], function(QUnit, EncounterSet)
{
   QUnit.module("EncounterSet");

   QUnit.test("EncounterSet properties Dol Guldur Orcs", function(assert)
   {
      var cardKey = EncounterSet.DOL_GULDUR_ORCS;
      var properties = EncounterSet.properties[cardKey];
      assert.equal(properties.name, "Dol Guldur Orcs");
      assert.equal(properties.key, "dolGuldurOrcs");
   });

   QUnit.test("keys and values", function(assert)
   {
      // Setup.

      // Run.
      var result = EncounterSet.keys();
      var ownPropertyNames = Object.getOwnPropertyNames(EncounterSet);

      // Verify.
      ownPropertyNames.forEach(function(key)
      {
         var key2 = EncounterSet[key];

         if (key !== "properties" && typeof key2 === "string")
         {
            assert.ok(EncounterSet.properties[key2], "Missing value for key = " + key);
         }
      });

      result.forEach(function(value)
      {
         var p = ownPropertyNames.filter(function(key)
         {
            return EncounterSet[key] === value;
         });

         assert.equal(p.length, 1, "Missing key for value = " + value);
      });
   });

   QUnit.test("EncounterSet.keys()", function(assert)
   {
      // Run.
      var result = EncounterSet.keys();

      // Verify.
      assert.ok(result);
      assert.equal(result.length, 11);
      var i = 0;
      assert.equal(result[i++], EncounterSet.A_JOURNEY_TO_RHOSGOBEL);
      assert.equal(result[i++], EncounterSet.CONFLICT_AT_THE_CARROCK);
      assert.equal(result[i++], EncounterSet.DOL_GULDUR_ORCS);
      assert.equal(result[i++], EncounterSet.ESCAPE_FROM_DOL_GULDUR);
      assert.equal(result[i++], EncounterSet.JOURNEY_ALONG_THE_ANDUIN);
      assert.equal(result[i++], EncounterSet.PASSAGE_THROUGH_MIRKWOOD);
      assert.equal(result[i++], EncounterSet.SAURONS_REACH);
      assert.equal(result[i++], EncounterSet.SPIDERS_OF_MIRKWOOD);
      assert.equal(result[i++], EncounterSet.THE_HILLS_OF_EMYN_MUIL);
      assert.equal(result[i++], EncounterSet.THE_HUNT_FOR_GOLLUM);
      assert.equal(result[i++], EncounterSet.WILDERLANDS);
   });
});
