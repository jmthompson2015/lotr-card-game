"use strict";

define(["qunit", "redux", "artifact/js/GameMode",
  "model/js/Action", "model/js/Engine", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/Agent"],
   function(QUnit, Redux, GameMode, Action, Engine, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, Agent)
   {
      QUnit.module("Engine");

      QUnit.test("Engine()", function(assert)
      {
         // Setup.
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            var store = engine.store();
            var agentCount = store.getState().agents.size;
            var questCount = store.getState().questDeck.size;
            assert.ok(agentCount === 0 || questCount === 0);
            done();
         };

         var game = createGame(callback);
         var engine = game.engine();
         var store = engine.store();
         store.dispatch(Action.drawEncounterCard());
         store.dispatch(Action.drawEncounterCard());
         store.dispatch(Action.drawEncounterCard());

         // Run.
         var done = assert.async();
         engine.performResourcePhase();
      });

      function createGame(callback)
      {
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
            },
            {
               agent: new Agent(store, "agent3"),
               playerDeck: PlayerDeckBuilder.CoreSpiritDeckBuilder.buildDeck(store),
            },
         ];

         return new Game(store, scenarioDeck, playerData, 10, callback);
      }
   });
