"use strict";

define(["immutable", "common/js/InputValidator", "model/js/AgentAction", "model/js/CardInstance"],
   function(Immutable, InputValidator, AgentAction, CardInstance)
   {
      var AgentReducer = {};

      AgentReducer.reduce = function(state, action)
      {
         LOGGER.debug("AgentReducer.root() type = " + action.type);

         var agentId, attachmentId, cardId, cardInstanceIds, index;
         var newDiscard, newAttachments, newHand;
         var oldDiscard, oldAttachments, oldHand;

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
            case AgentAction.DISCARD_ATTACHMENT_CARD:
               LOGGER.debug("Discard attachment: " + action.attachmentInstance + " from " + action.cardInstance);
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               attachmentId = action.attachmentInstance.id();
               oldAttachments = (state.cardAttachments.get(cardId) !== undefined ? state.cardAttachments.get(cardId) : Immutable.List());
               index = oldAttachments.indexOf(attachmentId);
               oldDiscard = (state.agentPlayerDiscard.get(agentId) !== undefined ? state.agentPlayerDiscard.get(agentId) : Immutable.List());
               newAttachments = (index >= 0 ? oldAttachments.delete(index) : oldAttachments);
               newDiscard = oldDiscard.push(attachmentId);
               return Object.assign(
               {}, state,
               {
                  agentPlayerDiscard: state.agentPlayerDiscard.set(agentId, newDiscard),
                  cardAttachments: state.cardAttachments.set(cardId, newAttachments),
               });
            case AgentAction.DISCARD_FROM_HAND:
               LOGGER.debug("Discard from hand: " + action.cardInstance);
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               return transferCard(state, "agentHand", agentId, cardId, "agentPlayerDiscard");
            case AgentAction.DISCARD_FROM_PLAYER_DECK:
               LOGGER.debug("Discard from player deck: " + action.cardInstance);
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               return transferCard(state, "agentPlayerDeck", agentId, cardId, "agentPlayerDiscard");
            case AgentAction.DISCARD_FROM_TABLEAU:
               LOGGER.debug("Discard from tableau: " + action.cardInstance);
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               return transferCard(state, "agentTableau", agentId, cardId, "agentPlayerDiscard");
            case AgentAction.DRAW_PLAYER_CARD:
               LOGGER.debug("Draw player card");
               agentId = action.agent.id();
               cardId = state.agentPlayerDeck.get(agentId).first();
               return transferCard(state, "agentPlayerDeck", agentId, cardId, "agentHand");
            case AgentAction.INCREMENT_NEXT_AGENT_ID:
               LOGGER.debug("increment next agent ID: " + state.nextAgentId);
               return Object.assign(
               {}, state,
               {
                  nextAgentId: state.nextAgentId + 1,
               });
            case AgentAction.PLAY_ATTACHMENT_CARD:
               LOGGER.debug("Play attachment: " + action.attachmentInstance + " to " + action.cardInstance);
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               attachmentId = action.attachmentInstance.id();
               oldHand = (state.agentHand.get(agentId) !== undefined ? state.agentHand.get(agentId) : Immutable.List());
               index = oldHand.indexOf(attachmentId);
               oldAttachments = (state.cardAttachments.get(cardId) !== undefined ? state.cardAttachments.get(cardId) : Immutable.List());
               newHand = (index >= 0 ? oldHand.delete(index) : oldHand);
               newAttachments = oldAttachments.push(attachmentId);
               return Object.assign(
               {}, state,
               {
                  agentHand: state.agentHand.set(agentId, newHand),
                  cardAttachments: state.cardAttachments.set(cardId, newAttachments),
               });
            case AgentAction.PLAY_CARD:
               LOGGER.debug("Play card: " + action.cardInstance);
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               return transferCard(state, "agentHand", agentId, cardId, "agentTableau");
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

      function transferCard(state, fromName, agentId, cardId, toName)
      {
         InputValidator.validateNotNull("state", state);
         InputValidator.validateIsString("fromName", fromName);
         InputValidator.validateIsNumber("agentId", agentId);
         // InputValidator.validateIsNumber("cardId", cardId);
         InputValidator.validateIsString("toName", toName);

         var oldFromDeck = (state[fromName].get(agentId) ? state[fromName].get(agentId) : Immutable.List());
         LOGGER.debug("oldFromDeck = " + oldFromDeck);

         if (oldFromDeck.size > 0)
         {
            var oldToDeck = (state[toName].get(agentId) ? state[toName].get(agentId) : Immutable.List());
            LOGGER.debug("oldToDeck = " + oldToDeck);
            var index = oldFromDeck.indexOf(cardId);
            LOGGER.debug("index = " + index);
            var newFromDeck = (index >= 0 ? oldFromDeck.delete(index) : oldFromDeck);
            LOGGER.debug("newFromDeck = " + newFromDeck);
            var newToDeck = oldToDeck.push(cardId);
            LOGGER.debug("newToDeck = " + newToDeck);

            var newObject = {};
            newObject[fromName] = state[fromName].set(agentId, newFromDeck);
            newObject[toName] = state[toName].set(agentId, newToDeck);
            LOGGER.debug("newObject = " + JSON.stringify(newObject));

            return Object.assign(
            {}, state, newObject);
         }

         LOGGER.warn(fromName + ".get(" + agentId + ") empty");
         return state;
      }

      if (Object.freeze)
      {
         Object.freeze(AgentReducer);
      }

      return AgentReducer;
   });
