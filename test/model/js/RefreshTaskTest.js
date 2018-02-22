import GameMode from "../../../src/artifact/js/GameMode.js";
import Action from "../../../src/model/js/Action.js";
import AgentAction from "../../../src/model/js/AgentAction.js";
import CardAction from "../../../src/model/js/CardAction.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import RefreshTask from "../../../src/model/js/RefreshTask.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import Agent from "../../../src/model/js/Agent.js";

QUnit.module("RefreshTask");

QUnit.test("doIt()", function(assert)
{
   // Setup.
   var game = createGame();
   var environment = game.engine().environment();
   var store = environment.store();
   var agent1 = environment.agents().get(0);
   var agent2 = environment.agents().get(1);
   store.dispatch(AgentAction.drawPlayerCard(agent1));
   store.dispatch(AgentAction.drawPlayerCard(agent1));
   store.dispatch(AgentAction.drawPlayerCard(agent1));
   store.dispatch(AgentAction.drawPlayerCard(agent2));
   store.dispatch(AgentAction.drawPlayerCard(agent2));
   store.dispatch(AgentAction.drawPlayerCard(agent2));
   agent1.tableau().forEach(function(cardInstance)
   {
      store.dispatch(CardAction.setReady(cardInstance, false));
   });
   agent2.tableau().forEach(function(cardInstance)
   {
      store.dispatch(CardAction.setReady(cardInstance, false));
   });
   assert.equal(agent1.threatLevel(), 29);
   assert.equal(agent2.threatLevel(), 30);
   assert.equal(store.getState().firstAgentId, 1);
   var task = new RefreshTask(store);
   var callback = function()
   {
      // Verify.
      agent1.tableau().forEach(function(cardInstance)
      {
         assert.ok(cardInstance.isReady(), "isReady() ? " + cardInstance.toString());
         assert.ok(!cardInstance.isExhausted(), "isExhausted() ? " + cardInstance.toString());
      });
      agent2.tableau().forEach(function(cardInstance)
      {
         assert.ok(cardInstance.isReady(), "isReady() ? " + cardInstance.toString());
         assert.ok(!cardInstance.isExhausted(), "isExhausted() ? " + cardInstance.toString());
      });
      assert.equal(agent1.threatLevel(), 30);
      assert.equal(agent2.threatLevel(), 31);
      assert.equal(store.getState().firstAgentId, 2);
   };

   // Run.
   task.doIt(callback);
});

function createGame()
{
   var store = Redux.createStore(Reducer.root);
   store.dispatch(Action.setDelay(10));
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store, GameMode.EASY);
   var agent1 = new Agent(store, "agent1");
   var agent2 = new Agent(store, "agent2");
   var playerData = [
   {
      agent: agent1,
      playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    },
   {
      agent: agent2,
      playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
    }, ];

   return new Game(store, scenarioDeck, playerData);
}

var RefreshTaskTest = {};
export default RefreshTaskTest;