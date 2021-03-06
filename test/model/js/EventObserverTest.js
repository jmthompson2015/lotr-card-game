import GameEvent from "../../../src/artifact/js/GameEvent.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import EventObserver from "../../../src/model/js/EventObserver.js";
import Environment from "../../../src/model/js/Environment.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("EventObserver");

QUnit.test("onChange()", function(assert)
{
   // Setup.
   var environment = createEnvironment();
   var store = environment.store();
   var agent1 = environment.agents()[0];
   var eventKey = GameEvent.QUEST_CARD_DRAWN;
   var eventCallback = function(eventData)
   {
      // Verify.
      assert.equal(store.getState().eventQueue.length, 0);
      // store.getState().eventQueue.forEach(function(element, i)
      // {
      //    console.log(i + " " + JSON.stringify(element) + " token = " + element.get("eventToken"));
      // });
      assert.ok(eventData);
      assert.equal(eventData.eventKey, eventKey);
      // assert.equal(eventData.get("eventAgent"), agent1);
   };
   store.dispatch(Action.drawQuestCard());
   var questInstance = environment.activeQuest();
   var eventContext = {
      questInstance: questInstance,
   };
   store.dispatch(Action.enqueueEvent(eventKey, agent1, eventCallback, eventContext));
   assert.equal(store.getState().eventQueue.length, 1);

   // Run.
   EventObserver.observeStore(store);
});

function createEnvironment()
{
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   var agent1 = new Agent(store, "agent1");
   var agent2 = new Agent(store, "agent2");
   var playerData = [
      {
         agent: agent1,
         playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    },
      {
         agent: agent2,
         playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
    }, ];

   return new Environment(store, scenarioDeck, playerData);
}

var EventObserverTest = {};
export default EventObserverTest;