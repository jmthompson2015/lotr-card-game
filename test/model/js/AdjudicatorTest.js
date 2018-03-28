import AttachmentCard from "../../../src/artifact/js/AttachmentCard.js";
import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import Action from "../../../src/model/js/Action.js";
import Adjudicator from "../../../src/model/js/Adjudicator.js";
import AgentAction from "../../../src/model/js/AgentAction.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import Agent from "../../../src/model/js/Agent.js";

QUnit.module("Adjudicator");

QUnit.test("canAttack() Forest Spider", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var adjudicator = new Adjudicator(store);
   var cardInstance = new CardInstance(store, EnemyCard.FOREST_SPIDER);

   // Run.
   var result = adjudicator.canAttack(cardInstance);

   // Verify.
   assert.equal(result, true);
});

QUnit.test("canAttack() Forest Spider with Forest Snare", function(assert)
{
   // Setup.
   var game = createGame();
   var environment = game.engine().environment();
   var store = environment.store();
   var agent2 = environment.agentQueue()[1];
   var cardInstance = environment.stagingArea()[0];
   store.dispatch(Action.agentEngageCard(agent2, cardInstance));
   agent2.drawPlayerCard(AttachmentCard.FOREST_SNARE);
   var attachmentInstance = agent2.hand()[agent2.hand().length - 1];
   store.dispatch(AgentAction.playCard(agent2, attachmentInstance));
   store.dispatch(AgentAction.attachToEngagedEnemy(agent2, cardInstance, attachmentInstance));
   var adjudicator = new Adjudicator(store);

   // Run.
   var result = adjudicator.canAttack(cardInstance);

   // Verify.
   assert.equal(result, false);
});

function createGame(callback)
{
   var store = Redux.createStore(Reducer.root);
   store.dispatch(Action.setDelay(10));
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   var playerData = [
      {
         agent: new Agent(store, "agent1"),
         playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    },
      {
         agent: new Agent(store, "agent2"),
         playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
    },
      {
         agent: new Agent(store, "agent3"),
         playerDeck: PlayerDeckBuilder.CoreSpiritDeckBuilder.buildDeck(store),
    }, ];

   return new Game(store, scenarioDeck, playerData, callback);
}

var AdjudicatorTest = {};
export default AdjudicatorTest;