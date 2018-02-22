import CardType from "../../../src/artifact/js/CardType.js";

QUnit.module("CardType");

var CardTypeTest = {};

QUnit.test("CardType properties Leadership", function(assert)
{
   var cardType = CardType.ATTACHMENT;
   var properties = CardType.properties[cardType];
   assert.equal(properties.name, "Attachment");
   assert.equal(properties.key, "attachment");
});

QUnit.test("keys and values", function(assert)
{
   // Setup.

   // Run.
   var result = CardType.keys();
   var ownPropertyNames = Object.getOwnPropertyNames(CardType);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      var key2 = CardType[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(CardType.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      var p = ownPropertyNames.filter(function(key)
      {
         return CardType[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
});

QUnit.test("CardType.isEncounterType()", function(assert)
{
   // Run / Verify.
   assert.equal(CardType.isEncounterType(CardType.ALLY), false);
   assert.equal(CardType.isEncounterType(CardType.ATTACHMENT), false);
   assert.equal(CardType.isEncounterType(CardType.ENEMY), true);
   assert.equal(CardType.isEncounterType(CardType.EVENT), false);
   assert.equal(CardType.isEncounterType(CardType.HERO), false);
   assert.equal(CardType.isEncounterType(CardType.LOCATION), true);
   assert.equal(CardType.isEncounterType(CardType.OBJECTIVE), true);
   assert.equal(CardType.isEncounterType(CardType.QUEST), false);
   assert.equal(CardType.isEncounterType(CardType.TREACHERY), true);
});

QUnit.test("CardType.isPlayerType()", function(assert)
{
   // Run / Verify.
   assert.equal(CardType.isPlayerType(CardType.ALLY), true);
   assert.equal(CardType.isPlayerType(CardType.ATTACHMENT), true);
   assert.equal(CardType.isPlayerType(CardType.ENEMY), false);
   assert.equal(CardType.isPlayerType(CardType.EVENT), true);
   assert.equal(CardType.isPlayerType(CardType.HERO), true);
   assert.equal(CardType.isPlayerType(CardType.LOCATION), false);
   assert.equal(CardType.isPlayerType(CardType.OBJECTIVE), false);
   assert.equal(CardType.isPlayerType(CardType.QUEST), false);
   assert.equal(CardType.isPlayerType(CardType.TREACHERY), false);
});

QUnit.test("CardType.isQuestType()", function(assert)
{
   // Run / Verify.
   assert.equal(CardType.isQuestType(CardType.ALLY), false);
   assert.equal(CardType.isQuestType(CardType.ATTACHMENT), false);
   assert.equal(CardType.isQuestType(CardType.ENEMY), false);
   assert.equal(CardType.isQuestType(CardType.EVENT), false);
   assert.equal(CardType.isQuestType(CardType.HERO), false);
   assert.equal(CardType.isQuestType(CardType.LOCATION), false);
   assert.equal(CardType.isQuestType(CardType.OBJECTIVE), false);
   assert.equal(CardType.isQuestType(CardType.QUEST), true);
   assert.equal(CardType.isQuestType(CardType.TREACHERY), false);
});

QUnit.test("CardType.keys()", function(assert)
{
   // Run.
   var result = CardType.keys();

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 9);
   var i = 0;
   assert.equal(result[i++], CardType.ALLY);
   assert.equal(result[i++], CardType.ATTACHMENT);
   assert.equal(result[i++], CardType.ENEMY);
   assert.equal(result[i++], CardType.EVENT);
   assert.equal(result[i++], CardType.HERO);
   assert.equal(result[i++], CardType.LOCATION);
   assert.equal(result[i++], CardType.OBJECTIVE);
   assert.equal(result[i++], CardType.QUEST);
   assert.equal(result[i++], CardType.TREACHERY);
});

export default CardTypeTest;