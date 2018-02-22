import GameEvent from "../../../src/artifact/js/GameEvent.js";
import LocationCard from "../../../src/artifact/js/LocationCard.js";
import Scenario from "../../../src/artifact/js/Scenario.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import AgentAction from "../../../src/model/js/AgentAction.js";
import EventObserver from "../../../src/model/js/EventObserver.js";
import Environment from "../../../src/model/js/Environment.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import LocationAbility from "../../../src/model/js/LocationAbility.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("LocationAbility");

QUnit.test("consequent() Forest Gate", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent1 = environment.firstAgent();
   assert.equal(agent1.playerDeck().size, 39);
   assert.equal(agent1.hand().size, 6);
   var context;
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(agent1.playerDeck().size, 37);
      assert.equal(agent1.hand().size, 8);
      done();
   };
   var ability = LocationAbility[GameEvent.TRAVELED][LocationCard.FOREST_GATE];

   // Run.
   var done = assert.async();
   ability.consequent(store, context, callback);
});

function createEnvironment(scenarioKey)
{
   var store = Redux.createStore(Reducer.root);
   var scenarioBuilder = ScenarioDeckBuilder.ScenarioDeckBuilder.findByScenario(scenarioKey);
   var scenarioDeck = scenarioBuilder.buildDeck(store);

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

var LocationAbilityTest = {};
export default LocationAbilityTest;