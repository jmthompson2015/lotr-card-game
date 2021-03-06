import EnemyCard from "../../../src/artifact/js/EnemyCard.js";

QUnit.module("EnemyCard");

var EnemyCardTest = {};

QUnit.test("EnemyCard properties Black Forest Bats", function(assert)
{
   var cardKey = EnemyCard.BLACK_FOREST_BATS_PTM;
   var properties = EnemyCard.properties[cardKey];
   assert.equal(properties.name, "Black Forest Bats");
   assert.equal(properties.key, "blackForestBatsPtm");
});

QUnit.test("keys and values", function(assert)
{
   // Setup.

   // Run.
   var result = EnemyCard.keys();
   var ownPropertyNames = Object.getOwnPropertyNames(EnemyCard);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      var key2 = EnemyCard[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(EnemyCard.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      var p = ownPropertyNames.filter(function(key)
      {
         return EnemyCard[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
});

QUnit.test("traits", function(assert)
{
   EnemyCard.keys().forEach(function(cardKey)
   {
      var card = EnemyCard.properties[cardKey];
      card.traitKeys.forEach(function(traitKey)
      {
         assert.ok(traitKey, "Missing traitKey for cardKey = " + cardKey);
      });
   });
});

QUnit.test("EnemyCard.keys()", function(assert)
{
   // Run.
   var result = EnemyCard.keys();

   // Verify.
   assert.ok(result);
   var length = 32;
   assert.equal(result.length, length);
   assert.equal(result[0], EnemyCard.ATTERCOP_ATTERCOP);
   assert.equal(result[length - 1], EnemyCard.WOLF_RIDER);
});

export default EnemyCardTest;