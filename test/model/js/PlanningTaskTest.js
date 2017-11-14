"use strict";

define(["qunit", "redux", "artifact/js/Sphere",
   "model/js/Action", "model/js/Agent", "model/js/CardAction", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/PlanningTask", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, Sphere, Action, Agent, CardAction, Game, PlayerDeckBuilder, PlanningTask, Reducer, ScenarioDeckBuilder)
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
         store.dispatch(CardAction.addResources(agent1.tableauHeroes().get(0), 2));
         var agent1BeforeHandSize = store.getState().agentHand.get(agent1.id()).size;
         assert.equal(store.getState().agentHand.get(agent1.id()).size, 6);
         assert.equal(store.getState().agentTableau.get(agent1.id()).size, 3);
         assert.equal(store.getState().agentHand.get(agent2.id()).size, 6);
         assert.equal(store.getState().agentTableau.get(agent2.id()).size, 3);
         var task = new PlanningTask(store);
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            var agent1AfterHandSize = store.getState().agentHand.get(agent1.id()).size;
            var cardPlayed0, cardPlayed1, expected;
            if (agent1BeforeHandSize - agent1AfterHandSize === 1)
            {
               assert.equal(agent1BeforeHandSize - agent1AfterHandSize, 1, "one card");
               cardPlayed1 = agent1.tableau().last();
               assert.equal(store.getState().agentHand.get(agent1.id()).size, 5, "agent1 hand size === 5 (one card)");
               assert.equal(store.getState().agentTableau.get(agent1.id()).size, 4, "agent1 tableau size === 4 (one card)");
               expected = (2 - cardPlayed1.card().cost);
               assert.equal(agent1.resourceMap().get(Sphere.LEADERSHIP), expected, "agent1.resourceMap().get(Sphere.LEADERSHIP) === " + expected);
            }
            else if (agent1BeforeHandSize - agent1AfterHandSize === 2)
            {
               assert.equal(agent1BeforeHandSize - agent1AfterHandSize, 2, "two cards");
               cardPlayed0 = agent1.tableau().get(agent1.tableau().size - 2);
               cardPlayed1 = agent1.tableau().last();
               assert.equal(store.getState().agentHand.get(agent1.id()).size, 4, "agent1 hand size === 4 (two cards)");
               assert.equal(store.getState().agentTableau.get(agent1.id()).size, 5, "agent1 tableau size === 5 (two cards)");
               expected = (2 - cardPlayed0.card().cost - cardPlayed1.card().cost);
               assert.equal(agent1.resourceMap().get(Sphere.LEADERSHIP), expected, "agent1.resourceMap().get(Sphere.LEADERSHIP) === " + expected);
            }
            else
            {
               assert.equal(agent1BeforeHandSize - agent1AfterHandSize, 3, "three cards");
               cardPlayed0 = agent1.tableau().get(agent1.tableau().size - 3);
               cardPlayed1 = agent1.tableau().get(agent1.tableau().size - 2);
               var cardPlayed2 = agent1.tableau().last();
               assert.equal(store.getState().agentHand.get(agent1.id()).size, 3, "agent1 hand size === 3 (three cards)");
               assert.equal(store.getState().agentTableau.get(agent1.id()).size, 6, "agent1 tableau size === 6 (three cards)");
               expected = (2 - cardPlayed0.card().cost - cardPlayed1.card().cost - cardPlayed2.card().cost);
               assert.equal(agent1.resourceMap().get(Sphere.LEADERSHIP), expected, "agent1.resourceMap().get(Sphere.LEADERSHIP) === " + expected);
            }

            assert.equal(store.getState().agentHand.get(agent2.id()).size, 6); // no resources to spend
            assert.equal(store.getState().agentTableau.get(agent2.id()).size, 3); // no resources to spend
            done();
         };

         // Run.
         var done = assert.async();
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
