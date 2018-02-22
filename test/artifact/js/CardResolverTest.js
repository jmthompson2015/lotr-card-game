import AllyCard from "../../../src/artifact/js/AllyCard.js";
import AttachmentCard from "../../../src/artifact/js/AttachmentCard.js";
import CardResolver from "../../../src/artifact/js/CardResolver.js";
import CardType from "../../../src/artifact/js/CardType.js";
import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import EventCard from "../../../src/artifact/js/EventCard.js";
import HeroCard from "../../../src/artifact/js/HeroCard.js";
import LocationCard from "../../../src/artifact/js/LocationCard.js";
import ObjectiveCard from "../../../src/artifact/js/ObjectiveCard.js";
import QuestCard from "../../../src/artifact/js/QuestCard.js";
import TreacheryCard from "../../../src/artifact/js/TreacheryCard.js";

QUnit.module("CardResolver");

var CardResolverTest = {};

QUnit.test("card() AllyCard", function(assert)
{
   // Setup.
   var cardTypeKey = CardType.ALLY;
   var cardKey = AllyCard.ANFALAS_HERDSMAN;

   // Run.
   var result = CardResolver.get(cardTypeKey, cardKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, cardKey);
   assert.equal(result.name, "Anfalas Herdsman");
});

QUnit.test("card() AttachmentCard", function(assert)
{
   // Setup.
   var cardTypeKey = CardType.ATTACHMENT;
   var cardKey = AttachmentCard.A_BURNING_BRAND;

   // Run.
   var result = CardResolver.get(cardTypeKey, cardKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, cardKey);
});

QUnit.test("card() EnemyCard", function(assert)
{
   // Setup.
   var cardTypeKey = CardType.ENEMY;
   var cardKey = EnemyCard.BLACK_FOREST_BATS_PTM;

   // Run.
   var result = CardResolver.get(cardTypeKey, cardKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, cardKey);
});

QUnit.test("card() EventCard", function(assert)
{
   // Setup.
   var cardTypeKey = CardType.EVENT;
   var cardKey = EventCard.A_ELBERETH_GILTHONIEL;

   // Run.
   var result = CardResolver.get(cardTypeKey, cardKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, cardKey);
});

QUnit.test("card() HeroCard", function(assert)
{
   // Setup.
   var cardTypeKey = CardType.HERO;
   var cardKey = HeroCard.ARAGORN_CORE;

   // Run.
   var result = CardResolver.get(cardTypeKey, cardKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, cardKey);
   assert.equal(result.name, "Aragorn");
   assert.equal(result.threatCost, 12);
   assert.equal(result.willpower, 2);
   assert.equal(result.attack, 3);
   assert.equal(result.defense, 2);
   assert.equal(result.hitPoints, 5);
});

QUnit.test("card() LocationCard", function(assert)
{
   // Setup.
   var cardTypeKey = CardType.LOCATION;
   var cardKey = LocationCard.BANKS_OF_THE_ANDUIN;

   // Run.
   var result = CardResolver.get(cardTypeKey, cardKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, cardKey);
});

QUnit.test("card() ObjectiveCard", function(assert)
{
   // Setup.
   var cardTypeKey = CardType.OBJECTIVE;
   var cardKey = ObjectiveCard.SIGNS_OF_GOLLUM;

   // Run.
   var result = CardResolver.get(cardTypeKey, cardKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, cardKey);
});

QUnit.test("card() QuestCard", function(assert)
{
   // Setup.
   var cardTypeKey = CardType.QUEST;
   var cardKey = QuestCard.PTM1A_FLIES_AND_SPIDERS;

   // Run.
   var result = CardResolver.get(cardTypeKey, cardKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, cardKey);
});

QUnit.test("card() TreacheryCard", function(assert)
{
   // Setup.
   var cardTypeKey = CardType.TREACHERY;
   var cardKey = TreacheryCard.CAUGHT_IN_A_WEB;

   // Run.
   var result = CardResolver.get(cardTypeKey, cardKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, cardKey);
});

export default CardResolverTest;