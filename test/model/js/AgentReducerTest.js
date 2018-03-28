import HeroCard from "../../../src/artifact/js/HeroCard.js";
import Action from "../../../src/model/js/Action.js";
import AgentAction from "../../../src/model/js/AgentAction.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import Agent from "../../../src/model/js/Agent.js";

QUnit.module("AgentReducer");

QUnit.test("addThreat()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   assert.equal(store.getState().agentThreat[agent.id()], undefined);

   // Run.
   store.dispatch(AgentAction.addThreat(agent));

   // Verify.
   assert.equal(store.getState().agentThreat[agent.id()], 1);

   // Run.
   store.dispatch(AgentAction.addThreat(agent, 5));

   // Verify.
   assert.equal(store.getState().agentThreat[agent.id()], 6);
});

QUnit.test("attachCard()", function(assert)
{
   // Setup.
   var game = createGame();
   var environment = game.engine().environment();
   var store = environment.store();
   var agent = environment.agents()[0];
   var cardInstance = agent.tableau()[0];
   var attachmentInstance = agent.hand()[0];
   store.dispatch(AgentAction.playCard(agent, attachmentInstance));
   assert.equal(store.getState().agentHand[agent.id()].length, 5);
   assert.equal(store.getState().agentTableau[agent.id()].length, 4);
   assert.equal(store.getState().cardAttachments[cardInstance.id()], undefined);

   // Run.
   store.dispatch(AgentAction.attachCard(agent, cardInstance, attachmentInstance));

   // Verify.
   assert.equal(store.getState().agentHand[agent.id()].length, 5);
   assert.equal(store.getState().agentTableau[agent.id()].length, 3);
   assert.equal(store.getState().cardAttachments[cardInstance.id()].length, 1);
   assert.equal(store.getState().cardAttachments[cardInstance.id()][0], attachmentInstance.id());
});

QUnit.test("attachToEngagedEnemy()", function(assert)
{
   // Setup.
   var game = createGame();
   var environment = game.engine().environment();
   var store = environment.store();
   var agent = environment.agents()[0];
   store.dispatch(Action.drawEncounterCard());
   var cardInstance = environment.stagingArea()[0];
   store.dispatch(Action.agentEngageCard(agent, cardInstance));
   var attachmentInstance = agent.hand()[0];
   store.dispatch(AgentAction.playCard(agent, attachmentInstance));
   assert.equal(store.getState().agentEngagementArea[agent.id()].length, 1);
   assert.equal(store.getState().agentTableau[agent.id()].length, 4);
   assert.equal(store.getState().cardAttachments[cardInstance.id()], undefined);

   // Run.
   store.dispatch(AgentAction.attachToEngagedEnemy(agent, cardInstance, attachmentInstance));

   // Verify.
   assert.equal(store.getState().agentEngagementArea[agent.id()].length, 1);
   assert.equal(store.getState().agentTableau[agent.id()].length, 3);
   assert.equal(store.getState().cardAttachments[cardInstance.id()].length, 1);
   assert.equal(store.getState().cardAttachments[cardInstance.id()][0], attachmentInstance.id());
});

QUnit.test("discardAttachmentCard()", function(assert)
{
   // Setup.
   var game = createGame();
   var environment = game.engine().environment();
   var store = environment.store();
   var agent = environment.agents()[0];
   var cardInstance = agent.tableau()[0];
   var attachmentInstance = agent.hand()[0];
   store.dispatch(AgentAction.playCard(agent, attachmentInstance));
   store.dispatch(AgentAction.attachCard(agent, cardInstance, attachmentInstance));
   assert.equal(store.getState().agentHand[agent.id()].length, 5);
   assert.equal(store.getState().agentPlayerDiscard[agent.id()], undefined);
   assert.equal(store.getState().agentTableau[agent.id()].length, 3);
   assert.equal(store.getState().cardAttachments[cardInstance.id()].length, 1);

   // Run.
   store.dispatch(AgentAction.discardAttachmentCard(agent, cardInstance, attachmentInstance));

   // Verify.
   assert.equal(store.getState().agentHand[agent.id()].length, 5);
   assert.equal(store.getState().agentPlayerDiscard[agent.id()].length, 1);
   assert.equal(store.getState().agentTableau[agent.id()].length, 3);
   assert.equal(store.getState().cardAttachments[cardInstance.id()].length, 0);
});

