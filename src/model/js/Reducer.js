import ArrayUtilities from "../../common/js/ArrayUtilities.js";
import InputValidator from "../../common/js/InputValidator.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import Phase from "../../artifact/js/Phase.js";
import Action from "./Action.js";
import AgentAction from "./AgentAction.js";
import AgentReducer from "./AgentReducer.js";
import CardAction from "./CardAction.js";
import CardInstance from "./CardInstance.js";
import CardReducer from "./CardReducer.js";
import InitialState from "./InitialState.js";
import ReducerUtilities from "./ReducerUtilities.js";
import TransferReducer from "./TransferReducer.js";

var Reducer = {};

Reducer.root = function(state, action)
{
   LOGGER.debug("Reducer.root() type = " + action.type);

   if (typeof state === 'undefined')
   {
      return new InitialState();
   }

   var agentId, attachmentId, cardId, shadowId;
   var newEventData, newEventQueue, newPhaseData, newPhaseQueue;
   var newAgents, newEncounterDiscard, newQuestDeck, newQuestDiscard, newStagingArea;

   if (isAgentAction(action))
   {
      return AgentReducer.reduce(state, action);
   }
   else if (isCardAction(action))
   {
      return CardReducer.reduce(state, action);
   }
   else
   {
      switch (action.type)
      {
         case Action.ADD_AGENT:
            return addValues(state, action, "agents");
         case Action.ADD_CARD_INSTANCE:
            return addValues(state, action, "cardInstances");
         case Action.AGENT_DISCARD_ENEMY_CARD:
            LOGGER.info("Discard enemy card: " + action.cardInstance);
            agentId = action.agent.id();
            cardId = action.cardInstance.id();
            return TransferReducer.reduce(state, "agentEngagementArea", agentId, cardId, "encounterDiscard");
         case Action.AGENT_ENGAGE_CARD:
            LOGGER.info("Agent engage card: " + action.cardInstance);
            agentId = action.agent.id();
            cardId = action.cardInstance.id();
            return TransferReducer.reduce(state, "stagingArea", undefined, cardId, "agentEngagementArea", agentId);
         case Action.AGENT_ENGAGEMENT_TO_STAGING:
            LOGGER.info("Agent engagement to staging: " + action.cardInstance);
            agentId = action.agent.id();
            cardId = action.cardInstance.id();
            return TransferReducer.reduce(state, "agentEngagementArea", agentId, cardId, "stagingArea");
         case Action.CLEAR_EVENT:
            return clear(state, "eventData");
         case Action.CLEAR_PHASE:
            return clear(state, "phaseData");
         case Action.DEAL_SHADOW_CARD:
            LOGGER.info("Deal shadow card to " + action.cardInstance);
            if (state.encounterDeck.length > 0)
            {
               cardId = action.cardInstance.id();
               shadowId = state.encounterDeck[0];
               var newState = TransferReducer.reduce(state, "encounterDeck", undefined, shadowId, "cardShadowCards", cardId);
               newState.cardIsFaceUp[shadowId] = false;
               return ReducerUtilities.updateObject(newState,
               {
                  cardIsFaceUp: newState.cardIsFaceUp,
               });
            }
            LOGGER.warn("encounterDeck empty; encounterDiscard.length = " + state.encounterDiscard.length);
            return state;
         case Action.DELETE_AGENT:
            LOGGER.info("Delete agent: " + action.agent);
            agentId = action.agent.id();
            newAgents = ReducerUtilities.copyObject(state.agents);
            delete newAgents[agentId];
            return ReducerUtilities.updateObject(state,
            {
               agents: newAgents,
            });
         case Action.DEQUEUE_EVENT:
            // LOGGER.info("EventQueue: (dequeue)");
            newEventQueue = state.eventQueue.slice();
            newEventData = newEventQueue.shift();
            return ReducerUtilities.updateObject(state,
            {
               eventData: newEventData,
               eventQueue: newEventQueue,
            });
         case Action.DEQUEUE_PHASE:
            // LOGGER.debug("PhaseQueue: (dequeue)");
            newPhaseQueue = state.phaseQueue.slice();
            newPhaseData = newPhaseQueue.shift();
            return ReducerUtilities.updateObject(state,
            {
               phaseData: newPhaseData,
               phaseKey: newPhaseData.phaseKey,
               phaseQueue: newPhaseQueue,
            });
         case Action.DISCARD_ACTIVE_LOCATION:
            newEncounterDiscard = state.encounterDiscard.slice();
            newEncounterDiscard.push(state.activeLocationId);
            return ReducerUtilities.updateObject(state,
            {
               activeLocationId: undefined,
               encounterDiscard: newEncounterDiscard,
            });
         case Action.DISCARD_ACTIVE_QUEST:
            newQuestDiscard = state.questDiscard.slice();
            newQuestDiscard.push(state.activeQuestId);
            return ReducerUtilities.updateObject(state,
            {
               activeQuestId: undefined,
               questDiscard: newQuestDiscard,
            });
         case Action.DISCARD_SHADOW_CARD:
            LOGGER.info("Discard shadow card: " + action.cardInstance);
            cardId = action.cardInstance.id();
            shadowId = action.shadowInstance.id();
            return TransferReducer.reduce(state, "cardShadowCards", cardId, shadowId, "encounterDiscard");
         case Action.DISCARD_STAGING_CARD:
            LOGGER.info("Discard staging card: " + action.cardInstance);
            cardId = action.cardInstance.id();
            return TransferReducer.reduce(state, "stagingArea", undefined, cardId, "encounterDiscard");
         case Action.DRAW_ENCOUNTER_CARD:
            if (state.encounterDeck.length > 0)
            {
               cardId = (action.index === undefined ? state.encounterDeck[0] : state.encounterDeck[action.index]);
               return TransferReducer.reduce(state, "encounterDeck", undefined, cardId, "stagingArea");
            }
            LOGGER.warn("encounterDeck empty; encounterDiscard.length = " + state.encounterDiscard.length);
            return state;
         case Action.DRAW_QUEST_CARD:
            if (state.questDeck.length > 0)
            {
               cardId = state.questDeck[0];
               newQuestDeck = state.questDeck.slice();
               newQuestDeck.shift();
               return ReducerUtilities.updateObject(state,
               {
                  activeQuestId: cardId,
                  questDeck: newQuestDeck,
               });
            }
            LOGGER.warn("questDeck empty");
            return state;
         case Action.ENCOUNTER_TO_AGENT_TABLEAU:
            agentId = action.agent.id();
            cardId = action.cardInstance.id();
            return TransferReducer.reduce(state, "encounterDeck", undefined, cardId, "agentTableau", agentId);
         case Action.ENCOUNTER_TO_CARD_ATTACHMENT:
            cardId = action.cardInstance.id();
            attachmentId = state.encounterDeck[0];
            return TransferReducer.reduce(state, "encounterDeck", undefined, attachmentId, "cardAttachments", cardId);
         case Action.ENCOUNTER_TO_SET_ASIDE:
            cardId = action.cardInstance.id();
            return TransferReducer.reduce(state, "encounterDeck", undefined, cardId, "encounterSetAside");
         case Action.ENQUEUE_EVENT:
            LOGGER.info("EventQueue: " + GameEvent.properties[action.eventKey].name + ", context = " + JSON.stringify(action.eventContext));
            newEventData = createEventData(action.eventKey, action.eventContext, action.eventCallback);
            newEventQueue = state.eventQueue.slice();
            newEventQueue.push(newEventData);
            return ReducerUtilities.updateObject(state,
            {
               eventQueue: newEventQueue,
            });
         case Action.ENQUEUE_PHASE:
            LOGGER.info("PhaseQueue: " + Phase.properties[action.phaseKey].name + ", callback " + (action.phaseCallback === undefined ? " === undefined" : " !== undefined") + ", context = " + JSON.stringify(action.phaseContext));
            newPhaseData = createPhaseData(action.phaseKey, action.phaseContext, action.phaseCallback);
            newPhaseQueue = state.phaseQueue.slice();
            newPhaseQueue.push(newPhaseData);
            return ReducerUtilities.updateObject(state,
            {
               phaseQueue: newPhaseQueue,
            });
         case Action.INCREMENT_ROUND:
            return incrementRound(state);
         case Action.REFILL_ENCOUNTER_DECK:
            LOGGER.info("Refill encounter deck encounterDeck = " + state.encounterDeck.length + " encounterDiscard.length = " + state.encounterDiscard.length);
            return ReducerUtilities.updateObject(state,
            {
               encounterDeck: ArrayUtilities.shuffle(state.encounterDiscard),
               encounterDiscard: [],
            });
         case Action.SET_ACTIVE_AGENT:
            LOGGER.info("Active Agent: " + action.agent);
            return ReducerUtilities.set(state, "activeAgentId", (action.agent !== undefined ? action.agent.id() : undefined));
         case Action.SET_ACTIVE_LOCATION:
            LOGGER.info("Active Location: " + action.cardInstance);
            if (action.cardInstance !== undefined)
            {
               cardId = action.cardInstance.id();
               newStagingArea = state.stagingArea.slice();
               newStagingArea = ArrayUtilities.remove(newStagingArea, cardId);
            }
            else
            {
               newStagingArea = state.stagingArea;
            }
            return ReducerUtilities.updateObject(state,
            {
               activeLocationId: (action.cardInstance !== undefined ? action.cardInstance.id() : undefined),
               stagingArea: newStagingArea,
            });
         case Action.SET_ADJUDICATOR:
            return ReducerUtilities.set(state, "adjudicator", action.adjudicator);
         case Action.SET_ASIDE_TO_ENCOUNTER_DECK:
            cardId = action.cardInstance.id();
            return TransferReducer.reduce(state, "encounterSetAside", undefined, cardId, "encounterDeck");
         case Action.SET_ENCOUNTER_DECK:
            return setDeck(state, action, "encounterDeck");
         case Action.SET_DELAY:
            return ReducerUtilities.set(state, "delay", action.delay);
         case Action.SET_ENVIRONMENT:
            return ReducerUtilities.set(state, "environment", action.environment);
         case Action.SET_FIRST_AGENT:
            return ReducerUtilities.set(state, "firstAgentId", action.agent.id());
         case Action.SET_QUEST_DECK:
            return setDeck(state, action, "questDeck");
         case Action.SET_RESOURCE_BASE:
            return ReducerUtilities.set(state, "resourceBase", action.resourceBase);
         case Action.SET_SCENARIO_KEY:
            return ReducerUtilities.set(state, "scenarioKey", action.scenarioKey);
         case Action.SET_USER_MESSAGE:
            return ReducerUtilities.set(state, "userMessage", action.userMessage);
         case Action.STAGING_TO_AGENT_TABLEAU:
            LOGGER.info("Staging to agent tableau: " + action.cardInstance);
            agentId = action.agent.id();
            cardId = action.cardInstance.id();
            return TransferReducer.reduce(state, "stagingArea", undefined, cardId, "agentTableau", agentId);
         default:
            LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
            return state;
      }
   }
};

