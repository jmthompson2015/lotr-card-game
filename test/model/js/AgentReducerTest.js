"use strict";

define(["qunit", "redux", "artifact/js/HeroCard",
  "model/js/AgentAction", "model/js/CardInstance", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/Agent"],
   function(QUnit, Redux, HeroCard, AgentAction, CardInstance, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, Agent)
   {
      QUnit.module("AgentReducer");

      QUnit.test("addThreat()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new Agent(store, "agent");
         assert.equal(store.getState().agentThreat.get(agent.id()), undefined);

         // Run.
         store.dispatch(AgentAction.addThreat(agent));

         // Verify.
         assert.equal(store.getState().agentThreat.get(agent.id()), 1);

         // Run.
         store.dispatch(AgentAction.addThreat(agent, 5));

         // Verify.
         assert.equal(store.getState().agentThreat.get(agent.id()), 6);
      });

      QUnit.test("discardAttachmentCard()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent = environment.agents().first();
         var cardInstance = agent.tableau().first();
         var attachmentInstance = agent.hand().first();
         store.dispatch(AgentAction.playAttachmentCard(agent, cardInstance, attachmentInstance));
         assert.equal(store.getState().agentHand.get(agent.id()).size, 5);
         assert.equal(store.getState().agentPlayerDiscard.get(agent.id()), undefined);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 3);
         assert.equal(store.getState().cardAttachments.get(cardInstance.id()).size, 1);

         // Run.
         store.dispatch(AgentAction.discardAttachmentCard(agent, cardInstance, attachmentInstance));

         // Verify.
         assert.equal(store.getState().agentHand.get(agent.id()).size, 5);
         assert.equal(store.getState().agentPlayerDiscard.get(agent.id()).size, 1);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 3);
         assert.equal(store.getState().cardAttachments.get(cardInstance.id()).size, 0);
      });

      QUnit.test("discardFromTableau()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent = environment.agents().get(0);
         var cardInstance = agent.tableau().get(0);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 3);
         assert.equal(store.getState().agentPlayerDiscard.get(agent.id()), undefined);

         // Run.
         store.dispatch(AgentAction.discardFromTableau(agent, cardInstance));

         // Verify.
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 2);
         assert.equal(store.getState().agentPlayerDiscard.get(agent.id()).size, 1);
         assert.equal(store.getState().agentPlayerDiscard.get(agent.id()).get(0), cardInstance.id());
      });

      QUnit.test("drawPlayerCard()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new Agent(store, "agent");
         var playerDeck = PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store);
         store.dispatch(AgentAction.setPlayerDeck(agent, playerDeck.playerInstances));
         assert.equal(store.getState().agentPlayerDeck.get(agent.id()).size, 45);
         assert.equal(store.getState().agentHand.size, 0);

         // Run.
         store.dispatch(AgentAction.drawPlayerCard(agent));

         // Verify.
         assert.equal(store.getState().agentPlayerDeck.get(agent.id()).size, 44);
         assert.equal(store.getState().agentHand.size, 1);
      });

      QUnit.test("incrementNextAgentId()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         assert.equal(store.getState().nextAgentId, 1);

         // Run.
         store.dispatch(AgentAction.incrementNextAgentId());

         // Verify.
         assert.equal(store.getState().nextAgentId, 2);

         // Run.
         store.dispatch(AgentAction.incrementNextAgentId());

         // Verify.
         assert.equal(store.getState().nextAgentId, 3);
      });

      QUnit.test("playAttachmentCard()", function(assert)
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
         store.dispatch(AgentAction.playAttachmentCard(agent, cardInstance, attachmentInstance));

         // Verify.
         assert.equal(store.getState().agentHand.get(agent.id()).size, 5);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 3);
         assert.equal(store.getState().cardAttachments.get(cardInstance.id()).size, 1);
      });

      QUnit.test("playCard()", function(assert)
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
         store.dispatch(AgentAction.playCard(agent, cardInstance));

         // Verify.
         assert.equal(store.getState().agentHand.get(agent.id()).size, 5);
         assert.equal(store.getState().agentTableau.get(agent.id()).size, 4);
      });

      QUnit.test("setPlayerDeck()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new Agent(store, "agent");
         var cardInstance0 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
         var cardInstance1 = new CardInstance(store, HeroCard.properties[HeroCard.GLOIN]);
         var playerDeck = [cardInstance0, cardInstance1];
         assert.equal(store.getState().agentTableau.get(agent.id()), undefined);

         // Run.
         store.dispatch(AgentAction.setPlayerDeck(agent, playerDeck));

         // Verify.
         var result = store.getState().agentPlayerDeck.get(agent.id());
         assert.ok(result);
         assert.equal(result.size, 2);
         assert.equal(result.get(0), 1);
         assert.equal(result.get(1), 2);
      });

      QUnit.test("setTableau()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new Agent(store, "agent");
         var cardInstance0 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
         var cardInstance1 = new CardInstance(store, HeroCard.properties[HeroCard.GLOIN]);
         var tableau = [cardInstance0, cardInstance1];
         assert.equal(store.getState().agentTableau.get(agent.id()), undefined);

         // Run.
         store.dispatch(AgentAction.setTableau(agent, tableau));

         // Verify.
         var result = store.getState().agentTableau.get(agent.id());
         assert.ok(result);
         assert.equal(result.size, 2);
         assert.equal(result.get(0), 1);
         assert.equal(result.get(1), 2);
      });

      QUnit.test("setThreat()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var agent = new Agent(store, "agent");
         assert.equal(store.getState().agentThreat.get(agent.id()), undefined);

         // Run.
         store.dispatch(AgentAction.setThreat(agent));

         // Verify.
         assert.equal(store.getState().agentThreat.get(agent.id()), 0);

         // Run.
         store.dispatch(AgentAction.setThreat(agent, 5));

         // Verify.
         assert.equal(store.getState().agentThreat.get(agent.id()), 5);
      });

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
