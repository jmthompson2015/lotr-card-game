import ArrayUtilities from "../../common/js/ArrayUtilities.js";
import InputValidator from "../../common/js/InputValidator.js";

var SimpleAgentStrategy = {

   chooseCardToPlay: function(agent, possibleCards, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("possibleCards", possibleCards);
      InputValidator.validateIsFunction("callback", callback);

      var cardToPlay = ArrayUtilities.randomElement(possibleCards);

      callback(cardToPlay);
   },

   chooseCharacterAttackers: function(agent, characters, defender, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("characters", characters);
      InputValidator.validateNotNull("defender", defender);
      InputValidator.validateIsFunction("callback", callback);

      var attackers = [ArrayUtilities.randomElement(characters)];

      callback(attackers);
   },

   chooseCharacterDefender: function(agent, attacker, characters, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("attacker", attacker);
      InputValidator.validateIsArray("characters", characters);
      InputValidator.validateIsFunction("callback", callback);

      var defender = ArrayUtilities.randomElement(characters);

      callback(defender);
   },

   chooseCharacterForAttachment: function(agent, attachmentInstance, characters, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("attachmentInstance", attachmentInstance);
      InputValidator.validateIsArray("characters", characters);
      InputValidator.validateIsFunction("callback", callback);

      var character = ArrayUtilities.randomElement(characters);

      callback(character);
   },

   chooseEnemyDefender: function(agent, enemies, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("enemies", enemies);
      InputValidator.validateIsFunction("callback", callback);

      var defender = ArrayUtilities.randomElement(enemies);

      callback(defender);
   },

   chooseEngagedEnemyForAttachment: function(agent, attachmentInstance, enemies, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("attachmentInstance", attachmentInstance);
      InputValidator.validateIsArray("enemies", enemies);
      InputValidator.validateIsFunction("callback", callback);

      var enemy = ArrayUtilities.randomElement(enemies);

      callback(enemy);
   },

   chooseHeroForAttachment: function(agent, attachmentInstance, heroes, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("attachmentInstance", attachmentInstance);
      InputValidator.validateIsArray("heroes", heroes);
      InputValidator.validateIsFunction("callback", callback);

      var hero = ArrayUtilities.randomElement(heroes);

      callback(hero);
   },

   chooseLocation: function(agent, locations, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("locations", locations);
      InputValidator.validateNotEmpty("locations", locations);
      InputValidator.validateIsFunction("callback", callback);

      var location = ArrayUtilities.randomElement(locations);

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
         questers = [ArrayUtilities.randomElement(characters)];
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

      var hero = ArrayUtilities.randomElement(heroes);

      callback(hero);
   },
};

SimpleAgentStrategy.shortName = "SimpleAgent";

export default SimpleAgentStrategy;