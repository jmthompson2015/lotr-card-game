"use strict";

define(["qunit", "redux", "artifact/js/EnemyCard",
   "model/js/Action", "model/js/Agent", "model/js/EncounterTask", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, EnemyCard, Action, Agent, EncounterTask, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("EncounterTask");

      var delay = 10;

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         var agent1 = environment.agentQueue()[0];
         var agent2 = environment.agentQueue()[1];
         var chieftanUfthakIndex = findIndex(environment, EnemyCard.CHIEFTAN_UFTHAK);
         store.dispatch(Action.drawEncounterCard(chieftanUfthakIndex));
         var dolGuldurBeastmasterIndex = findIndex(environment, EnemyCard.DOL_GULDUR_BEASTMASTER);
         store.dispatch(Action.drawEncounterCard(dolGuldurBeastmasterIndex));
         var dolGuldurOrcsIndex = findIndex(environment, EnemyCard.DOL_GULDUR_ORCS);
         store.dispatch(Action.drawEncounterCard(dolGuldurOrcsIndex));
         var blackForestBatsIndex = findIndex(environment, EnemyCard.BLACK_FOREST_BATS);
         store.dispatch(Action.drawEncounterCard(blackForestBatsIndex));
         assert.equal(environment.stagingArea().size, 6);
         assert.equal(store.getState().agentEngagementArea.get(agent1.id()), undefined);
         assert.equal(store.getState().agentEngagementArea.get(agent2.id()), undefined);
         var task = new EncounterTask(store, delay);
         var callback = function()
         {
            // Verify.
            assert.equal(environment.stagingArea().size, 3);
            assert.equal(store.getState().agentEngagementArea.get(agent1.id()).size, 2);
            assert.equal(store.getState().agentEngagementArea.get(agent2.id()).size, 1);
            done();
         };

         // Run.
         var done = assert.async();
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