function addValues(state, action, name)
{
   let newMap = ReducerUtilities.copyObject(state[name]);
   newMap[action.id] = action.values;
   let source = {};
   source[name] = newMap;

   return ReducerUtilities.updateObject(state, source);
}

function clear(state, name)
{
   let source = {};
   source[name] = undefined;

   return ReducerUtilities.updateObject(state, source);
}

function createEventData(eventKey, eventContext, eventCallback)
{
   InputValidator.validateNotNull("eventKey", eventKey);
   // eventContext optional.
   // eventCallback optional.

   return {
      eventKey: eventKey,
      eventContext: eventContext,
      eventCallback: eventCallback,
   };
}

function createPhaseData(phaseKey, phaseContext, phaseCallback)
{
   InputValidator.validateNotNull("phaseKey", phaseKey);
   // phaseContext optional.
   // phaseCallback optional.

   return {
      phaseKey: phaseKey,
      phaseContext: phaseContext,
      phaseCallback: phaseCallback,
   };
}

function incrementRound(state)
{
   LOGGER.info("Round: " + (state.round + 1));

   return ReducerUtilities.updateObject(state,
   {
      round: state.round + 1,
   });
}

function isAgentAction(action)
{
   return AgentAction[action.type] !== undefined;
}

function isCardAction(action)
{
   return CardAction[action.type] !== undefined;
}

function setDeck(state, action, name)
{
   let cardInstanceIds = CardInstance.cardInstancesToIds(action.deck);
   let source = {};
   source[name] = cardInstanceIds;

   return ReducerUtilities.updateObject(state, source);
}

if (Object.freeze)
{
   Object.freeze(Reducer);
}

export default Reducer;