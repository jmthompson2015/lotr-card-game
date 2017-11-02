"use strict";

define(["qunit", "redux", "artifact/js/EnemyCard", "artifact/js/GameEvent", "artifact/js/LocationCard", "artifact/js/ObjectiveCard", "artifact/js/QuestCard", "artifact/js/Scenario",
   "model/js/Action", "model/js/Agent", "model/js/CardInstance", "model/js/EventObserver", "model/js/Environment", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/QuestAbility", "model/js/Reducer", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, EnemyCard, GameEvent, LocationCard, ObjectiveCard, QuestCard, Scenario, Action, Agent, CardInstance, EventObserver, Environment, Game, PlayerDeckBuilder, QuestAbility, Reducer, ScenarioDeckBuilder)
   {
      QUnit.module("QuestAbility");

      QUnit.test("consequent() A Journey to Rhosgobel 1A", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.A_JOURNEY_TO_RHOSGOBEL;
         var environment = createEnvironment(scenarioKey);
         assert.equal(environment.encounterDeck().size, 29);
         assert.equal(environment.stagingArea().size, 0);
         var store = environment.store();
         var agent1 = environment.agents().get(0);
         var context = {
            cardInstance: CardInstance.get(store, 1),
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(environment.encounterDeck().size, 27);
            assert.equal(environment.stagingArea().size, 1);
            assert.equal(agent1.tableau().size, 4);
            done();
         };
         var ability = QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.AJTR1A_THE_WOUNDED_EAGLE];

         // Run.
         var done = assert.async();
         ability.consequent(store, context, callback);
      });

      QUnit.test("consequent() Conflict at the Carrock 1A", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.CONFLICT_AT_THE_CARROCK;
         var environment = createEnvironment(scenarioKey);
         assert.equal(environment.encounterDeck().size, 53);
         assert.equal(environment.encounterSetAside().size, 0);
         assert.equal(environment.stagingArea().size, 0);
         var store = environment.store();
         var context = {
            cardInstance: CardInstance.get(store, 1),
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            // 1 location + 4 troll + 4 sacked - 2 sacked = 7 removed
            assert.equal(environment.encounterDeck().size, 46);
            assert.equal(environment.encounterSetAside().size, 6);
            assert.equal(environment.stagingArea().size, 1);
            done();
         };
         var ability = QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.CATC1A_GRIMBEORNS_QUEST];

         // Run.
         var done = assert.async();
         ability.consequent(store, context, callback);
      });

      QUnit.test("consequent() Escape from Dol Guldur 1A", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.ESCAPE_FROM_DOL_GULDUR;
         var environment = createEnvironment(scenarioKey);
         assert.equal(environment.encounterDeck().size, 41);
         assert.equal(environment.encounterSetAside().size, 0);
         assert.equal(environment.stagingArea().size, 0);
         var store = environment.store();
         var context = {
            cardInstance: CardInstance.get(store, 1),
         };
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(environment.encounterDeck().size, 34);

            var encounterSetAside = environment.encounterSetAside();
            assert.equal(encounterSetAside.size, 1);
            assert.equal(encounterSetAside.first().card().key, EnemyCard.NAZGUL_OF_DOL_GULDUR);

            var stagingArea = environment.stagingArea();
            assert.equal(stagingArea.size, 3);
            var dungeonTorchInstance = stagingArea.first();
            var gandalfsMapInstance = stagingArea.get(1);
            var shadowKeyInstance = stagingArea.last();
            assert.equal(dungeonTorchInstance.card().key, ObjectiveCard.DUNGEON_TORCH);
            assert.equal(dungeonTorchInstance.attachments().size, 1);
            assert.equal(gandalfsMapInstance.card().key, ObjectiveCard.GANDALFS_MAP);
            assert.equal(gandalfsMapInstance.attachments().size, 1);
            assert.equal(shadowKeyInstance.card().key, ObjectiveCard.SHADOW_KEY);
            assert.equal(shadowKeyInstance.attachments().size, 1);
            done();
         };
         var ability = QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.EFDG1A_THE_NECROMANCERS_TOWER];

         // Run.
         var done = assert.async();
         ability.consequent(store, context, callback);
      });

      QUnit.test("consequent() Journey Along the Anduin 1A", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.JOURNEY_ALONG_THE_ANDUIN;
         var environment = createEnvironment(scenarioKey);
         assert.equal(environment.encounterDeck().size, 47);
         assert.equal(environment.stagingArea().size, 0);
         var store = environment.store();
         var context;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(environment.encounterDeck().size, 45);
            assert.equal(environment.stagingArea().size, 2);
            done();
         };
         var ability = QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.JATA1A_TO_THE_RIVER];

         // Run.
         var done = assert.async();
         ability.consequent(store, context, callback);
      });

      QUnit.test("consequent() Passage through Mirkwood 1A", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
         var environment = createEnvironment(scenarioKey);
         var store = environment.store();
         var context;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            var encounterDeck = environment.encounterDeck();
            assert.equal(encounterDeck.size, 34);
            var stagingArea = environment.stagingArea();
            assert.equal(stagingArea.size, 2);
            assert.equal(stagingArea.first().card().key, EnemyCard.FOREST_SPIDER);
            assert.equal(stagingArea.last().card().key, LocationCard.OLD_FOREST_ROAD);
            done();
         };
         var ability = QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.PTM1A_FLIES_AND_SPIDERS];

         // Run.
         var done = assert.async();
         ability.consequent(store, context, callback);
      });

      QUnit.test("consequent() Return to Mirkwood 1A", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.RETURN_TO_MIRKWOOD;
         var environment = createEnvironment(scenarioKey);
         var agent1 = environment.agents().get(0);
         assert.ok(agent1);
         assert.equal(environment.encounterDeck().size, 54);
         assert.equal(environment.stagingArea().size, 0);
         assert.equal(agent1.tableau().size, 3);
         var store = environment.store();
         var context;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(environment.encounterDeck().size, 51);
            assert.equal(environment.stagingArea().size, 2);
            assert.equal(agent1.tableau().size, 4);
            done();
         };
         var ability = QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.RTM1A_THROUGH_THE_FOREST];

         // Run.
         var done = assert.async();
         ability.consequent(store, context, callback);
      });

      QUnit.test("consequent() The Dead Marshes 1A", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.THE_DEAD_MARSHES;
         var environment = createEnvironment(scenarioKey);
         assert.equal(environment.encounterDeck().size, 54);
         assert.equal(environment.stagingArea().size, 0);
         var store = environment.store();
         var context;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(environment.encounterDeck().size, 51);
            assert.equal(environment.stagingArea().size, 3);
            done();
         };
         var ability = QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.TDM1A_INTO_THE_MARSHES];

         // Run.
         var done = assert.async();
         ability.consequent(store, context, callback);
      });

      QUnit.test("consequent() The Hills of Emyn Muil 1A", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.THE_HILLS_OF_EMYN_MUIL;
         var environment = createEnvironment(scenarioKey);
         assert.equal(environment.encounterDeck().size, 55);
         assert.equal(environment.stagingArea().size, 0);
         var store = environment.store();
         var context;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(environment.encounterDeck().size, 53);
            assert.equal(environment.stagingArea().size, 2);
            done();
         };
         var ability = QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.THOEM1A_THE_HILLS_OF_EMYN_MUIL];

         // Run.
         var done = assert.async();
         ability.consequent(store, context, callback);
      });

      QUnit.test("consequent() The Hunt for Gollum 1A", function(assert)
      {
         // Setup.
         var scenarioKey = Scenario.THE_HUNT_FOR_GOLLUM;
         var environment = createEnvironment(scenarioKey);
         assert.equal(environment.encounterDeck().size, 48);
         assert.equal(environment.stagingArea().size, 0);
         var store = environment.store();
         var context;
         var callback = function()
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.equal(environment.encounterDeck().size, 46);
            assert.equal(environment.stagingArea().size, 2);
            done();
         };
         var ability = QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.THFG1A_THE_HUNT_BEGINS];

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
