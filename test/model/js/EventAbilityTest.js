import CardType from "../../../src/artifact/js/CardType.js";
import EventCard from "../../../src/artifact/js/EventCard.js";
import GameEvent from "../../../src/artifact/js/GameEvent.js";
import Scenario from "../../../src/artifact/js/Scenario.js";
import Trait from "../../../src/artifact/js/Trait.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import AgentAction from "../../../src/model/js/AgentAction.js";
import EventObserver from "../../../src/model/js/EventObserver.js";
import Environment from "../../../src/model/js/Environment.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import EventAbility from "../../../src/model/js/EventAbility.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("EventAbility");

QUnit.test("consequent() For Gondor!", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent1 = environment.agentQueue()[0];
   agent1.drawPlayerCard(EventCard.FOR_GONDOR);
   var cardInstance = agent1.hand().last();
   assert.ok(cardInstance);
   assert.equal(cardInstance.card().key, EventCard.FOR_GONDOR);
   store.dispatch(AgentAction.playCard(agent1, cardInstance));
   var context = {
      agent: agent1,
      cardInstance: cardInstance,
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var charactersInPlay = environment.charactersInPlay();
      charactersInPlay.forEach(function(cardInstance2)
      {
         assert.equal(cardInstance2.attack(), cardInstance2.card().attack + 1);
         if (cardInstance2.hasTrait(Trait.GONDOR))
         {
            assert.equal(cardInstance2.defense(), cardInstance2.card().defense + 1);
         }
         else
         {
            assert.equal(cardInstance2.defense(), cardInstance2.card().defense);
         }
      });
      done();
   };
   var ability = EventAbility[GameEvent.CARD_PLAYED][EventCard.FOR_GONDOR];

   // Run.
   var done = assert.async();
   ability.consequent(store, context, callback);
});

QUnit.test("consequent() Grim Resolve", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   var agent1 = environment.agentQueue()[0];
   agent1.drawPlayerCard(EventCard.GRIM_RESOLVE);
   var cardInstance = agent1.hand().last();
   assert.ok(cardInstance);
   assert.equal(cardInstance.card().key, EventCard.GRIM_RESOLVE);
   store.dispatch(AgentAction.playCard(agent1, cardInstance));
   var context = {
      agent: agent1,
      cardInstance: cardInstance,
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var cardsInPlay = environment.cardsInPlay();
      var characterKeys = [CardType.HERO, CardType.ALLY];
      cardsInPlay.forEach(function(cardInstance2)
      {
         if (characterKeys.includes(cardInstance2.card().cardTypeKey))
         {
            assert.equal(cardInstance2.isReady(), true);
         }
      });
      done();
   };
   var ability = EventAbility[GameEvent.CARD_PLAYED][EventCard.GRIM_RESOLVE];

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

var EventAbilityTest = {};
export default EventAbilityTest;