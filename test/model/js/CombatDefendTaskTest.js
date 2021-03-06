import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import CombatDefendTask from "../../../src/model/js/CombatDefendTask.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("CombatDefendTask");

QUnit.test("doIt()", function(assert)
{
   // Setup.
   var game = createGame();
   var environment = game.engine().environment();
   var store = environment.store();
   var agent1 = environment.agents()[0];
   var enemies = environment.stagingEnemies();
   var enemy = enemies[0];
   store.dispatch(Action.agentEngageCard(agent1, enemy));
   store.dispatch(Action.dealShadowCard(enemy));
   var task = new CombatDefendTask(store, agent1);
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(store.getState().encounterDiscard.length, 0);
      assert.ok(Object.keys(store.getState().cardShadowCards).length > 0);
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

var CombatDefendTaskTest = {};
export default CombatDefendTaskTest;