import Scenario from "../../../src/artifact/js/Scenario.js";

QUnit.module("Scenario");

QUnit.test("Scenario properties Passage Through Mirkwood", function(assert)
{
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var properties = Scenario.properties[scenarioKey];
   assert.equal(properties.name, "Passage Through Mirkwood");
   assert.equal(properties.key, "passageThroughMirkwood");
});

QUnit.test("keys and values", function(assert)
{
   // Setup.

   // Run.
   var result = Scenario.keys();
   var ownPropertyNames = Object.getOwnPropertyNames(Scenario);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      var key2 = Scenario[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(Scenario.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      var p = ownPropertyNames.filter(function(key)
      {
         return Scenario[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
});

QUnit.test("Scenario.keys()", function(assert)
{
   // Run.
   var result = Scenario.keys();

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 9);
   var i = 0;
   assert.equal(result[i++], Scenario.A_JOURNEY_TO_RHOSGOBEL);
   assert.equal(result[i++], Scenario.CONFLICT_AT_THE_CARROCK);
   assert.equal(result[i++], Scenario.ESCAPE_FROM_DOL_GULDUR);
   assert.equal(result[i++], Scenario.JOURNEY_ALONG_THE_ANDUIN);
   assert.equal(result[i++], Scenario.PASSAGE_THROUGH_MIRKWOOD);
   assert.equal(result[i++], Scenario.RETURN_TO_MIRKWOOD);
   assert.equal(result[i++], Scenario.THE_DEAD_MARSHES);
   assert.equal(result[i++], Scenario.THE_HILLS_OF_EMYN_MUIL);
   assert.equal(result[i++], Scenario.THE_HUNT_FOR_GOLLUM);
});

var ScenarioTest = {};
export default ScenarioTest;