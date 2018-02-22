import GameEvent from "../../../src/artifact/js/GameEvent.js";
import QuestCard from "../../../src/artifact/js/QuestCard.js";
import Ability from "../../../src/model/js/Ability.js";
import QuestAbility from "../../../src/model/js/QuestAbility.js";

QUnit.module("Ability");

QUnit.test("Ability properties", function(assert)
{
   // Setup.
   var source = QuestCard;
   var sourceKey = QuestCard.PTM1A_FLIES_AND_SPIDERS;
   var abilityType = QuestAbility;
   var abilityKey = GameEvent.QUEST_CARD_DRAWN;
   var ability = new Ability(source, sourceKey, abilityType, abilityKey);

   // Run / Verify.
   assert.equal(ability.source(), source);
   assert.equal(ability.sourceKey(), sourceKey);
   assert.equal(ability.abilityType(), abilityType);
   assert.equal(ability.abilityKey(), abilityKey);

   assert.ok(ability.sourceObject());
   assert.ok(ability.ability());
   assert.ok(ability.condition());
   assert.ok(ability.consequent());
});

QUnit.test("isQuest()", function(assert)
{
   // Setup.
   var ability = new Ability(QuestCard, QuestCard.PTM1A_FLIES_AND_SPIDERS, QuestAbility, GameEvent.QUEST_CARD_DRAWN);

   // Run / Verify.
   assert.ok(!ability.isEnemy());
   assert.ok(!ability.isHero());
   assert.ok(ability.isQuest());
});

QUnit.test("toString()", function(assert)
{
   // Setup.
   var ability = new Ability(QuestCard, QuestCard.PTM1A_FLIES_AND_SPIDERS, QuestAbility, GameEvent.QUEST_CARD_DRAWN);

   // Run.
   var result = ability.toString();

   // Verify.
   assert.ok(result);
   assert.equal(result, "Ability source=QuestCard,sourceKey=ptm1aFliesAndSpiders,abilityType=QuestAbility,abilityKey=questCardDrawn,context=undefined");
});

var AbilityTest = {};
export default AbilityTest;