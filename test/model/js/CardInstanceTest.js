"use strict";

define(["qunit", "redux", "artifact/js/AllyCard", "artifact/js/EnemyCard", "artifact/js/HeroCard", "artifact/js/LocationCard", "artifact/js/ObjectiveCard", "artifact/js/QuestCard", "artifact/js/Scenario", "artifact/js/Sphere",
  "model/js/Action", "model/js/Agent", "model/js/AgentAction", "model/js/CardAction", "model/js/CardInstance", "model/js/EventObserver", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, AllyCard, EnemyCard, HeroCard, LocationCard, ObjectiveCard, QuestCard, Scenario, Sphere, Action, Agent, AgentAction, CardAction, CardInstance, EventObserver, Environment, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("CardInstance");

      QUnit.test("CardInstance()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var cardKey = HeroCard.ARAGORN_CORE;
         var card = HeroCard.properties[cardKey];

         // Run.
         var result = new CardInstance(store, card);

         // Verify.
         assert.ok(result);
         assert.equal(result.id(), 1);
         assert.equal(result.card().key, cardKey);
         assert.equal(store.getState().cardInstances.size, 1);
      });

      QUnit.test("attack() Chieftain Ufthak", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var cardKey = EnemyCard.CHIEFTAIN_UFTHAK;
         var card = EnemyCard.properties[cardKey];
         var cardInstance = new CardInstance(store, card);

         // Run.
         var result = cardInstance.attack();

         // Verify.
         assert.equal(result, 3);

         // Run.
         store.dispatch(CardAction.addResource(cardInstance, Sphere.NEUTRAL, 1));
         result = cardInstance.attack();

         // Verify.
         assert.equal(result, 5);
      });

      QUnit.test("get()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var cardKey = HeroCard.ARAGORN_CORE;
         var card = HeroCard.properties[cardKey];
         var cardInstance = new CardInstance(store, card);
         assert.equal(store.getState().cardInstances.size, 1);

         // Run.
         var result = CardInstance.get(store, cardInstance.id());

         // Verify.
         assert.ok(result);
         assert.equal(result.id(), 1);
         assert.equal(result.card().key, cardKey);
         assert.equal(store.getState().cardInstances.size, 1);
      });

      QUnit.test("isEncounterType", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var cardInstance0 = new CardInstance(store, EnemyCard.properties[EnemyCard.BLACK_FOREST_BATS_PTM]);
         var cardInstance1 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
         var cardInstance2 = new CardInstance(store, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);

         // Run / Verify.
         assert.equal(cardInstance0.isEncounterType(), true);
         assert.equal(cardInstance1.isEncounterType(), false);
         assert.equal(cardInstance2.isEncounterType(), false);
      });

      QUnit.test("isPlayerType()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var cardInstance0 = new CardInstance(store, EnemyCard.properties[EnemyCard.BLACK_FOREST_BATS_PTM]);
         var cardInstance1 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
         var cardInstance2 = new CardInstance(store, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);

         // Run / Verify.
         assert.equal(cardInstance0.isPlayerType(), false);
         assert.equal(cardInstance1.isPlayerType(), true);
         assert.equal(cardInstance2.isPlayerType(), false);
      });

      QUnit.test("isQuestType", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var cardInstance0 = new CardInstance(store, EnemyCard.properties[EnemyCard.BLACK_FOREST_BATS_PTM]);
         var cardInstance1 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
         var cardInstance2 = new CardInstance(store, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);

         // Run / Verify.
         assert.equal(cardInstance0.isQuestType(), false);
         assert.equal(cardInstance1.isQuestType(), false);
         assert.equal(cardInstance2.isQuestType(), true);
      });

      QUnit.test("shadowCards()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
         var cardKey = HeroCard.ARAGORN_CORE;
         var card = HeroCard.properties[cardKey];
         var cardInstance = new CardInstance(store, card);

         // Run.
         var result = cardInstance.shadowCards();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 0);

         store.dispatch(Action.dealShadowCard(cardInstance));

         // Run.
         result = cardInstance.shadowCards();

         // Verify.
         assert.ok(result);
         assert.equal(result.size, 1);
      });

      QUnit.test("threat() The Hunt for Gollum", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.THE_HUNT_FOR_GOLLUM;
         var environment = createEnvironment(scenarioKey);
         var store = environment.store();
         var agent1 = environment.firstAgent();
         agent1.drawPlayerCard(AllyCard.FARAMIR);
         var cardInstance = agent1.hand().last();
         store.dispatch(AgentAction.playCard(agent1, cardInstance));
         assert.equal(environment.cardsInPlay().length, 8);
         var cardInstance0 = environment.firstCardInstance(LocationCard.THE_OLD_FORD);

         // Run.
         assert.ok(cardInstance0);
         assert.equal(cardInstance0.threat(), 1);
      });

      QUnit.test("threat() A Journey to Rhosgobel", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.A_JOURNEY_TO_RHOSGOBEL;
         var environment = createEnvironment(scenarioKey);
         //  var store = environment.store();
         //  var agent1 = environment.firstAgent();
         environment.drawEncounterCard(LocationCard.RHOSGOBEL);
         var cardInstance0 = environment.stagingArea().last();
         environment.drawEncounterCard(ObjectiveCard.ATHELAS);
         var cardInstance1 = environment.stagingArea().last();
         //  store.dispatch(AgentAction.playCard(agent1, cardInstance));
         //  assert.equal(environment.cardsInPlay().length, 8);
         //  var cardInstance0 = environment.firstCardInstance(LocationCard.THE_OLD_FORD);

         // Run.
         assert.ok(cardInstance0);
         assert.equal(cardInstance0.threat(), 2);
         assert.ok(cardInstance1);
         assert.equal(cardInstance1.threat(), 0);
      });

      function createEnvironment(scenarioKey)
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeckBuilder = ScenarioDeckBuilder.ScenarioDeckBuilder.findByScenario(scenarioKey);
         var scenarioDeck = scenarioDeckBuilder.buildDeck(store);
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

         var environment = new Environment(store, scenarioDeck, playerData);
         store.dispatch(Action.setFirstAgent(playerData[0].agent));
         playerData.forEach(function(data)
         {
            var agent = data.agent;
            for (var i = 0; i < 6; i++)
            {
               store.dispatch(AgentAction.drawPlayerCard(agent));
            }
         });
         store.dispatch(Action.drawQuestCard());
         EventObserver.observeStore(store);

         return environment;
      }
   });
