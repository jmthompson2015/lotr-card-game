import GameEvent from "../../../src/artifact/js/GameEvent.js";
import HeroCard from "../../../src/artifact/js/HeroCard.js";
import HeroAbility from "../../../src/model/js/HeroAbility.js";
import Interpreter from "../../../src/accessory/rule-generator/Interpreter.js";
import Parser from "../../../src/accessory/rule-generator/Parser.js";

QUnit.module("Interpreter");

var InterpreterTest = {};

const cardAragorn = {
   "pack_code": "Core",
   "pack_name": "Core Set",
   "type_code": "hero",
   "name": "Aragorn",
   "text": "Sentinel.\n<b>Response:</b> After Aragorn commits to a quest, spend 1 resource from his resource pool to ready him.",
};

const partsAragorn = Parser.parse(cardAragorn);

const cardGloin = {
   "pack_code": "Core",
   "pack_name": "Core Set",
   "type_code": "hero",
   "name": "Glóin",
   "text": "<b>Response:</b> After Glóin suffers damage, add 1 resource to his resource pool for each point of damage he just suffered.",
};

const partsGloin = Parser.parse(cardGloin);

QUnit.test("interpret() Hero Aragorn", function(assert)
{
   // Setup.

   // Run.
   const result = Interpreter.interpret(cardAragorn, partsAragorn);

   // Verify.
   assert.ok(result);
   assert.equal(result.abilityClassName, "HeroAbility", "result.abilityClassName");
   assert.equal(result.eventOrPhaseKeyName, "GameEvent.QUEST_COMMITTED", "result.eventOrPhaseKeyName");
   assert.equal(result.cardKey, "aragornCore", "result.cardKey");
   assert.equal(result.cardKeyName, "HeroCard.ARAGORN_CORE", "result.cardKeyName");
   // assert.equal(result.condition, "");
   // assert.equal(result.consequent, "");
});

QUnit.test("determineAbilityClass() Hero Aragorn", function(assert)
{
   // Setup.

   // Run.
   const result = Interpreter.determineAbilityClass(cardAragorn);

   // Verify.
   assert.ok(result);
   assert.equal(result.abilityClass, HeroAbility, "result.abilityClass");
   assert.equal(result.abilityClassName, "HeroAbility", "result.abilityClassName");
});

QUnit.test("determineCardClass() Hero Aragorn", function(assert)
{
   // Setup.

   // Run.
   const result = Interpreter.determineCardClass(cardAragorn);

   // Verify.
   assert.ok(result);
   assert.equal(result.cardClass, HeroCard, "result.cardClass");
   assert.equal(result.cardClassName, "HeroCard", "result.cardClassName");
});

QUnit.test("determineCardKey() Hero Aragorn", function(assert)
{
   // Setup.

   // Run.
   const result = Interpreter.determineCardKey(cardAragorn, HeroCard);

   // Verify.
   assert.ok(result);
   assert.equal(result.cardKey, "aragornCore", "result.cardKey");
   assert.equal(result.cardKeyName, "HeroCard.ARAGORN_CORE", "result.cardKeyName");
});

QUnit.test("determineCardKey() Hero Glóin", function(assert)
{
   // Setup.

   // Run.
   const result = Interpreter.determineCardKey(cardGloin, HeroCard);

   // Verify.
   assert.ok(result);
   assert.equal(result.cardKey, "gloinCore", "result.cardKey");
   assert.equal(result.cardKeyName, "HeroCard.GLOIN_CORE", "result.cardKeyName");
});

QUnit.test("determineEventOrPhaseKey() Hero Aragorn", function(assert)
{
   // Setup.

   // Run.
   const result = Interpreter.determineEventOrPhaseKey(cardAragorn, partsAragorn);

   // Verify.
   assert.ok(result);
   assert.equal(result.eventOrPhaseKey, GameEvent.QUEST_COMMITTED);
   assert.equal(result.eventOrPhaseKeyName, "GameEvent.QUEST_COMMITTED");
});

QUnit.test("determineEventOrPhaseKey() Hero Glóin", function(assert)
{
   // Setup.

   // Run.
   const result = Interpreter.determineEventOrPhaseKey(cardGloin, partsGloin);

   // Verify.
   assert.ok(result);
   assert.equal(result.eventOrPhaseKey, GameEvent.WOUNDED);
   assert.equal(result.eventOrPhaseKeyName, "GameEvent.WOUNDED");
});

QUnit.test("print()", function(assert)
{
   // Setup.
   const interpretation = Interpreter.interpret(cardAragorn, partsAragorn);

   // Run.
   const result = Interpreter.print(interpretation);

   // Verify.
   assert.ok(result);
   assert.equal(result, "{\n" +
      "  \"cardClassName\": \"HeroCard\",\n" +
      "  \"abilityClassName\": \"HeroAbility\",\n" +
      "  \"eventOrPhaseKeyName\": \"GameEvent.QUEST_COMMITTED\",\n" +
      "  \"cardKey\": \"aragornCore\",\n" +
      "  \"cardKeyName\": \"HeroCard.ARAGORN_CORE\"\n" +
      "}");
});

export default InterpreterTest;