import Phase from "../../../src/artifact/js/Phase.js";

QUnit.module("Phase");

QUnit.test("Phase properties Planning (start)", function(assert)
{
   var phase = Phase.PLANNING_START;
   var properties = Phase.properties[phase];
   assert.equal(properties.name, "Planning (start)");
   assert.equal(properties.key, "planningStart");
});

QUnit.test("Phase properties Resource (start)", function(assert)
{
   var phase = Phase.RESOURCE_START;
   var properties = Phase.properties[phase];
   assert.equal(properties.name, "Resource (start)");
   assert.equal(properties.key, "resourceStart");
});

QUnit.test("keys and values", function(assert)
{
   // Setup.

   // Run.
   var result = Phase.keys();
   var ownPropertyNames = Object.getOwnPropertyNames(Phase);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      var key2 = Phase[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(Phase.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      var p = ownPropertyNames.filter(function(key)
      {
         return Phase[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
});

QUnit.test("Phase.keys()", function(assert)
{
   // Run.
   var result = Phase.keys();

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 36);
   var i = 0;
   assert.equal(result[i++], Phase.SETUP);
   assert.equal(result[i++], Phase.RESOURCE_START);
   assert.equal(result[i++], Phase.RESOURCE_END);
   assert.equal(result[i++], Phase.PLANNING_START);
   assert.equal(result[i++], Phase.PLANNING_END);
   assert.equal(result[i++], Phase.QUEST_START);
   assert.equal(result[i++], Phase.QUEST_COMMIT_CHARACTERS_START);
   assert.equal(result[i++], Phase.QUEST_COMMIT_CHARACTERS_END);
   assert.equal(result[i++], Phase.QUEST_REVEAL_ENCOUNTER_CARDS);
   assert.equal(result[i++], Phase.QUEST_RESOLVE);
   assert.equal(result[i++], Phase.QUEST_END);
   assert.equal(result[i++], Phase.TRAVEL_START);
   assert.equal(result[i++], Phase.TRAVEL_END);
   assert.equal(result[i++], Phase.ENCOUNTER_START);
   assert.equal(result[i++], Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_START);
   assert.equal(result[i++], Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END);
   assert.equal(result[i++], Phase.ENCOUNTER_ENGAGEMENT_CHECK_START);
   assert.equal(result[i++], Phase.ENCOUNTER_ENGAGEMENT_CHECK_END);
   assert.equal(result[i++], Phase.ENCOUNTER_END);
   assert.equal(result[i++], Phase.COMBAT_START);
   assert.equal(result[i++], Phase.COMBAT_DEAL_SHADOW_CARDS_START);
   assert.equal(result[i++], Phase.COMBAT_DEAL_SHADOW_CARDS_END);
   assert.equal(result[i++], Phase.COMBAT_DEFEND_START);
   assert.equal(result[i++], Phase.COMBAT_DEFEND_DECLARE_ATTACKER);
   assert.equal(result[i++], Phase.COMBAT_DEFEND_EXHAUST_DEFENDER);
   assert.equal(result[i++], Phase.COMBAT_DEFEND_RESOLVE_SHADOW_EFFECT);
   assert.equal(result[i++], Phase.COMBAT_DEFEND_DETERMINE_DAMAGE);
   assert.equal(result[i++], Phase.COMBAT_DEFEND_END);
   assert.equal(result[i++], Phase.COMBAT_ATTACK_START);
   assert.equal(result[i++], Phase.COMBAT_ATTACK_DECLARE_DEFENDER);
   assert.equal(result[i++], Phase.COMBAT_ATTACK_EXHAUST_ATTACKERS);
   assert.equal(result[i++], Phase.COMBAT_ATTACK_DETERMINE_DAMAGE);
   assert.equal(result[i++], Phase.COMBAT_ATTACK_END);
   assert.equal(result[i++], Phase.COMBAT_END);
   assert.equal(result[i++], Phase.REFRESH_START);
   assert.equal(result[i++], Phase.REFRESH_END);
});

var PhaseTest = {};
export default PhaseTest;