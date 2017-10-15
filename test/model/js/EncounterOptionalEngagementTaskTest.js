"use strict";

define(["qunit", "redux", "artifact/js/CardType", "artifact/js/GameMode",
  "model/js/Action", "model/js/Environment", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/EncounterOptionalEngagementTask", "model/js/ScenarioDeckBuilder", "model/js/Agent"],
   function(QUnit, Redux, CardType, GameMode, Action, Environment, Game, PlayerDeckBuilder, Reducer, EncounterOptionalEngagementTask, ScenarioDeckBuilder, Agent)
   {
      QUnit.module("EncounterOptionalEngagementTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent1 = environment.agents().get(0);
         var agent2 = environment.agents().get(1);
         assert.equal(environment.stagingArea().size, 2);
         assert.equal(agent1.engagementArea().size, 0);
         assert.equal(agent2.engagementArea().size, 0);
         var task = new EncounterOptionalEngagementTask(store, agent1);
         var callback = function()
         {
            // Verify.
            // Agent doesn't optionally engage.
            assert.equal(environment.stagingArea().size, 2);
            assert.equal(agent1.engagementArea().size, 0);
            assert.equal(agent2.engagementArea().size, 0);
         };

         // Run.
         task.doIt(callback);
      });

      function createGame()
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store, GameMode.EASY);
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
            },
         ];

         return new Game(store, scenarioDeck, playerData);
      }
   });
