import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";

QUnit.module("PlayerDeckBuilder");

QUnit.test("buildDeck() Beorn's Path #1", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var deckBuilder = PlayerDeckBuilder.BeornsPath1DeckBuilder;
   assert.equal(deckBuilder.name(), "Beorn's Path #1");
   assert.equal(deckBuilder.year(), 2013);
   assert.equal(deckBuilder.description(), "Leadership/Lore");

   // Run.
   var result = deckBuilder.buildDeck(store);

   // Verify.
   assert.ok(result);
   var heroInstances = result.heroInstances;
   assert.ok(heroInstances);
   assert.equal(heroInstances.length, 3);
   var playerInstances = result.playerInstances;
   assert.ok(playerInstances);
   assert.equal(playerInstances.length, 40);
});

QUnit.test("buildDeck() Beorn's Path #2", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var deckBuilder = PlayerDeckBuilder.BeornsPath2DeckBuilder;
   assert.equal(deckBuilder.name(), "Beorn's Path #2");
   assert.equal(deckBuilder.year(), 2013);
   assert.equal(deckBuilder.description(), "Spirit/Tactics");

   // Run.
   var result = deckBuilder.buildDeck(store);

   // Verify.
   assert.ok(result);
   var heroInstances = result.heroInstances;
   assert.ok(heroInstances);
   assert.equal(heroInstances.length, 3);
   var playerInstances = result.playerInstances;
   assert.ok(playerInstances);
   assert.equal(playerInstances.length, 40);
});

QUnit.test("buildDeck() Core Leadership", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var deckBuilder = PlayerDeckBuilder.CoreLeadershipDeckBuilder;
   assert.equal(deckBuilder.name(), "Core Leadership");
   assert.equal(deckBuilder.year(), 2011);
   assert.equal(deckBuilder.description(), "Leadership");

   // Run.
   var result = deckBuilder.buildDeck(store);

   // Verify.
   assert.ok(result);
   var heroInstances = result.heroInstances;
   assert.ok(heroInstances);
   assert.equal(heroInstances.length, 3);
   var playerInstances = result.playerInstances;
   assert.ok(playerInstances);
   assert.equal(playerInstances.length, 45);
});

QUnit.test("buildDeck() Core Lore", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var deckBuilder = PlayerDeckBuilder.CoreLoreDeckBuilder;
   assert.equal(deckBuilder.name(), "Core Lore");
   assert.equal(deckBuilder.year(), 2011);
   assert.equal(deckBuilder.description(), "Lore");

   // Run.
   var result = deckBuilder.buildDeck(store);

   // Verify.
   assert.ok(result);
   var heroInstances = result.heroInstances;
   assert.ok(heroInstances);
   assert.equal(heroInstances.length, 3);
   var playerInstances = result.playerInstances;
   assert.ok(playerInstances);
   assert.equal(playerInstances.length, 45);
});

QUnit.test("buildDeck() Core Spirit", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var deckBuilder = PlayerDeckBuilder.CoreSpiritDeckBuilder;
   assert.equal(deckBuilder.name(), "Core Spirit");
   assert.equal(deckBuilder.year(), 2011);
   assert.equal(deckBuilder.description(), "Spirit");

   // Run.
   var result = deckBuilder.buildDeck(store);

   // Verify.
   assert.ok(result);
   var heroInstances = result.heroInstances;
   assert.ok(heroInstances);
   assert.equal(heroInstances.length, 3);
   var playerInstances = result.playerInstances;
   assert.ok(playerInstances);
   assert.equal(playerInstances.length, 45);
});

QUnit.test("buildDeck() Core Tactics", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var deckBuilder = PlayerDeckBuilder.CoreTacticsDeckBuilder;
   assert.equal(deckBuilder.name(), "Core Tactics");
   assert.equal(deckBuilder.year(), 2011);
   assert.equal(deckBuilder.description(), "Tactics");

   // Run.
   var result = deckBuilder.buildDeck(store);

   // Verify.
   assert.ok(result);
   var heroInstances = result.heroInstances;
   assert.ok(heroInstances);
   assert.equal(heroInstances.length, 3);
   var playerInstances = result.playerInstances;
   assert.ok(playerInstances);
   assert.equal(playerInstances.length, 45);
});

var PlayerDeckBuilderTest = {};
export default PlayerDeckBuilderTest;