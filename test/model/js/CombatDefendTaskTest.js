"use strict";

define(["qunit", "redux",
  "model/js/Action", "model/js/Agent", "model/js/CombatDefendTask", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, Action, Agent, CombatDefendTask, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("CombatDefendTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent1 = environment.agents().get(0);
         var enemies = environment.stagingEnemies();
         store.dispatch(Action.agentEngageCard(agent1, enemies.first()));
         var task = new CombatDefendTask(store, agent1);
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
