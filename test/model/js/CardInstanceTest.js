"use strict";

define(["qunit", "redux", "artifact/js/HeroCard", "model/js/Action", "model/js/CardInstance", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, HeroCard, Action, CardInstance, Reducer, ScenarioDeckBuilder)
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
   });
