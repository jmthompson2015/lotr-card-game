import AllyCard from "../../../src/artifact/js/AllyCard.js";
import AttachmentCard from "../../../src/artifact/js/AttachmentCard.js";
import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import HeroCard from "../../../src/artifact/js/HeroCard.js";
import LocationCard from "../../../src/artifact/js/LocationCard.js";
import ObjectiveCard from "../../../src/artifact/js/ObjectiveCard.js";
import QuestCard from "../../../src/artifact/js/QuestCard.js";
import Scenario from "../../../src/artifact/js/Scenario.js";
import Sphere from "../../../src/artifact/js/Sphere.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import AgentAction from "../../../src/model/js/AgentAction.js";
import CardAction from "../../../src/model/js/CardAction.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import EventObserver from "../../../src/model/js/EventObserver.js";
import Environment from "../../../src/model/js/Environment.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("CardInstance");

QUnit.test("CardInstance()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardKey = HeroCard.ARAGORN_CORE;
   var card = HeroCard.properties[cardKey];

   // Run.
   var result = new CardInstance(store, card);

   // Verify.
   assert.ok(result);
   assert.equal(result.id(), 1);
   assert.equal(result.card().key, cardKey);
   assert.equal(Object.keys(store.getState().cardInstances).length, 1);
});

QUnit.test("attack() Chieftain Ufthak", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardKey = EnemyCard.CHIEFTAN_UFTHAK;
   var card = EnemyCard.properties[cardKey];
   var cardInstance = new CardInstance(store, card);

   // Run.
   var result = cardInstance.attack();

   // Verify.
   assert.equal(result, 3);

   // Run.
   store.dispatch(CardAction.addResources(cardInstance, 1));
   result = cardInstance.attack();

   // Verify.
   assert.equal(result, 5);
});

QUnit.test("bonusAttack() Chieftain Ufthak", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardKey = EnemyCard.CHIEFTAN_UFTHAK;
   var card = EnemyCard.properties[cardKey];
   var cardInstance = new CardInstance(store, card);

   // Run.
   var result = cardInstance.bonusAttack();

   // Verify.
   assert.equal(result, 0);

   // Run.
   store.dispatch(CardAction.addResources(cardInstance, 1));
   result = cardInstance.bonusAttack();

   // Verify.
   assert.equal(result, 2);
});

QUnit.test("bonusAttack() Gimli", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardKey = HeroCard.GIMLI;
   var card = HeroCard.properties[cardKey];
   var cardInstance = new CardInstance(store, card);

   // Run.
   var result = cardInstance.bonusAttack();

   // Verify.
   assert.equal(result, 0);

   // Run.
   store.dispatch(CardAction.addWounds(cardInstance, 1));
   result = cardInstance.bonusAttack();

   // Verify.
   assert.equal(result, 1);
});

QUnit.test("bonusAttack() Gimli + Dwarven Axe", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent4 = environment.agentQueue()[3];
   var cardInstance = new CardInstance(store, HeroCard.properties[HeroCard.GIMLI]);
   agent4.drawPlayerCard(AttachmentCard.DWARVEN_AXE);
   var attachmentInstance = agent4.hand()[agent4.hand().length - 1];
   store.dispatch(AgentAction.playCard(agent4, attachmentInstance));
   store.dispatch(AgentAction.attachCard(agent4, cardInstance, attachmentInstance));

   // Run.
   var result = cardInstance.bonusAttack();

   // Verify.
   assert.equal(result, 2);

   // Run.
   store.dispatch(CardAction.addWounds(cardInstance, 1));
   result = cardInstance.bonusAttack();

   // Verify.
   assert.equal(result, 3);
});

QUnit.test("bonusDefense() Gimli + Dwarven Axe", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent4 = environment.agentQueue()[3];
   var cardInstance = new CardInstance(store, HeroCard.properties[HeroCard.GIMLI]);
   agent4.drawPlayerCard(AttachmentCard.DWARVEN_AXE);
   var attachmentInstance = agent4.hand()[agent4.hand().length - 1];
   store.dispatch(AgentAction.playCard(agent4, attachmentInstance));
   store.dispatch(AgentAction.attachCard(agent4, cardInstance, attachmentInstance));

   // Run.
   var result = cardInstance.bonusDefense();

   // Verify.
   assert.equal(result, 0);
});

