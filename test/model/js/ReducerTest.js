import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import GameEvent from "../../../src/artifact/js/GameEvent.js";
import Phase from "../../../src/artifact/js/Phase.js";
import Action from "../../../src/model/js/Action.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Environment from "../../../src/model/js/Environment.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import Agent from "../../../src/model/js/Agent.js";

QUnit.module("Reducer");

QUnit.test("agentEngageCard()", function(assert)
{
   // Setup.
   var environment = createEnvironment();
   var store = environment.store();
   var agent = environment.agents()[0];
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   var cardInstance = environment.stagingArea()[0];
   assert.equal(store.getState().stagingArea.length, 3);
   assert.equal(Object.keys(store.getState().agentEngagementArea).length, 0);

   // Run.
   store.dispatch(Action.agentEngageCard(agent, cardInstance));

   // Verify.
   assert.equal(store.getState().stagingArea.length, 2);
   assert.equal(Object.keys(store.getState().agentEngagementArea).length, 1);
});

QUnit.test("dealShadowCard() index", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
   var cardInstance = new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
   assert.equal(store.getState().encounterDeck.length, 36);
   assert.equal(Object.keys(store.getState().cardShadowCards).length, 0);
   var enemyId = store.getState().encounterDeck[0];

   // Run.
   store.dispatch(Action.dealShadowCard(cardInstance));

   // Verify.
   assert.equal(store.getState().encounterDeck.length, 35);
   assert.equal(Object.keys(store.getState().cardShadowCards).length, 1);
   var shadowCardIds = store.getState().cardShadowCards[cardInstance.id()];
   assert.equal(shadowCardIds.length, 1);
   assert.equal(shadowCardIds[0], enemyId);
});

QUnit.test("dequeueEvent()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   //  var agent1 = new Agent(store, "agent1");
   //  var agent2 = new Agent(store, "agent2");
   var context;
   var callback = function() {};
   store.dispatch(Action.enqueueEvent(GameEvent.QUEST_CARD_DRAWN, context, callback));
   store.dispatch(Action.enqueueEvent(GameEvent.CARD_PLAYED, context, callback));
   assert.equal(store.getState().eventQueue.length, 2);
   var eventData0 = store.getState().eventQueue[0];
   assert.ok(eventData0);
   assert.equal(eventData0.eventKey, GameEvent.QUEST_CARD_DRAWN);
   //  assert.equal(eventData0.get("eventAgent").id(), agent1.id());
   var eventData1 = store.getState().eventQueue[1];
   assert.ok(eventData1);
   assert.equal(eventData1.eventKey, GameEvent.CARD_PLAYED);
   //  assert.equal(eventData1.get("eventAgent").id(), agent2.id());

   // Run.
   store.dispatch(Action.dequeueEvent());

   // Verify.
   assert.equal(store.getState().eventQueue.length, 1);
   eventData0 = store.getState().eventQueue[0];
   assert.ok(eventData0);
   assert.equal(eventData0.eventKey, GameEvent.CARD_PLAYED);
   //  assert.equal(eventData0.get("eventAgent"), agent2);

   // Run.
   store.dispatch(Action.dequeueEvent());

   // Verify.
   assert.equal(store.getState().eventQueue.length, 0);
});

QUnit.test("dequeuePhase()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   //  var agent1 = new Agent(store, "agent1");
   //  var agent2 = new Agent(store, "agent2");
   store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END));
   store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_ENGAGEMENT_CHECK_START));
   assert.equal(store.getState().phaseQueue.length, 2);
   var phaseData0 = store.getState().phaseQueue[0];
   assert.ok(phaseData0);
   assert.equal(phaseData0.phaseKey, Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END);
   //  assert.equal(phaseData0.get("phaseAgent").id(), agent1.id());
   var phaseData1 = store.getState().phaseQueue[1];
   assert.ok(phaseData1);
   assert.equal(phaseData1.phaseKey, Phase.ENCOUNTER_ENGAGEMENT_CHECK_START);
   //  assert.equal(phaseData1.get("phaseAgent").id(), agent2.id());

   // Run.
   store.dispatch(Action.dequeuePhase());

   // Verify.
   assert.equal(store.getState().phaseQueue.length, 1);
   phaseData0 = store.getState().phaseQueue[0];
   assert.ok(phaseData0);
   assert.equal(phaseData0.phaseKey, Phase.ENCOUNTER_ENGAGEMENT_CHECK_START);
   //  assert.equal(phaseData0.get("phaseAgent").id(), agent2.id());

   // Run.
   store.dispatch(Action.dequeuePhase());

   // Verify.
   assert.equal(store.getState().phaseQueue.length, 0);
});

