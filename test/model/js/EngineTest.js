"use strict";

define(["qunit", "redux", "artifact/js/GameMode",
  "model/js/Action", "model/js/Engine", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/SimpleAgent"],
   function(QUnit, Redux, GameMode, Action, Engine, Environment, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, SimpleAgent)
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
            assert.equal(store.getState().round, 2);
            done();
         };
         var engine = createEngine(callback);

         // Run.
         var done = assert.async();
         engine.performResourcePhase();
      });

      QUnit.test("agents()", function(assert)
      {
         // Setup.
         var engine = createEngine();

         // Run.
         var result = engine.agents();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 4);
         assert.equal(result[0].name(), "agent1");
         assert.equal(result[1].name(), "agent2");
         assert.equal(result[2].name(), "agent3");
         assert.equal(result[3].name(), "agent4");

         // Run.
         var store = engine.store();
         store.dispatch(Action.setFirstAgent(result[1]));
         result = engine.agents();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 4);
         assert.equal(result[0].name(), "agent2");
         assert.equal(result[1].name(), "agent3");
         assert.equal(result[2].name(), "agent4");
         assert.equal(result[3].name(), "agent1");

         // Run.
         store.dispatch(Action.setFirstAgent(result[1]));
         result = engine.agents();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 4);
         assert.equal(result[0].name(), "agent3");
         assert.equal(result[1].name(), "agent4");
         assert.equal(result[2].name(), "agent1");
         assert.equal(result[3].name(), "agent2");

         // Run.
         store.dispatch(Action.setFirstAgent(result[1]));
         result = engine.agents();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 4);
         assert.equal(result[0].name(), "agent4");
         assert.equal(result[1].name(), "agent1");
         assert.equal(result[2].name(), "agent2");
         assert.equal(result[3].name(), "agent3");

         // Run.
         store.dispatch(Action.setFirstAgent(result[1]));
         result = engine.agents();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 4);
         assert.equal(result[0].name(), "agent1");
         assert.equal(result[1].name(), "agent2");
         assert.equal(result[2].name(), "agent3");
         assert.equal(result[3].name(), "agent4");
      });

      function createEngine(callback)
      {
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
            {
               agent: new SimpleAgent(store, "agent3"),
               playerDeck: PlayerDeckBuilder.CoreSpiritDeckBuilder.buildDeck(store),
            },
            {
               agent: new SimpleAgent(store, "agent4"),
               playerDeck: PlayerDeckBuilder.CoreTacticsDeckBuilder.buildDeck(store),
            },
          ];
         var environment = new Environment(store, scenarioDeck, playerData);

         return new Engine(store, environment, 10, callback);
      }
   });
