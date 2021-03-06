import EventCard from "../../../src/artifact/js/EventCard.js";

QUnit.module("EventCard");

var EventCardTest = {};

QUnit.test("EventCard properties Sneak Attack", function(assert)
{
   var cardKey = EventCard.SNEAK_ATTACK;
   var properties = EventCard.properties[cardKey];
   assert.equal(properties.name, "Sneak Attack");
   assert.equal(properties.key, "sneakAttack");
});

QUnit.test("keys and values", function(assert)
{
   // Setup.

   // Run.
   var result = EventCard.keys();
   var ownPropertyNames = Object.getOwnPropertyNames(EventCard);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      var key2 = EventCard[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(EventCard.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      var p = ownPropertyNames.filter(function(key)
      {
         return EventCard[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
});

QUnit.test("EventCard.keys()", function(assert)
{
   // Run.
   var result = EventCard.keys();

   // Verify.
   assert.ok(result);
   var length = 149;
   assert.equal(result.length, length);
   assert.equal(result[0], EventCard.A_ELBERETH_GILTHONIEL);
   assert.equal(result[length - 1], EventCard.WORD_OF_COMMAND);
});

export default EventCardTest;