QUnit.test("discardActiveLocation()", function(assert)
{
   // Setup.
   var game = createGame();
   var store = game.store();
   var environment = game.engine().environment();
   var cardInstance = environment.stagingArea()[1];
   store.dispatch(Action.setActiveLocation(cardInstance));
   assert.ok(store.getState().activeLocationId);
   assert.ok(store.getState().activeLocationId > 0);
   assert.equal(store.getState().encounterDiscard.length, 0);

   // Run.
   store.dispatch(Action.discardActiveLocation());

   // Verify.
   assert.equal(store.getState().activeLocationId, undefined);
   assert.equal(store.getState().encounterDiscard.length, 1);
   assert.equal(store.getState().encounterDiscard[0], cardInstance.id());
});

QUnit.test("discardActiveQuest()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   store.dispatch(Action.setQuestDeck(scenarioDeck.questInstances));
   store.dispatch(Action.drawQuestCard());
   assert.equal(store.getState().questDeck.length, 5);
   assert.equal(store.getState().activeQuestId, 1);
   assert.equal(store.getState().questDiscard.length, 0);

   // Run.
   store.dispatch(Action.discardActiveQuest());

   // Verify.
   assert.equal(store.getState().questDeck.length, 5);
   assert.equal(store.getState().activeQuestId, undefined);
   assert.equal(store.getState().questDiscard.length, 1);
});

QUnit.test("discardShadowCard()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
   var cardInstance = new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
   var enemyId = store.getState().encounterDeck[0];
   var shadowInstance = CardInstance.get(store, enemyId);
   store.dispatch(Action.dealShadowCard(cardInstance));
   assert.equal(store.getState().encounterDeck.length, 35);
   assert.equal(store.getState().encounterDiscard.length, 0);
   assert.equal(Object.keys(store.getState().cardShadowCards).length, 1);
   var shadowCardIds = store.getState().cardShadowCards[cardInstance.id()];
   assert.equal(shadowCardIds.length, 1);
   assert.equal(shadowCardIds[0], enemyId);

   // Run.
   store.dispatch(Action.discardShadowCard(cardInstance, shadowInstance));

   // Verify.
   assert.equal(store.getState().encounterDeck.length, 35);
   assert.equal(store.getState().encounterDiscard.length, 1);
   assert.equal(Object.keys(store.getState().cardShadowCards).length, 1);
   shadowCardIds = store.getState().cardShadowCards[cardInstance.id()];
   assert.equal(shadowCardIds.length, 0);
});

QUnit.test("drawEncounterCard()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
   assert.equal(store.getState().encounterDeck.length, 36);
   assert.equal(store.getState().stagingArea.length, 0);

   // Run.
   store.dispatch(Action.drawEncounterCard());

   // Verify.
   assert.equal(store.getState().encounterDeck.length, 35);
   assert.equal(store.getState().stagingArea.length, 1);
});

QUnit.test("drawEncounterCard() index", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
   assert.equal(store.getState().encounterDeck.length, 36);
   assert.equal(store.getState().stagingArea.length, 0);
   var index = 5;
   var cardInstance = store.getState().encounterDeck[index];

   // Run.
   store.dispatch(Action.drawEncounterCard(index));

   // Verify.
   assert.equal(store.getState().encounterDeck.length, 35);
   assert.equal(store.getState().stagingArea.length, 1);
   assert.equal(store.getState().stagingArea[0], cardInstance);
});

QUnit.test("drawQuestCard()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   store.dispatch(Action.setQuestDeck(scenarioDeck.questInstances));
   assert.equal(store.getState().questDeck.length, 6);
   assert.equal(store.getState().activeQuestId, undefined);
   assert.equal(store.getState().questDiscard.length, 0);

   // Run.
   store.dispatch(Action.drawQuestCard());

   // Verify.
   assert.equal(store.getState().questDeck.length, 5);
   assert.equal(store.getState().activeQuestId, 1);
   assert.equal(store.getState().questDiscard.length, 0);
});

