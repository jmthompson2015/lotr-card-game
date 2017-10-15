"use strict";

define(["qunit", "redux", "artifact/js/CardType", "artifact/js/EnemyCard", "artifact/js/GameMode", "artifact/js/LocationCard",
  "model/js/Action", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/Agent"],
   function(QUnit, Redux, CardType, EnemyCard, GameMode, LocationCard, Action, Environment, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, Agent)
   {
      QUnit.module("Environment");

      QUnit.test("Environment()", function(assert)
      {
         // Setup.
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

         // Run.
         var result = new Environment(store, scenarioDeck, playerData);

         // Verify.
         assert.ok(result);
         assert.ok(result.questDeck());
         assert.equal(result.questDeck().size, 6);
         assert.ok(result.encounterDeck());
         assert.equal(result.encounterDeck().size, 27);
      });

      QUnit.test("agentQueue()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();

         // Run.
         var result = environment.agentQueue();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 2);
         assert.equal(result[0].name(), "agent1");
         assert.equal(result[1].name(), "agent2");

         // Run.
         var store = environment.store();
         store.dispatch(Action.setFirstAgent(result[1]));
         result = environment.agentQueue();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 2);
         assert.equal(result[0].name(), "agent2");
         assert.equal(result[1].name(), "agent1");

         // Run.
         store.dispatch(Action.setFirstAgent(result[1]));
         result = environment.agentQueue();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 2);
         assert.equal(result[0].name(), "agent1");
         assert.equal(result[1].name(), "agent2");
      });

      QUnit.test("agents()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();

         // Run.
         var result = environment.agents();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 2);
         assert.equal(result.get(0).name(), "agent1");
         assert.equal(result.get(1).name(), "agent2");
      });

      QUnit.test("drawEncounterCard()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         assert.equal(store.getState().encounterDeck.size, 27);
         assert.equal(store.getState().stagingArea.size, 0);

         // Run.
         environment.drawEncounterCard(EnemyCard.FOREST_SPIDER);

         // Verify.
         assert.equal(store.getState().encounterDeck.size, 26);
         assert.equal(store.getState().stagingArea.size, 1);
         assert.equal(environment.stagingArea().get(0).card().key, EnemyCard.FOREST_SPIDER);

         // Run.
         environment.drawEncounterCard(LocationCard.OLD_FOREST_ROAD);

         // Verify.
         assert.equal(store.getState().encounterDeck.size, 25);
         assert.equal(store.getState().stagingArea.size, 2);
         assert.equal(environment.stagingArea().get(0).card().key, EnemyCard.FOREST_SPIDER);
         assert.equal(environment.stagingArea().get(1).card().key, LocationCard.OLD_FOREST_ROAD);
      });

      QUnit.test("stagingArea()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         store.dispatch(Action.drawEncounterCard());

         // Run.
         var result = environment.stagingArea();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 1);

         // Run.
         store.dispatch(Action.drawEncounterCard());
         result = environment.stagingArea();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 2);
      });

      QUnit.test("stagingArea() Location", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         store.dispatch(Action.drawEncounterCard());
         var cardTypeKey = CardType.LOCATION;

         // Run.
         var result = environment.stagingArea(cardTypeKey);

         // Verify.
         assert.ok(result);
         result.forEach(function(cardInstance)
         {
            assert.equal(cardInstance.card().cardTypeKey, cardTypeKey);
         });

         // Run.
         store.dispatch(Action.drawEncounterCard());
         result = environment.stagingArea(cardTypeKey);

         // Verify.
         assert.ok(result);
         result.forEach(function(cardInstance)
         {
            assert.equal(cardInstance.card().cardTypeKey, cardTypeKey);
         });
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
