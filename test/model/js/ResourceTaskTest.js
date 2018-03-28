import GameMode from "../../../src/artifact/js/GameMode.js";
import Environment from "../../../src/model/js/Environment.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ResourceTask from "../../../src/model/js/ResourceTask.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import Agent from "../../../src/model/js/Agent.js";

QUnit.module("ResourceTask");

QUnit.test("doIt()", function(assert)
{
   // Setup.
   var environment = createEnvironment();
   var store = environment.store();
   var agent = environment.agents()[0];
   var task = new ResourceTask(store);
   var cardResources = store.getState().cardResources[agent.id()];
   assert.equal(cardResources, undefined);
   var agentHand = store.getState().agentHand[agent.id()];
   assert.equal(agentHand, undefined);
   var callback = function()
   {
      // Verify.
      agent.tableauHeroes().forEach(function(cardInstance)
      {
         cardResources = store.getState().cardResources[cardInstance.id()];
         assert.equal(cardResources, 1);
      });
      agentHand = store.getState().agentHand[agent.id()];
      assert.equal(agentHand.length, 1);
   };

   // Run.
   task.doIt(callback);
});

function createEnvironment()
{
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store, GameMode.EASY);
   var agent = new Agent(store, "agent");
   var playerData = [
      {
         agent: agent,
         playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    }, ];

   return new Environment(store, scenarioDeck, playerData);
}

var ResourceTaskTest = {};
export default ResourceTaskTest;