import AgentAction from "./AgentAction.js";
import CardInstance from "./CardInstance.js";
import TransferReducer from "./TransferReducer.js";

var AgentReducer = {};

AgentReducer.reduce = function(state, action)
{
   LOGGER.debug("AgentReducer.root() type = " + action.type);

   var agentId, attachmentId, cardId, cardInstanceIds;

   switch (action.type)
   {
      case AgentAction.ADD_THREAT:
         agentId = action.agent.id();
         var oldThreat = (state.agentThreat.get(agentId) !== undefined ? state.agentThreat.get(agentId) : 0);
         return Object.assign(
         {}, state,
         {
            agentThreat: state.agentThreat.set(agentId, oldThreat + action.value),
         });
      case AgentAction.ATTACH_CARD:
         LOGGER.info("Attach card: " + action.attachmentInstance + " to " + action.cardInstance);
         agentId = action.agent.id();
         cardId = action.cardInstance.id();
         attachmentId = action.attachmentInstance.id();
         return TransferReducer.reduce(state, "agentTableau", agentId, attachmentId, "cardAttachments", cardId);
      case AgentAction.ATTACH_TO_ENGAGED_ENEMY:
         LOGGER.info("Attach card: " + action.attachmentInstance + " to " + action.cardInstance);
         agentId = action.agent.id();
         cardId = action.cardInstance.id();
         attachmentId = action.attachmentInstance.id();
         return TransferReducer.reduce(state, "agentTableau", agentId, attachmentId, "cardAttachments", cardId);
      case AgentAction.DISCARD_ATTACHMENT_CARD:
         LOGGER.debug("Discard attachment: " + action.attachmentInstance + " from " + action.cardInstance);
         agentId = action.agent.id();
         cardId = action.cardInstance.id();
         attachmentId = action.attachmentInstance.id();
         return TransferReducer.reduce(state, "cardAttachments", cardId, attachmentId, "agentPlayerDiscard", agentId);
      case AgentAction.DISCARD_FROM_HAND:
         LOGGER.debug("Discard from hand: " + action.cardInstance);
         agentId = action.agent.id();
         cardId = action.cardInstance.id();
         return TransferReducer.reduce(state, "agentHand", agentId, cardId, "agentPlayerDiscard", agentId);
      case AgentAction.DISCARD_FROM_PLAYER_DECK:
         LOGGER.debug("Discard from player deck: " + action.cardInstance);
         agentId = action.agent.id();
         cardId = action.cardInstance.id();
         return TransferReducer.reduce(state, "agentPlayerDeck", agentId, cardId, "agentPlayerDiscard", agentId);
      case AgentAction.DISCARD_FROM_TABLEAU:
         LOGGER.debug("Discard from tableau: " + action.cardInstance);
         agentId = action.agent.id();
         cardId = action.cardInstance.id();
         return TransferReducer.reduce(state, "agentTableau", agentId, cardId, "agentPlayerDiscard", agentId);
      case AgentAction.DRAW_PLAYER_CARD:
         LOGGER.debug("Draw player card");
         agentId = action.agent.id();
         cardId = (action.index === undefined ? state.agentPlayerDeck.get(agentId).first() : state.agentPlayerDeck.get(agentId).get(action.index));
         return TransferReducer.reduce(state, "agentPlayerDeck", agentId, cardId, "agentHand", agentId);
      case AgentAction.INCREMENT_NEXT_AGENT_ID:
         LOGGER.debug("increment next agent ID: " + state.nextAgentId);
         return Object.assign(
         {}, state,
         {
            nextAgentId: state.nextAgentId + 1,
         });
      case AgentAction.PLAY_CARD:
         LOGGER.debug("Play card: " + action.cardInstance);
         agentId = action.agent.id();
         cardId = action.cardInstance.id();
         return TransferReducer.reduce(state, "agentHand", agentId, cardId, "agentTableau", agentId);
      case AgentAction.SET_PLAYER_DECK:
         cardInstanceIds = CardInstance.cardInstancesToIds(action.deck);
         return Object.assign(
         {}, state,
         {
            agentPlayerDeck: state.agentPlayerDeck.set(action.agent.id(), Immutable.List(cardInstanceIds)),
         });
      case AgentAction.SET_TABLEAU:
         cardInstanceIds = CardInstance.cardInstancesToIds(action.deck);
         return Object.assign(
         {}, state,
         {
            agentTableau: state.agentTableau.set(action.agent.id(), Immutable.List(cardInstanceIds)),
         });
      case AgentAction.SET_THREAT:
         return Object.assign(
         {}, state,
         {
            agentThreat: state.agentThreat.set(action.agent.id(), action.value),
         });
      default:
         LOGGER.warn("AgentReducer.root: Unhandled action type: " + action.type);
         return state;
   }
};

if (Object.freeze)
{
   Object.freeze(AgentReducer);
}

export default AgentReducer;