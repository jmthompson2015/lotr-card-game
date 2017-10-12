"use strict";

define(["qunit", "redux", "artifact/js/HeroCard", "model/js/CardInstance", "model/js/Reducer"],
   function(QUnit, Redux, HeroCard, CardInstance, Reducer)
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
   });
