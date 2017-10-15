"use strict";

define(["qunit", "redux", "artifact/js/CardType", "artifact/js/GameMode",
  "model/js/Action", "model/js/Environment", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/RefreshTask", "model/js/ScenarioDeckBuilder", "model/js/SimpleAgent"],
   function(QUnit, Redux, CardType, GameMode, Action, Environment, Game, PlayerDeckBuilder, Reducer, RefreshTask, ScenarioDeckBuilder, SimpleAgent)
   {
      QUnit.module("RefreshTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent1 = environment.agents().get(0);
         var agent2 = environment.agents().get(1);
         store.dispatch(Action.drawPlayerCard(agent1));
         store.dispatch(Action.drawPlayerCard(agent1));
         store.dispatch(Action.drawPlayerCard(agent1));
         store.dispatch(Action.drawPlayerCard(agent2));
         store.dispatch(Action.drawPlayerCard(agent2));
         store.dispatch(Action.drawPlayerCard(agent2));
         agent1.tableau().forEach(function(cardInstance)
         {
            store.dispatch(Action.setCardExhausted(cardInstance, true));
         });
         agent2.tableau().forEach(function(cardInstance)
         {
            store.dispatch(Action.setCardExhausted(cardInstance, true));
         });
         assert.equal(agent1.threatLevel(), 29);
         assert.equal(agent2.threatLevel(), 30);
         assert.equal(store.getState().firstAgentId, 1);
         var callback = function()
         {
            // Verify.
            agent1.tableau().forEach(function(cardInstance)
            {
               assert.ok(!cardInstance.isExhausted());
            });
            agent2.tableau().forEach(function(cardInstance)
            {
               assert.ok(cardInstance.isExhausted());
            });
            assert.equal(agent1.threatLevel(), 30);
            assert.equal(agent2.threatLevel(), 30);
            assert.equal(store.getState().firstAgentId, 2);
         };
         var task = new RefreshTask(store, agent1, callback);

         // Run.
         task.doIt();
      });

      function createGame()
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

         return new Game(store, scenarioDeck, playerData);
      }
   });
