"use strict";

define(["qunit", "redux", "artifact/js/GameEvent", "artifact/js/Scenario", "artifact/js/Sphere", "artifact/js/TreacheryCard",
   "model/js/Action", "model/js/Agent", "model/js/AgentAction", "model/js/CardAction", "model/js/CardInstance", "model/js/EventObserver", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/TreacheryAbility", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, GameEvent, Scenario, Sphere, TreacheryCard, Action, Agent, AgentAction, CardAction, CardInstance, EventObserver, Environment, PlayerDeckBuilder, TreacheryAbility, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("TreacheryAbility");

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
         var context = {
            cardInstance: new CardInstance(store, TreacheryCard.EXHAUSTION),
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            agent1.tableauCharacters().forEach(function(cardInstance)
            {
               assert.equal(cardInstance.wounds(), 2);
            });
            done();
         };
         var ability = TreacheryAbility[GameEvent.CARD_DRAWN][TreacheryCard.EXHAUSTION];

         // Run.
         var done = assert.async();
         ability.consequent(store, context, callback);
      });

      QUnit.test("consequent() Old Wives' Tales", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.THE_HUNT_FOR_GOLLUM;
         var environment = createEnvironment(scenarioKey);
         var store = environment.store();
         var agent1 = environment.firstAgent();
         var cardInstance = agent1.tableauHeroes().get(0);
         store.dispatch(CardAction.addResource(cardInstance, Sphere.LEADERSHIP));
         assert.equal(cardInstance.resourceMap().get(Sphere.LEADERSHIP), 1);
         var context = {
            cardInstance: new CardInstance(store, TreacheryCard.OLD_WIVES_TALES),
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(cardInstance.resourceMap().get(Sphere.LEADERSHIP), 0);
            done();
         };
         var ability = TreacheryAbility[GameEvent.CARD_DRAWN][TreacheryCard.OLD_WIVES_TALES];

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
