"use strict";

define(["qunit", "redux",
  "model/js/Action", "model/js/Agent", "model/js/CombatAttackTask", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, Action, Agent, CombatAttackTask, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("CombatAttackTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent1 = environment.agents().get(0);
         var task = new CombatAttackTask(store, agent1);
         var callback = function()
         {
            // Verify.
            assert.ok(store.getState().encounterDiscard.size >= 0);
            assert.equal(store.getState().cardShadowCards.size, 0);
         };

         // Run.
         task.doIt(callback);
      });

      function createGame()
      {
         var store = Redux.createStore(Reducer.root);
         store.dispatch(Action.setDelay(10));
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
