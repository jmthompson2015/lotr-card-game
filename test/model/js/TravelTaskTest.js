import CardType from "../../../src/artifact/js/CardType.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import TravelTask from "../../../src/model/js/TravelTask.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("TravelTask");

QUnit.test("doIt()", function(assert)
{
   // Setup.
   var game = createGame();
   var environment = game.engine().environment();
   var store = environment.store();
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   var locationCount = environment.stagingArea(CardType.LOCATION).size;
   var task = new TravelTask(store);
   var callback = function()
   {
      // Verify.
      if (locationCount === 0)
      {
         assert.equal(store.getState().activeLocationId, undefined);
      }
      else
      {
         assert.ok(Number.isInteger(store.getState().activeLocationId));
      }
   };

   // Run.
   task.doIt(callback);
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
    }, ];

   return new Game(store, scenarioDeck, playerData, callback);
}

var TravelTaskTest = {};
export default TravelTaskTest;