import AttachmentCard from "../../../src/artifact/js/AttachmentCard.js";

QUnit.module("AttachmentCard");

var AttachmentCardTest = {};

QUnit.test("AttachmentCard properties Celebrían's Stone", function(assert)
{
   var cardKey = AttachmentCard.CELEBRIANS_STONE;
   var properties = AttachmentCard.properties[cardKey];
   assert.equal(properties.name, "Celebrían's Stone");
   assert.equal(properties.key, "celebriansStone");
});

QUnit.test("keys and values", function(assert)
{
   // Setup.

   // Run.
   var result = AttachmentCard.keys();
   var ownPropertyNames = Object.getOwnPropertyNames(AttachmentCard);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      var key2 = AttachmentCard[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(AttachmentCard.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      var p = ownPropertyNames.filter(function(key)
      {
         return AttachmentCard[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
});

QUnit.test("traits", function(assert)
{
   AttachmentCard.keys().forEach(function(cardKey)
   {
      var card = AttachmentCard.properties[cardKey];
      card.traitKeys.forEach(function(traitKey)
      {
         assert.ok(traitKey, "Missing traitKey for cardKey = " + cardKey);
      });
   });
});

QUnit.test("AttachmentCard.keys()", function(assert)
{
   // Run.
   var result = AttachmentCard.keys();

   // Verify.
   assert.ok(result);
   var length = 131;
   assert.equal(result.length, length);
   assert.equal(result[0], AttachmentCard.A_BURNING_BRAND);
   assert.equal(result[length - 1], AttachmentCard.WIZARD_PIPE);
});

export default AttachmentCardTest;