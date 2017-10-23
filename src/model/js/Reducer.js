"use strict";

define(["immutable", "common/js/InputValidator", "artifact/js/Phase", "model/js/Action", "model/js/CardInstance", "model/js/InitialState"],
   function(Immutable, InputValidator, Phase, Action, CardInstance, InitialState)
   {
      var Reducer = {};

      Reducer.root = function(state, action)
      {
         LOGGER.debug("rootReducer() type = " + action.type);

         if (typeof state === 'undefined')
         {
            return new InitialState();
         }

         var agentId, attachmentId, cardId, cardInstanceIds, index, shadowId;
         var newAttachments, newDiscard, newEncounterDeck, newEncounterDiscard, newEngagementArea, newHand, newPhaseData, newPhaseQueue, newResources, newShadowCards, newTableau;
         var oldAttachments, oldDiscard, oldEngagementArea, oldHand, oldResources, oldShadowCards, oldTableau;

         switch (action.type)
         {
            case Action.ADD_AGENT_THREAT:
               agentId = action.agent.id();
               var oldThreat = (state.agentThreat.get(agentId) !== undefined ? state.agentThreat.get(agentId) : 0);
               return Object.assign(
               {}, state,
               {
                  agentThreat: state.agentThreat.set(agentId, oldThreat + action.value),
               });
            case Action.ADD_AGENT_CARD:
               agentId = action.agent.id();
               oldTableau = (state.agentTableau.get(agentId) !== undefined ? state.agentTableau.get(agentId) : Immutable.List());
               newTableau = oldTableau.push(action.cardInstance.id());
               return Object.assign(
               {}, state,
               {
                  agentTableau: state.agentTableau.set(agentId, newTableau),
               });
            case Action.ADD_CARD_ATTACHMENT:
               cardId = action.cardInstance.id();
               oldAttachments = (state.cardAttachments.get(cardId) !== undefined ? state.cardAttachments.get(cardId) : Immutable.List());
               newAttachments = oldAttachments.push(action.attachmentInstance);
               return Object.assign(
               {}, state,
               {
                  cardAttachments: state.cardAttachments.push(cardId, newAttachments),
               });
            case Action.ADD_CARD_PROGRESS:
               cardId = action.cardInstance.id();
               var oldProgress = (state.cardProgress.get(cardId) !== undefined ? state.cardProgress.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardProgress: state.cardProgress.set(cardId, oldProgress + action.value),
               });
            case Action.ADD_CARD_RESOURCE:
               cardId = action.cardInstance.id();
               // LOGGER.info("Add agent resource: " + id + " " + action.sphereKey + " " + action.value);
               oldResources = (state.cardResources.get(cardId) !== undefined ? state.cardResources.get(cardId) : Immutable.Map());
               var oldCount = (oldResources.get(action.sphereKey) ? oldResources.get(action.sphereKey) : 0);
               newResources = oldResources.set(action.sphereKey, oldCount + action.value);
               return Object.assign(
               {}, state,
               {
                  cardResources: state.cardResources.set(cardId, newResources),
               });
            case Action.ADD_CARD_WOUNDS:
               cardId = action.cardInstance.id();
               var oldDamage = (state.cardWounds.get(cardId) !== undefined ? state.cardWounds.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardWounds: state.cardWounds.set(cardId, oldDamage + action.value),
               });
            case Action.AGENT_DISCARD_ATTACHMENT_CARD:
               LOGGER.info("Discard attachment: " + action.attachmentInstance + " to " + action.cardInstance);
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               attachmentId = action.attachmentInstance.id();
               oldAttachments = (state.cardAttachments.get(cardId) !== undefined ? state.cardAttachments.get(cardId) : Immutable.List());
               index = oldAttachments.indexOf(cardId);
               oldDiscard = (state.agentPlayerDiscard.get(agentId) !== undefined ? state.agentPlayerDiscard.get(agentId) : Immutable.List());
               newAttachments = oldAttachments.delete(index);
               newDiscard = oldDiscard.push(attachmentId);
               return Object.assign(
               {}, state,
               {
                  agentPlayerDiscard: state.agentPlayerDiscard.set(agentId, newDiscard),
                  cardAttachments: state.cardAttachments.set(cardId, newAttachments),
               });
            case Action.AGENT_DISCARD_CARD:
               LOGGER.info("Discard card: " + action.cardInstance);
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               index = state.stagingArea.indexOf(cardId);
               oldTableau = (state.agentTableau.get(agentId) !== undefined ? state.agentTableau.get(agentId) : Immutable.List());
               index = oldTableau.indexOf(cardId);
               oldDiscard = (state.agentPlayerDiscard.get(agentId) !== undefined ? state.agentPlayerDiscard.get(agentId) : Immutable.List());
               newTableau = oldTableau.delete(index);
               newDiscard = oldDiscard.push(cardId);
               return Object.assign(
               {}, state,
               {
                  agentPlayerDiscard: state.agentPlayerDiscard.set(agentId, newDiscard),
                  agentTableau: state.agentTableau.set(agentId, newTableau),
               });
            case Action.AGENT_DISCARD_ENEMY_CARD:
               LOGGER.info("Discard enemy card: " + action.cardInstance);
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               index = state.stagingArea.indexOf(cardId);
               oldEngagementArea = (state.agentEngagementArea.get(agentId) !== undefined ? state.agentEngagementArea.get(agentId) : Immutable.List());
               index = oldEngagementArea.indexOf(cardId);
               oldDiscard = (state.encounterDiscard.get(agentId) !== undefined ? state.encounterDiscard.get(agentId) : Immutable.List());
               newEngagementArea = oldEngagementArea.delete(index);
               newDiscard = oldDiscard.push(cardId);
               return Object.assign(
               {}, state,
               {
                  agentEngagementArea: state.agentTableau.set(agentId, newEngagementArea),
                  encounterDiscard: state.encounterDiscard.set(agentId, newDiscard),
               });
            case Action.AGENT_ENGAGE_CARD:
               LOGGER.info("Agent engage card: " + action.cardInstance);
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               index = state.stagingArea.indexOf(cardId);
               oldEngagementArea = (state.agentEngagementArea.get(agentId) !== undefined ? state.agentEngagementArea.get(agentId) : Immutable.List());
               newEngagementArea = oldEngagementArea.push(cardId);
               return Object.assign(
               {}, state,
               {
                  agentEngagementArea: state.agentEngagementArea.set(agentId, newEngagementArea),
                  stagingArea: state.stagingArea.delete(index),
               });
            case Action.AGENT_PLAY_ATTACHMENT_CARD:
               LOGGER.info("Play attachment: " + action.attachmentInstance + " to " + action.cardInstance);
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               attachmentId = action.attachmentInstance.id();
               oldHand = (state.agentHand.get(agentId) !== undefined ? state.agentHand.get(agentId) : Immutable.List());
               index = oldHand.indexOf(cardId);
               oldAttachments = (state.cardAttachments.get(cardId) !== undefined ? state.cardAttachments.get(cardId) : Immutable.List());
               newHand = oldHand.delete(index);
               newAttachments = oldAttachments.push(attachmentId);
               return Object.assign(
               {}, state,
               {
                  agentHand: state.agentHand.set(agentId, newHand),
                  cardAttachments: state.cardAttachments.set(cardId, newAttachments),
               });
            case Action.AGENT_PLAY_CARD:
               LOGGER.info("Play card: " + action.cardInstance);
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               oldHand = (state.agentHand.get(agentId) !== undefined ? state.agentHand.get(agentId) : Immutable.List());
               index = oldHand.indexOf(cardId);
               oldTableau = (state.agentTableau.get(agentId) !== undefined ? state.agentTableau.get(agentId) : Immutable.List());
               newHand = oldHand.delete(index);
               newTableau = oldTableau.push(cardId);
               return Object.assign(
               {}, state,
               {
                  agentHand: state.agentHand.set(agentId, newHand),
                  agentTableau: state.agentTableau.set(agentId, newTableau),
               });
            case Action.DEAL_SHADOW_CARD:
               LOGGER.info("Deal shadow card to " + action.cardInstance);
               cardId = action.cardInstance.id();
               shadowId = state.encounterDeck.first();
               newEncounterDeck = state.encounterDeck.shift();
               oldShadowCards = (state.cardShadowCards.get(cardId) ? state.cardShadowCards.get(cardId) : Immutable.List());
               newShadowCards = oldShadowCards.push(shadowId);
               return Object.assign(
               {}, state,
               {
                  cardIsFaceUp: state.cardIsFaceUp.set(shadowId, false),
                  cardShadowCards: state.cardShadowCards.set(cardId, newShadowCards),
                  encounterDeck: newEncounterDeck,
               });
            case Action.DEQUEUE_PHASE:
               // LOGGER.info("PhaseQueue: (dequeue)");
               newPhaseData = state.phaseQueue.first();
               newPhaseQueue = state.phaseQueue.shift();
               return Object.assign(
               {}, state,
               {
                  phaseData: newPhaseData,
                  phaseKey: newPhaseData.get("phaseKey"),
                  phaseQueue: newPhaseQueue,
               });
            case Action.DISCARD_ACTIVE_LOCATION:
               return Object.assign(
               {}, state,
               {
                  activeLocationId: undefined,
                  encounterDiscard: state.encounterDiscard.push(state.activeAgentId),
               });
            case Action.DISCARD_ACTIVE_QUEST:
               cardId = state.questDeck.first();
               var newQuestDiscard = state.questDiscard.push(cardId);
               return Object.assign(
               {}, state,
               {
                  questDeck: state.questDeck.delete(0),
                  questDiscard: newQuestDiscard,
               });
            case Action.DISCARD_SHADOW_CARDS:
               newEncounterDiscard = state.encounterDiscard.push(state.cardShadowCards.toIndexedSeq().toArray());
               return Object.assign(
               {}, state,
               {
                  encounterDiscard: newEncounterDiscard,
                  cardShadowCards: Immutable.Map(),
               });
            case Action.DRAW_ENCOUNTER_CARD:
               if (action.index === undefined)
               {
                  cardId = state.encounterDeck.first();
                  newEncounterDeck = state.encounterDeck.shift();
               }
               else
               {
                  cardId = state.encounterDeck.get(action.index);
                  newEncounterDeck = state.encounterDeck.delete(action.index);
               }
               return Object.assign(
               {}, state,
               {
                  encounterDeck: newEncounterDeck,
                  stagingArea: state.stagingArea.push(cardId),
               });
            case Action.DRAW_QUEST_CARD:
               cardId = state.questDeck.first();
               var newQuestDeck = state.questDeck.shift();
               return Object.assign(
               {}, state,
               {
                  questDeck: newQuestDeck,
                  questDiscard: state.questDiscard.push(cardId),
               });
            case Action.DRAW_PLAYER_CARD:
               agentId = action.agent.id();
               cardId = state.agentPlayerDeck.get(agentId).first();
               var newPlayerDeck = state.agentPlayerDeck.get(agentId).shift();
               var oldAgentHand = (state.agentHand.get(agentId) !== undefined ? state.agentHand.get(agentId) : Immutable.List());
               var newAgentHand = oldAgentHand.push(cardId);
               return Object.assign(
               {}, state,
               {
                  agentPlayerDeck: state.agentPlayerDeck.set(agentId, newPlayerDeck),
                  agentHand: state.agentHand.set(agentId, newAgentHand),
               });
            case Action.ENQUEUE_PHASE:
               LOGGER.info("PhaseQueue: " + Phase.properties[action.phaseKey].name + ", agent = " + action.phaseAgent + ", callback " + (action.phaseCallback === undefined ? " === undefined" : " !== undefined") + ", context = " + JSON.stringify(action.phaseContext));
               newPhaseData = createPhaseData(action.phaseKey, action.phaseAgent, action.phaseCallback, action.phaseContext);
               newPhaseQueue = state.phaseQueue.push(newPhaseData);
               return Object.assign(
               {}, state,
               {
                  phaseKey: action.phaseKey, // FIXME: remove when PhaseObserver is implemented.
                  phaseQueue: newPhaseQueue,
               });
            case Action.INCREMENT_NEXT_AGENT_ID:
               // LOGGER.info("increment next agent ID: " + state.nextAgentId);
               return Object.assign(
               {}, state,
               {
                  nextAgentId: state.nextAgentId + 1,
               });
            case Action.INCREMENT_NEXT_CARD_ID:
               return Object.assign(
               {}, state,
               {
                  nextCardId: state.nextCardId + 1,
               });
            case Action.INCREMENT_ROUND:
               LOGGER.info("Round: " + (state.round + 1));
               return Object.assign(
               {}, state,
               {
                  round: state.round + 1,
               });
            case Action.REMOVE_AGENT_CARD:
               agentId = action.agent.id();
               oldTableau = (state.agentTableau.get(agentId) !== undefined ? state.agentTableau.get(agentId) : Immutable.List());
               index = oldTableau.indexOf(action.cardInstance.id());
               newTableau = oldTableau.delete(index);
               return Object.assign(
               {}, state,
               {
                  agentTableau: state.agentTableau.set(agentId, newTableau),
               });
            case Action.REMOVE_CARD_ATTACHMENT:
               agentId = action.agent.id();
               cardId = action.cardInstance.id();
               oldAttachments = (state.cardAttachments.get(cardId) !== undefined ? state.cardAttachments.get(cardId) : Immutable.List());
               var oldPlayerDiscard = (state.agentPlayerDiscard.get(agentId) !== undefined ? state.agentPlayerDiscard.get(agentId) : Immutable.List());
               newAttachments = oldAttachments.delete(cardId);
               return Object.assign(
               {}, state,
               {
                  cardAttachments: state.cardAttachments.push(cardId, newAttachments),
                  agentPlayerDiscard: oldPlayerDiscard.push(cardId),
               });
            case Action.SET_ACTIVE_AGENT:
               LOGGER.info("Active Agent: " + action.agent);
               return Object.assign(
               {}, state,
               {
                  activeAgentId: (action.agent !== undefined ? action.agent.id() : undefined),
               });
            case Action.SET_ACTIVE_LOCATION:
               LOGGER.info("Active Location: " + action.cardInstance);
               cardId = (action.cardInstance !== undefined ? action.cardInstance.id() : -1);
               index = state.stagingArea.indexOf(cardId);
               var newStagingArea = (index >= 0 ? state.stagingArea.delete(index) : state.stagingArea);
               return Object.assign(
               {}, state,
               {
                  activeLocationId: (action.cardInstance !== undefined ? action.cardInstance.id() : undefined),
                  stagingArea: newStagingArea,
               });
            case Action.SET_AGENT:
               return Object.assign(
               {}, state,
               {
                  agents: state.agents.set(action.id, action.values),
               });
            case Action.SET_AGENT_PLAYER_DECK:
               cardInstanceIds = CardInstance.cardInstancesToIds(action.deck);
               return Object.assign(
               {}, state,
               {
                  agentPlayerDeck: state.agentPlayerDeck.set(action.agent.id(), Immutable.List(cardInstanceIds)),
               });
            case Action.SET_AGENT_TABLEAU:
               cardInstanceIds = CardInstance.cardInstancesToIds(action.deck);
               return Object.assign(
               {}, state,
               {
                  agentTableau: state.agentTableau.set(action.agent.id(), Immutable.List(cardInstanceIds)),
               });
            case Action.SET_AGENT_THREAT:
               return Object.assign(
               {}, state,
               {
                  agentThreat: state.agentThreat.set(action.agent.id(), action.value),
               });
            case Action.SET_CARD_DAMAGE:
               return Object.assign(
               {}, state,
               {
                  cardWounds: state.cardWounds.set(action.cardInstance.id(), action.value),
               });
            case Action.SET_CARD_FACE_UP:
               return Object.assign(
               {}, state,
               {
                  cardIsFaceUp: state.cardIsFaceUp.set(action.cardInstance.id(), action.isFaceUp),
               });
            case Action.SET_CARD_INSTANCE:
               return Object.assign(
               {}, state,
               {
                  cardInstances: state.cardInstances.set(action.id, action.values),
               });
            case Action.SET_CARD_PROGRESS:
               return Object.assign(
               {}, state,
               {
                  cardProgress: state.cardProgress.set(action.cardInstance.id(), action.value),
               });
            case Action.SET_CARD_QUESTING:
               return Object.assign(
               {}, state,
               {
                  cardIsQuesting: state.cardIsQuesting.set(action.cardInstance.id(), action.isQuesting),
               });
            case Action.SET_CARD_READY:
               return Object.assign(
               {}, state,
               {
                  cardIsReady: state.cardIsReady.set(action.cardInstance.id(), action.isReady),
               });
            case Action.SET_CARD_RESOURCE:
               cardId = action.cardInstance.id();
               oldResources = (state.cardResources.get(cardId) !== undefined ? state.cardResources.get(cardId) : Immutable.Map());
               newResources = oldResources.set(action.sphereKey, action.value);
               return Object.assign(
               {}, state,
               {
                  cardResources: state.cardResources.set(cardId, newResources),
               });
            case Action.SET_ENCOUNTER_DECK:
               cardInstanceIds = CardInstance.cardInstancesToIds(action.deck);
               return Object.assign(
               {}, state,
               {
                  encounterDeck: Immutable.List(cardInstanceIds),
               });
            case Action.SET_ENVIRONMENT:
               return Object.assign(
               {}, state,
               {
                  environment: action.environment,
               });
            case Action.SET_FIRST_AGENT:
               return Object.assign(
               {}, state,
               {
                  firstAgentId: action.agent.id(),
               });
            case Action.SET_QUEST_DECK:
               cardInstanceIds = CardInstance.cardInstancesToIds(action.deck);
               return Object.assign(
               {}, state,
               {
                  questDeck: Immutable.List(cardInstanceIds),
               });
            case Action.SET_RESOURCE_BASE:
               return Object.assign(
               {}, state,
               {
                  resourceBase: action.resourceBase,
               });
            case Action.SET_USER_MESSAGE:
               return Object.assign(
               {}, state,
               {
                  userMessage: action.userMessage,
               });
            default:
               LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
               return state;
         }
      };

      function createPhaseData(phaseKey, phaseAgent, phaseCallback, phaseContext)
      {
         InputValidator.validateNotNull("phaseKey", phaseKey);
         // phaseAgent optional.
         // phaseCallback optional.
         // phaseContext optional.

         return Immutable.Map(
         {
            phaseKey: phaseKey,
            phaseAgent: phaseAgent,
            phaseCallback: phaseCallback,
            phaseContext: phaseContext,
         });
      }

      if (Object.freeze)
      {
         Object.freeze(Reducer);
      }

      return Reducer;
   });
