"use strict";

define(["qunit", "redux", "artifact/js/EnemyCard", "artifact/js/GameEvent", "artifact/js/LocationCard", "artifact/js/ObjectiveCard", "artifact/js/Scenario",
   "model/js/Action", "model/js/Agent", "model/js/AgentAction", "model/js/CardInstance", "model/js/EventObserver", "model/js/Environment", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/LocationAbility", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, EnemyCard, GameEvent, LocationCard, ObjectiveCard, Scenario, Action, Agent, AgentAction, CardInstance, EventObserver, Environment, Game, PlayerDeckBuilder, LocationAbility, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("LocationAbility");

      QUnit.test("consequent() Forest Gate", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
         var environment = createEnvironment(scenarioKey);
         var store = environment.store();
         var agent1 = environment.firstAgent();
         assert.equal(agent1.playerDeck().size, 39);
         assert.equal(agent1.hand().size, 6);
         var context;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(agent1.playerDeck().size, 37);
            assert.equal(agent1.hand().size, 8);
            done();
         };
         var ability = LocationAbility[GameEvent.TRAVELED][LocationCard.FOREST_GATE];

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
