"use strict";

define(["common/js/InputValidator"],
   function(InputValidator)
   {
      var SimpleAgentStrategy = {

         chooseCharacterAttackers: function(characters, defender, callback)
         {
            InputValidator.validateNotNull("characters", characters);
            InputValidator.validateNotNull("defender", defender);
            InputValidator.validateIsFunction("callback", callback);

            var attackers = [characters.toJS().lotrRandomElement()];

            callback(attackers);
         },

         chooseCharacterDefender: function(attacker, characters, callback)
         {
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("characters", characters);
            InputValidator.validateIsFunction("callback", callback);

            var defender = characters.toJS().lotrRandomElement();

            callback(defender);
         },

         chooseEnemyAttacker: function(enemies, callback)
         {
            InputValidator.validateNotNull("enemies", enemies);
            InputValidator.validateIsFunction("callback", callback);

            var attacker = enemies.toJS().lotrRandomElement();

            callback(attacker);
         },

         chooseEnemyDefender: function(enemies, callback)
         {
            InputValidator.validateNotNull("enemies", enemies);
            InputValidator.validateIsFunction("callback", callback);

            var defender = enemies.toJS().lotrRandomElement();

            callback(defender);
         },

         chooseOptionalEngagementEnemy: function(enemies, callback)
         {
            InputValidator.validateNotNull("enemies", enemies);
            InputValidator.validateIsFunction("callback", callback);

            // SimpleAgentStrategy does not optionally engage.
            callback();
         },

         chooseQuesters: function(characters, callback)
         {
            InputValidator.validateIsArray("characters", characters);
            InputValidator.validateIsFunction("callback", callback);

            var answer;

            if (characters.length > 0)
            {
               answer = [characters.lotrRandomElement()];
            }

            callback(answer);
         },

         chooseUndefendedAttackHero: function(heroes, callback)
         {
            InputValidator.validateNotNull("heroes", heroes);
            InputValidator.validateIsFunction("callback", callback);

            var hero = heroes.toJS().lotrRandomElement();

            callback(hero);
         },
      };

      return SimpleAgentStrategy;
   });
