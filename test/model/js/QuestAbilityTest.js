import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import GameEvent from "../../../src/artifact/js/GameEvent.js";
import LocationCard from "../../../src/artifact/js/LocationCard.js";
import ObjectiveCard from "../../../src/artifact/js/ObjectiveCard.js";
import QuestCard from "../../../src/artifact/js/QuestCard.js";
import Scenario from "../../../src/artifact/js/Scenario.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import EventObserver from "../../../src/model/js/EventObserver.js";
import Environment from "../../../src/model/js/Environment.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import QuestAbility from "../../../src/model/js/QuestAbility.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("QuestAbility");

QUnit.test("consequent() A Journey to Rhosgobel 1A", function(assert)
{
   // Setup.
   var scenarioKey = Scenario.A_JOURNEY_TO_RHOSGOBEL;
   var environment = createEnvironment(scenarioKey);
   assert.equal(environment.encounterDeck().length, 29);
   assert.equal(environment.stagingArea().length, 0);
   var store = environment.store();
   var agent1 = environment.agents()[0];
   var context = {
      cardInstance: CardInstance.get(store, 1),
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(environment.encounterDeck().length, 27);
      assert.equal(environment.stagingArea().length, 1);
      assert.equal(agent1.tableau().length, 4);
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
   assert.equal(environment.encounterDeck().length, 53);
   assert.equal(environment.encounterSetAside().length, 0);
   assert.equal(environment.stagingArea().length, 0);
   var store = environment.store();
   var context = {
      cardInstance: CardInstance.get(store, 1),
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      // 1 location + 4 troll + 4 sacked - 2 sacked = 7 removed
      assert.equal(environment.encounterDeck().length, 46);
      assert.equal(environment.encounterSetAside().length, 6);
      assert.equal(environment.stagingArea().length, 1);
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
   assert.equal(environment.encounterDeck().length, 41);
   assert.equal(environment.encounterSetAside().length, 0);
   assert.equal(environment.stagingArea().length, 0);
   var store = environment.store();
   var context = {
      cardInstance: CardInstance.get(store, 1),
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(environment.encounterDeck().length, 34);

      var encounterSetAside = environment.encounterSetAside();
      assert.equal(encounterSetAside.length, 1);
      assert.equal(encounterSetAside[0].card().key, EnemyCard.NAZGUL_OF_DOL_GULDUR);

      var stagingArea = environment.stagingArea();
      assert.equal(stagingArea.length, 3);
      var dungeonTorchInstance = stagingArea[0];
      var gandalfsMapInstance = stagingArea[1];
      var shadowKeyInstance = stagingArea[stagingArea.length - 1];
      assert.equal(dungeonTorchInstance.card().key, ObjectiveCard.DUNGEON_TORCH);
      assert.equal(dungeonTorchInstance.attachments().length, 1);
      assert.equal(gandalfsMapInstance.card().key, ObjectiveCard.GANDALFS_MAP);
      assert.equal(gandalfsMapInstance.attachments().length, 1);
      assert.equal(shadowKeyInstance.card().key, ObjectiveCard.SHADOW_KEY);
      assert.equal(shadowKeyInstance.attachments().length, 1);
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
   assert.equal(environment.encounterDeck().length, 47);
   assert.equal(environment.stagingArea().length, 0);
   var store = environment.store();
   var context;
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(environment.encounterDeck().length, 45);
      assert.equal(environment.stagingArea().length, 2);
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
      assert.equal(encounterDeck.length, 34);
      var stagingArea = environment.stagingArea();
      assert.equal(stagingArea.length, 2);
      assert.equal(stagingArea[0].card().key, EnemyCard.FOREST_SPIDER);
      assert.equal(stagingArea[stagingArea.length - 1].card().key, LocationCard.OLD_FOREST_ROAD);
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
   var agent1 = environment.agents()[0];
   assert.ok(agent1);
   assert.equal(environment.encounterDeck().length, 54);
   assert.equal(environment.stagingArea().length, 0);
   assert.equal(agent1.tableau().length, 3);
   var store = environment.store();
   var context;
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(environment.encounterDeck().length, 51);
      assert.equal(environment.stagingArea().length, 2);
      assert.equal(agent1.tableau().length, 4);
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
   assert.equal(environment.encounterDeck().length, 54);
   assert.equal(environment.stagingArea().length, 0);
   var store = environment.store();
   var context;
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(environment.encounterDeck().length, 51);
      assert.equal(environment.stagingArea().length, 3);
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
   assert.equal(environment.encounterDeck().length, 55);
   assert.equal(environment.stagingArea().length, 0);
   var store = environment.store();
   var context;
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(environment.encounterDeck().length, 53);
      assert.equal(environment.stagingArea().length, 2);
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
   assert.equal(environment.encounterDeck().length, 48);
   assert.equal(environment.stagingArea().length, 0);
   var store = environment.store();
   var context;
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(environment.encounterDeck().length, 46);
      assert.equal(environment.stagingArea().length, 2);
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
    }, ];

   var environment = new Environment(store, scenarioDeck, playerData);
   store.dispatch(Action.drawQuestCard());
   EventObserver.observeStore(store);

   return environment;
}

var QuestAbilityTest = {};
export default QuestAbilityTest;