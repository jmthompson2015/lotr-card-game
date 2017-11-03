"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   var AgentAction = {};

   AgentAction.ADD_THREAT = "addThreat";
   AgentAction.DISCARD_ATTACHMENT_CARD = "discardAttachmentCard";
   AgentAction.DISCARD_FROM_HAND = "discardFromHand";
   AgentAction.DISCARD_FROM_PLAYER_DECK = "discardFromPlayerDeck";
   AgentAction.DISCARD_FROM_TABLEAU = "discardFromTableau";
   AgentAction.DRAW_PLAYER_CARD = "drawPlayerCard";
   AgentAction.INCREMENT_NEXT_AGENT_ID = "incrementNextAgentId";
   AgentAction.PLAY_ATTACHMENT_CARD = "playAttachmentCard";
   AgentAction.PLAY_CARD = "playCard";
   AgentAction.SET_PLAYER_DECK = "setPlayerDeck";
   AgentAction.SET_TABLEAU = "setTableau";
   AgentAction.SET_THREAT = "setThreat";

   AgentAction.addThreat = function(agent, value)
   {
      InputValidator.validateNotNull("agent", agent);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: AgentAction.ADD_THREAT,
         agent: agent,
         value: myValue,
      });
   };

   AgentAction.discardAttachmentCard = function(agent, cardInstance, attachmentInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("cardInstance", cardInstance);
      InputValidator.validateNotNull("attachmentInstance", attachmentInstance);

      return (
      {
         type: AgentAction.DISCARD_ATTACHMENT_CARD,
         agent: agent,
         cardInstance: cardInstance,
         attachmentInstance: attachmentInstance,
      });
   };

   AgentAction.discardFromHand = function(agent, cardInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: AgentAction.DISCARD_FROM_HAND,
         agent: agent,
         cardInstance: cardInstance,
      });
   };

   AgentAction.discardFromPlayerDeck = function(agent, cardInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: AgentAction.DISCARD_FROM_PLAYER_DECK,
         agent: agent,
         cardInstance: cardInstance,
      });
   };

   AgentAction.discardFromTableau = function(agent, cardInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: AgentAction.DISCARD_FROM_TABLEAU,
         agent: agent,
         cardInstance: cardInstance,
      });
   };

   AgentAction.drawPlayerCard = function(agent, index)
   {
      InputValidator.validateNotNull("agent", agent);
      // index optional.

      return (
      {
         type: AgentAction.DRAW_PLAYER_CARD,
         agent: agent,
         index: index,
      });
   };

   AgentAction.incrementNextAgentId = function()
   {
      return (
      {
         type: AgentAction.INCREMENT_NEXT_AGENT_ID,
      });
   };

   AgentAction.playAttachmentCard = function(agent, cardInstance, attachmentInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("cardInstance", cardInstance);
      InputValidator.validateNotNull("attachmentInstance", attachmentInstance);

      return (
      {
         type: AgentAction.PLAY_ATTACHMENT_CARD,
         agent: agent,
         cardInstance: cardInstance,
         attachmentInstance: attachmentInstance,
      });
   };

   AgentAction.playCard = function(agent, cardInstance)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("cardInstance", cardInstance);

      return (
      {
         type: AgentAction.PLAY_CARD,
         agent: agent,
         cardInstance: cardInstance,
      });
   };

   AgentAction.setPlayerDeck = function(agent, deck)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("deck", deck);

      return (
      {
         type: AgentAction.SET_PLAYER_DECK,
         agent: agent,
         deck: deck,
      });
   };

   AgentAction.setTableau = function(agent, deck)
   {
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateIsArray("deck", deck);

      return (
      {
         type: AgentAction.SET_TABLEAU,
         agent: agent,
         deck: deck,
      });
   };

   AgentAction.setThreat = function(agent, value)
   {
      InputValidator.validateNotNull("agent", agent);
      // value optional. default: 0

      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: AgentAction.SET_THREAT,
         agent: agent,
         value: myValue,
      });
   };

   return AgentAction;
});
