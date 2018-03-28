import AttachmentCard from "../../../src/artifact/js/AttachmentCard.js";
import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import GameEvent from "../../../src/artifact/js/GameEvent.js";
import Scenario from "../../../src/artifact/js/Scenario.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import AgentAction from "../../../src/model/js/AgentAction.js";
import EventObserver from "../../../src/model/js/EventObserver.js";
import Environment from "../../../src/model/js/Environment.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import AttachmentAbility from "../../../src/model/js/AttachmentAbility.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("AttachmentAbility");

QUnit.test("consequent() Unexpected Courage", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
   var environment = createEnvironment(scenarioKey);
   var store = environment.store();
   environment.drawEncounterCard(EnemyCard.DOL_GULDUR_ORCS);
   var agent3 = environment.agentQueue()[2];
   agent3.drawPlayerCard(AttachmentCard.UNEXPECTED_COURAGE);
   var cardInstance = agent3.hand()[agent3.hand().length - 1];
   store.dispatch(AgentAction.playCard(agent3, cardInstance));
   assert.equal(agent3.tableau().length, 4);
   var context = {
      agent: agent3,
      cardInstance: cardInstance,
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var heroes = agent3.tableauHeroes();
      heroes.forEach(function(heroInstance)
      {
         var attachments = heroInstance.attachments();
         if (attachments.length > 0)
         {
            assert.equal(attachments.length, 1);
            assert.equal(attachments[0].id(), cardInstance.id());
            assert.equal(agent3.tableau().length, 3);
         }
      });
      done();
   };
   var ability = AttachmentAbility[GameEvent.CARD_PLAYED][AttachmentCard.UNEXPECTED_COURAGE];

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
   var agent3 = new Agent(store, "agent3");
   var agent4 = new Agent(store, "agent4");
   var playerData = [
      {
         agent: agent1,
         playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    },
      {
         agent: agent2,
         playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
    },
      {
         agent: agent3,
         playerDeck: PlayerDeckBuilder.CoreSpiritDeckBuilder.buildDeck(store),
    },
      {
         agent: agent4,
         playerDeck: PlayerDeckBuilder.CoreTacticsDeckBuilder.buildDeck(store),
    }, ];

   var environment = new Environment(store, scenarioDeck, playerData);
   store.dispatch(Action.drawQuestCard());
   EventObserver.observeStore(store);

   return environment;
}

var AttachmentAbilityTest = {};
export default AttachmentAbilityTest;