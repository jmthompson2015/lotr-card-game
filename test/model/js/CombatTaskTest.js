import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import CombatTask from "../../../src/model/js/CombatTask.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("CombatTask");

var delay = 10;

QUnit.test("doIt()", function(assert)
{
   // Setup.
   var game = createGame();
   var environment = game.engine().environment();
   var store = environment.store();
   var agent1 = environment.agentQueue()[0];
   var cardInstance = environment.stagingArea()[0];
   store.dispatch(Action.agentEngageCard(agent1, cardInstance));
   assert.equal(store.getState().agentEngagementArea[agent1.id()].length, 1);
   var task = new CombatTask(store, delay);
   var callback = function()
   {
      // Verify.
      assert.equal(store.getState().agentEngagementArea[agent1.id()].length, 1);
      done();
   };

   // Run.
   var done = assert.async();
   task.doIt(callback);
});

function createGame()
{
   var store = Redux.createStore(Reducer.root);
   store.dispatch(Action.setDelay(10));
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
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

var CombatTaskTest = {};
export default CombatTaskTest;