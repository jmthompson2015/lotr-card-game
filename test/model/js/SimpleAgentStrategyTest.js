"use strict";

define(["qunit", "redux", "artifact/js/AllyCard", "artifact/js/EnemyCard", "artifact/js/HeroCard", "artifact/js/LocationCard",
  "model/js/Agent", "model/js/CardInstance", "model/js/Reducer", "model/js/SimpleAgentStrategy"],
   function(QUnit, Redux, AllyCard, EnemyCard, HeroCard, LocationCard, Agent, CardInstance, Reducer, SimpleAgentStrategy)
   {
      QUnit.module("SimpleAgentStrategy");

      QUnit.test("chooseCardsToPlay()", function(assert)
      {
         // Setup.
         var strategy = SimpleAgentStrategy;
         var store = Redux.createStore(Reducer.root);
         var agent = new Agent(store, "agent");
         var possibleCards = [];
         possibleCards.push(new CardInstance(store, AllyCard.properties[AllyCard.BEORN]));
         possibleCards.push(new CardInstance(store, AllyCard.properties[AllyCard.BIFUR]));
         possibleCards.push(new CardInstance(store, AllyCard.properties[AllyCard.DENETHOR]));
         var callback = function(cardsToPlay)
         {
            // Verify.
            assert.ok(cardsToPlay);
            assert.equal(Array.isArray(cardsToPlay), true);
            assert.equal(cardsToPlay.length, 1);
            assert.equal(possibleCards.includes(cardsToPlay[0]), true);
         };

         // Run.
         strategy.chooseCardsToPlay(agent, possibleCards, callback);
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
         enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.BLACK_FOREST_BATS]));
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
         enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.BLACK_FOREST_BATS]));
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
         strategy.chooseQuesters(agent, characters, callback);
      });

      QUnit.test("chooseUndefendedAttackHero()", function(assert)
      {
         // Setup.
         var strategy = SimpleAgentStrategy;
         var store = Redux.createStore(Reducer.root);
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
         strategy.chooseUndefendedAttackHero(agent, heroes, callback);
      });
   });
