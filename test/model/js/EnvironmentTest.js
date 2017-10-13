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

         assert.ok(result.agentHeroDeck(agent1));
         assert.equal(result.agentHeroDeck(agent1).size, 3, "result.agentHeroDeck(agent1).size === 3");
         assert.ok(result.agentPlayerDeck(agent1));
         assert.equal(result.agentPlayerDeck(agent1).size, 45, "result.agentPlayerDeck(agent1).size === 45");

         assert.ok(result.agentHeroDeck(agent2));
         assert.equal(result.agentHeroDeck(agent2).size, 3, "result.agentHeroDeck(agent2).size === 3");
         assert.ok(result.agentPlayerDeck(agent2));
         assert.equal(result.agentPlayerDeck(agent2).size, 45, "result.agentPlayerDeck(agent2).size === 45");
      });
   });
