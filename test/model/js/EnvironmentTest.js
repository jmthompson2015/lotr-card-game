"use strict";

define(["qunit", "redux", "artifact/js/GameMode",
  "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/SimpleAgent"],
   function(QUnit, Redux, GameMode, Environment, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, SimpleAgent)
   {
      QUnit.module("Environment");

      QUnit.test("Environment()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store, GameMode.EASY);
         var agent1 = new SimpleAgent(store, "agent1");
         var agent2 = new SimpleAgent(store, "agent2");
         var playerData = [
            {
               agent: agent1,
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
            },
            {
               agent: agent2,
               playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
            },
         ];

         // Run.
         var result = new Environment(store, scenarioDeck, playerData);

         // Verify.
         assert.ok(result);
         assert.ok(result.questDeck());
         assert.equal(result.questDeck().size, 6);
         assert.ok(result.encounterDeck());
         assert.equal(result.encounterDeck().size, 27);
      });

      QUnit.test("agents()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();

         // Run.
         var result = environment.agents();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 2);
         assert.equal(result.get(0).name(), "agent1");
         assert.equal(result.get(1).name(), "agent2");
      });

      function createEnvironment()
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store, GameMode.EASY);
         var agent1 = new SimpleAgent(store, "agent1");
         var agent2 = new SimpleAgent(store, "agent2");
         var playerData = [
            {
               agent: agent1,
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
            },
            {
               agent: agent2,
               playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
            },
         ];

         return new Environment(store, scenarioDeck, playerData);
      }
   });
