"use strict";

define(["qunit", "redux", "artifact/js/EnemyCard", "artifact/js/GameEvent", "artifact/js/ObjectiveCard", "artifact/js/Scenario", "artifact/js/Sphere", "artifact/js/TreacheryCard",
   "model/js/Action", "model/js/Agent", "model/js/AgentAction", "model/js/CardAction", "model/js/CardInstance", "model/js/EventObserver", "model/js/Environment", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/ShadowAbility", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, EnemyCard, GameEvent, ObjectiveCard, Scenario, Sphere, TreacheryCard, Action, Agent, AgentAction, CardAction, CardInstance, EventObserver, Environment, Game, PlayerDeckBuilder, ShadowAbility, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("ShadowAbility");

      QUnit.test("consequent() Exhaustion", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.A_JOURNEY_TO_RHOSGOBEL;
         var environment = createEnvironment(scenarioKey);
         var store = environment.store();
         var agent1 = environment.firstAgent();
         agent1.tableauCharacters().forEach(function(cardInstance)
         {
            store.dispatch(CardAction.setReady(cardInstance, false));
            assert.equal(cardInstance.wounds(), 0);
         });
         var context;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            agent1.tableauCharacters().forEach(function(cardInstance)
            {
               assert.equal(cardInstance.wounds(), 1);
            });
            done();
         };
         var ability = ShadowAbility[GameEvent.SHADOW_CARD_REVEALED][TreacheryCard.EXHAUSTION];

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
         store.dispatch(Action.setFirstAgent(playerData[0].agent));
         playerData.forEach(function(data)
         {
            var agent = data.agent;
            for (var i = 0; i < 6; i++)
            {
               store.dispatch(AgentAction.drawPlayerCard(agent));
            }
         });
         store.dispatch(Action.drawQuestCard());
         EventObserver.observeStore(store);

         return environment;
      }
   });
