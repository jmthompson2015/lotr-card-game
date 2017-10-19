"use strict";

define(["immutable", "qunit", "redux", "artifact/js/AllyCard", "artifact/js/EnemyCard", "artifact/js/HeroCard", "artifact/js/LocationCard", "artifact/js/Phase", "artifact/js/Sphere",
  "model/js/Action", "model/js/CardInstance", "model/js/Environment", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/Agent"],
   function(Immutable, QUnit, Redux, AllyCard, EnemyCard, HeroCard, LocationCard, Phase, Sphere, Action, CardInstance, Environment, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, Agent)
   {
      QUnit.module("Reducer");

      QUnit.test("addAgentThreat()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new Agent(store, "agent");
         assert.equal(store.getState().agentThreat.get(agent.id()), undefined);

         // Run.
         store.dispatch(Action.addAgentThreat(agent));

         // Verify.
         assert.equal(store.getState().agentThreat.get(agent.id()), 1);

         // Run.
         store.dispatch(Action.addAgentThreat(agent, 5));

         // Verify.
         assert.equal(store.getState().agentThreat.get(agent.id()), 6);
      });

      QUnit.test("addAgentCard()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new Agent(store, "agent");
         var cardInstance0 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
         var cardInstance1 = new CardInstance(store, HeroCard.properties[HeroCard.BIFUR]);

         // Run.
         store.dispatch(Action.addAgentCard(agent, cardInstance0));

         // Verify.
         var tableau = store.getState().agentTableau.get(agent.id());
         assert.ok(tableau);
         assert.equal(tableau.size, 1);
         assert.equal(tableau.get(0), cardInstance0.id());

         // Run.
         store.dispatch(Action.addAgentCard(agent, cardInstance1));

         // Verify.
         tableau = store.getState().agentTableau.get(agent.id());
         assert.ok(tableau);
         assert.equal(tableau.size, 2);
         assert.equal(tableau.get(0), cardInstance0.id());
         assert.equal(tableau.get(1), cardInstance1.id());
      });

      QUnit.test("addCardDamage()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var cardInstance = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
         assert.equal(store.getState().cardResources.get(cardInstance.id()), undefined);

         // Run.
         store.dispatch(Action.addCardDamage(cardInstance));

         // Verify.
         assert.equal(store.getState().cardDamage.get(cardInstance.id()), 1);

         // Run.
         store.dispatch(Action.addCardDamage(cardInstance, 5));

         // Verify.
         assert.equal(store.getState().cardDamage.get(cardInstance.id()), 6);
      });

      QUnit.test("addCardProgress()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var cardInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
         assert.equal(store.getState().cardProgress.get(cardInstance.id()), undefined);

         // Run.
         store.dispatch(Action.addCardProgress(cardInstance));

         // Verify.
         assert.equal(store.getState().cardProgress.get(cardInstance.id()), 1);

         // Run.
         store.dispatch(Action.addCardProgress(cardInstance, 5));

         // Verify.
         assert.equal(store.getState().cardProgress.get(cardInstance.id()), 6);
      });

      QUnit.test("addCardResource()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new Agent(store, "agent");
         var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
         store.dispatch(Action.setAgentTableau(agent, heroDeck));
         var cardInstance = heroDeck[0];
         var sphereKey = Sphere.LEADERSHIP;
         assert.equal(store.getState().cardResources.get(cardInstance.id()), undefined);

         // Run.
         store.dispatch(Action.addCardResource(cardInstance, sphereKey));

         // Verify.
         assert.ok(store.getState().cardResources);
         assert.ok(store.getState().cardResources.get(cardInstance.id()));
         assert.equal(store.getState().cardResources.get(cardInstance.id()).get(sphereKey), 1);

         // Run.
         store.dispatch(Action.addCardResource(cardInstance, sphereKey, 5));

         // Verify.
         assert.equal(store.getState().cardResources.get(cardInstance.id()).get(sphereKey), 6);
      });

      QUnit.test("agentDiscardAttachmentCard()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent = environment.agents().get(0);
         var cardInstance = agent.tableau().get(0);
         var attachmentInstance = agent.hand().get(0);
         store.dispatch(Action.agentPlayAttachmentCard(agent, cardInstance, attachmentInstance));
         assert.equal(store.getState().agentHand.get(agent.id()).size, 5);
         assert.equal(store.getState().agentPlayerDiscard.get(agent.id()), undefined);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 3);
         assert.equal(store.getState().cardAttachments.get(cardInstance.id()).size, 1);

         // Run.
         store.dispatch(Action.agentDiscardAttachmentCard(agent, cardInstance, attachmentInstance));

         // Verify.
         assert.equal(store.getState().agentHand.get(agent.id()).size, 5);
         assert.equal(store.getState().agentPlayerDiscard.get(agent.id()).size, 1);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 3);
         assert.equal(store.getState().cardAttachments.get(cardInstance.id()).size, 0);
      });

      QUnit.test("agentDiscardCard()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent = environment.agents().get(0);
         var cardInstance = agent.tableau().get(0);
         assert.equal(store.getState().agentHand.get(agent.id()).size, 6);
         assert.equal(store.getState().agentPlayerDiscard.get(agent.id()), undefined);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 3);

         // Run.
         store.dispatch(Action.agentDiscardCard(agent, cardInstance));

         // Verify.
         assert.equal(store.getState().agentHand.get(agent.id()).size, 6);
         assert.equal(store.getState().agentPlayerDiscard.get(agent.id()).size, 1);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 2);
      });

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

      QUnit.test("agentPlayAttachmentCard()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent = environment.agents().get(0);
         var cardInstance = agent.tableau().get(0);
         var attachmentInstance = agent.hand().get(1);
         assert.equal(store.getState().agentHand.get(agent.id()).size, 6);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 3);
         assert.equal(store.getState().cardAttachments.get(cardInstance.id()), undefined);

         // Run.
         store.dispatch(Action.agentPlayAttachmentCard(agent, cardInstance, attachmentInstance));

         // Verify.
         assert.equal(store.getState().agentHand.get(agent.id()).size, 5);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 3);
         assert.equal(store.getState().cardAttachments.get(cardInstance.id()).size, 1);
      });

      QUnit.test("agentPlayCard()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent = environment.agents().get(0);
         var cardInstance = agent.hand().get(0);
         assert.equal(store.getState().agentHand.get(agent.id()).size, 6);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 3);

         // Run.
         store.dispatch(Action.agentPlayCard(agent, cardInstance));

         // Verify.
         assert.equal(store.getState().agentHand.get(agent.id()).size, 5);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 4);
      });

      QUnit.test("dealShadowCard() index", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
         var cardInstance = new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
         assert.equal(store.getState().encounterDeck.size, 36);
         assert.equal(store.getState().cardShadowCard.size, 0);
         var enemyId = store.getState().encounterDeck.first();

         // Run.
         store.dispatch(Action.dealShadowCard(cardInstance));

         // Verify.
         assert.equal(store.getState().encounterDeck.size, 35);
         assert.equal(store.getState().cardShadowCard.size, 1);
         assert.equal(store.getState().cardShadowCard.get(cardInstance.id()), enemyId);
      });

      QUnit.test("dequeuePhase()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent1 = new Agent(store, "agent1");
         var agent2 = new Agent(store, "agent2");
         store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END, agent1));
         store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_ENGAGEMENT_CHECK_START, agent2));
         assert.equal(store.getState().phaseQueue.size, 2);
         var phaseData0 = store.getState().phaseQueue.get(0);
         assert.ok(phaseData0);
         assert.equal(phaseData0.get("phaseKey"), Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END);
         assert.equal(phaseData0.get("phaseAgent").id(), agent1.id());
         var phaseData1 = store.getState().phaseQueue.get(1);
         assert.ok(phaseData1);
         assert.equal(phaseData1.get("phaseKey"), Phase.ENCOUNTER_ENGAGEMENT_CHECK_START);
         assert.equal(phaseData1.get("phaseAgent").id(), agent2.id());

         // Run.
         store.dispatch(Action.dequeuePhase());

         // Verify.
         assert.equal(store.getState().phaseQueue.size, 1);
         phaseData0 = store.getState().phaseQueue.get(0);
         assert.ok(phaseData0);
         assert.equal(phaseData0.get("phaseKey"), Phase.ENCOUNTER_ENGAGEMENT_CHECK_START);
         assert.equal(phaseData0.get("phaseAgent").id(), agent2.id());

         // Run.
         store.dispatch(Action.dequeuePhase());

         // Verify.
         assert.equal(store.getState().phaseQueue.size, 0);
      });

      QUnit.test("discardShadowCards()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));
         var cardInstance = CardInstance.get(store, store.getState().encounterDeck.first());
         store.dispatch(Action.dealShadowCard(cardInstance));
         assert.equal(store.getState().encounterDiscard.size, 0);
         assert.equal(store.getState().cardShadowCard.size, 1);

         // Run.
         store.dispatch(Action.discardShadowCards());

         // Verify.
         assert.equal(store.getState().encounterDiscard.size, 1);
         assert.equal(store.getState().cardShadowCard.size, 0);
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
         assert.equal(store.getState().questDiscard.size, 0);

         // Run.
         store.dispatch(Action.drawQuestCard());

         // Verify.
         assert.equal(store.getState().questDeck.size, 5);
         assert.equal(store.getState().questDiscard.size, 1);
      });

      QUnit.test("drawPlayerCard()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new Agent(store, "agent");
         var playerDeck = PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store);
         store.dispatch(Action.setAgentPlayerDeck(agent, playerDeck.playerInstances));
         assert.equal(store.getState().agentPlayerDeck.get(agent.id()).size, 45);
         assert.equal(store.getState().agentHand.size, 0);

         // Run.
         store.dispatch(Action.drawPlayerCard(agent));

         // Verify.
         assert.equal(store.getState().agentPlayerDeck.get(agent.id()).size, 44);
         assert.equal(store.getState().agentHand.size, 1);
      });

      QUnit.test("enqueuePhase()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent1 = new Agent(store, "agent1");
         var agent2 = new Agent(store, "agent2");
         assert.equal(store.getState().phaseQueue.size, 0);

         // Run.
         store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END, agent1));

         // Verify.
         assert.equal(store.getState().phaseQueue.size, 1);
         var phaseData0 = store.getState().phaseQueue.get(0);
         assert.ok(phaseData0);
         assert.equal(phaseData0.get("phaseKey"), Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END);
         assert.equal(phaseData0.get("phaseAgent"), agent1);

         // Run.
         store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_ENGAGEMENT_CHECK_START, agent2));

         // Verify.
         assert.equal(store.getState().phaseQueue.size, 2);
         phaseData0 = store.getState().phaseQueue.get(0);
         assert.ok(phaseData0);
         assert.equal(phaseData0.get("phaseKey"), Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END);
         assert.equal(phaseData0.get("phaseAgent"), agent1);
         var phaseData1 = store.getState().phaseQueue.get(1);
         assert.ok(phaseData1);
         assert.equal(phaseData1.get("phaseKey"), Phase.ENCOUNTER_ENGAGEMENT_CHECK_START);
         assert.equal(phaseData1.get("phaseAgent"), agent2);
      });

      QUnit.test("incrementNextAgentId()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         assert.equal(store.getState().nextAgentId, 1);

         // Run.
         store.dispatch(Action.incrementNextAgentId());

         // Verify.
         assert.equal(store.getState().nextAgentId, 2);

         // Run.
         store.dispatch(Action.incrementNextAgentId());

         // Verify.
         assert.equal(store.getState().nextAgentId, 3);
      });

      QUnit.test("incrementNextCardId()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         assert.equal(store.getState().nextCardId, 1);

         // Run.
         store.dispatch(Action.incrementNextCardId());

         // Verify.
         assert.equal(store.getState().nextCardId, 2);

         // Run.
         store.dispatch(Action.incrementNextCardId());

         // Verify.
         assert.equal(store.getState().nextCardId, 3);
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

      QUnit.test("removeAgentCard()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new Agent(store, "agent");
         var cardInstance0 = new CardInstance(store, AllyCard.properties[AllyCard.BEORN]);
         var cardInstance1 = new CardInstance(store, AllyCard.properties[AllyCard.BIFUR]);
         store.dispatch(Action.addAgentCard(agent, cardInstance0));
         store.dispatch(Action.addAgentCard(agent, cardInstance1));
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 2);

         // Run.
         store.dispatch(Action.removeAgentCard(agent, cardInstance0));

         // Verify.
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 1);

         // Run.
         store.dispatch(Action.removeAgentCard(agent, cardInstance1));

         // Verify.
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 0);
      });

      QUnit.test("setCardResource()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new Agent(store, "agent");
         var heroDeck = [new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE])];
         store.dispatch(Action.setAgentTableau(agent, heroDeck));
         var cardInstance = heroDeck[0];
         var sphereKey = cardInstance.card().sphereKey;
         assert.equal(store.getState().cardResources.get(cardInstance.id()), undefined);

         // Run.
         store.dispatch(Action.setCardResource(cardInstance, sphereKey));

         // Verify.
         assert.ok(store.getState().cardResources);
         assert.ok(store.getState().cardResources.get(cardInstance.id()));
         assert.equal(store.getState().cardResources.get(cardInstance.id()).get(sphereKey), 0);

         // Run.
         store.dispatch(Action.setCardResource(cardInstance, sphereKey, 5));

         // Verify.
         assert.equal(store.getState().cardResources.get(cardInstance.id()).get(sphereKey), 5);
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
