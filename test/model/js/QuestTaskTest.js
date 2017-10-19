"use strict";

define(["qunit", "redux",
   "model/js/Action", "model/js/Agent", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/QuestTask", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, Action, Agent, Game, PlayerDeckBuilder, QuestTask, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("QuestTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var locations = environment.stagingLocations();
         store.dispatch(Action.setActiveLocation(locations.first()));
         assert.equal(store.getState().cardIsQuesting.size, 0);
         var task = new QuestTask(store);
         var callback = function()
         {
            // Verify.
            assert.equal(store.getState().cardIsQuesting.size, 2);
         };

         // Run.
         task.doIt(callback);
      });

      function createGame()
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
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
