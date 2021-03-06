import CardSet from "../../../src/artifact/js/CardSet.js";
import CardSetType from "../../../src/artifact/js/CardSetType.js";

QUnit.module("CardSet");

var CardSetTest = {};

QUnit.test("CardSet properties Core", function(assert)
{
   var cardSet = CardSet.CORE;
   var properties = CardSet.properties[cardSet];
   assert.equal(properties.name, "Core Set");
   assert.equal(properties.typeKey, CardSetType.CORE);
   assert.equal(properties.key, "core");
});

QUnit.test("keys and values", function(assert)
{
   // Setup.

   // Run.
   var result = CardSet.keys();
   var ownPropertyNames = Object.getOwnPropertyNames(CardSet);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      var key2 = CardSet[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(CardSet.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      var p = ownPropertyNames.filter(function(key)
      {
         return CardSet[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
});

QUnit.test("CardSet.keys()", function(assert)
{
   // Run.
   var result = CardSet.keys();

   // Verify.
   assert.ok(result);
   var length = 22;
   assert.equal(result.length, length);
   var i = 0;
   // Main line.
   assert.equal(result[i++], CardSet.CORE);
   assert.equal(result[i++], CardSet.SHADOWS_OF_MIRKWOOD);
   assert.equal(result[i++], CardSet.KHAZAD_DUM);
   assert.equal(result[i++], CardSet.DWARROWDELF);
   assert.equal(result[i++], CardSet.HEIRS_OF_NUMENOR);
   assert.equal(result[i++], CardSet.AGAINST_THE_SHADOW);
   assert.equal(result[i++], CardSet.THE_VOICE_OF_ISENGARD);
   assert.equal(result[i++], CardSet.THE_RING_MAKER);
   assert.equal(result[i++], CardSet.THE_LOST_REALM);
   assert.equal(result[i++], CardSet.ANGMAR_AWAKENED);
   assert.equal(result[i++], CardSet.THE_GREY_HAVENS);
   assert.equal(result[i++], CardSet.DREAM_CHASER);
   assert.equal(result[i++], CardSet.THE_SANDS_OF_HARAD);
   assert.equal(result[i++], CardSet.HARADRIM);
   // Saga.
   assert.equal(result[i++], CardSet.OVER_HILL_AND_UNDER_HILL);
   assert.equal(result[i++], CardSet.ON_THE_DOORSTEP);
   assert.equal(result[i++], CardSet.THE_BLACK_RIDERS);
   assert.equal(result[i++], CardSet.THE_ROAD_DARKENS);
   assert.equal(result[i++], CardSet.THE_TREASON_OF_SARUMAN);
   assert.equal(result[i++], CardSet.THE_LAND_OF_SHADOW);
   assert.equal(result[i++], CardSet.THE_FLAME_OF_THE_WEST);
   assert.equal(result[i++], CardSet.THE_MOUNTAIN_OF_FIRE);
});

export default CardSetTest;