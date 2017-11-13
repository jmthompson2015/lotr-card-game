"use strict";

define(["qunit", "redux", "artifact/js/AttachmentCard", "artifact/js/EnemyCard", "artifact/js/HeroCard",
  "model/js/Action", "model/js/Adjudicator", "model/js/AgentAction", "model/js/CardInstance", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/Agent"],
   function(QUnit, Redux, AttachmentCard, EnemyCard, HeroCard, Action, Adjudicator, AgentAction, CardInstance, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, Agent)
   {
      QUnit.module("Adjudicator");

      QUnit.test("canAttack() Forest Spider", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var adjudicator = new Adjudicator(store);
         var cardInstance = new CardInstance(store, EnemyCard.FOREST_SPIDER);

         // Run.
         var result = adjudicator.canAttack(cardInstance);

         // Verify.
         assert.equal(result, true);
      });

      QUnit.test("canAttack() Forest Spider with Forest Snare", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent2 = environment.agentQueue()[1];
         var cardInstance = environment.stagingArea().first();
         store.dispatch(Action.agentEngageCard(agent2, cardInstance));
         agent2.drawPlayerCard(AttachmentCard.FOREST_SNARE);
         var attachmentInstance = agent2.hand().last();
         store.dispatch(AgentAction.playCard(agent2, attachmentInstance));
         store.dispatch(AgentAction.attachToEngagedEnemy(agent2, cardInstance, attachmentInstance));
         var adjudicator = new Adjudicator(store);

         // Run.
         var result = adjudicator.canAttack(cardInstance);

         // Verify.
         assert.equal(result, false);
      });

      function createGame(callback)
      {
         var store = Redux.createStore(Reducer.root);
         store.dispatch(Action.setDelay(10));
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

         return new Game(store, scenarioDeck, playerData, callback);
      }
   });
