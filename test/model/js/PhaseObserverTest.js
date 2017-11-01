"use strict";

define(["qunit", "redux", "artifact/js/Phase",
  "model/js/Action", "model/js/Agent", "model/js/Environment", "model/js/PhaseObserver", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, Phase,
      Action, Agent, Environment, PhaseObserver, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("PhaseObserver");

      QUnit.test("onChange()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var agent1 = environment.agents().first();
         var phaseKey = Phase.QUEST_START;
         var phaseCallback = function(phaseData)
         {
            // Verify.
            assert.equal(store.getState().phaseQueue.size, 0);
            assert.ok(phaseData);
            assert.equal(phaseData.get("phaseKey"), phaseKey);
            // assert.equal(phaseData.get("phaseAgent"), agent1);
         };
         store.dispatch(Action.enqueuePhase(phaseKey, agent1, phaseCallback));
         assert.equal(store.getState().phaseQueue.size, 1);

         // Run.
         PhaseObserver.observeStore(store);
      });

      function createEnvironment()
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

         return new Environment(store, scenarioDeck, playerData);
      }
   });
