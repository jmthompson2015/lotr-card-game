import InputValidator from "../../common/js/InputValidator.js";

var AgentAction = {};

AgentAction.ADD_THREAT = "addThreat";
AgentAction.ATTACH_CARD = "attachCard";
AgentAction.ATTACH_TO_ENGAGED_ENEMY = "attachToEngagedEnemy";
AgentAction.DISCARD_ATTACHMENT_CARD = "discardAttachmentCard";
AgentAction.DISCARD_FROM_HAND = "discardFromHand";
AgentAction.DISCARD_FROM_PLAYER_DECK = "discardFromPlayerDeck";
AgentAction.DISCARD_FROM_TABLEAU = "discardFromTableau";
AgentAction.DRAW_PLAYER_CARD = "drawPlayerCard";
AgentAction.INCREMENT_NEXT_AGENT_ID = "incrementNextAgentId";
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

AgentAction.attachCard = function(agent, cardInstance, attachmentInstance)
{
   InputValidator.validateNotNull("agent", agent);
   InputValidator.validateNotNull("cardInstance", cardInstance);
   InputValidator.validateNotNull("attachmentInstance", attachmentInstance);

   return (
   {
      type: AgentAction.ATTACH_CARD,
      agent: agent,
      cardInstance: cardInstance,
      attachmentInstance: attachmentInstance,
   });
};

AgentAction.attachToEngagedEnemy = function(agent, cardInstance, attachmentInstance)
{
   InputValidator.validateNotNull("agent", agent);
   InputValidator.validateNotNull("cardInstance", cardInstance);
   InputValidator.validateNotNull("attachmentInstance", attachmentInstance);

   return (
   {
      type: AgentAction.ATTACH_TO_ENGAGED_ENEMY,
      agent: agent,
      cardInstance: cardInstance,
      attachmentInstance: attachmentInstance,
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

export default AgentAction;