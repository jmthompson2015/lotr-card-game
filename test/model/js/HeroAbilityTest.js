import GameEvent from "../../../src/artifact/js/GameEvent.js";
import HeroCard from "../../../src/artifact/js/HeroCard.js";
import Scenario from "../../../src/artifact/js/Scenario.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import EventObserver from "../../../src/model/js/EventObserver.js";
import Environment from "../../../src/model/js/Environment.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import HeroAbility from "../../../src/model/js/HeroAbility.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("HeroAbility");

QUnit.test("consequent() Gloin", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent1 = environment.agentQueue()[0];
   var gloinInstance = agent1.tableau().get(1);
   var context = {
      cardInstance: gloinInstance,
      woundCount: 2,
   };
   assert.equal(gloinInstance.resources(), 0);
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(gloinInstance.resources(), 2);
      done();
   };
   var ability = HeroAbility[GameEvent.WOUNDED][HeroCard.GLOIN];

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
   store.dispatch(Action.drawQuestCard());
   EventObserver.observeStore(store);

   return environment;
}

var HeroAbilityTest = {};
export default HeroAbilityTest;