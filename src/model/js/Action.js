"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   var Action = {};

   Action.ADD_AGENT_THREAT = "addAgentThreat";
   Action.DEQUEUE_PHASE = "dequeuePhase";
   Action.DRAW_PLAYER_CARD = "drawPlayerCard";
   Action.ENQUEUE_PHASE = "enqueuePhase";
   Action.INCREMENT_NEXT_AGENT_ID = "incrementNextAgentId";
   Action.INCREMENT_NEXT_CARD_ID = "incrementNextCardId";
   Action.INCREMENT_ROUND = "incrementRound";
   Action.SET_ACTIVE_AGENT = "setActiveAgent";
   Action.SET_AGENT = "setAgent";
   Action.SET_AGENT_HERO_DECK = "setAgentHeroDeck";
   Action.SET_AGENT_PLAYER_DECK = "setAgentPlayerDeck";
   Action.SET_AGENT_THREAT = "setAgentThreat";
   Action.SET_CARD_INSTANCE = "setCardInstance";
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

   Action.dequeuePhase = function()
   {
      return (
      {
         type: Action.DEQUEUE_PHASE,
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

   Action.enqueuePhase = function(phaseKey, phaseToken, phaseCallback, phaseContext)
   {
      InputValidator.validateNotNull("phaseKey", phaseKey);
      // phaseToken optional.
      // phaseCallback optional.
      // phaseContext optional.

      return (
      {
         type: Action.ENQUEUE_PHASE,
         phaseKey: phaseKey,
         phaseToken: phaseToken,
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

   Action.setActiveAgent = function(agent)
   {
      // InputValidator.validateNotNull("agent", agent);

      return (
      {
         type: Action.SET_ACTIVE_AGENT,
         agent: agent,
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