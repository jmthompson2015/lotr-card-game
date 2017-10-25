"use strict";

define(["qunit", "redux", "artifact/js/HeroCard", "artifact/js/Sphere",
  "model/js/Action", "model/js/AgentAction", "model/js/CardAction", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/Agent"],
   function(QUnit, Redux, HeroCard, Sphere, Action, AgentAction, CardAction, Environment, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, Agent)
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

      QUnit.test("attackers()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var agent0 = environment.agents().get(0);
         var agent1 = environment.agents().get(1);

         // Run.
         var result = agent0.attackers();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 3);
         var i = 0;
         assert.equal(result.get(i++).card().key, HeroCard.ARAGORN_CORE);
         assert.equal(result.get(i++).card().key, HeroCard.GLOIN);
         assert.equal(result.get(i++).card().key, HeroCard.THEODRED);

         // Run.
         result = agent1.attackers();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 3);
         i = 0;
         assert.equal(result.get(i++).card().key, HeroCard.GLORFINDEL_CORE);
         assert.equal(result.get(i++).card().key, HeroCard.BERAVOR);
         assert.equal(result.get(i++).card().key, HeroCard.DENETHOR);
      });

      QUnit.test("defenders()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var agent0 = environment.agents().get(0);
         var agent1 = environment.agents().get(1);

         // Run.
         var result = agent0.defenders();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 3);
         var i = 0;
         assert.equal(result.get(i++).card().key, HeroCard.ARAGORN_CORE);
         assert.equal(result.get(i++).card().key, HeroCard.GLOIN);
         assert.equal(result.get(i++).card().key, HeroCard.THEODRED);

         // Run.
         result = agent1.defenders();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 3);
         i = 0;
         assert.equal(result.get(i++).card().key, HeroCard.DENETHOR);
         assert.equal(result.get(i++).card().key, HeroCard.BERAVOR);
         assert.equal(result.get(i++).card().key, HeroCard.GLORFINDEL_CORE);
      });

      QUnit.test("hand()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var agent1 = environment.agents().get(0);
         var store = environment.store();
         store.dispatch(AgentAction.drawPlayerCard(agent1));
         var agent2 = environment.agents().get(1);
         store.dispatch(AgentAction.drawPlayerCard(agent2));

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

      QUnit.test("questers()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var agent0 = environment.agents().get(0);
         var agent1 = environment.agents().get(1);

         // Run.
         var result = agent0.questers();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 3);
         var i = 0;
         assert.equal(result.get(i++).card().key, HeroCard.ARAGORN_CORE);
         assert.equal(result.get(i++).card().key, HeroCard.GLOIN);
         assert.equal(result.get(i++).card().key, HeroCard.THEODRED);

         // Run.
         result = agent1.questers();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 3);
         i = 0;
         assert.equal(result.get(i++).card().key, HeroCard.GLORFINDEL_CORE);
         assert.equal(result.get(i++).card().key, HeroCard.BERAVOR);
         assert.equal(result.get(i++).card().key, HeroCard.DENETHOR);
      });

      QUnit.test("resourceMap()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var agent1 = environment.agents().get(0);
         var store = environment.store();
         var heroes = agent1.tableauHeroes();
         store.dispatch(CardAction.addResource(heroes.get(0), Sphere.LEADERSHIP, 1));
         store.dispatch(CardAction.addResource(heroes.get(1), Sphere.LEADERSHIP, 2));
         store.dispatch(CardAction.addResource(heroes.get(2), Sphere.LEADERSHIP, 3));

         // Run.
         var result = agent1.resourceMap();

         // Verify.
         assert.ok(result);
         assert.equal(result.get(Sphere.LEADERSHIP), 6);
         assert.equal(result.get(Sphere.LORE), 0);
         assert.equal(result.get(Sphere.SPIRIT), 0);
         assert.equal(result.get(Sphere.TACTICS), 0);
      });

      QUnit.test("tableauHeroes()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var agent1 = environment.agents().get(0);
         var agent2 = environment.agents().get(1);

         // Run.
         var result = agent1.tableauHeroes();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 3);
         assert.equal(result.get(0).card().name, "Aragorn");
         assert.equal(result.get(1).card().name, "Glóin");
         assert.equal(result.get(2).card().name, "Théodred");

         // Run.
         result = agent2.tableauHeroes();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 3);
         assert.equal(result.get(0).card().name, "Beravor");
         assert.equal(result.get(1).card().name, "Denethor");
         assert.equal(result.get(2).card().name, "Glorfindel");
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
