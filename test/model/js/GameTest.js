"use strict";

define(["qunit", "redux", "artifact/js/GameMode", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/SimpleAgent"],
   function(QUnit, Redux, GameMode, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, SimpleAgent)
   {
      QUnit.module("Game");

      QUnit.test("Game()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store, GameMode.EASY);
         var playerData = [
            {
               agent: new SimpleAgent(store, "agent1"),
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
           },
            {
               agent: new SimpleAgent(store, "agent2"),
               playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
           },
        ];

         // Run.
         var result = new Game(store, scenarioDeck, playerData);

         // Verify.
         assert.ok(result);
         var engine = result.engine();
         assert.ok(engine);
         var environment = engine.environment();
         assert.ok(environment);
      });
   });