QUnit.test("discardFromTableau()", function(assert)
{
   // Setup.
   var game = createGame();
   var environment = game.engine().environment();
   var store = environment.store();
   var agent = environment.agents()[0];
   var cardInstance = agent.tableau()[0];
   assert.equal(store.getState().agentTableau[agent.id()].length, 3);
   assert.equal(store.getState().agentPlayerDiscard[agent.id()], undefined);

   // Run.
   store.dispatch(AgentAction.discardFromTableau(agent, cardInstance));

   // Verify.
   assert.equal(store.getState().agentTableau[agent.id()].length, 2);
   assert.equal(store.getState().agentPlayerDiscard[agent.id()].length, 1);
   assert.equal(store.getState().agentPlayerDiscard[agent.id()][0], cardInstance.id());
});

QUnit.test("drawPlayerCard()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var playerDeck = PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store);
   store.dispatch(AgentAction.setPlayerDeck(agent, playerDeck.playerInstances));
   assert.equal(store.getState().agentPlayerDeck[agent.id()].length, 45);
   assert.equal(Object.keys(store.getState().agentHand).length, 0);

   // Run.
   store.dispatch(AgentAction.drawPlayerCard(agent));

   // Verify.
   assert.equal(store.getState().agentPlayerDeck[agent.id()].length, 44);
   assert.equal(Object.keys(store.getState().agentHand).length, 1);
});

QUnit.test("incrementNextAgentId()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   assert.equal(store.getState().nextAgentId, 1);

   // Run.
   store.dispatch(AgentAction.incrementNextAgentId());

   // Verify.
   assert.equal(store.getState().nextAgentId, 2);

   // Run.
   store.dispatch(AgentAction.incrementNextAgentId());

   // Verify.
   assert.equal(store.getState().nextAgentId, 3);
});

QUnit.test("playCard()", function(assert)
{
   // Setup.
   var game = createGame();
   var environment = game.engine().environment();
   var store = environment.store();
   var agent = environment.agents()[0];
   var cardInstance = agent.hand()[0];
   assert.equal(store.getState().agentHand[agent.id()].length, 6);
   assert.equal(store.getState().agentTableau[agent.id()].length, 3);

   // Run.
   store.dispatch(AgentAction.playCard(agent, cardInstance));

   // Verify.
   assert.equal(store.getState().agentHand[agent.id()].length, 5);
   assert.equal(store.getState().agentTableau[agent.id()].length, 4);
});

QUnit.test("setPlayerDeck()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var cardInstance0 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
   var cardInstance1 = new CardInstance(store, HeroCard.properties[HeroCard.GLOIN]);
   var playerDeck = [cardInstance0, cardInstance1];
   assert.equal(store.getState().agentTableau[agent.id()], undefined);

   // Run.
   store.dispatch(AgentAction.setPlayerDeck(agent, playerDeck));

   // Verify.
   var result = store.getState().agentPlayerDeck[agent.id()];
   assert.ok(result);
   assert.equal(result.length, 2);
   assert.equal(result[0], 1);
   assert.equal(result[1], 2);
});

QUnit.test("setTableau()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var cardInstance0 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
   var cardInstance1 = new CardInstance(store, HeroCard.properties[HeroCard.GLOIN]);
   var tableau = [cardInstance0, cardInstance1];
   assert.equal(store.getState().agentTableau[agent.id()], undefined);

   // Run.
   store.dispatch(AgentAction.setTableau(agent, tableau));

   // Verify.
   var result = store.getState().agentTableau[agent.id()];
   assert.ok(result);
   assert.equal(result.length, 2);
   assert.equal(result[0], 1);
   assert.equal(result[1], 2);
});

QUnit.test("setThreat()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   assert.equal(store.getState().agentThreat[agent.id()], undefined);

   // Run.
   store.dispatch(AgentAction.setThreat(agent));

   // Verify.
   assert.equal(store.getState().agentThreat[agent.id()], 0);

   // Run.
   store.dispatch(AgentAction.setThreat(agent, 5));

   // Verify.
   assert.equal(store.getState().agentThreat[agent.id()], 5);
});

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

var AgentReducerTest = {};
export default AgentReducerTest;