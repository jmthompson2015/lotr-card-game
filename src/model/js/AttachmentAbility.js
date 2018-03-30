import InputValidator from "../../common/js/InputValidator.js";
import AttachmentCard from "../../artifact/js/AttachmentCard.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import AgentAction from "./AgentAction.js";
import CardAction from "./CardAction.js";

var AttachmentAbility = {};

////////////////////////////////////////////////////////////////////////
AttachmentAbility[GameEvent.CARD_PLAYED] = {};

// CardSet.CORE
AttachmentAbility[GameEvent.CARD_PLAYED][AttachmentCard.BLADE_OF_GONDOLIN] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return context.cardInstance !== undefined && !context.cardInstance.isUsed();
   },
   consequent: function(store, context, callback)
   {
      attachToAHero(store, context, callback);
   },
};

// CardSet.CORE
AttachmentAbility[GameEvent.CARD_PLAYED][AttachmentCard.CELEBRIANS_STONE] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return context.cardInstance !== undefined && !context.cardInstance.isUsed();
   },
   consequent: function(store, context, callback)
   {
      attachToAHero(store, context, callback);
   },
};

// CardSet.CORE
AttachmentAbility[GameEvent.CARD_PLAYED][AttachmentCard.DARK_KNOWLEDGE] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return context.cardInstance !== undefined && !context.cardInstance.isUsed();
   },
   consequent: function(store, context, callback)
   {
      attachToAHero(store, context, callback);
   },
};

// CardSet.CORE
AttachmentAbility[GameEvent.CARD_PLAYED][AttachmentCard.FOREST_SNARE] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return context.cardInstance !== undefined && !context.cardInstance.isUsed();
   },
   consequent: function(store, context, callback)
   {
      attachToAnEngagedEnemy(store, context, callback);
   },
};

// CardSet.CORE
AttachmentAbility[GameEvent.CARD_PLAYED][AttachmentCard.HORN_OF_GONDOR] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return context.cardInstance !== undefined && !context.cardInstance.isUsed();
   },
   consequent: function(store, context, callback)
   {
      attachToAHero(store, context, callback);
   },
};

// CardSet.CORE
AttachmentAbility[GameEvent.CARD_PLAYED][AttachmentCard.PROTECTOR_OF_LORIEN] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return context.cardInstance !== undefined && !context.cardInstance.isUsed();
   },
   consequent: function(store, context, callback)
   {
      attachToAHero(store, context, callback);
   },
};

// CardSet.CORE
AttachmentAbility[GameEvent.CARD_PLAYED][AttachmentCard.SELF_PRESERVATION] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return context.cardInstance !== undefined && !context.cardInstance.isUsed();
   },
   consequent: function(store, context, callback)
   {
      attachToACharacter(store, context, callback);
   },
};

// CardSet.CORE
AttachmentAbility[GameEvent.CARD_PLAYED][AttachmentCard.STEWARD_OF_GONDOR] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return context.cardInstance !== undefined && !context.cardInstance.isUsed();
   },
   consequent: function(store, context, callback)
   {
      attachToAHero(store, context, callback);
   },
};

// CardSet.CORE
AttachmentAbility[GameEvent.CARD_PLAYED][AttachmentCard.UNEXPECTED_COURAGE] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return context.cardInstance !== undefined && !context.cardInstance.isUsed();
   },
   consequent: function(store, context, callback)
   {
      attachToAHero(store, context, callback);
   },
};

////////////////////////////////////////////////////////////////////////
function attachToACharacter(store, context, callback)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("context", context);
   InputValidator.validateIsFunction("callback", callback);

   var agent = context.agent;
   var attachmentInstance = context.cardInstance;
   store.dispatch(CardAction.setUsed(attachmentInstance, true));
   var myCallback = function(heroInstance)
   {
      finishAttachToACharacter(heroInstance, store, context, callback);
   };
   agent.chooseCharacterForAttachment(attachmentInstance, agent.tableauCharacters(), myCallback);
}

function finishAttachToACharacter(characterInstance, store, context, callback)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("context", context);
   InputValidator.validateIsFunction("callback", callback);

   if (characterInstance)
   {
      var agent = context.agent;
      var attachmentInstance = context.cardInstance;
      store.dispatch(AgentAction.attachCard(agent, characterInstance, attachmentInstance));
   }

   callback();
}

function attachToAHero(store, context, callback)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("context", context);
   InputValidator.validateIsFunction("callback", callback);

   var agent = context.agent;
   var attachmentInstance = context.cardInstance;
   store.dispatch(CardAction.setUsed(attachmentInstance, true));
   var myCallback = function(heroInstance)
   {
      finishAttachToAHero(heroInstance, store, context, callback);
   };
   agent.chooseHeroForAttachment(attachmentInstance, agent.tableauHeroes(), myCallback);
}

function finishAttachToAHero(heroInstance, store, context, callback)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("context", context);
   InputValidator.validateIsFunction("callback", callback);

   if (heroInstance)
   {
      var agent = context.agent;
      var attachmentInstance = context.cardInstance;
      store.dispatch(AgentAction.attachCard(agent, heroInstance, attachmentInstance));
   }

   callback();
}

function attachToAnEngagedEnemy(store, context, callback)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("context", context);
   InputValidator.validateIsFunction("callback", callback);

   var agent = context.agent;
   var attachmentInstance = context.cardInstance;
   store.dispatch(CardAction.setUsed(attachmentInstance, true));
   var environment = store.getState().environment;
   var engagedEnemies = environment.engagedEnemies();
   var myCallback = function(heroInstance)
   {
      finishAttachToAnEngagedEnemy(heroInstance, store, context, callback);
   };
   agent.chooseEngagedEnemyForAttachment(attachmentInstance, engagedEnemies, myCallback);
}

function finishAttachToAnEngagedEnemy(enemyInstance, store, context, callback)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("context", context);
   InputValidator.validateIsFunction("callback", callback);

   if (enemyInstance)
   {
      var agent = context.agent;
      var attachmentInstance = context.cardInstance;
      store.dispatch(AgentAction.attachCard(agent, enemyInstance, attachmentInstance));
   }

   callback();
}

AttachmentAbility.toString = function()
{
   return "AttachmentAbility";
};

if (AttachmentAbility.freeze)
{
   Object.freeze(AttachmentAbility);
}

export default AttachmentAbility;