"use strict";

define(["qunit", "redux", "artifact/js/Sphere",
  "model/js/Action", "model/js/Agent", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/PlanningTask", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, Sphere, Action, Agent, Game, PlayerDeckBuilder, PlanningTask, Reducer, ScenarioDeckBuilder)
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
         store.dispatch(Action.addCardResource(agent1.tableauHeroes().get(0), Sphere.LEADERSHIP, 2));
         assert.equal(store.getState().agentHand.get(agent1.id()).size, 6);
         assert.equal(store.getState().agentTableau.get(agent1.id()).size, 3);
         assert.equal(store.getState().agentHand.get(agent2.id()).size, 6);
         assert.equal(store.getState().agentTableau.get(agent2.id()).size, 3);
         var task = new PlanningTask(store);
         var callback = function()
         {
            // Verify.
            var cardPlayed1 = agent1.tableau().last();
            assert.equal(store.getState().agentHand.get(agent1.id()).size, 5);
            assert.equal(store.getState().agentTableau.get(agent1.id()).size, 4);
            var expected = (2 - cardPlayed1.card().cost);
            assert.equal(agent1.resourceMap().get(Sphere.LEADERSHIP), expected, "agent1.resourceMap().get(Sphere.LEADERSHIP) === " + expected);
            assert.equal(store.getState().agentHand.get(agent2.id()).size, 6); // no resources to spend
            assert.equal(store.getState().agentTableau.get(agent2.id()).size, 3); // no resources to spend
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
