"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   var Action = {};

   Action.ADD_AGENT = "addAgent";
   Action.ADD_CARD_INSTANCE = "addCardInstance";
   Action.AGENT_DISCARD_ENEMY_CARD = "agentDiscardEnemyCard";
   Action.AGENT_ENGAGE_CARD = "agentEngageCard";
   Action.AGENT_ENGAGEMENT_TO_STAGING = "agentEngagementToStaging";
   Action.CLEAR_EVENT = "clearEvent";
   Action.CLEAR_PHASE = "clearPhase";
   Action.DEAL_SHADOW_CARD = "dealShadowCard";
   Action.DELETE_AGENT = "deleteAgent";
   Action.DEQUEUE_EVENT = "dequeueEvent";
   Action.DEQUEUE_PHASE = "dequeuePhase";
   Action.DISCARD_ACTIVE_LOCATION = "discardActiveLocation";
   Action.DISCARD_ACTIVE_QUEST = "discardActiveQuest";
   Action.DISCARD_SHADOW_CARD = "discardShadowCard";
   Action.DISCARD_STAGING_CARD = "discardStagingCard";
   Action.DRAW_ENCOUNTER_CARD = "drawEncounterCard";
   Action.DRAW_QUEST_CARD = "drawQuestCard";
   Action.ENCOUNTER_TO_AGENT_TABLEAU = "encounterToAgentTableau";
   Action.ENCOUNTER_TO_CARD_ATTACHMENT = "encounterToCardAttachment";
   Action.ENCOUNTER_TO_SET_ASIDE = "encounterToSetAside";
   Action.ENQUEUE_EVENT = "enqueueEvent";
   Action.ENQUEUE_PHASE = "enqueuePhase";
   Action.INCREMENT_ROUND = "incrementRound";
   Action.REFILL_ENCOUNTER_DECK = "refillEncounterDeck";
   Action.SET_ACTIVE_AGENT = "setActiveAgent";
   Action.SET_ACTIVE_LOCATION = "setActiveLocation";
   Action.SET_ADJUDICATOR = "setAdjudicator";
   Action.SET_ASIDE_TO_ENCOUNTER_DECK = "setAsideToEncounterDeck";
   Action.SET_DELAY = "setDelay";
   Action.SET_ENCOUNTER_DECK = "setEncounterDeck";
   Action.SET_ENVIRONMENT = "setEnvironment";
   Action.SET_FIRST_AGENT = "setFirstAgent";
   Action.SET_QUEST_DECK = "setQuestDeck";
   Action.SET_RESOURCE_BASE = "setResourceBase";
   Action.SET_SCENARIO_KEY = "setScenarioKey";
   Action.SET_USER_MESSAGE = "setUserMessage";
   Action.STAGING_TO_AGENT_TABLEAU = "stagingToAgentTableau";

   Action.addAgent = function(id, values)
   {
      InputValidator.validateIsNumber("id", id);
      InputValidator.validateNotNull("values", values);

      return (
      {
         type: Action.ADD_AGENT,
         id: id,
         values: values,
      });
   };

   Action.addCardInstance = function(id, values)
   {
      InputValidator.validateIsNumber("id", id);
      InputValidator.validateNotNull("values", values);

      return (
      {
         type: Action.ADD_CARD_INSTANCE,
         id: id,
         values: values,
      });
   };

   Action.agentDiscardEnemyCard = function(agent, cardInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: Action.AGENT_DISCARD_ENEMY_CARD,
         agent: agent,
         cardInstance: cardInstance,
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

   Action.agentEngagementToStaging = function(agent, cardInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: Action.AGENT_ENGAGEMENT_TO_STAGING,
         agent: agent,
         cardInstance: cardInstance,
      });
   };

   Action.clearEvent = function()
   {
      return (
      {
         type: Action.CLEAR_EVENT,
      });
   };

   Action.clearPhase = function()
   {
      return (
      {
         type: Action.CLEAR_PHASE,
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

   Action.deleteAgent = function(agent)
   {
      InputValidator.validateNotNull("agent", agent);

      return (
      {
         type: Action.DELETE_AGENT,
         agent: agent,
      });
   };

   Action.dequeueEvent = function()
   {
      return (
      {
         type: Action.DEQUEUE_EVENT,
      });
   };

   Action.dequeuePhase = function()
   {
      return (
      {
         type: Action.DEQUEUE_PHASE,
      });
   };

   Action.discardActiveLocation = function()
   {
      return (
      {
         type: Action.DISCARD_ACTIVE_LOCATION,
      });
   };

   Action.discardActiveQuest = function()
   {
      return (
      {
         type: Action.DISCARD_ACTIVE_QUEST,
      });
   };

   Action.discardShadowCard = function(cardInstance, shadowInstance)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      InputValidator.validateNotNull("shadowInstance", shadowInstance);

      return (
      {
         type: Action.DISCARD_SHADOW_CARD,
         cardInstance: cardInstance,
         shadowInstance: shadowInstance,
      });
   };

   Action.discardStagingCard = function(cardInstance)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: Action.DISCARD_STAGING_CARD,
         cardInstance: cardInstance,
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

   Action.encounterToAgentTableau = function(agent, cardInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: Action.ENCOUNTER_TO_AGENT_TABLEAU,
         agent: agent,
         cardInstance: cardInstance,
      });
   };

   Action.encounterToCardAttachment = function(cardInstance)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: Action.ENCOUNTER_TO_CARD_ATTACHMENT,
         cardInstance: cardInstance,
      });
   };

   Action.encounterToSetAside = function(cardInstance)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: Action.ENCOUNTER_TO_SET_ASIDE,
         cardInstance: cardInstance,
      });
   };

   Action.enqueueEvent = function(eventKey, eventContext, eventCallback)
   {
      InputValidator.validateNotNull("eventKey", eventKey);
      // eventContext optional.
      // eventCallback optional.

      return (
      {
         type: Action.ENQUEUE_EVENT,
         eventKey: eventKey,
         eventContext: eventContext,
         eventCallback: eventCallback,
      });
   };

   Action.enqueuePhase = function(phaseKey, phaseContext, phaseCallback)
   {
      InputValidator.validateNotNull("phaseKey", phaseKey);
      // phaseContext optional.
      // phaseCallback optional.

      return (
      {
         type: Action.ENQUEUE_PHASE,
         phaseKey: phaseKey,
         phaseContext: phaseContext,
         phaseCallback: phaseCallback,
      });
   };

   Action.incrementRound = function()
   {
      return (
      {
         type: Action.INCREMENT_ROUND,
      });
   };

   Action.refillEncounterDeck = function()
   {
      return (
      {
         type: Action.REFILL_ENCOUNTER_DECK,
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

   Action.setAdjudicator = function(adjudicator)
   {
      InputValidator.validateNotNull("adjudicator", adjudicator);

      return (
      {
         type: Action.SET_ADJUDICATOR,
         adjudicator: adjudicator,
      });
   };

   Action.setAsideToEncounterDeck = function(cardInstance)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: Action.SET_ASIDE_TO_ENCOUNTER_DECK,
         cardInstance: cardInstance,
      });
   };

   Action.setDelay = function(delay)
   {
      InputValidator.validateIsNumber("delay", delay);

      return (
      {
         type: Action.SET_DELAY,
         delay: delay,
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

   Action.setResourceBase = function(resourceBase)
   {
      InputValidator.validateIsString("resourceBase", resourceBase);

      return (
      {
         type: Action.SET_RESOURCE_BASE,
         resourceBase: resourceBase,
      });
   };

   Action.setScenarioKey = function(scenarioKey)
   {
      InputValidator.validateIsString("scenarioKey", scenarioKey);

      return (
      {
         type: Action.SET_SCENARIO_KEY,
         scenarioKey: scenarioKey,
      });
   };

   Action.setUserMessage = function(userMessage)
   {
      // userMessage optional.

      return (
      {
         type: Action.SET_USER_MESSAGE,
         userMessage: userMessage,
      });
   };

   Action.stagingToAgentTableau = function(agent, cardInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: Action.STAGING_TO_AGENT_TABLEAU,
         agent: agent,
         cardInstance: cardInstance,
      });
   };

   return Action;
});
