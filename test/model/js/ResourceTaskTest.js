"use strict";

define(["qunit", "redux", "artifact/js/GameMode",
  "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ResourceTask", "model/js/ScenarioDeckBuilder", "model/js/SimpleAgent"],
   function(QUnit, Redux, GameMode, Environment, PlayerDeckBuilder, Reducer, ResourceTask, ScenarioDeckBuilder, SimpleAgent)
   {
      QUnit.module("ResourceTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var agent = environment.agents().get(0);
         var callback = function()
         {
            // Verify.
            agent.heroDeck().forEach(function(cardInstance)
            {
               resources = store.getState().resources.get(cardInstance.id());
               var sphereKey = cardInstance.card().sphereKey;
               assert.equal(resources.get(sphereKey), 1);
            });
            agentHand = store.getState().agentHand.get(agent.id());
            assert.equal(agentHand.size, 1);
         };
         var task = new ResourceTask(store, agent, callback);
         var resources = store.getState().resources.get(agent.id());
         assert.equal(resources, undefined);
         var agentHand = store.getState().agentHand.get(agent.id());
         assert.equal(agentHand, undefined);

         // Run.
         task.doIt();
      });

      function createEnvironment()
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store, GameMode.EASY);
         var agent = new SimpleAgent(store, "agent");
         var playerData = [
            {
               agent: agent,
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
            },
         ];

         return new Environment(store, scenarioDeck, playerData);
      }
   });