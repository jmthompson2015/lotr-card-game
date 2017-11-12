"use strict";

define(["qunit", "redux", "artifact/js/CardType", "artifact/js/EventCard", "artifact/js/GameEvent", "artifact/js/Phase", "artifact/js/Scenario", "artifact/js/Trait",
   "model/js/Action", "model/js/Agent", "model/js/CardAction", "model/js/EventObserver", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/PhaseAbility", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, CardType, EventCard, GameEvent, Phase, Scenario, Trait, Action, Agent, CardAction, EventObserver, Environment, PlayerDeckBuilder, PhaseAbility, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("PhaseAbility");

      QUnit.test("consequent() Quest End", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
         var environment = createEnvironment(scenarioKey);
         var store = environment.store();
         var agent1 = environment.agentQueue()[0];
         var cardInstance = agent1.tableau().get(0);
         store.dispatch(CardAction.addPhaseBonusAttack(cardInstance));
         store.dispatch(CardAction.addPhaseBonusDefense(cardInstance));
         store.dispatch(CardAction.addPhaseBonusHitPoints(cardInstance));
         store.dispatch(CardAction.addPhaseBonusThreat(cardInstance));
         store.dispatch(CardAction.addPhaseBonusWillpower(cardInstance));
         assert.equal(store.getState().cardPhaseBonusAttack.size, 1);
         assert.equal(store.getState().cardPhaseBonusDefense.size, 1);
         assert.equal(store.getState().cardPhaseBonusHitPoints.size, 1);
         assert.equal(store.getState().cardPhaseBonusThreat.size, 1);
         assert.equal(store.getState().cardPhaseBonusWillpower.size, 1);
         var context;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(store.getState().cardPhaseBonusAttack.size, 0);
            assert.equal(store.getState().cardPhaseBonusDefense.size, 0);
            assert.equal(store.getState().cardPhaseBonusHitPoints.size, 0);
            assert.equal(store.getState().cardPhaseBonusThreat.size, 0);
            assert.equal(store.getState().cardPhaseBonusWillpower.size, 0);
            done();
         };
         var ability = PhaseAbility[Phase.QUEST_END][Phase.QUEST_END];

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

         var environment = new Environment(store, scenarioDeck, playerData);
         store.dispatch(Action.drawQuestCard());
         EventObserver.observeStore(store);

         return environment;
      }
   });
