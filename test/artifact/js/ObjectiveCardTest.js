import EncounterSet from "../../../src/artifact/js/EncounterSet.js";
import ObjectiveCard from "../../../src/artifact/js/ObjectiveCard.js";

QUnit.module("ObjectiveCard");

QUnit.test("ObjectiveCard properties Signs of Gollum", function(assert)
{
   var cardKey = ObjectiveCard.SIGNS_OF_GOLLUM;
   var properties = ObjectiveCard.properties[cardKey];
   assert.equal(properties.name, "Signs of Gollum");
   assert.equal(properties.encounterSetKey, EncounterSet.THE_HUNT_FOR_GOLLUM);
   assert.equal(properties.key, "signsOfGollum");
});

QUnit.test("keys and values", function(assert)
{
   // Setup.

   // Run.
   var result = ObjectiveCard.keys();
   var ownPropertyNames = Object.getOwnPropertyNames(ObjectiveCard);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      var key2 = ObjectiveCard[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(ObjectiveCard.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      var p = ownPropertyNames.filter(function(key)
      {
         return ObjectiveCard[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
});

QUnit.test("traits", function(assert)
{
   ObjectiveCard.keys().forEach(function(cardKey)
   {
      var card = ObjectiveCard.properties[cardKey];
      card.traitKeys.forEach(function(traitKey)
      {
         assert.ok(traitKey, "Missing traitKey for cardKey = " + cardKey);
      });
   });
});

QUnit.test("ObjectiveCard.keys()", function(assert)
{
   // Run.
   var result = ObjectiveCard.keys();

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 9);
   var i = 0;
   assert.equal(result[i++], ObjectiveCard.ATHELAS);
   assert.equal(result[i++], ObjectiveCard.DUNGEON_TORCH);
   assert.equal(result[i++], ObjectiveCard.GANDALFS_MAP);
   assert.equal(result[i++], ObjectiveCard.GOLLUM_RTM);
   assert.equal(result[i++], ObjectiveCard.GOLLUM_TDM);
   assert.equal(result[i++], ObjectiveCard.GRIMBEORN_THE_OLD);
   assert.equal(result[i++], ObjectiveCard.SHADOW_KEY);
   assert.equal(result[i++], ObjectiveCard.SIGNS_OF_GOLLUM);
   assert.equal(result[i++], ObjectiveCard.WILYADOR);
});

var ObjectiveCardTest = {};
export default ObjectiveCardTest;