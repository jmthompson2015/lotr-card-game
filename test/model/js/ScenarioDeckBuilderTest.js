import GameMode from "../../../src/artifact/js/GameMode.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("ScenarioDeckBuilder");

QUnit.test("buildDeck() Passage Through Mirkwood Easy", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var deckBuilder = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder;
   assert.equal(deckBuilder.name(), "Passage Through Mirkwood (Core #1)");
   assert.equal(deckBuilder.year(), 2011);
   assert.equal(deckBuilder.description(), "Passage Through Mirkwood");

   // Run.
   var result = deckBuilder.buildDeck(store, GameMode.EASY);

   // Verify.
   assert.ok(result);
   var questInstances = result.questInstances;
   assert.ok(questInstances);
   assert.equal(questInstances.length, 6);
   var encounterInstances = result.encounterInstances;
   assert.ok(encounterInstances);
   assert.equal(encounterInstances.length, 27);
});

QUnit.test("buildDeck() Passage Through Mirkwood Standard", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var deckBuilder = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder;
   assert.equal(deckBuilder.name(), "Passage Through Mirkwood (Core #1)");
   assert.equal(deckBuilder.year(), 2011);
   assert.equal(deckBuilder.description(), "Passage Through Mirkwood");

   // Run.
   var result = deckBuilder.buildDeck(store);

   // Verify.
   assert.ok(result);
   var questInstances = result.questInstances;
   assert.ok(questInstances);
   assert.equal(questInstances.length, 6);
   var encounterInstances = result.encounterInstances;
   assert.ok(encounterInstances);
   assert.equal(encounterInstances.length, 36);
});

QUnit.test("buildDeck() The Hunt for Gollum Easy", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var deckBuilder = ScenarioDeckBuilder.TheHuntForGollumDeckBuilder;
   assert.equal(deckBuilder.name(), "The Hunt for Gollum (Shadows of Mirkwood #1)");
   assert.equal(deckBuilder.year(), 2011);
   assert.equal(deckBuilder.description(), "The Hunt for Gollum");

   // Run.
   var result = deckBuilder.buildDeck(store, GameMode.EASY);

   // Verify.
   assert.ok(result);
   var questInstances = result.questInstances;
   assert.ok(questInstances);
   assert.equal(questInstances.length, 6);
   var encounterInstances = result.encounterInstances;
   assert.ok(encounterInstances);
   assert.equal(encounterInstances.length, 34);
});

QUnit.test("buildDeck() The Hunt for Gollum Standard", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var deckBuilder = ScenarioDeckBuilder.TheHuntForGollumDeckBuilder;
   assert.equal(deckBuilder.name(), "The Hunt for Gollum (Shadows of Mirkwood #1)");
   assert.equal(deckBuilder.year(), 2011);
   assert.equal(deckBuilder.description(), "The Hunt for Gollum");

   // Run.
   var result = deckBuilder.buildDeck(store);

   // Verify.
   assert.ok(result);
   var questInstances = result.questInstances;
   assert.ok(questInstances);
   assert.equal(questInstances.length, 6);
   var encounterInstances = result.encounterInstances;
   assert.ok(encounterInstances);
   assert.equal(encounterInstances.length, 48);
});

var ScenarioDeckBuilderTest = {};
export default ScenarioDeckBuilderTest;