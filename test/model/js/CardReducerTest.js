import HeroCard from "../../../src/artifact/js/HeroCard.js";
import LocationCard from "../../../src/artifact/js/LocationCard.js";
import AgentAction from "../../../src/model/js/AgentAction.js";
import CardAction from "../../../src/model/js/CardAction.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Reducer from "../../../src/model/js/Reducer.js";
import Agent from "../../../src/model/js/Agent.js";

QUnit.module("CardReducer");

QUnit.test("addPhaseBonusAttack()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
   assert.equal(store.getState().cardPhaseBonusAttack[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addPhaseBonusAttack(cardInstance));

   // Verify.
   assert.equal(store.getState().cardPhaseBonusAttack[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addPhaseBonusAttack(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardPhaseBonusAttack[cardInstance.id()], 6);
});

QUnit.test("addPhaseBonusDefense()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
   assert.equal(store.getState().cardPhaseBonusDefense[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addPhaseBonusDefense(cardInstance));

   // Verify.
   assert.equal(store.getState().cardPhaseBonusDefense[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addPhaseBonusDefense(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardPhaseBonusDefense[cardInstance.id()], 6);
});

QUnit.test("addPhaseBonusHitPoints()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
   assert.equal(store.getState().cardPhaseBonusHitPoints[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addPhaseBonusHitPoints(cardInstance));

   // Verify.
   assert.equal(store.getState().cardPhaseBonusHitPoints[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addPhaseBonusHitPoints(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardPhaseBonusHitPoints[cardInstance.id()], 6);
});

QUnit.test("addPhaseBonusThreat()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
   assert.equal(store.getState().cardPhaseBonusThreat[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addPhaseBonusThreat(cardInstance));

   // Verify.
   assert.equal(store.getState().cardPhaseBonusThreat[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addPhaseBonusThreat(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardPhaseBonusThreat[cardInstance.id()], 6);
});

QUnit.test("addPhaseBonusWillpower()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
   assert.equal(store.getState().cardPhaseBonusWillpower[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addPhaseBonusWillpower(cardInstance));

   // Verify.
   assert.equal(store.getState().cardPhaseBonusWillpower[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addPhaseBonusWillpower(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardPhaseBonusWillpower[cardInstance.id()], 6);
});

QUnit.test("addRoundBonusAttack()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
   assert.equal(store.getState().cardRoundBonusAttack[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addRoundBonusAttack(cardInstance));

   // Verify.
   assert.equal(store.getState().cardRoundBonusAttack[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addRoundBonusAttack(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardRoundBonusAttack[cardInstance.id()], 6);
});

QUnit.test("addRoundBonusDefense()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
   assert.equal(store.getState().cardRoundBonusDefense[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addRoundBonusDefense(cardInstance));

   // Verify.
   assert.equal(store.getState().cardRoundBonusDefense[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addRoundBonusDefense(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardRoundBonusDefense[cardInstance.id()], 6);
});

QUnit.test("addRoundBonusHitPoints()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
   assert.equal(store.getState().cardRoundBonusHitPoints[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addRoundBonusHitPoints(cardInstance));

   // Verify.
   assert.equal(store.getState().cardRoundBonusHitPoints[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addRoundBonusHitPoints(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardRoundBonusHitPoints[cardInstance.id()], 6);
});

QUnit.test("addRoundBonusThreat()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
   assert.equal(store.getState().cardRoundBonusThreat[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addRoundBonusThreat(cardInstance));

   // Verify.
   assert.equal(store.getState().cardRoundBonusThreat[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addRoundBonusThreat(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardRoundBonusThreat[cardInstance.id()], 6);
});

QUnit.test("addRoundBonusWillpower()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
   assert.equal(store.getState().cardRoundBonusWillpower[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.addRoundBonusWillpower(cardInstance));

   // Verify.
   assert.equal(store.getState().cardRoundBonusWillpower[cardInstance.id()], 1);

   // Run.
   store.dispatch(CardAction.addRoundBonusWillpower(cardInstance, 5));

   // Verify.
   assert.equal(store.getState().cardRoundBonusWillpower[cardInstance.id()], 6);
});

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

QUnit.test("clearPhaseBonuses()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
   store.dispatch(CardAction.addPhaseBonusAttack(cardInstance));
   store.dispatch(CardAction.addPhaseBonusDefense(cardInstance, 2));
   store.dispatch(CardAction.addPhaseBonusHitPoints(cardInstance, 3));
   store.dispatch(CardAction.addPhaseBonusThreat(cardInstance, 4));
   store.dispatch(CardAction.addPhaseBonusWillpower(cardInstance, 5));
   assert.equal(store.getState().cardPhaseBonusAttack[cardInstance.id()], 1);
   assert.equal(store.getState().cardPhaseBonusDefense[cardInstance.id()], 2);
   assert.equal(store.getState().cardPhaseBonusHitPoints[cardInstance.id()], 3);
   assert.equal(store.getState().cardPhaseBonusThreat[cardInstance.id()], 4);
   assert.equal(store.getState().cardPhaseBonusWillpower[cardInstance.id()], 5);

   // Run.
   store.dispatch(CardAction.clearPhaseBonuses(cardInstance));

   // Verify.
   assert.equal(store.getState().cardPhaseBonusAttack[cardInstance.id()], undefined);
   assert.equal(store.getState().cardPhaseBonusDefense[cardInstance.id()], undefined);
   assert.equal(store.getState().cardPhaseBonusHitPoints[cardInstance.id()], undefined);
   assert.equal(store.getState().cardPhaseBonusThreat[cardInstance.id()], undefined);
   assert.equal(store.getState().cardPhaseBonusWillpower[cardInstance.id()], undefined);
});

QUnit.test("clearRoundBonuses()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var cardInstance = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
   store.dispatch(CardAction.addRoundBonusAttack(cardInstance));
   store.dispatch(CardAction.addRoundBonusDefense(cardInstance, 2));
   store.dispatch(CardAction.addRoundBonusHitPoints(cardInstance, 3));
   store.dispatch(CardAction.addRoundBonusThreat(cardInstance, 4));
   store.dispatch(CardAction.addRoundBonusWillpower(cardInstance, 5));
   assert.equal(store.getState().cardRoundBonusAttack[cardInstance.id()], 1);
   assert.equal(store.getState().cardRoundBonusDefense[cardInstance.id()], 2);
   assert.equal(store.getState().cardRoundBonusHitPoints[cardInstance.id()], 3);
   assert.equal(store.getState().cardRoundBonusThreat[cardInstance.id()], 4);
   assert.equal(store.getState().cardRoundBonusWillpower[cardInstance.id()], 5);

   // Run.
   store.dispatch(CardAction.clearRoundBonuses(cardInstance));

   // Verify.
   assert.equal(store.getState().cardRoundBonusAttack[cardInstance.id()], undefined);
   assert.equal(store.getState().cardRoundBonusDefense[cardInstance.id()], undefined);
   assert.equal(store.getState().cardRoundBonusHitPoints[cardInstance.id()], undefined);
   assert.equal(store.getState().cardRoundBonusThreat[cardInstance.id()], undefined);
   assert.equal(store.getState().cardRoundBonusWillpower[cardInstance.id()], undefined);
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

QUnit.test("setUsed()", function(assert)
{
   // Setup.
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
   store.dispatch(AgentAction.setTableau(agent, heroDeck));
   var cardInstance = heroDeck[0];
   assert.equal(store.getState().cardIsUsed[cardInstance.id()], undefined);

   // Run.
   store.dispatch(CardAction.setUsed(cardInstance, true));

   // Verify.
   assert.equal(store.getState().cardIsUsed[cardInstance.id()], true);

   // Run.
   store.dispatch(CardAction.setUsed(cardInstance, false));

   // Verify.
   assert.equal(store.getState().cardIsUsed[cardInstance.id()], false);
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