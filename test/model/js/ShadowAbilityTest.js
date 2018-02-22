import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import GameEvent from "../../../src/artifact/js/GameEvent.js";
import Scenario from "../../../src/artifact/js/Scenario.js";
import TreacheryCard from "../../../src/artifact/js/TreacheryCard.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import AgentAction from "../../../src/model/js/AgentAction.js";
import CardAction from "../../../src/model/js/CardAction.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import EventObserver from "../../../src/model/js/EventObserver.js";
import Environment from "../../../src/model/js/Environment.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import ShadowAbility from "../../../src/model/js/ShadowAbility.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("ShadowAbility");

QUnit.test("consequent() Exhaustion", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.A_JOURNEY_TO_RHOSGOBEL;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent1 = environment.firstAgent();
   agent1.tableauCharacters().forEach(function(cardInstance)
   {
      store.dispatch(CardAction.setReady(cardInstance, false));
      assert.equal(cardInstance.wounds(), 0);
   });
   var context = {
      cardInstance: new CardInstance(store, EnemyCard.BLACK_FOREST_BATS_AJTR),
      shadowInstance: new CardInstance(store, TreacheryCard.EXHAUSTION),
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      agent1.tableauCharacters().forEach(function(cardInstance)
      {
         assert.equal(cardInstance.wounds(), 1);
      });
      done();
   };
   var ability = ShadowAbility[GameEvent.SHADOW_CARD_REVEALED][TreacheryCard.EXHAUSTION];

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

var ShadowAbilityTest = {};
export default ShadowAbilityTest;