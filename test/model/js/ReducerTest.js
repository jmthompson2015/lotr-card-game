"use strict";

define(["immutable", "qunit", "redux", "artifact/js/HeroCard", "artifact/js/Sphere",
  "model/js/Action", "model/js/CardInstance", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/SimpleAgent"],
   function(Immutable, QUnit, Redux, HeroCard, Sphere, Action, CardInstance, Environment, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, SimpleAgent)
   {
      QUnit.module("Reducer");

      QUnit.test("incrementNextCardId()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         assert.equal(store.getState().nextCardId, 1);

         // Run.
         store.dispatch(Action.incrementNextCardId());

         // Verify.
         assert.equal(store.getState().nextCardId, 2);

         // Run.
         store.dispatch(Action.incrementNextCardId());

         // Verify.
         assert.equal(store.getState().nextCardId, 3);
      });

      QUnit.test("addCardResource()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new SimpleAgent(store, "agent");
         var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
         store.dispatch(Action.setAgentHeroDeck(agent, heroDeck));
         var cardInstance = heroDeck[0];
         var sphereKey = Sphere.LEADERSHIP;
         assert.equal(store.getState().cardResources.get(cardInstance.id()), undefined);

         // Run.
         store.dispatch(Action.addCardResource(cardInstance, sphereKey));

         // Verify.
         assert.ok(store.getState().cardResources);
         assert.ok(store.getState().cardResources.get(cardInstance.id()));
         assert.equal(store.getState().cardResources.get(cardInstance.id()).get(sphereKey), 1);

         // Run.
         store.dispatch(Action.addCardResource(cardInstance, sphereKey, 5));

         // Verify.
         assert.equal(store.getState().cardResources.get(cardInstance.id()).get(sphereKey), 6);
      });

      QUnit.test("addAgentThreat()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new SimpleAgent(store, "agent");
         assert.equal(store.getState().agentThreat.get(agent.id()), undefined);

         // Run.
         store.dispatch(Action.addAgentThreat(agent));

         // Verify.
         assert.equal(store.getState().agentThreat.get(agent.id()), 1);

         // Run.
         store.dispatch(Action.addAgentThreat(agent, 5));

         // Verify.
         assert.equal(store.getState().agentThreat.get(agent.id()), 6);
      });

      QUnit.test("agentEngageCard()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var agent = environment.agents().get(0);
         store.dispatch(Action.drawEncounterCard());
         store.dispatch(Action.drawEncounterCard());
         store.dispatch(Action.drawEncounterCard());
         var cardInstance = environment.stagingArea().get(0);
         assert.equal(store.getState().stagingArea.size, 3);
         assert.equal(store.getState().agentEngagementArea.size, 0);

         // Run.
         store.dispatch(Action.agentEngageCard(agent, cardInstance));

         // Verify.
         assert.equal(store.getState().stagingArea.size, 2);
         assert.equal(store.getState().agentEngagementArea.size, 1);
      });

      QUnit.test("drawEncounterCard()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
         assert.equal(store.getState().encounterDeck.size, 36);
         assert.equal(store.getState().stagingArea.size, 0);

         // Run.
         store.dispatch(Action.drawEncounterCard());

         // Verify.
         assert.equal(store.getState().encounterDeck.size, 35);
         assert.equal(store.getState().stagingArea.size, 1);
      });

      QUnit.test("drawEncounterCard() index", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
         assert.equal(store.getState().encounterDeck.size, 36);
         assert.equal(store.getState().stagingArea.size, 0);
         var index = 5;
         var cardInstance = store.getState().encounterDeck.get(index);

         // Run.
         store.dispatch(Action.drawEncounterCard(index));

         // Verify.
         assert.equal(store.getState().encounterDeck.size, 35);
         assert.equal(store.getState().stagingArea.size, 1);
         assert.equal(store.getState().stagingArea.get(0), cardInstance);
      });

      QUnit.test("setCardResource()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new SimpleAgent(store, "agent");
         var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
         store.dispatch(Action.setAgentHeroDeck(agent, heroDeck));
         var cardInstance = heroDeck[0];
         var sphereKey = cardInstance.card().sphereKey;
         assert.equal(store.getState().cardResources.get(cardInstance.id()), undefined);

         // Run.
         store.dispatch(Action.setCardResource(cardInstance, sphereKey));

         // Verify.
         assert.ok(store.getState().cardResources);
         assert.ok(store.getState().cardResources.get(cardInstance.id()));
         assert.equal(store.getState().cardResources.get(cardInstance.id()).get(sphereKey), 0);

         // Run.
         store.dispatch(Action.setCardResource(cardInstance, sphereKey, 5));

         // Verify.
         assert.equal(store.getState().cardResources.get(cardInstance.id()).get(sphereKey), 5);
      });

      function createEnvironment()
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
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
