import Phase from "../../../src/artifact/js/Phase.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import Environment from "../../../src/model/js/Environment.js";
import PhaseObserver from "../../../src/model/js/PhaseObserver.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("PhaseObserver");

QUnit.test("onChange()", function(assert)
{
   // Setup.
   var environment = createEnvironment();
   var store = environment.store();
   var agent1 = environment.agents().first();
   var phaseKey = Phase.QUEST_START;
   var phaseCallback = function(phaseData)
   {
      // Verify.
      assert.equal(store.getState().phaseQueue.size, 0);
      assert.ok(phaseData);
      assert.equal(phaseData.get("phaseKey"), phaseKey);
      // assert.equal(phaseData.get("phaseAgent"), agent1);
   };
   store.dispatch(Action.enqueuePhase(phaseKey, agent1, phaseCallback));
   assert.equal(store.getState().phaseQueue.size, 1);

   // Run.
   PhaseObserver.observeStore(store);
});

function createEnvironment()
{
   var store = Redux.createStore(Reducer.root);
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

   return new Environment(store, scenarioDeck, playerData);
}

var PhaseObserverTest = {};
export default PhaseObserverTest;