"use strict";

define(["redux", "model/js/QuestDeckBuilder", "model/js/Reducer"],
   function(Redux, QuestDeckBuilder, Reducer)
   {
      QUnit.module("QuestDeckBuilder");

      QUnit.test("buildDeck() Passage Through Mirkwood", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var deckBuilder = QuestDeckBuilder.PassageThroughMirkwoodDeckBuilder;
         assert.equal(deckBuilder.name(), "Passage Through Mirkwood (Core #1)");
         assert.equal(deckBuilder.year(), 2011);
         assert.equal(deckBuilder.description(), "Passage Through Mirkwood");

         // Run.
         var result = deckBuilder.buildDeck(store);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 6);
      });

      QUnit.test("buildDeck() The Hunt for Gollum", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var deckBuilder = QuestDeckBuilder.TheHuntForGollumDeckBuilder;
         assert.equal(deckBuilder.name(), "The Hunt for Gollum");
         assert.equal(deckBuilder.year(), 2011);
         assert.equal(deckBuilder.description(), "The Hunt for Gollum");

         // Run.
         var result = deckBuilder.buildDeck(store);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 6);
      });
   });
