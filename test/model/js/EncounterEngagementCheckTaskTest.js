import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import Action from "../../../src/model/js/Action.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import EncounterEngagementCheckTask from "../../../src/model/js/EncounterEngagementCheckTask.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import Agent from "../../../src/model/js/Agent.js";

QUnit.module("EncounterEngagementCheckTask");

QUnit.test("doIt()", function(assert)
{
   // Setup.
   var game = createGame();
   var environment = game.engine().environment();
   var store = environment.store();
   var agent1 = environment.agents()[0];
   var agent2 = environment.agents()[1];
   var chieftanUfthakIndex = findIndex(environment, EnemyCard.CHIEFTAN_UFTHAK);
   store.dispatch(Action.drawEncounterCard(chieftanUfthakIndex));
   var dolGuldurBeastmasterIndex = findIndex(environment, EnemyCard.DOL_GULDUR_BEASTMASTER);
   store.dispatch(Action.drawEncounterCard(dolGuldurBeastmasterIndex));
   var dolGuldurOrcsIndex = findIndex(environment, EnemyCard.DOL_GULDUR_ORCS);
   store.dispatch(Action.drawEncounterCard(dolGuldurOrcsIndex));
   var blackForestBatsIndex = findIndex(environment, EnemyCard.BLACK_FOREST_BATS_PTM);
   store.dispatch(Action.drawEncounterCard(blackForestBatsIndex));
   assert.equal(environment.stagingArea().length, 6);
   assert.equal(agent1.engagementArea().length, 0);
   assert.equal(agent2.engagementArea().length, 0);
   var task = new EncounterEngagementCheckTask(store, agent1);
   var callback = function()
   {
      // Verify.
      assert.equal(environment.stagingArea().length, 5);
      assert.equal(agent1.engagementArea().length, 1, "agent1.engagementArea().length === 1", "agent1.engagementArea().length === 1");
      assert.equal(agent1.engagementArea()[0].card().key, EnemyCard.FOREST_SPIDER);
      assert.equal(agent2.engagementArea().length, 0, "agent2.engagementArea().length === 0");
   };

   // Run.
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

function findIndex(environment, cardKey)
{
   return environment.encounterDeck().reduce(function(accumulator, cardInstance, i)
   {
      if (cardInstance.card().key === cardKey)
      {
         accumulator = i;
      }
      return accumulator;
   }, -1);
}

var EncounterEngagementCheckTaskTest = {};
export default EncounterEngagementCheckTaskTest;