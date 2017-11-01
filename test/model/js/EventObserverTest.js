"use strict";

define(["immutable", "qunit", "redux", "artifact/js/GameEvent", "model/js/Action", "model/js/Agent", "model/js/EventObserver", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(Immutable, QUnit, Redux, GameEvent, Action, Agent, EventObserver, Environment, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("EventObserver");

      QUnit.test("onChange()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var agent1 = environment.agents().first();
         var eventKey = GameEvent.QUEST_CARD_DRAWN;
         var eventCallback = function(eventData)
         {
            // Verify.
            assert.equal(store.getState().eventQueue.size, 0);
            // store.getState().eventQueue.forEach(function(element, i)
            // {
            //    console.log(i + " " + JSON.stringify(element) + " token = " + element.get("eventToken"));
            // });
            assert.ok(eventData);
            assert.equal(eventData.get("eventKey"), eventKey);
            // assert.equal(eventData.get("eventAgent"), agent1);
         };
         store.dispatch(Action.drawQuestCard());
         var questInstance = environment.activeQuest();
         var eventContext = Immutable.Map(
         {
            questInstance: questInstance,
         });
         store.dispatch(Action.enqueueEvent(eventKey, agent1, eventCallback, eventContext));
         assert.equal(store.getState().eventQueue.size, 1);

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
                  },
               ];

         return new Environment(store, scenarioDeck, playerData);
      }
   });
