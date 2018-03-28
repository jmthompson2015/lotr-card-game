import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import GameMode from "../../../src/artifact/js/GameMode.js";
import LocationCard from "../../../src/artifact/js/LocationCard.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import Agent from "../../../src/model/js/Agent.js";

QUnit.module("Game");

QUnit.test("Game() Passage through Mirkwood Easy", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store, GameMode.EASY);
   var playerData = [
   {
      agent: new Agent(store, "agent1"),
      playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    },
   {
      agent: new Agent(store, "agent2"),
      playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
    }, ];

   // Run.
   var result = new Game(store, scenarioDeck, playerData);

   // Verify.
   assert.ok(result);
   var engine = result.engine();
   assert.ok(engine);
   var environment = engine.environment();
   assert.ok(environment);
   var encounterDeck = store.getState().encounterDeck;
   assert.ok(encounterDeck);
   assert.equal(encounterDeck.length, 25);
   var stagingArea = store.getState().stagingArea;
   assert.equal(stagingArea.length, 2);
   assert.equal(environment.stagingArea()[0].card().key, EnemyCard.FOREST_SPIDER);
   assert.equal(environment.stagingArea()[1].card().key, LocationCard.OLD_FOREST_ROAD);
});

var GameTest = {};
export default GameTest;