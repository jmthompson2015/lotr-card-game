"use strict";

define(["qunit", "redux",
   "model/js/Action", "model/js/Agent", "model/js/CombatTask", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, Action, Agent, CombatTask, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("CombatTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent1 = environment.agentQueue()[0];
         var cardInstance = environment.stagingArea().get(0);
         store.dispatch(Action.agentEngageCard(agent1, cardInstance));
         assert.equal(store.getState().agentEngagementArea.get(agent1.id()).size, 1);
         var task = new CombatTask(store);
         var callback = function()
         {
            // Verify.
            assert.equal(store.getState().agentEngagementArea.get(agent1.id()).size, 1);
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
