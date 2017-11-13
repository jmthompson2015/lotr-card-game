"use strict";

define(["qunit", "redux", "artifact/js/AttachmentCard", "artifact/js/EnemyCard", "artifact/js/GameEvent", "artifact/js/Scenario", "artifact/js/Trait",
   "model/js/Action", "model/js/Agent", "model/js/AgentAction", "model/js/EventObserver", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/AttachmentAbility", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, AttachmentCard, EnemyCard, GameEvent, Scenario, Trait, Action, Agent, AgentAction, EventObserver, Environment, PlayerDeckBuilder, AttachmentAbility, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("AttachmentAbility");

      QUnit.test("consequent() Unexpected Courage", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
         var environment = createEnvironment(scenarioKey);
         var store = environment.store();
         environment.drawEncounterCard(EnemyCard.DOL_GULDUR_ORCS);
         var agent3 = environment.agentQueue()[2];
         agent3.drawPlayerCard(AttachmentCard.UNEXPECTED_COURAGE);
         var cardInstance = agent3.hand().last();
         store.dispatch(AgentAction.playCard(agent3, cardInstance));
         assert.equal(agent3.tableau().size, 4);
         var context = {
            agent: agent3,
            cardInstance: cardInstance,
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            var heroes = agent3.tableauHeroes();
            heroes.forEach(function(heroInstance)
            {
               var attachments = heroInstance.attachments();
               if (attachments.size > 0)
               {
                  assert.equal(attachments.size, 1);
                  assert.equal(attachments.get(0).id(), cardInstance.id());
                  assert.equal(agent3.tableau().size, 3);
               }
            });
            done();
         };
         var ability = AttachmentAbility[GameEvent.CARD_PLAYED][AttachmentCard.UNEXPECTED_COURAGE];

         // Run.
         var done = assert.async();
         ability.consequent(store, context, callback);
      });

      function createEnvironment(scenarioKey)
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioBuilder = ScenarioDeckBuilder.ScenarioDeckBuilder.findByScenario(scenarioKey);
         var scenarioDeck = scenarioBuilder.buildDeck(store);

         var agent1 = new Agent(store, "agent1");
         var agent2 = new Agent(store, "agent2");
         var agent3 = new Agent(store, "agent3");
         var agent4 = new Agent(store, "agent4");
         var playerData = [
            {
               agent: agent1,
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
            },
            {
               agent: agent2,
               playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
            },
            {
               agent: agent3,
               playerDeck: PlayerDeckBuilder.CoreSpiritDeckBuilder.buildDeck(store),
            },
            {
               agent: agent4,
               playerDeck: PlayerDeckBuilder.CoreTacticsDeckBuilder.buildDeck(store),
            },
          ];

         var environment = new Environment(store, scenarioDeck, playerData);
         store.dispatch(Action.drawQuestCard());
         EventObserver.observeStore(store);

         return environment;
      }
   });
