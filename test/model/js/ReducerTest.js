"use strict";

define(["immutable", "qunit", "redux", "artifact/js/HeroCard", "artifact/js/Sphere", "model/js/Action", "model/js/CardInstance", "model/js/Reducer", "model/js/SimpleAgent"],
   function(Immutable, QUnit, Redux, HeroCard, Sphere, Action, CardInstance, Reducer, SimpleAgent)
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
         assert.equal(store.getState().resources.get(cardInstance.id()), undefined);

         // Run.
         store.dispatch(Action.addCardResource(cardInstance, sphereKey));

         // Verify.
         assert.ok(store.getState().resources);
         assert.ok(store.getState().resources.get(cardInstance.id()));
         assert.equal(store.getState().resources.get(cardInstance.id()).get(sphereKey), 1);

         // Run.
         store.dispatch(Action.addCardResource(cardInstance, sphereKey, 5));

         // Verify.
         assert.equal(store.getState().resources.get(cardInstance.id()).get(sphereKey), 6);
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

      QUnit.test("setCardResource()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new SimpleAgent(store, "agent");
         var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
         store.dispatch(Action.setAgentHeroDeck(agent, heroDeck));
         var cardInstance = heroDeck[0];
         var sphereKey = cardInstance.card().sphereKey;
         assert.equal(store.getState().resources.get(cardInstance.id()), undefined);

         // Run.
         store.dispatch(Action.setCardResource(cardInstance, sphereKey));

         // Verify.
         assert.ok(store.getState().resources);
         assert.ok(store.getState().resources.get(cardInstance.id()));
         assert.equal(store.getState().resources.get(cardInstance.id()).get(sphereKey), 0);

         // Run.
         store.dispatch(Action.setCardResource(cardInstance, sphereKey, 5));

         // Verify.
         assert.equal(store.getState().resources.get(cardInstance.id()).get(sphereKey), 5);
      });
   });
