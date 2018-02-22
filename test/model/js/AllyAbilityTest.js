import AllyCard from "../../../src/artifact/js/AllyCard.js";
import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import GameEvent from "../../../src/artifact/js/GameEvent.js";
import Scenario from "../../../src/artifact/js/Scenario.js";
import Trait from "../../../src/artifact/js/Trait.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import EventObserver from "../../../src/model/js/EventObserver.js";
import Environment from "../../../src/model/js/Environment.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import AllyAbility from "../../../src/model/js/AllyAbility.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("AllyAbility");

QUnit.test("consequent() Longbeard Orc Slayer", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   environment.drawEncounterCard(EnemyCard.DOL_GULDUR_ORCS);
   var agent1 = environment.agentQueue()[0];
   agent1.drawPlayerCard(AllyCard.LONGBEARD_ORC_SLAYER);
   var cardInstance = agent1.hand().last();
   var context = {
      cardInstance: cardInstance,
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var cardsInPlay = environment.cardsInPlay();
      cardsInPlay.forEach(function(cardInstance2)
      {
         var traitKeys = cardInstance2.card().traitKeys;
         if (traitKeys && traitKeys.includes(Trait.ORC))
         {
            assert.equal(cardInstance2.wounds(), 1);
         }
         else
         {
            assert.equal(cardInstance2.wounds(), 0);
         }
      });
      done();
   };
   var ability = AllyAbility[GameEvent.CARD_PLAYED][AllyCard.LONGBEARD_ORC_SLAYER];

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

var AllyAbilityTest = {};
export default AllyAbilityTest;