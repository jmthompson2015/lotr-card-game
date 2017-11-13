"use strict";

define(["qunit", "redux", "artifact/js/AllyCard", "artifact/js/EnemyCard", "artifact/js/GameEvent", "artifact/js/Scenario", "artifact/js/Trait",
   "model/js/Action", "model/js/Agent", "model/js/EventObserver", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/AllyAbility", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, AllyCard, EnemyCard, GameEvent, Scenario, Trait, Action, Agent, EventObserver, Environment, PlayerDeckBuilder, AllyAbility, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("AllyAbility");

      QUnit.test("consequent() Longbeard Orc Slayer", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
         var environment = createEnvironment(scenarioKey);
         var store = environment.store();
         environment.drawEncounterCard(EnemyCard.DOL_GULDUR_ORCS);
         var agent1 = environment.agentQueue()[0];
         agent1.drawPlayerCard(AllyCard.LONGBEARD_ORC_SLAYER);
         var cardInstance = agent1.hand().last();
         var context = {
            cardInstance: cardInstance,
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            var cardsInPlay = environment.cardsInPlay();
            cardsInPlay.forEach(function(cardInstance2)
            {
               var traitKeys = cardInstance2.card().traitKeys;
               if (traitKeys && traitKeys.includes(Trait.ORC))
               {
                  assert.equal(cardInstance2.wounds(), 1);
               }
               else
               {
                  assert.equal(cardInstance2.wounds(), 0);
               }
            });
            done();
         };
         var ability = AllyAbility[GameEvent.CARD_PLAYED][AllyCard.LONGBEARD_ORC_SLAYER];

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
