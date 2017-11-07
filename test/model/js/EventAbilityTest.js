"use strict";

define(["qunit", "redux", "artifact/js/CardType", "artifact/js/EventCard", "artifact/js/GameEvent", "artifact/js/Scenario",
   "model/js/Action", "model/js/Agent", "model/js/EventObserver", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/EventAbility", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, CardType, EventCard, GameEvent, Scenario, Action, Agent, EventObserver, Environment, PlayerDeckBuilder, EventAbility, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("EventAbility");

      QUnit.test("consequent() Grim Resolve", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
         var environment = createEnvironment(scenarioKey);
         var store = environment.store();
         var agent1 = environment.agentQueue()[0];
         agent1.drawPlayerCard(EventCard.GRIM_RESOLVE);
         var cardInstance = agent1.hand().last();
         var context = {
            cardInstance: cardInstance,
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            var cardsInPlay = environment.cardsInPlay();
            var characterKeys = [CardType.HERO, CardType.ALLY];
            cardsInPlay.forEach(function(cardInstance2)
            {
               if (characterKeys.includes(cardInstance2.card().cardTypeKey))
               {
                  assert.equal(cardInstance2.isReady(), true);
               }
            });
            done();
         };
         var ability = EventAbility[GameEvent.CARD_DRAWN][EventCard.GRIM_RESOLVE];

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
