import AllyCard from "../../../src/artifact/js/AllyCard.js";
import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import HeroCard from "../../../src/artifact/js/HeroCard.js";
import LocationCard from "../../../src/artifact/js/LocationCard.js";
import QuestCard from "../../../src/artifact/js/QuestCard.js";
import Agent from "../../../src/model/js/Agent.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Reducer from "../../../src/model/js/Reducer.js";
import SimpleAgentStrategy from "../../../src/model/js/SimpleAgentStrategy.js";

QUnit.module("SimpleAgentStrategy");

QUnit.test("chooseCardToPlay()", function(assert)
{
   // Setup.
   var strategy = SimpleAgentStrategy;
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var possibleCards = [];
   possibleCards.push(new CardInstance(store, AllyCard.properties[AllyCard.BEORN]));
   possibleCards.push(new CardInstance(store, AllyCard.properties[AllyCard.BIFUR]));
   possibleCards.push(new CardInstance(store, AllyCard.properties[AllyCard.DENETHOR]));
   var callback = function(cardToPlay)
   {
      // Verify.
      assert.ok(cardToPlay);
      assert.equal(possibleCards.includes(cardToPlay), true);
   };

   // Run.
   strategy.chooseCardToPlay(agent, possibleCards, callback);
});

QUnit.test("chooseCharacterAttackers()", function(assert)
{
   // Setup.
   var strategy = SimpleAgentStrategy;
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var defender = new CardInstance(store, AllyCard.properties[AllyCard.DWALIN]);
   var characters = [];
   characters.push(new CardInstance(store, AllyCard.properties[AllyCard.BEORN]));
   characters.push(new CardInstance(store, AllyCard.properties[AllyCard.BIFUR]));
   characters.push(new CardInstance(store, AllyCard.properties[AllyCard.DENETHOR]));
   var callback = function(attackers)
   {
      // Verify.
      assert.ok(attackers);
      assert.equal(Array.isArray(attackers), true);
      assert.equal(attackers.length, 1);
      assert.equal(characters.includes(attackers[0]), true);
   };

   // Run.
   strategy.chooseCharacterAttackers(agent, characters, defender, callback);
});

QUnit.test("chooseCharacterDefender()", function(assert)
{
   // Setup.
   var strategy = SimpleAgentStrategy;
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var attacker = new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
   var characters = [];
   characters.push(new CardInstance(store, AllyCard.properties[AllyCard.BEORN]));
   characters.push(new CardInstance(store, AllyCard.properties[AllyCard.BIFUR]));
   characters.push(new CardInstance(store, AllyCard.properties[AllyCard.DENETHOR]));
   var callback = function(defender)
   {
      // Verify.
      assert.ok(defender);
      assert.equal(characters.includes(defender), true);
   };

   // Run.
   strategy.chooseCharacterDefender(agent, attacker, characters, callback);
});

QUnit.test("chooseEnemyDefender()", function(assert)
{
   // Setup.
   var strategy = SimpleAgentStrategy;
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var enemies = [];
   enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.BLACK_FOREST_BATS_PTM]));
   enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.DOL_GULDUR_ORCS]));
   enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]));
   var callback = function(defender)
   {
      // Verify.
      assert.ok(defender);
      assert.equal(enemies.includes(defender), true);
   };

   // Run.
   strategy.chooseEnemyDefender(agent, enemies, callback);
});

QUnit.test("chooseLocation()", function(assert)
{
   // Setup.
   var strategy = SimpleAgentStrategy;
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var locations = [];
   locations.push(new CardInstance(store, LocationCard.properties[LocationCard.ENCHANTED_STREAM]));
   locations.push(new CardInstance(store, LocationCard.properties[LocationCard.FOREST_GATE]));
   locations.push(new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]));
   var callback = function(location)
   {
      // Verify.
      assert.ok(location);
      assert.equal(locations.includes(location), true);
   };

   // Run.
   strategy.chooseLocation(agent, locations, callback);
});

QUnit.test("chooseOptionalEngagementEnemy()", function(assert)
{
   // Setup.
   var strategy = SimpleAgentStrategy;
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var enemies = [];
   enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.BLACK_FOREST_BATS_PTM]));
   enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.DOL_GULDUR_ORCS]));
   enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]));
   var callback = function(defender)
   {
      // Verify.
      assert.equal(defender, undefined);
   };

   // Run.
   strategy.chooseOptionalEngagementEnemy(agent, enemies, callback);
});

QUnit.test("chooseQuesters()", function(assert)
{
   // Setup.
   var strategy = SimpleAgentStrategy;
   var store = Redux.createStore(Reducer.root);
   var agent = new Agent(store, "agent");
   var questInstance = new CardInstance(store, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);
   var characters = [];
   characters.push(new CardInstance(store, AllyCard.properties[AllyCard.BEORN]));
   characters.push(new CardInstance(store, AllyCard.properties[AllyCard.BIFUR]));
   characters.push(new CardInstance(store, AllyCard.properties[AllyCard.DENETHOR]));
   var callback = function(questers)
   {
      // Verify.
      assert.ok(questers);
      assert.equal(Array.isArray(questers), true);
      assert.equal(questers.length, 1);
      assert.equal(characters.includes(questers[0]), true);
   };

   // Run.
   strategy.chooseQuesters(agent, questInstance, characters, callback);
});

QUnit.test("chooseUndefendedAttackHero()", function(assert)
{
   // Setup.
   var strategy = SimpleAgentStrategy;
   var store = Redux.createStore(Reducer.root);
   var attacker = new CardInstance(store, EnemyCard.FOREST_SPIDER);
   var agent = new Agent(store, "agent");
   var heroes = [];
   heroes.push(new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]));
   heroes.push(new CardInstance(store, HeroCard.properties[HeroCard.BERAVOR]));
   heroes.push(new CardInstance(store, HeroCard.properties[HeroCard.CELEBORN]));
   var callback = function(hero)
   {
      // Verify.
      assert.ok(hero);
      assert.equal(heroes.includes(hero), true);
   };

   // Run.
   strategy.chooseUndefendedAttackHero(agent, attacker, heroes, callback);
});

var SimpleAgentStrategyTest = {};
export default SimpleAgentStrategyTest;