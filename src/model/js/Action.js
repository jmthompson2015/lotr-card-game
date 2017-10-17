"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   var Action = {};

   Action.ADD_AGENT_THREAT = "addAgentThreat";
   Action.ADD_AGENT_CARD = "addAgentCard";
   Action.ADD_CARD_DAMAGE = "addCardDamage";
   Action.ADD_CARD_PROGRESS = "addCardProgress";
   Action.ADD_CARD_RESOURCE = "addCardResource";
   Action.AGENT_ENGAGE_CARD = "agentEngageCard";
   Action.DEAL_SHADOW_CARD = "dealShadowCard";
   Action.DEQUEUE_PHASE = "dequeuePhase";
   Action.DISCARD_SHADOW_CARDS = "discardShadowCards";
   Action.DRAW_ENCOUNTER_CARD = "drawEncounterCard";
   Action.DRAW_QUEST_CARD = "drawQuestCard";
   Action.DRAW_PLAYER_CARD = "drawPlayerCard";
   Action.ENQUEUE_PHASE = "enqueuePhase";
   Action.INCREMENT_NEXT_AGENT_ID = "incrementNextAgentId";
   Action.INCREMENT_NEXT_CARD_ID = "incrementNextCardId";
   Action.INCREMENT_ROUND = "incrementRound";
   Action.REMOVE_AGENT_CARD = "removeAgentCard";
   Action.SET_ACTIVE_AGENT = "setActiveAgent";
   Action.SET_ACTIVE_LOCATION = "setActiveLocation";
   Action.SET_AGENT = "setAgent";
   Action.SET_AGENT_HERO_DECK = "setAgentHeroDeck";
   Action.SET_AGENT_PLAYER_DECK = "setAgentPlayerDeck";
   Action.SET_AGENT_THREAT = "setAgentThreat";
   Action.SET_CARD_DAMAGE = "setCardDamage";
   Action.SET_CARD_PROGRESS = "setCardProgress";
   Action.SET_CARD_INSTANCE = "setCardInstance";
   Action.SET_CARD_READY = "setCardReady";
   Action.SET_CARD_RESOURCE = "setCardResource";
   Action.SET_ENCOUNTER_DECK = "setEncounterDeck";
   Action.SET_ENVIRONMENT = "setEnvironment";
   Action.SET_FIRST_AGENT = "setFirstAgent";
   Action.SET_QUEST_DECK = "setQuestDeck";

   Action.addAgentThreat = function(agent, value)
   {
      InputValidator.validateNotNull("agent", agent);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: Action.ADD_AGENT_THREAT,
         agent: agent,
         value: myValue,
      });
   };

   Action.addAgentCard = function(agent, cardInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsString("cardInstance", cardInstance);

      return (
      {
         type: Action.ADD_AGENT_CARD,
         agent: agent,
         cardInstance: cardInstance,
      });
   };

   Action.addCardDamage = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: Action.ADD_CARD_DAMAGE,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   Action.addCardProgress = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: Action.ADD_CARD_PROGRESS,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   Action.addCardResource = function(cardInstance, sphereKey, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      InputValidator.validateIsString("sphereKey", sphereKey);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: Action.ADD_CARD_RESOURCE,
         cardInstance: cardInstance,
         sphereKey: sphereKey,
         value: myValue,
      });
   };

   Action.agentEngageCard = function(agent, cardInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: Action.AGENT_ENGAGE_CARD,
         agent: agent,
         cardInstance: cardInstance,
      });
   };

   Action.dealShadowCard = function(cardInstance)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: Action.DEAL_SHADOW_CARD,
         cardInstance: cardInstance,
      });
   };

   Action.dequeuePhase = function()
   {
      return (
      {
         type: Action.DEQUEUE_PHASE,
      });
   };

   Action.discardShadowCards = function()
   {
      return (
      {
         type: Action.DISCARD_SHADOW_CARDS,
      });
   };

   Action.drawEncounterCard = function(index)
   {
      // index optional.

      return (
      {
         type: Action.DRAW_ENCOUNTER_CARD,
         index: index,
      });
   };

   Action.drawQuestCard = function()
   {
      return (
      {
         type: Action.DRAW_QUEST_CARD,
      });
   };

   Action.drawPlayerCard = function(agent)
   {
      InputValidator.validateNotNull("agent", agent);

      return (
      {
         type: Action.DRAW_PLAYER_CARD,
         agent: agent,
      });
   };

   Action.enqueuePhase = function(phaseKey, phaseAgent, phaseCallback, phaseContext)
   {
      InputValidator.validateNotNull("phaseKey", phaseKey);
      // phaseAgent optional.
      // phaseCallback optional.
      // phaseContext optional.

      return (
      {
         type: Action.ENQUEUE_PHASE,
         phaseKey: phaseKey,
         phaseAgent: phaseAgent,
         phaseCallback: phaseCallback,
         phaseContext: phaseContext,
      });
   };

   Action.incrementNextAgentId = function()
   {
      return (
      {
         type: Action.INCREMENT_NEXT_AGENT_ID,
      });
   };

   Action.incrementNextCardId = function()
   {
      return (
      {
         type: Action.INCREMENT_NEXT_CARD_ID,
      });
   };

   Action.incrementRound = function()
   {
      return (
      {
         type: Action.INCREMENT_ROUND,
      });
   };

   Action.removeAgentCard = function(agent, cardInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsString("cardInstance", cardInstance);

      return (
      {
         type: Action.REMOVE_AGENT_CARD,
         agent: agent,
         cardInstance: cardInstance,
      });
   };

   Action.setActiveAgent = function(agent)
   {
      // agent optional.

      return (
      {
         type: Action.SET_ACTIVE_AGENT,
         agent: agent,
      });
   };

   Action.setActiveLocation = function(cardInstance)
   {
      // cardInstance optional.

      return (
      {
         type: Action.SET_ACTIVE_LOCATION,
         cardInstance: cardInstance,
      });
   };

   Action.setAgent = function(id, values)
   {
      InputValidator.validateIsNumber("id", id);
      InputValidator.validateNotNull("values", values);

      return (
      {
         type: Action.SET_AGENT,
         id: id,
         values: values,
      });
   };

   Action.setAgentHeroDeck = function(agent, deck)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("deck", deck);

      return (
      {
         type: Action.SET_AGENT_HERO_DECK,
         agent: agent,
         deck: deck,
      });
   };

   Action.setAgentPlayerDeck = function(agent, deck)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("deck", deck);

      return (
      {
         type: Action.SET_AGENT_PLAYER_DECK,
         agent: agent,
         deck: deck,
      });
   };

   Action.setAgentThreat = function(agent, value)
   {
      InputValidator.validateNotNull("agent", agent);
      // value optional. default: 0

      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: Action.SET_AGENT_THREAT,
         agent: agent,
         value: myValue,
      });
   };

   Action.setCardDamage = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 0

      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: Action.SET_CARD_DAMAGE,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   Action.setCardInstance = function(id, values)
   {
      InputValidator.validateIsNumber("id", id);
      InputValidator.validateNotNull("values", values);

      return (
      {
         type: Action.SET_CARD_INSTANCE,
         id: id,
         values: values,
      });
   };

   Action.setCardProgress = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 0

      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: Action.SET_CARD_PROGRESS,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   Action.setCardReady = function(cardInstance, isReady)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      InputValidator.validateIsBoolean("isReady", isReady);

      return (
      {
         type: Action.SET_CARD_READY,
         cardInstance: cardInstance,
         isReady: isReady,
      });
   };

   Action.setCardResource = function(cardInstance, sphereKey, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      InputValidator.validateIsString("sphereKey", sphereKey);
      // value optional. default: 0

      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: Action.SET_CARD_RESOURCE,
         cardInstance: cardInstance,
         sphereKey: sphereKey,
         value: myValue,
      });
   };

   Action.setEncounterDeck = function(deck)
   {
      InputValidator.validateIsArray("deck", deck);

      return (
      {
         type: Action.SET_ENCOUNTER_DECK,
         deck: deck,
      });
   };

   Action.setEnvironment = function(environment)
   {
      InputValidator.validateNotNull("environment", environment);

      return (
      {
         type: Action.SET_ENVIRONMENT,
         environment: environment,
      });
   };

   Action.setFirstAgent = function(agent)
   {
      InputValidator.validateNotNull("agent", agent);

      return (
      {
         type: Action.SET_FIRST_AGENT,
         agent: agent,
      });
   };

   Action.setQuestDeck = function(deck)
   {
      InputValidator.validateIsArray("deck", deck);

      return (
      {
         type: Action.SET_QUEST_DECK,
         deck: deck,
      });
   };

   return Action;
});