QUnit.test("bonusHitPoints() Gimli + Dwarven Axe", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent4 = environment.agentQueue()[3];
   var cardInstance = new CardInstance(store, HeroCard.properties[HeroCard.GIMLI]);
   agent4.drawPlayerCard(AttachmentCard.DWARVEN_AXE);
   var attachmentInstance = agent4.hand()[agent4.hand().length - 1];
   store.dispatch(AgentAction.playCard(agent4, attachmentInstance));
   store.dispatch(AgentAction.attachCard(agent4, cardInstance, attachmentInstance));

   // Run.
   var result = cardInstance.bonusHitPoints();

   // Verify.
   assert.equal(result, 0);
});

QUnit.test("bonusWillpower() Gimli + Dwarven Axe", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent4 = environment.agentQueue()[3];
   var cardInstance = new CardInstance(store, HeroCard.properties[HeroCard.GIMLI]);
   agent4.drawPlayerCard(AttachmentCard.DWARVEN_AXE);
   var attachmentInstance = agent4.hand()[agent4.hand().length - 1];
   store.dispatch(AgentAction.playCard(agent4, attachmentInstance));
   store.dispatch(AgentAction.attachCard(agent4, cardInstance, attachmentInstance));

   // Run.
   var result = cardInstance.bonusWillpower();

   // Verify.
   assert.equal(result, 0);
});

QUnit.test("get()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardKey = HeroCard.ARAGORN_CORE;
   var card = HeroCard.properties[cardKey];
   var cardInstance = new CardInstance(store, card);
   assert.equal(Object.keys(store.getState().cardInstances).length, 1);

   // Run.
   var result = CardInstance.get(store, cardInstance.id());

   // Verify.
   assert.ok(result);
   assert.equal(result.id(), 1);
   assert.equal(result.card().key, cardKey);
   assert.equal(Object.keys(store.getState().cardInstances).length, 1);
});

QUnit.test("hasAttachment() Gimli + Dwarven Axe", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent4 = environment.agentQueue()[3];
   var cardInstance = new CardInstance(store, HeroCard.properties[HeroCard.GIMLI]);

   // Run.
   var result = cardInstance.hasAttachment(AttachmentCard.DWARVEN_AXE);

   // Verify.
   assert.equal(result, false);

   // Run.
   agent4.drawPlayerCard(AttachmentCard.DWARVEN_AXE);
   var attachmentInstance = agent4.hand()[agent4.hand().length - 1];
   store.dispatch(AgentAction.playCard(agent4, attachmentInstance));
   store.dispatch(AgentAction.attachCard(agent4, cardInstance, attachmentInstance));
   result = cardInstance.hasAttachment(AttachmentCard.DWARVEN_AXE);

   // Verify.
   assert.equal(result, true);
});

QUnit.test("isEncounterType", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance0 = new CardInstance(store, EnemyCard.properties[EnemyCard.BLACK_FOREST_BATS_PTM]);
   var cardInstance1 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
   var cardInstance2 = new CardInstance(store, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);

   // Run / Verify.
   assert.equal(cardInstance0.isEncounterType(), true);
   assert.equal(cardInstance1.isEncounterType(), false);
   assert.equal(cardInstance2.isEncounterType(), false);
});

QUnit.test("isPlayerType()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance0 = new CardInstance(store, EnemyCard.properties[EnemyCard.BLACK_FOREST_BATS_PTM]);
   var cardInstance1 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
   var cardInstance2 = new CardInstance(store, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);

   // Run / Verify.
   assert.equal(cardInstance0.isPlayerType(), false);
   assert.equal(cardInstance1.isPlayerType(), true);
   assert.equal(cardInstance2.isPlayerType(), false);
});

QUnit.test("isQuestType", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance0 = new CardInstance(store, EnemyCard.properties[EnemyCard.BLACK_FOREST_BATS_PTM]);
   var cardInstance1 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
   var cardInstance2 = new CardInstance(store, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);

   // Run / Verify.
   assert.equal(cardInstance0.isQuestType(), false);
   assert.equal(cardInstance1.isQuestType(), false);
   assert.equal(cardInstance2.isQuestType(), true);
});

QUnit.test("shadowCards()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
   var cardKey = HeroCard.ARAGORN_CORE;
   var card = HeroCard.properties[cardKey];
   var cardInstance = new CardInstance(store, card);

   // Run.
   var result = cardInstance.shadowCards();

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 0);

   store.dispatch(Action.dealShadowCard(cardInstance));

   // Run.
   result = cardInstance.shadowCards();

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 1);
});