QUnit.test("enqueueEvent()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   //  var agent1 = new Agent(store, "agent1");
   //  var agent2 = new Agent(store, "agent2");
   assert.equal(store.getState().eventQueue.length, 0);
   var context;
   var callback = function() {};

   // Run.
   store.dispatch(Action.enqueueEvent(GameEvent.QUEST_CARD_DRAWN, context, callback));

   // Verify.
   assert.equal(store.getState().eventQueue.length, 1);
   var eventData0 = store.getState().eventQueue[0];
   assert.ok(eventData0);
   assert.equal(eventData0.eventKey, GameEvent.QUEST_CARD_DRAWN);
   //  assert.equal(eventData0.get("eventAgent"), agent1);

   // Run.
   store.dispatch(Action.enqueueEvent(GameEvent.CARD_PLAYED, context, callback));

   // Verify.
   assert.equal(store.getState().eventQueue.length, 2);
   eventData0 = store.getState().eventQueue[0];
   assert.ok(eventData0);
   assert.equal(eventData0.eventKey, GameEvent.QUEST_CARD_DRAWN);
   //  assert.equal(eventData0.get("eventAgent"), agent1);
   var eventData1 = store.getState().eventQueue[1];
   assert.ok(eventData1);
   assert.equal(eventData1.eventKey, GameEvent.CARD_PLAYED);
   //  assert.equal(eventData1.get("eventAgent"), agent2);
});

QUnit.test("enqueuePhase()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   //  var agent1 = new Agent(store, "agent1");
   //  var agent2 = new Agent(store, "agent2");
   assert.equal(store.getState().phaseQueue.length, 0);

   // Run.
   store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END));

   // Verify.
   assert.equal(store.getState().phaseQueue.length, 1);
   var phaseData0 = store.getState().phaseQueue[0];
   assert.ok(phaseData0);
   assert.equal(phaseData0.phaseKey, Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END);
   //  assert.equal(phaseData0.get("phaseAgent"), agent1);

   // Run.
   store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_ENGAGEMENT_CHECK_START));

   // Verify.
   assert.equal(store.getState().phaseQueue.length, 2);
   phaseData0 = store.getState().phaseQueue[0];
   assert.ok(phaseData0);
   assert.equal(phaseData0.phaseKey, Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END);
   //  assert.equal(phaseData0.get("phaseAgent"), agent1);
   var phaseData1 = store.getState().phaseQueue[1];
   assert.ok(phaseData1);
   assert.equal(phaseData1.phaseKey, Phase.ENCOUNTER_ENGAGEMENT_CHECK_START);
   //  assert.equal(phaseData1.get("phaseAgent"), agent2);
});

QUnit.test("incrementRound()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   assert.equal(store.getState().round, 0);

   // Run.
   store.dispatch(Action.incrementRound());

   // Verify.
   assert.equal(store.getState().round, 1);

   // Run.
   store.dispatch(Action.incrementRound());

   // Verify.
   assert.equal(store.getState().round, 2);
});

QUnit.test("setActiveLocation()", function(assert)
{
   // Setup.
   var game = createGame();
   var store = game.store();
   var environment = game.engine().environment();
   var cardInstance = environment.stagingArea()[1];
   assert.equal(store.getState().stagingArea.length, 2);
   assert.equal(store.getState().activeLocationId, undefined);

   // Run.
   store.dispatch(Action.setActiveLocation(cardInstance));

   // Verify.
   assert.equal(store.getState().stagingArea.length, 1);
   assert.equal(store.getState().activeLocationId, cardInstance.id());
});

function createEnvironment()
{
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   var agent = new Agent(store, "agent");
   var playerData = [
      {
         agent: agent,
         playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    }, ];

   return new Environment(store, scenarioDeck, playerData);
}

function createGame(callback)
{
   var store = Redux.createStore(Reducer.root);
   store.dispatch(Action.setDelay(10));
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   var playerData = [
      {
         agent: new Agent(store, "agent1"),
         playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    },
      {
         agent: new Agent(store, "agent2"),
         playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
    },
      {
         agent: new Agent(store, "agent3"),
         playerDeck: PlayerDeckBuilder.CoreSpiritDeckBuilder.buildDeck(store),
    }, ];

   return new Game(store, scenarioDeck, playerData, callback);
}

var ReducerTest = {};
export default ReducerTest;