"use strict";

define(["qunit", "redux", "artifact/js/AllyCard", "artifact/js/AttachmentCard", "artifact/js/HeroCard", "artifact/js/LocationCard", "artifact/js/Scenario",
  "model/js/Action", "model/js/Agent", "model/js/AgentAction", "model/js/CardInstance", "model/js/EventObserver", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, AllyCard, AttachmentCard, HeroCard, LocationCard, Scenario, Action, Agent, AgentAction, CardInstance, EventObserver, Environment, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder)
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

      QUnit.test("threat()", function(assert)
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
