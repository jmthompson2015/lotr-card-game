import ArrayAugments from "../../common/js/ArrayAugments.js";
import InputValidator from "../../common/js/InputValidator.js";

var SimpleAgentStrategy = {

   chooseCardToPlay: function(agent, possibleCards, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("possibleCards", possibleCards);
      InputValidator.validateIsFunction("callback", callback);

      var cardToPlay = possibleCards.lotrRandomElement();

      callback(cardToPlay);
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

      var defender = characters.lotrRandomElement();

      callback(defender);
   },

   chooseCharacterForAttachment: function(agent, attachmentInstance, characters, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("attachmentInstance", attachmentInstance);
      InputValidator.validateIsArray("characters", characters);
      InputValidator.validateIsFunction("callback", callback);

      var character = characters.lotrRandomElement();

      callback(character);
   },

   chooseEnemyDefender: function(agent, enemies, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("enemies", enemies);
      InputValidator.validateIsFunction("callback", callback);

      var defender = enemies.lotrRandomElement();

      callback(defender);
   },

   chooseEngagedEnemyForAttachment: function(agent, attachmentInstance, enemies, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("attachmentInstance", attachmentInstance);
      InputValidator.validateIsArray("enemies", enemies);
      InputValidator.validateIsFunction("callback", callback);

      var enemy = enemies.lotrRandomElement();

      callback(enemy);
   },

   chooseHeroForAttachment: function(agent, attachmentInstance, heroes, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("attachmentInstance", attachmentInstance);
      InputValidator.validateIsArray("heroes", heroes);
      InputValidator.validateIsFunction("callback", callback);

      var hero = heroes.lotrRandomElement();

      callback(hero);
   },

   chooseLocation: function(agent, locations, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("locations", locations);
      InputValidator.validateNotEmpty("locations", locations);
      InputValidator.validateIsFunction("callback", callback);

      var location = locations.lotrRandomElement();

      callback(location);
   },

   chooseOptionalEngagementEnemy: function(agent, enemies, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("enemies", enemies);
      InputValidator.validateIsFunction("callback", callback);

      // SimpleAgentStrategy does not optionally engage.
      callback();
   },

   chooseQuesters: function(agent, questInstance, characters, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("questInstance", questInstance);
      InputValidator.validateIsArray("characters", characters);
      InputValidator.validateIsFunction("callback", callback);

      var questers;

      if (characters.length > 0)
      {
         questers = [characters.lotrRandomElement()];
      }

      callback(questers);
   },

   chooseUndefendedAttackHero: function(agent, attacker, heroes, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("attacker", attacker);
      InputValidator.validateIsArray("heroes", heroes);
      InputValidator.validateNotEmpty("heroes", heroes);
      InputValidator.validateIsFunction("callback", callback);

      var hero = heroes.lotrRandomElement();

      callback(hero);
   },
};

SimpleAgentStrategy.shortName = "SimpleAgent";

export default SimpleAgentStrategy;