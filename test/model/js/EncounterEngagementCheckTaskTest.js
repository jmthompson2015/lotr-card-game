"use strict";

define(["qunit", "redux", "artifact/js/EnemyCard",
    "model/js/Action", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/EncounterEngagementCheckTask", "model/js/ScenarioDeckBuilder", "model/js/Agent"],
   function(QUnit, Redux, EnemyCard, Action, Game, PlayerDeckBuilder, Reducer, EncounterEngagementCheckTask, ScenarioDeckBuilder, Agent)
   {
      QUnit.module("EncounterEngagementCheckTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent1 = environment.agents().get(0);
         var agent2 = environment.agents().get(1);
         var chieftanUfthakIndex = findIndex(environment, EnemyCard.CHIEFTAN_UFTHAK);
         store.dispatch(Action.drawEncounterCard(chieftanUfthakIndex));
         var dolGuldurBeastmasterIndex = findIndex(environment, EnemyCard.DOL_GULDUR_BEASTMASTER);
         store.dispatch(Action.drawEncounterCard(dolGuldurBeastmasterIndex));
         var dolGuldurOrcsIndex = findIndex(environment, EnemyCard.DOL_GULDUR_ORCS);
         store.dispatch(Action.drawEncounterCard(dolGuldurOrcsIndex));
         var blackForestBatsIndex = findIndex(environment, EnemyCard.BLACK_FOREST_BATS_PTM);
         store.dispatch(Action.drawEncounterCard(blackForestBatsIndex));
         assert.equal(environment.stagingArea().size, 6);
         assert.equal(agent1.engagementArea().size, 0);
         assert.equal(agent2.engagementArea().size, 0);
         var task = new EncounterEngagementCheckTask(store, agent1);
         var callback = function()
         {
            // Verify.
            assert.equal(environment.stagingArea().size, 5);
            assert.equal(agent1.engagementArea().size, 1, "agent1.engagementArea().size === 1", "agent1.engagementArea().size === 1");
            assert.equal(agent1.engagementArea().get(0).card().key, EnemyCard.FOREST_SPIDER);
            assert.equal(agent2.engagementArea().size, 0, "agent2.engagementArea().size === 0");
         };

         // Run.
         task.doIt(callback);
      });

      function createGame()
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

         return new Game(store, scenarioDeck, playerData);
      }

      function findIndex(environment, cardKey)
      {
         return environment.encounterDeck().reduce(function(accumulator, cardInstance, i)
         {
            if (cardInstance.card().key === cardKey)
            {
               accumulator = i;
            }
            return accumulator;
         }, -1);
      }
   });
