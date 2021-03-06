import InputValidator from "../../common/js/InputValidator.js";
import CharacterAttackersChooser from "../../view/js/CharacterAttackersChooser.js";
import CharacterDefenderChooser from "../../view/js/CharacterDefenderChooser.js";
import EnemyDefenderChooser from "../../view/js/EnemyDefenderChooser.js";
import LocationChooser from "../../view/js/LocationChooser.js";
import OptionalEngagementEnemyChooser from "../../view/js/OptionalEngagementEnemyChooser.js";
import PlayCardChooser from "../../view/js/PlayCardChooser.js";
import QuestersChooser from "../../view/js/QuestersChooser.js";
import SingleCardChooser from "../../view/js/SingleCardChooser.js";
import UndefendedAttackHeroChooser from "../../view/js/UndefendedAttackHeroChooser.js";

var HumanAgentStrategy = {

   chooseCardToPlay: function(agent, possibleCards, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("possibleCards", possibleCards);
      InputValidator.validateIsFunction("callback", callback);

      var finishFunction = this.finishChooseCardsToPlay.bind(this);
      var chooseCallback = function(selected, isAccepted)
      {
         finishFunction(agent, selected, isAccepted, callback);
      };

      var element = React.createElement(PlayCardChooser,
      {
         cardInstances: possibleCards,
         onChange: chooseCallback,
      });

      ReactDOM.render(element, document.getElementById("inputPanel" + agent.id()));
   },

   finishChooseCardsToPlay: function(agent, selected, isAccepted, callback)
   {
      document.getElementById("inputPanel" + agent.id()).innerHTML = "";

      var cardToPlay = (isAccepted === true ? selected : undefined);

      callback(cardToPlay);
   },

   //////////////////////////////////////////////////////////////////////////

   chooseCharacterAttackers: function(agent, characters, defender, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("characters", characters);
      InputValidator.validateNotNull("defender", defender);
      InputValidator.validateIsFunction("callback", callback);

      var finishFunction = this.finishChooseCharacterAttackers.bind(this);
      var chooseCallback = function(selected, isAccepted)
      {
         finishFunction(agent, selected, isAccepted, callback);
      };

      var element = React.createElement(CharacterAttackersChooser,
      {
         defenderInstance: defender,
         cardInstances: characters,
         onChange: chooseCallback,
      });

      ReactDOM.render(element, document.getElementById("inputPanel" + agent.id()));
   },

   finishChooseCharacterAttackers: function(agent, selected, isAccepted, callback)
   {
      document.getElementById("inputPanel" + agent.id()).innerHTML = "";

      var attackers = (isAccepted === true ? selected : undefined);

      callback(attackers);
   },

   //////////////////////////////////////////////////////////////////////////

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

      var element = React.createElement(CharacterDefenderChooser,
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

   //////////////////////////////////////////////////////////////////////////

   chooseCharacterForAttachment: function(agent, attachmentInstance, characters, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("attachmentInstance", attachmentInstance);
      InputValidator.validateIsArray("characters", characters);
      InputValidator.validateIsFunction("callback", callback);

      var finishFunction = this.finishChooseHeroForAttachment.bind(this);
      var chooseCallback = function(selected, isAccepted)
      {
         finishFunction(agent, selected, isAccepted, callback);
      };

      var element = React.createElement(SingleCardChooser,
      {
         cardInstances: characters,
         onChange: chooseCallback,
         title: "Select Character for Attachment",
         message: "Attachment: " + attachmentInstance.name,
      });

      ReactDOM.render(element, document.getElementById("inputPanel" + agent.id()));
   },

   finishChooseCharacterForAttachment: function(agent, selected, isAccepted, callback)
   {
      document.getElementById("inputPanel" + agent.id()).innerHTML = "";

      var character = (isAccepted === true ? selected : undefined);

      callback(character);
   },

   //////////////////////////////////////////////////////////////////////////

   chooseEnemyDefender: function(agent, enemies, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("enemies", enemies);
      InputValidator.validateIsFunction("callback", callback);

      var finishFunction = this.finishChooseEnemyDefender.bind(this);
      var chooseCallback = function(selected, isAccepted)
      {
         finishFunction(agent, selected, isAccepted, callback);
      };

      var element = React.createElement(EnemyDefenderChooser,
      {
         cardInstances: enemies,
         onChange: chooseCallback,
      });

      ReactDOM.render(element, document.getElementById("inputPanel" + agent.id()));
   },

   finishChooseEnemyDefender: function(agent, selected, isAccepted, callback)
   {
      document.getElementById("inputPanel" + agent.id()).innerHTML = "";

      var defender = (isAccepted === true ? selected : undefined);

      callback(defender);
   },

   //////////////////////////////////////////////////////////////////////////

   chooseEngagedEnemyForAttachment: function(agent, attachmentInstance, heroes, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("attachmentInstance", attachmentInstance);
      InputValidator.validateIsArray("heroes", heroes);
      InputValidator.validateIsFunction("callback", callback);

      var finishFunction = this.finishChooseEngagedEnemyForAttachment.bind(this);
      var chooseCallback = function(selected, isAccepted)
      {
         finishFunction(agent, selected, isAccepted, callback);
      };

      var element = React.createElement(SingleCardChooser,
      {
         cardInstances: heroes,
         onChange: chooseCallback,
         title: "Select Engaged Enemy for Attachment",
         message: "Attachment: " + attachmentInstance.name,
      });

      ReactDOM.render(element, document.getElementById("inputPanel" + agent.id()));
   },

   finishChooseEngagedEnemyForAttachment: function(agent, selected, isAccepted, callback)
   {
      document.getElementById("inputPanel" + agent.id()).innerHTML = "";

      var enemy = (isAccepted === true ? selected : undefined);

      callback(enemy);
   },

   //////////////////////////////////////////////////////////////////////////

   chooseHeroForAttachment: function(agent, attachmentInstance, heroes, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("attachmentInstance", attachmentInstance);
      InputValidator.validateIsArray("heroes", heroes);
      InputValidator.validateIsFunction("callback", callback);

      var finishFunction = this.finishChooseHeroForAttachment.bind(this);
      var chooseCallback = function(selected, isAccepted)
      {
         finishFunction(agent, selected, isAccepted, callback);
      };

      var element = React.createElement(SingleCardChooser,
      {
         cardInstances: heroes,
         onChange: chooseCallback,
         title: "Select Hero for Attachment",
         message: "Attachment: " + attachmentInstance.name,
      });

      ReactDOM.render(element, document.getElementById("inputPanel" + agent.id()));
   },

   finishChooseHeroForAttachment: function(agent, selected, isAccepted, callback)
   {
      document.getElementById("inputPanel" + agent.id()).innerHTML = "";

      var hero = (isAccepted === true ? selected : undefined);

      callback(hero);
   },

   //////////////////////////////////////////////////////////////////////////

   chooseLocation: function(agent, locations, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("locations", locations);
      InputValidator.validateIsFunction("callback", callback);

      var finishFunction = this.finishChooseLocation.bind(this);
      var chooseCallback = function(selected, isAccepted)
      {
         finishFunction(agent, selected, isAccepted, callback);
      };

      var element = React.createElement(LocationChooser,
      {
         cardInstances: locations,
         onChange: chooseCallback,
      });

      ReactDOM.render(element, document.getElementById("inputPanel" + agent.id()));
   },

   finishChooseLocation: function(agent, selected, isAccepted, callback)
   {
      document.getElementById("inputPanel" + agent.id()).innerHTML = "";

      var defender = (isAccepted === true ? selected : undefined);

      callback(defender);
   },

   //////////////////////////////////////////////////////////////////////////

   chooseOptionalEngagementEnemy: function(agent, enemies, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("enemies", enemies);
      InputValidator.validateIsFunction("callback", callback);

      var finishFunction = this.finishChooseOptionalEngagementEnemy.bind(this);
      var chooseCallback = function(selected, isAccepted)
      {
         finishFunction(agent, selected, isAccepted, callback);
      };

      var element = React.createElement(OptionalEngagementEnemyChooser,
      {
         cardInstances: enemies,
         onChange: chooseCallback,
      });

      ReactDOM.render(element, document.getElementById("inputPanel" + agent.id()));
   },

   finishChooseOptionalEngagementEnemy: function(agent, selected, isAccepted, callback)
   {
      document.getElementById("inputPanel" + agent.id()).innerHTML = "";

      var enemy = (isAccepted === true ? selected : undefined);

      callback(enemy);
   },

   //////////////////////////////////////////////////////////////////////////

   chooseQuesters: function(agent, questInstance, characters, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("questInstance", questInstance);
      InputValidator.validateIsArray("characters", characters);
      InputValidator.validateIsFunction("callback", callback);

      var finishFunction = this.finishChooseQuesters.bind(this);
      var chooseCallback = function(selected, isAccepted)
      {
         finishFunction(agent, selected, isAccepted, callback);
      };

      var element = React.createElement(QuestersChooser,
      {
         questInstance: questInstance,
         cardInstances: characters,
         onChange: chooseCallback,
      });

      ReactDOM.render(element, document.getElementById("inputPanel" + agent.id()));
   },

   finishChooseQuesters: function(agent, selected, isAccepted, callback)
   {
      document.getElementById("inputPanel" + agent.id()).innerHTML = "";

      var questers = (isAccepted === true ? selected : undefined);

      callback(questers);
   },

   //////////////////////////////////////////////////////////////////////////

   chooseUndefendedAttackHero: function(agent, attacker, heroes, callback)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("attacker", attacker);
      InputValidator.validateIsArray("heroes", heroes);
      InputValidator.validateIsFunction("callback", callback);

      var finishFunction = this.finishChooseUndefendedAttackHero.bind(this);
      var chooseCallback = function(selected, isAccepted)
      {
         finishFunction(agent, selected, isAccepted, callback);
      };

      var element = React.createElement(UndefendedAttackHeroChooser,
      {
         attack: attacker.attack(),
         cardInstances: heroes,
         onChange: chooseCallback,
      });

      ReactDOM.render(element, document.getElementById("inputPanel" + agent.id()));
   },

   finishChooseUndefendedAttackHero: function(agent, selected, isAccepted, callback)
   {
      document.getElementById("inputPanel" + agent.id()).innerHTML = "";

      var hero = (isAccepted === true ? selected : undefined);

      callback(hero);
   },
};

HumanAgentStrategy.shortName = "HumanAgent";

export default HumanAgentStrategy;