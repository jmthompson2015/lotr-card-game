"use strict";

define(["qunit", "redux",
  "model/js/Agent", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/PlanningTask", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, Agent, Game, PlayerDeckBuilder, PlanningTask, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("PlanningTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent1 = environment.agents().get(0);
         var agent2 = environment.agents().get(1);
         assert.equal(store.getState().agentHand.get(agent1.id()).size, 6);
         assert.equal(store.getState().agentHand.get(agent2.id()).size, 6);
         var task = new PlanningTask(store);
         var callback = function()
         {
            // Verify.
            assert.equal(store.getState().agentHand.get(agent1.id()).size, 6);
            assert.equal(store.getState().agentHand.get(agent2.id()).size, 6);
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
