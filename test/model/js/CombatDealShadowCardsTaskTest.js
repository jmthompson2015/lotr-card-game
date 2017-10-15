"use strict";

define(["qunit", "redux",
  "model/js/Agent", "model/js/CombatDealShadowCardsTask", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, Agent, CombatDealShadowCardsTask, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("CombatDealShadowCardsTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent1 = environment.agents().get(0);
         var task = new CombatDealShadowCardsTask(store, agent1);
         var callback = function()
         {
            // Verify.
            assert.equal(store.getState().encounterDiscard.size, 0);
            assert.ok(store.getState().cardShadowCard.size >= 0);
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
