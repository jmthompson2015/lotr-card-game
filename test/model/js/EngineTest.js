import GameMode from "../../../src/artifact/js/GameMode.js";
import Scenario from "../../../src/artifact/js/Scenario.js";
import Action from "../../../src/model/js/Action.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import Agent from "../../../src/model/js/Agent.js";

QUnit.module("Engine");

QUnit.test("Engine() A Journey to Rhosgobel", function(assert)
{
   // Setup.
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var store = engine.store();
      var agentCount = Object.keys(store.getState().agents).length;
      var questCount = store.getState().questDeck.length;
      assert.ok(agentCount === 0 || questCount === 0);
      done();
   };

   var game = createGame(Scenario.A_JOURNEY_TO_RHOSGOBEL, callback);
   var engine = game.engine();
   var store = engine.store();
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());

   // Run.
   var done = assert.async();
   engine.performResourcePhase();
});

QUnit.test("Engine() Conflict at the Carrock", function(assert)
{
   // Setup.
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var store = engine.store();
      var agentCount = Object.keys(store.getState().agents).length;
      var questCount = store.getState().questDeck.length;
      assert.ok(agentCount === 0 || questCount === 0);
      done();
   };

   var game = createGame(Scenario.CONFLICT_AT_THE_CARROCK, callback);
   var engine = game.engine();
   var store = engine.store();
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());

   // Run.
   var done = assert.async();
   engine.performResourcePhase();
});

QUnit.test("Engine() Escape from Dol Guldur", function(assert)
{
   // Setup.
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var store = engine.store();
      var agentCount = Object.keys(store.getState().agents).length;
      var questCount = store.getState().questDeck.length;
      assert.ok(agentCount === 0 || questCount === 0);
      done();
   };

   var game = createGame(Scenario.ESCAPE_FROM_DOL_GULDUR, callback);
   var engine = game.engine();
   var store = engine.store();
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());

   // Run.
   var done = assert.async();
   engine.performResourcePhase();
});

QUnit.test("Engine() Journey Along the Anduin", function(assert)
{
   // Setup.
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var store = engine.store();
      var agentCount = Object.keys(store.getState().agents).length;
      var questCount = store.getState().questDeck.length;
      assert.ok(agentCount === 0 || questCount === 0);
      done();
   };

   var game = createGame(Scenario.JOURNEY_ALONG_THE_ANDUIN, callback);
   var engine = game.engine();
   var store = engine.store();
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());

   // Run.
   var done = assert.async();
   engine.performResourcePhase();
});

QUnit.test("Engine() Passage through Mirkwood", function(assert)
{
   // Setup.
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var store = engine.store();
      var agentCount = Object.keys(store.getState().agents).length;
      var questCount = store.getState().questDeck.length;
      assert.ok(agentCount === 0 || questCount === 0);
      done();
   };

   var game = createGame(Scenario.PASSAGE_THROUGH_MIRKWOOD, callback);
   var engine = game.engine();
   var store = engine.store();
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());

   // Run.
   var done = assert.async();
   engine.performResourcePhase();
});

QUnit.test("Engine() Return to Mirkwood", function(assert)
{
   // Setup.
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var store = engine.store();
      var agentCount = Object.keys(store.getState().agents).length;
      var questCount = store.getState().questDeck.length;
      assert.ok(agentCount === 0 || questCount === 0);
      done();
   };

   var game = createGame(Scenario.RETURN_TO_MIRKWOOD, callback);
   var engine = game.engine();
   var store = engine.store();
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());

   // Run.
   var done = assert.async();
   engine.performResourcePhase();
});

QUnit.test("Engine() The Dead Marshes", function(assert)
{
   // Setup.
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var store = engine.store();
      var agentCount = Object.keys(store.getState().agents).length;
      var questCount = store.getState().questDeck.length;
      assert.ok(agentCount === 0 || questCount === 0);
      done();
   };

   var game = createGame(Scenario.THE_DEAD_MARSHES, callback);
   var engine = game.engine();
   var store = engine.store();
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());

   // Run.
   var done = assert.async();
   engine.performResourcePhase();
});

QUnit.test("Engine() The Hills of Emyn Muil", function(assert)
{
   // Setup.
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var store = engine.store();
      var agentCount = Object.keys(store.getState().agents).length;
      var questCount = store.getState().questDeck.length;
      assert.ok(agentCount === 0 || questCount === 0);
      done();
   };

   var game = createGame(Scenario.THE_HILLS_OF_EMYN_MUIL, callback);
   var engine = game.engine();
   var store = engine.store();
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());

   // Run.
   var done = assert.async();
   engine.performResourcePhase();
});

QUnit.test("Engine() The Hunt for Gollum", function(assert)
{
   // Setup.
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var store = engine.store();
      var agentCount = Object.keys(store.getState().agents).length;
      var questCount = store.getState().questDeck.length;
      assert.ok(agentCount === 0 || questCount === 0);
      done();
   };

   var game = createGame(Scenario.THE_HUNT_FOR_GOLLUM, callback);
   var engine = game.engine();
   var store = engine.store();
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());
   store.dispatch(Action.drawEncounterCard());

   // Run.
   var done = assert.async();
   engine.performResourcePhase();
});

function createGame(scenarioKey, callback)
{
   var store = Redux.createStore(Reducer.root);
   store.dispatch(Action.setDelay(10));
   var scenarioBuilder = ScenarioDeckBuilder.ScenarioDeckBuilder.findByScenario(scenarioKey);
   var scenarioDeck = scenarioBuilder.buildDeck(store, GameMode.EASY);
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

var EngineTest = {};
export default EngineTest;