QUnit.test("sphereKeys() Aragorn", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);

   // Run.
   var result = cardInstance.sphereKeys();

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 1);
   assert.equal(result[0], Sphere.LEADERSHIP);
});

QUnit.test("sphereKeys() Aragorn with Celebrian's Stone", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent1 = environment.agentQueue()[0];
   var cardInstance = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
   agent1.drawPlayerCard(AttachmentCard.CELEBRIANS_STONE);
   var attachmentInstance = agent1.hand()[agent1.hand().length - 1];
   store.dispatch(AgentAction.playCard(agent1, attachmentInstance));
   store.dispatch(AgentAction.attachCard(agent1, cardInstance, attachmentInstance));

   // Run.
   var result = cardInstance.sphereKeys();

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 2);
   assert.equal(result[0], Sphere.LEADERSHIP);
   assert.equal(result[1], Sphere.SPIRIT);
});

QUnit.test("sphereKeys() Gimli with Celebrian's Stone", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent1 = environment.agentQueue()[0];
   var cardInstance = new CardInstance(store, HeroCard.properties[HeroCard.GIMLI]);
   agent1.drawPlayerCard(AttachmentCard.CELEBRIANS_STONE);
   var attachmentInstance = agent1.hand()[agent1.hand().length - 1];
   store.dispatch(AgentAction.playCard(agent1, attachmentInstance));
   store.dispatch(AgentAction.attachCard(agent1, cardInstance, attachmentInstance));

   // Run.
   var result = cardInstance.sphereKeys();

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 1);
   assert.equal(result[0], Sphere.TACTICS);
});

QUnit.test("threat() The Hunt for Gollum", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.THE_HUNT_FOR_GOLLUM;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent1 = environment.firstAgent();
   agent1.drawPlayerCard(AllyCard.FARAMIR);
   var cardInstance = agent1.hand()[agent1.hand().length - 1];
   store.dispatch(AgentAction.playCard(agent1, cardInstance));
   assert.equal(environment.cardsInPlay().length, 14);
   var cardInstance0 = environment.firstCardInstance(LocationCard.THE_OLD_FORD);

   // Run.
   assert.ok(cardInstance0);
   assert.equal(cardInstance0.threat(), 1);
});

QUnit.test("threat() A Journey to Rhosgobel", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.A_JOURNEY_TO_RHOSGOBEL;
   var environment = createEnvironment(scenarioKey);
   environment.drawEncounterCard(LocationCard.RHOSGOBEL);
   var cardInstance0 = environment.stagingArea()[environment.stagingArea().length - 1];
   environment.drawEncounterCard(ObjectiveCard.ATHELAS);
   var cardInstance1 = environment.stagingArea()[environment.stagingArea().length - 1];

   // Run.
   assert.ok(cardInstance0);
   assert.equal(cardInstance0.threat(), 4);
   assert.ok(cardInstance1);
   assert.equal(cardInstance1.threat(), 0);
});

function createEnvironment(scenarioKey)
{
   var store = Redux.createStore(Reducer.root);
   var scenarioDeckBuilder = ScenarioDeckBuilder.ScenarioDeckBuilder.findByScenario(scenarioKey);
   var scenarioDeck = scenarioDeckBuilder.buildDeck(store);
   var agent1 = new Agent(store, "agent1");
   var agent2 = new Agent(store, "agent2");
   var agent3 = new Agent(store, "agent3");
   var agent4 = new Agent(store, "agent4");
   var playerData = [
      {
         agent: agent1,
         playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    },
      {
         agent: agent2,
         playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
    },
      {
         agent: agent3,
         playerDeck: PlayerDeckBuilder.CoreSpiritDeckBuilder.buildDeck(store),
    },
      {
         agent: agent4,
         playerDeck: PlayerDeckBuilder.CoreTacticsDeckBuilder.buildDeck(store),
    }, ];

   var environment = new Environment(store, scenarioDeck, playerData);
   store.dispatch(Action.setFirstAgent(playerData[0].agent));
   playerData.forEach(function(data)
   {
      var agent = data.agent;
      for (var i = 0; i < 6; i++)
      {
         store.dispatch(AgentAction.drawPlayerCard(agent));
      }
   });
   store.dispatch(Action.drawQuestCard());
   EventObserver.observeStore(store);

   return environment;
}

var CardInstanceTest = {};
export default CardInstanceTest;