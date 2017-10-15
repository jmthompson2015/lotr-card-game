"use strict";

define(["qunit", "redux", "artifact/js/GameMode", "artifact/js/Sphere",
  "model/js/Action", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/Agent"],
   function(QUnit, Redux, GameMode, Sphere, Action, Environment, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, Agent)
   {
      QUnit.module("Agent");

      QUnit.test("Agent()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var name = "agent1";

         // Run.
         var result = new Agent(store, name);

         // Verify.
         assert.ok(result);
         assert.equal(result.id(), 1);
         assert.equal(result.name(), name);
      });

      QUnit.test("hand()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var agent1 = environment.agents().get(0);
         var store = environment.store();
         store.dispatch(Action.drawPlayerCard(agent1));
         var agent2 = environment.agents().get(1);
         store.dispatch(Action.drawPlayerCard(agent2));

         // Run.
         var result = agent1.hand();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 1);
         assert.equal(result.get(0).card().sphereKey, Sphere.LEADERSHIP);

         // Run.
         result = agent2.hand();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 1);
         assert.equal(result.get(0).card().sphereKey, Sphere.LORE);
      });

      QUnit.test("heroDeck()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var agent1 = environment.agents().get(0);
         var agent2 = environment.agents().get(1);

         // Run.
         var result = agent1.heroDeck();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 3);
         assert.equal(result.get(0).card().name, "Aragorn");
         assert.equal(result.get(1).card().name, "Glóin");
         assert.equal(result.get(2).card().name, "Théodred");

         // Run.
         result = agent2.heroDeck();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 3);
         assert.equal(result.get(0).card().name, "Beravor");
         assert.equal(result.get(1).card().name, "Denethor");
         assert.equal(result.get(2).card().name, "Glorfindel");
      });

      QUnit.test("playerDeck()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var agent1 = environment.agents().get(0);
         var agent2 = environment.agents().get(1);

         // Run.
         var result = agent1.playerDeck();

         // Verify.
         assert.ok(result);
         var length = 45;
         assert.equal(result.size, length);
         var i;
         for (i = 0; i < length; i++)
         {
            assert.equal(result.get(i).card().sphereKey, Sphere.LEADERSHIP);
         }

         // Run.
         result = agent2.playerDeck();

         // Verify.
         assert.ok(result);
         length = 45;
         assert.equal(result.size, length);
         for (i = 0; i < length; i++)
         {
            assert.equal(result.get(i).card().sphereKey, Sphere.LORE);
         }
      });

      function createEnvironment()
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store, GameMode.EASY);
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
