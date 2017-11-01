"use strict";

define(["immutable", "qunit", "redux", "artifact/js/EnemyCard", "artifact/js/GameEvent", "artifact/js/Phase",
  "model/js/Action", "model/js/CardInstance", "model/js/Environment", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/Agent"],
   function(Immutable, QUnit, Redux, EnemyCard, GameEvent, Phase, Action, CardInstance, Environment, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, Agent)
   {
      QUnit.module("Reducer");

      QUnit.test("agentEngageCard()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         var agent = environment.agents().get(0);
         store.dispatch(Action.drawEncounterCard());
         store.dispatch(Action.drawEncounterCard());
         store.dispatch(Action.drawEncounterCard());
         var cardInstance = environment.stagingArea().get(0);
         assert.equal(store.getState().stagingArea.size, 3);
         assert.equal(store.getState().agentEngagementArea.size, 0);

         // Run.
         store.dispatch(Action.agentEngageCard(agent, cardInstance));

         // Verify.
         assert.equal(store.getState().stagingArea.size, 2);
         assert.equal(store.getState().agentEngagementArea.size, 1);
      });

      QUnit.test("dealShadowCard() index", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
         var cardInstance = new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
         assert.equal(store.getState().encounterDeck.size, 36);
         assert.equal(store.getState().cardShadowCards.size, 0);
         var enemyId = store.getState().encounterDeck.first();

         // Run.
         store.dispatch(Action.dealShadowCard(cardInstance));

         // Verify.
         assert.equal(store.getState().encounterDeck.size, 35);
         assert.equal(store.getState().cardShadowCards.size, 1);
         var shadowCardIds = store.getState().cardShadowCards.get(cardInstance.id());
         assert.equal(shadowCardIds.size, 1);
         assert.equal(shadowCardIds.get(0), enemyId);
      });

      QUnit.test("dequeueEvent()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         //  var agent1 = new Agent(store, "agent1");
         //  var agent2 = new Agent(store, "agent2");
         var context;
         var callback = function() {};
         store.dispatch(Action.enqueueEvent(GameEvent.QUEST_CARD_DRAWN, context, callback));
         store.dispatch(Action.enqueueEvent(GameEvent.CARD_DRAWN, context, callback));
         assert.equal(store.getState().eventQueue.size, 2);
         var eventData0 = store.getState().eventQueue.get(0);
         assert.ok(eventData0);
         assert.equal(eventData0.get("eventKey"), GameEvent.QUEST_CARD_DRAWN);
         //  assert.equal(eventData0.get("eventAgent").id(), agent1.id());
         var eventData1 = store.getState().eventQueue.get(1);
         assert.ok(eventData1);
         assert.equal(eventData1.get("eventKey"), GameEvent.CARD_DRAWN);
         //  assert.equal(eventData1.get("eventAgent").id(), agent2.id());

         // Run.
         store.dispatch(Action.dequeueEvent());

         // Verify.
         assert.equal(store.getState().eventQueue.size, 1);
         eventData0 = store.getState().eventQueue.get(0);
         assert.ok(eventData0);
         assert.equal(eventData0.get("eventKey"), GameEvent.CARD_DRAWN);
         //  assert.equal(eventData0.get("eventAgent"), agent2);

         // Run.
         store.dispatch(Action.dequeueEvent());

         // Verify.
         assert.equal(store.getState().eventQueue.size, 0);
      });

      QUnit.test("dequeuePhase()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         //  var agent1 = new Agent(store, "agent1");
         //  var agent2 = new Agent(store, "agent2");
         store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END));
         store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_ENGAGEMENT_CHECK_START));
         assert.equal(store.getState().phaseQueue.size, 2);
         var phaseData0 = store.getState().phaseQueue.get(0);
         assert.ok(phaseData0);
         assert.equal(phaseData0.get("phaseKey"), Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END);
         //  assert.equal(phaseData0.get("phaseAgent").id(), agent1.id());
         var phaseData1 = store.getState().phaseQueue.get(1);
         assert.ok(phaseData1);
         assert.equal(phaseData1.get("phaseKey"), Phase.ENCOUNTER_ENGAGEMENT_CHECK_START);
         //  assert.equal(phaseData1.get("phaseAgent").id(), agent2.id());

         // Run.
         store.dispatch(Action.dequeuePhase());

         // Verify.
         assert.equal(store.getState().phaseQueue.size, 1);
         phaseData0 = store.getState().phaseQueue.get(0);
         assert.ok(phaseData0);
         assert.equal(phaseData0.get("phaseKey"), Phase.ENCOUNTER_ENGAGEMENT_CHECK_START);
         //  assert.equal(phaseData0.get("phaseAgent").id(), agent2.id());

         // Run.
         store.dispatch(Action.dequeuePhase());

         // Verify.
         assert.equal(store.getState().phaseQueue.size, 0);
      });

      QUnit.test("discardActiveLocation()", function(assert)
      {
         // Setup.
         var game = createGame();
         var store = game.store();
         var environment = game.engine().environment();
         var cardInstance = environment.stagingArea().get(1);
         store.dispatch(Action.setActiveLocation(cardInstance));
         assert.ok(store.getState().activeLocationId > 0);
         assert.equal(store.getState().encounterDiscard.size, 0);

         // Run.
         store.dispatch(Action.discardActiveLocation());

         // Verify.
         assert.equal(store.getState().activeLocationId, undefined);
         assert.equal(store.getState().encounterDiscard.size, 1);
         assert.equal(store.getState().encounterDiscard.get(0), cardInstance.id());
      });

      QUnit.test("discardActiveQuest()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         store.dispatch(Action.setQuestDeck(scenarioDeck.questInstances));
         store.dispatch(Action.drawQuestCard());
         assert.equal(store.getState().questDeck.size, 5);
         assert.equal(store.getState().activeQuestId, 1);
         assert.equal(store.getState().questDiscard.size, 0);

         // Run.
         store.dispatch(Action.discardActiveQuest());

         // Verify.
         assert.equal(store.getState().questDeck.size, 5);
         assert.equal(store.getState().activeQuestId, undefined);
         assert.equal(store.getState().questDiscard.size, 1);
      });

      QUnit.test("discardShadowCard()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
         var cardInstance = new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
         var enemyId = store.getState().encounterDeck.first();
         var shadowInstance = CardInstance.get(store, enemyId);
         store.dispatch(Action.dealShadowCard(cardInstance));
         assert.equal(store.getState().encounterDeck.size, 35);
         assert.equal(store.getState().encounterDiscard.size, 0);
         assert.equal(store.getState().cardShadowCards.size, 1);
         var shadowCardIds = store.getState().cardShadowCards.get(cardInstance.id());
         assert.equal(shadowCardIds.size, 1);
         assert.equal(shadowCardIds.get(0), enemyId);

         // Run.
         store.dispatch(Action.discardShadowCard(cardInstance, shadowInstance));

         // Verify.
         assert.equal(store.getState().encounterDeck.size, 35);
         assert.equal(store.getState().encounterDiscard.size, 1);
         assert.equal(store.getState().cardShadowCards.size, 1);
         shadowCardIds = store.getState().cardShadowCards.get(cardInstance.id());
         assert.equal(shadowCardIds.size, 0);
      });

      QUnit.test("drawEncounterCard()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
         assert.equal(store.getState().encounterDeck.size, 36);
         assert.equal(store.getState().stagingArea.size, 0);

         // Run.
         store.dispatch(Action.drawEncounterCard());

         // Verify.
         assert.equal(store.getState().encounterDeck.size, 35);
         assert.equal(store.getState().stagingArea.size, 1);
      });

      QUnit.test("drawEncounterCard() index", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
         assert.equal(store.getState().encounterDeck.size, 36);
         assert.equal(store.getState().stagingArea.size, 0);
         var index = 5;
         var cardInstance = store.getState().encounterDeck.get(index);

         // Run.
         store.dispatch(Action.drawEncounterCard(index));

         // Verify.
         assert.equal(store.getState().encounterDeck.size, 35);
         assert.equal(store.getState().stagingArea.size, 1);
         assert.equal(store.getState().stagingArea.get(0), cardInstance);
      });

      QUnit.test("drawQuestCard()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         store.dispatch(Action.setQuestDeck(scenarioDeck.questInstances));
         assert.equal(store.getState().questDeck.size, 6);
         assert.equal(store.getState().activeQuestId, undefined);
         assert.equal(store.getState().questDiscard.size, 0);

         // Run.
         store.dispatch(Action.drawQuestCard());

         // Verify.
         assert.equal(store.getState().questDeck.size, 5);
         assert.equal(store.getState().activeQuestId, 1);
         assert.equal(store.getState().questDiscard.size, 0);
      });

      QUnit.test("enqueueEvent()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         //  var agent1 = new Agent(store, "agent1");
         //  var agent2 = new Agent(store, "agent2");
         assert.equal(store.getState().eventQueue.size, 0);
         var context;
         var callback = function() {};

         // Run.
         store.dispatch(Action.enqueueEvent(GameEvent.QUEST_CARD_DRAWN, context, callback));

         // Verify.
         assert.equal(store.getState().eventQueue.size, 1);
         var eventData0 = store.getState().eventQueue.get(0);
         assert.ok(eventData0);
         assert.equal(eventData0.get("eventKey"), GameEvent.QUEST_CARD_DRAWN);
         //  assert.equal(eventData0.get("eventAgent"), agent1);

         // Run.
         store.dispatch(Action.enqueueEvent(GameEvent.CARD_DRAWN, context, callback));

         // Verify.
         assert.equal(store.getState().eventQueue.size, 2);
         eventData0 = store.getState().eventQueue.get(0);
         assert.ok(eventData0);
         assert.equal(eventData0.get("eventKey"), GameEvent.QUEST_CARD_DRAWN);
         //  assert.equal(eventData0.get("eventAgent"), agent1);
         var eventData1 = store.getState().eventQueue.get(1);
         assert.ok(eventData1);
         assert.equal(eventData1.get("eventKey"), GameEvent.CARD_DRAWN);
         //  assert.equal(eventData1.get("eventAgent"), agent2);
      });

      QUnit.test("enqueuePhase()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         //  var agent1 = new Agent(store, "agent1");
         //  var agent2 = new Agent(store, "agent2");
         assert.equal(store.getState().phaseQueue.size, 0);

         // Run.
         store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END));

         // Verify.
         assert.equal(store.getState().phaseQueue.size, 1);
         var phaseData0 = store.getState().phaseQueue.get(0);
         assert.ok(phaseData0);
         assert.equal(phaseData0.get("phaseKey"), Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END);
         //  assert.equal(phaseData0.get("phaseAgent"), agent1);

         // Run.
         store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_ENGAGEMENT_CHECK_START));

         // Verify.
         assert.equal(store.getState().phaseQueue.size, 2);
         phaseData0 = store.getState().phaseQueue.get(0);
         assert.ok(phaseData0);
         assert.equal(phaseData0.get("phaseKey"), Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END);
         //  assert.equal(phaseData0.get("phaseAgent"), agent1);
         var phaseData1 = store.getState().phaseQueue.get(1);
         assert.ok(phaseData1);
         assert.equal(phaseData1.get("phaseKey"), Phase.ENCOUNTER_ENGAGEMENT_CHECK_START);
         //  assert.equal(phaseData1.get("phaseAgent"), agent2);
      });

      QUnit.test("incrementRound()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         assert.equal(store.getState().round, 0);

         // Run.
         store.dispatch(Action.incrementRound());

         // Verify.
         assert.equal(store.getState().round, 1);

         // Run.
         store.dispatch(Action.incrementRound());

         // Verify.
         assert.equal(store.getState().round, 2);
      });

      QUnit.test("setActiveLocation()", function(assert)
      {
         // Setup.
         var game = createGame();
         var store = game.store();
         var environment = game.engine().environment();
         var cardInstance = environment.stagingArea().get(1);
         assert.equal(store.getState().stagingArea.size, 2);
         assert.equal(store.getState().activeLocationId, undefined);

         // Run.
         store.dispatch(Action.setActiveLocation(cardInstance));

         // Verify.
         assert.equal(store.getState().stagingArea.size, 1);
         assert.equal(store.getState().activeLocationId, cardInstance.id());
      });

      function createEnvironment()
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         var agent = new Agent(store, "agent");
         var playerData = [
            {
               agent: agent,
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
            },
         ];

         return new Environment(store, scenarioDeck, playerData);
      }

      function createGame(callback)
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         var playerData = [
            {
               agent: new Agent(store, "agent1"),
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
                  },
            {
               agent: new Agent(store, "agent2"),
               playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
                  },
            {
               agent: new Agent(store, "agent3"),
               playerDeck: PlayerDeckBuilder.CoreSpiritDeckBuilder.buildDeck(store),
                  },
               ];

         return new Game(store, scenarioDeck, playerData, 10, callback);
      }
   });
