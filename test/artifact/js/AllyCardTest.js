import AllyCard from "../../../src/artifact/js/AllyCard.js";

QUnit.module("AllyCard");

var AllyCardTest = {};

QUnit.test("AllyCard properties Daughter of the Nimrodel", function(assert)
{
   var cardKey = AllyCard.DAUGHTER_OF_THE_NIMRODEL;
   var properties = AllyCard.properties[cardKey];
   assert.equal(properties.name, "Daughter of the Nimrodel");
   assert.equal(properties.key, "daughterOfTheNimrodel");
});

QUnit.test("keys and values", function(assert)
{
   // Setup.

   // Run.
   var result = AllyCard.keys();
   var ownPropertyNames = Object.getOwnPropertyNames(AllyCard);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      var key2 = AllyCard[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(AllyCard.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      var p = ownPropertyNames.filter(function(key)
      {
         return AllyCard[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
});

QUnit.test("traits", function(assert)
{
   AllyCard.keys().forEach(function(cardKey)
   {
      var card = AllyCard.properties[cardKey];
      card.traitKeys.forEach(function(traitKey)
      {
         assert.ok(traitKey, "Missing traitKey for cardKey = " + cardKey);
      });
   });
});

QUnit.test("AllyCard.keys()", function(assert)
{
   // Run.
   var result = AllyCard.keys();

   // Verify.
   assert.ok(result);
   var length = 159;
   assert.equal(result.length, length);
   assert.equal(result[0], AllyCard.ANBORN_TBOG);
   assert.equal(result[length - 1], AllyCard.ZIGIL_MINER);
});

export default AllyCardTest;