import AgentAction from "./AgentAction.js";
import CardInstance from "./CardInstance.js";
import ReducerUtilities from "./ReducerUtilities.js";
import TransferReducer from "./TransferReducer.js";

var AgentReducer = {};

AgentReducer.reduce = function(state, action)
{
   LOGGER.debug("AgentReducer.root() type = " + action.type);

   switch (action.type)
   {
      case AgentAction.ADD_THREAT:
         return ReducerUtilities.addValue(state, action, "agentThreat", action.agent.id(), action.value);
      case AgentAction.ATTACH_CARD:
         return attachCard(state, action, "agentTableau", "cardAttachments");
      case AgentAction.DISCARD_ATTACHMENT_CARD:
         return discardAttachmentCard(state, action);
      case AgentAction.DISCARD_FROM_HAND:
         return transferCard(state, action, "agentHand", "agentPlayerDiscard");
      case AgentAction.DISCARD_FROM_PLAYER_DECK:
         return transferCard(state, action, "agentPlayerDeck", "agentPlayerDiscard");
      case AgentAction.DISCARD_FROM_TABLEAU:
         return transferCard(state, action, "agentTableau", "agentPlayerDiscard");
      case AgentAction.DRAW_PLAYER_CARD:
         return drawPlayerCard(state, action);
      case AgentAction.INCREMENT_NEXT_AGENT_ID:
         return incrementNextAgentId(state);
      case AgentAction.PLAY_CARD:
         return transferCard(state, action, "agentHand", "agentTableau");
      case AgentAction.SET_PLAYER_DECK:
         return setDeck(state, action, "agentPlayerDeck");
      case AgentAction.SET_TABLEAU:
         return setDeck(state, action, "agentTableau");
      case AgentAction.SET_THREAT:
         return ReducerUtilities.setValue(state, action, "agentThreat", action.agent.id(), action.value);
      default:
         LOGGER.warn("AgentReducer.root: Unhandled action type: " + action.type);
         return state;
   }
};

function attachCard(state, action, fromName, toName)
{
   let agentId = action.agent.id();
   let cardId = action.cardInstance.id();
   let attachmentId = action.attachmentInstance.id();

   return TransferReducer.reduce(state, fromName, agentId, attachmentId, toName, cardId);
}

function discardAttachmentCard(state, action)
{
   let agentId = action.agent.id();
   let cardId = action.cardInstance.id();
   let attachmentId = action.attachmentInstance.id();

   return TransferReducer.reduce(state, "cardAttachments", cardId, attachmentId, "agentPlayerDiscard", agentId);
}

function drawPlayerCard(state, action)
{
   let agentId = action.agent.id();
   let cardId = (action.index === undefined ? state.agentPlayerDeck[agentId][0] : state.agentPlayerDeck[agentId][action.index]);

   return TransferReducer.reduce(state, "agentPlayerDeck", agentId, cardId, "agentHand", agentId);
}

function incrementNextAgentId(state)
{
   return ReducerUtilities.updateObject(state,
   {
      nextAgentId: state.nextAgentId + 1,
   });
}

function setDeck(state, action, name)
{
   let agentId = action.agent.id();
   let cardInstanceIds = CardInstance.cardInstancesToIds(action.deck);

   return ReducerUtilities.setValue(state, action, name, agentId, cardInstanceIds);
}

function transferCard(state, action, fromName, toName)
{
   let agentId = action.agent.id();
   let cardId = action.cardInstance.id();

   return TransferReducer.reduce(state, fromName, agentId, cardId, toName, agentId);
}

if (Object.freeze)
{
   Object.freeze(AgentReducer);
}

export default AgentReducer;