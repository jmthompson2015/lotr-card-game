"use strict";

define(["qunit", "redux", "artifact/js/GameEvent", "artifact/js/HeroCard", "artifact/js/Scenario", "artifact/js/Sphere",
   "model/js/Action", "model/js/Agent", "model/js/EventObserver", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/HeroAbility", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, GameEvent, HeroCard, Scenario, Sphere, Action, Agent, EventObserver, Environment, PlayerDeckBuilder, HeroAbility, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("HeroAbility");

      QUnit.test("consequent() Gloin", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
         var environment = createEnvironment(scenarioKey);
         var store = environment.store();
         var agent1 = environment.agentQueue()[0];
         var gloinInstance = agent1.tableau().get(1);
         var context = {
            cardInstance: gloinInstance,
            woundCount: 2,
         };
         assert.equal(gloinInstance.resourceMap().get(Sphere.LEADERSHIP), undefined);
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(gloinInstance.resourceMap().get(Sphere.LEADERSHIP), 2);
            done();
         };
         var ability = HeroAbility[GameEvent.WOUNDED][HeroCard.GLOIN];

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
