"use strict";

define(["redux", "artifact/js/GameMode", "model/js/EncounterDeckBuilder", "model/js/Reducer"],
   function(Redux, GameMode, EncounterDeckBuilder, Reducer)
   {
      QUnit.module("EncounterDeckBuilder");

      QUnit.test("buildDeck() Passage Through Mirkwood Easy", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var deckBuilder = EncounterDeckBuilder.PassageThroughMirkwoodDeckBuilder;
         assert.equal(deckBuilder.name(), "Passage Through Mirkwood (Core #1)");
         assert.equal(deckBuilder.year(), 2011);
         assert.equal(deckBuilder.description(), "Passage Through Mirkwood");

         // Run.
         var result = deckBuilder.buildDeck(store, GameMode.EASY);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 27);
      });

      QUnit.test("buildDeck() Passage Through Mirkwood Standard", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var deckBuilder = EncounterDeckBuilder.PassageThroughMirkwoodDeckBuilder;
         assert.equal(deckBuilder.name(), "Passage Through Mirkwood (Core #1)");
         assert.equal(deckBuilder.year(), 2011);
         assert.equal(deckBuilder.description(), "Passage Through Mirkwood");

         // Run.
         var result = deckBuilder.buildDeck(store);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 36);
      });

      QUnit.test("buildDeck() The Hunt for Gollum Easy", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var deckBuilder = EncounterDeckBuilder.TheHuntForGollumDeckBuilder;
         assert.equal(deckBuilder.name(), "The Hunt for Gollum");
         assert.equal(deckBuilder.year(), 2011);
         assert.equal(deckBuilder.description(), "The Hunt for Gollum");

         // Run.
         var result = deckBuilder.buildDeck(store, GameMode.EASY);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 34);
      });

      QUnit.test("buildDeck() The Hunt for Gollum Standard", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var deckBuilder = EncounterDeckBuilder.TheHuntForGollumDeckBuilder;
         assert.equal(deckBuilder.name(), "The Hunt for Gollum");
         assert.equal(deckBuilder.year(), 2011);
         assert.equal(deckBuilder.description(), "The Hunt for Gollum");

         // Run.
         var result = deckBuilder.buildDeck(store);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 48);
      });
   });
