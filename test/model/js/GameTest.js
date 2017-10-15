"use strict";

define(["qunit", "redux", "artifact/js/EnemyCard", "artifact/js/GameMode", "artifact/js/LocationCard",
  "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/Agent"],
   function(QUnit, Redux, EnemyCard, GameMode, LocationCard, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, Agent)
   {
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
         var encounterDeck = store.getState().encounterDeck;
         assert.ok(encounterDeck);
         assert.equal(encounterDeck.size, 25);
         var stagingArea = store.getState().stagingArea;
         assert.equal(stagingArea.size, 2);
         assert.equal(environment.stagingArea().get(0).card().key, EnemyCard.FOREST_SPIDER);
         assert.equal(environment.stagingArea().get(1).card().key, LocationCard.OLD_FOREST_ROAD);
      });
   });
