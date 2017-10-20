"use strict";

define(["react", "react-dom", "common/js/ArrayAugments", "common/js/InputValidator", "view/js/DefenderChooser"],
   function(React, ReactDOM, ArrayAugments, InputValidator, DefenderChooser)
   {
      var SimpleAgentStrategy = {

         chooseCardsToPlay: function(agent, possibleCards, callback)
         {
            InputValidator.validateNotNull("agent", agent);
            InputValidator.validateIsArray("possibleCards", possibleCards);
            InputValidator.validateIsFunction("callback", callback);

            var cardsToPlay = [];

            if (possibleCards.length > 0)
            {
               cardsToPlay = [possibleCards.lotrRandomElement()];
            }

            callback(cardsToPlay);
         },

         chooseCharacterAttackers: function(agent, characters, defender, callback)
         {
            InputValidator.validateNotNull("agent", agent);
            InputValidator.validateIsArray("characters", characters);
            InputValidator.validateNotNull("defender", defender);
            InputValidator.validateIsFunction("callback", callback);

            var attackers = [characters.lotrRandomElement()];

            callback(attackers);
         },

         chooseCharacterDefender: function(agent, attacker, characters, callback)
         {
            InputValidator.validateNotNull("agent", agent);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateIsArray("characters", characters);
            InputValidator.validateIsFunction("callback", callback);

            var finishFunction = this.finishChooseCharacterDefender.bind(this);
            var chooseCallback = function(selected, isAccepted)
            {
               finishFunction(agent, selected, isAccepted, callback);
            };

            var element = React.createElement(DefenderChooser,
            {
               attackerInstance: attacker,
               cardInstances: characters,
               onChange: chooseCallback,
            });

            ReactDOM.render(element, document.getElementById("inputPanel" + agent.id()));
         },

         finishChooseCharacterDefender: function(agent, selected, isAccepted, callback)
         {
            document.getElementById("inputPanel" + agent.id()).innerHTML = "";

            var defender = (isAccepted === true ? selected : undefined);

            callback(defender);
         },

         chooseEnemyDefender: function(agent, enemies, callback)
         {
            InputValidator.validateNotNull("agent", agent);
            InputValidator.validateIsArray("enemies", enemies);
            InputValidator.validateIsFunction("callback", callback);

            var defender = enemies.lotrRandomElement();

            callback(defender);
         },

         chooseOptionalEngagementEnemy: function(agent, enemies, callback)
         {
            InputValidator.validateNotNull("agent", agent);
            InputValidator.validateIsArray("enemies", enemies);
            InputValidator.validateIsFunction("callback", callback);

            // SimpleAgentStrategy does not optionally engage.
            callback();
         },

         chooseQuesters: function(agent, characters, callback)
         {
            InputValidator.validateNotNull("agent", agent);
            InputValidator.validateIsArray("characters", characters);
            InputValidator.validateIsFunction("callback", callback);

            var questers;

            if (characters.length > 0)
            {
               questers = [characters.lotrRandomElement()];
            }

            callback(questers);
         },

         chooseUndefendedAttackHero: function(agent, heroes, callback)
         {
            InputValidator.validateNotNull("agent", agent);
            InputValidator.validateIsArray("heroes", heroes);
            InputValidator.validateIsFunction("callback", callback);

            var hero = heroes.lotrRandomElement();

            callback(hero);
         },
      };

      return SimpleAgentStrategy;
   });
