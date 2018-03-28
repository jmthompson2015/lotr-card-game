import HeroCard from "../../../src/artifact/js/HeroCard.js";
import LocationCard from "../../../src/artifact/js/LocationCard.js";
import AgentAction from "../../../src/model/js/AgentAction.js";
import CardAction from "../../../src/model/js/CardAction.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Reducer from "../../../src/model/js/Reducer.js";
import Agent from "../../../src/model/js/Agent.js";

QUnit.module("CardReducer");

QUnit.test("addProgress()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
   assert.equal(store.getState().cardProgress[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addProgress(cardInstance));

   // Verify.
   assert.equal(store.getState().cardProgress[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addProgress(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardProgress[cardInstance.id()], 6);
});

QUnit.test("addResources()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   assert.equal(store.getState().cardResources[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addResources(cardInstance));

   // Verify.
   assert.ok(store.getState().cardResources);
   assert.ok(store.getState().cardResources[cardInstance.id()]);
   assert.equal(store.getState().cardResources[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addResources(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardResources[cardInstance.id()], 6);
});

QUnit.test("addWounds()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
   assert.equal(store.getState().cardResources[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addWounds(cardInstance));

   // Verify.
   assert.equal(store.getState().cardWounds[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addWounds(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardWounds[cardInstance.id()], 6);
});

QUnit.test("deleteFaceUp()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   store.dispatch(CardAction.setFaceUp(cardInstance, true));
   assert.equal(store.getState().cardIsFaceUp[cardInstance.id()], true);

   // Run.
   store.dispatch(CardAction.deleteFaceUp(cardInstance));

   // Verify.
   assert.equal(store.getState().cardIsFaceUp[cardInstance.id()], undefined);
});

QUnit.test("deleteProgress()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   store.dispatch(CardAction.setProgress(cardInstance, 5));
   assert.equal(store.getState().cardProgress[cardInstance.id()], 5);

   // Run.
   store.dispatch(CardAction.deleteProgress(cardInstance));

   // Verify.
   assert.equal(store.getState().cardProgress[cardInstance.id()], undefined);
});

QUnit.test("deleteQuesting()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   store.dispatch(CardAction.setQuesting(cardInstance, true));
   assert.equal(store.getState().cardIsQuesting[cardInstance.id()], true);

   // Run.
   store.dispatch(CardAction.deleteQuesting(cardInstance));

   // Verify.
   assert.equal(store.getState().cardIsQuesting[cardInstance.id()], undefined);
});

QUnit.test("deleteReady()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   store.dispatch(CardAction.setReady(cardInstance, true));
   assert.equal(store.getState().cardIsReady[cardInstance.id()], true);

   // Run.
   store.dispatch(CardAction.deleteReady(cardInstance));

   // Verify.
   assert.equal(store.getState().cardIsReady[cardInstance.id()], undefined);
});

QUnit.test("deleteResources()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   store.dispatch(CardAction.setResources(cardInstance, 5));
   assert.equal(store.getState().cardResources[cardInstance.id()], 5);

   // Run.
   store.dispatch(CardAction.deleteResources(cardInstance));

   // Verify.
   assert.equal(store.getState().cardResources[cardInstance.id()], undefined);
});

QUnit.test("deleteWounds()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   store.dispatch(CardAction.setWounds(cardInstance, 5));
   assert.equal(store.getState().cardWounds[cardInstance.id()], 5);

   // Run.
   store.dispatch(CardAction.deleteWounds(cardInstance));

   // Verify.
   assert.equal(store.getState().cardWounds[cardInstance.id()], undefined);
});

QUnit.test("incrementNextCardId()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   assert.equal(store.getState().nextCardId, 1);

   // Run.
   store.dispatch(CardAction.incrementNextCardId());

   // Verify.
   assert.equal(store.getState().nextCardId, 2);

   // Run.
   store.dispatch(CardAction.incrementNextCardId());

   // Verify.
   assert.equal(store.getState().nextCardId, 3);
});

QUnit.test("setFaceUp()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   assert.equal(store.getState().cardIsFaceUp[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.setFaceUp(cardInstance, true));

   // Verify.
   assert.equal(store.getState().cardIsFaceUp[cardInstance.id()], true);

   // Run.
   store.dispatch(CardAction.setFaceUp(cardInstance, false));

   // Verify.
   assert.equal(store.getState().cardIsFaceUp[cardInstance.id()], false);
});

QUnit.test("setProgress()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   assert.equal(store.getState().cardProgress[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.setProgress(cardInstance));

   // Verify.
   assert.equal(store.getState().cardProgress[cardInstance.id()], 0);

   // Run.
   store.dispatch(CardAction.setProgress(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardProgress[cardInstance.id()], 5);
});

QUnit.test("setQuesting()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   assert.equal(store.getState().cardIsQuesting[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.setQuesting(cardInstance, true));

   // Verify.
   assert.equal(store.getState().cardIsQuesting[cardInstance.id()], true);

   // Run.
   store.dispatch(CardAction.setQuesting(cardInstance, false));

   // Verify.
   assert.equal(store.getState().cardIsQuesting[cardInstance.id()], false);
});

QUnit.test("setReady()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   assert.equal(store.getState().cardIsReady[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.setReady(cardInstance, true));

   // Verify.
   assert.equal(store.getState().cardIsReady[cardInstance.id()], true);

   // Run.
   store.dispatch(CardAction.setReady(cardInstance, false));

   // Verify.
   assert.equal(store.getState().cardIsReady[cardInstance.id()], false);
});

QUnit.test("setResources()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   assert.equal(store.getState().cardResources[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.setResources(cardInstance));

   // Verify.
   assert.ok(store.getState().cardResources);
   assert.equal(store.getState().cardResources[cardInstance.id()], 0);

   // Run.
   store.dispatch(CardAction.setResources(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardResources[cardInstance.id()], 5);
});

QUnit.test("setWounds()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   assert.equal(store.getState().cardWounds[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.setWounds(cardInstance));

   // Verify.
   assert.equal(store.getState().cardWounds[cardInstance.id()], 0);

   // Run.
   store.dispatch(CardAction.setWounds(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardWounds[cardInstance.id()], 5);
});

var CardReducerTest = {};
export default CardReducerTest;