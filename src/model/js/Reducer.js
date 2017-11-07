"use strict";

define(["immutable", "common/js/InputValidator", "artifact/js/GameEvent", "artifact/js/Phase", "model/js/Action", "model/js/AgentAction", "model/js/AgentReducer", "model/js/CardAction", "model/js/CardInstance", "model/js/CardReducer", "model/js/InitialState", "model/js/TransferReducer"],
   function(Immutable, InputValidator, GameEvent, Phase, Action, AgentAction, AgentReducer, CardAction, CardInstance, CardReducer, InitialState, TransferReducer)
   {
      var Reducer = {};

      Reducer.root = function(state, action)
      {
         LOGGER.debug("Reducer.root() type = " + action.type);

         if (typeof state === 'undefined')
         {
            return new InitialState();
         }

         var agentId, attachmentId, cardId, cardInstanceIds, index, shadowId;
         var newEventData, newEventQueue, newPhaseData, newPhaseQueue;

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
                  return Object.assign(
                  {}, state,
                  {
                     agents: state.agents.set(action.id, action.values),
                  });
               case Action.ADD_CARD_INSTANCE:
                  return Object.assign(
                  {}, state,
                  {
                     cardInstances: state.cardInstances.set(action.id, action.values),
                  });
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
                  // LOGGER.info("Event: (cleared)");
                  return Object.assign(
                  {}, state,
                  {
                     eventData: undefined,
                  });
               case Action.CLEAR_PHASE:
                  // LOGGER.info("Phase: (cleared)");
                  return Object.assign(
                  {}, state,
                  {
                     phaseData: undefined,
                  });
               case Action.DEAL_SHADOW_CARD:
                  LOGGER.info("Deal shadow card to " + action.cardInstance);
                  if (state.encounterDeck.size > 0)
                  {
                     cardId = action.cardInstance.id();
                     shadowId = state.encounterDeck.first();
                     var newState = TransferReducer.reduce(state, "encounterDeck", undefined, shadowId, "cardShadowCards", cardId);
                     return Object.assign(
                     {}, newState,
                     {
                        cardIsFaceUp: newState.cardIsFaceUp.set(shadowId, false),
                     });
                  }
                  LOGGER.warn("encounterDeck empty; encounterDiscard.size = " + state.encounterDiscard.size);
                  return state;
               case Action.DELETE_AGENT:
                  LOGGER.info("Delete agent: " + action.agent);
                  agentId = action.agent.id();
                  return Object.assign(
                  {}, state,
                  {
                     agents: state.agents.delete(agentId),
                  });
               case Action.DEQUEUE_EVENT:
                  // LOGGER.info("EventQueue: (dequeue)");
                  newEventData = state.eventQueue.first();
                  newEventQueue = state.eventQueue.shift();
                  return Object.assign(
                  {}, state,
                  {
                     eventData: newEventData,
                     eventQueue: newEventQueue,
                  });
               case Action.DEQUEUE_PHASE:
                  // LOGGER.debug("PhaseQueue: (dequeue)");
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
                     encounterDiscard: state.encounterDiscard.push(state.activeLocationId),
                  });
               case Action.DISCARD_ACTIVE_QUEST:
                  return Object.assign(
                  {}, state,
                  {
                     activeQuestId: undefined,
                     questDiscard: state.questDiscard.push(state.activeQuestId),
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
                  if (state.encounterDeck.size > 0)
                  {
                     cardId = (action.index === undefined ? state.encounterDeck.first() : state.encounterDeck.get(action.index));
                     return TransferReducer.reduce(state, "encounterDeck", undefined, cardId, "stagingArea");
                  }
                  LOGGER.warn("encounterDeck empty; encounterDiscard.size = " + state.encounterDiscard.size);
                  return state;
               case Action.DRAW_QUEST_CARD:
                  if (state.questDeck.size > 0)
                  {
                     cardId = state.questDeck.first();
                     return Object.assign(
                     {}, state,
                     {
                        activeQuestId: cardId,
                        questDeck: state.questDeck.shift(),
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
                  attachmentId = state.encounterDeck.first();
                  return TransferReducer.reduce(state, "encounterDeck", undefined, attachmentId, "cardAttachments", cardId);
               case Action.ENCOUNTER_TO_SET_ASIDE:
                  cardId = action.cardInstance.id();
                  return TransferReducer.reduce(state, "encounterDeck", undefined, cardId, "encounterSetAside");
               case Action.ENQUEUE_EVENT:
                  LOGGER.info("EventQueue: " + GameEvent.properties[action.eventKey].name + ", context = " + JSON.stringify(action.eventContext));
                  newEventData = createEventData(action.eventKey, action.eventContext, action.eventCallback);
                  newEventQueue = state.eventQueue.push(newEventData);
                  return Object.assign(
                  {}, state,
                  {
                     eventQueue: newEventQueue,
                  });
               case Action.ENQUEUE_PHASE:
                  LOGGER.info("PhaseQueue: " + Phase.properties[action.phaseKey].name + ", callback " + (action.phaseCallback === undefined ? " === undefined" : " !== undefined") + ", context = " + JSON.stringify(action.phaseContext));
                  newPhaseData = createPhaseData(action.phaseKey, action.phaseContext, action.phaseCallback);
                  newPhaseQueue = state.phaseQueue.push(newPhaseData);
                  return Object.assign(
                  {}, state,
                  {
                     phaseQueue: newPhaseQueue,
                  });
               case Action.INCREMENT_ROUND:
                  LOGGER.info("Round: " + (state.round + 1));
                  return Object.assign(
                  {}, state,
                  {
                     round: state.round + 1,
                  });
               case Action.REFILL_ENCOUNTER_DECK:
                  LOGGER.info("Refill encounter deck encounterDeck = " + state.encounterDeck.size + " encounterDiscard.size = " + state.encounterDiscard.size);
                  return Object.assign(
                  {}, state,
                  {
                     encounterDeck: Immutable.List(state.encounterDiscard.toJS().lotrShuffle()),
                     encounterDiscard: new Immutable.List(),
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
               case Action.SET_ADJUDICATOR:
                  return Object.assign(
                  {}, state,
                  {
                     adjudicator: action.adjudicator,
                  });
               case Action.SET_ASIDE_TO_ENCOUNTER_DECK:
                  cardId = action.cardInstance.id();
                  return TransferReducer.reduce(state, "encounterSetAside", undefined, cardId, "encounterDeck");
               case Action.SET_ENCOUNTER_DECK:
                  cardInstanceIds = CardInstance.cardInstancesToIds(action.deck);
                  return Object.assign(
                  {}, state,
                  {
                     encounterDeck: Immutable.List(cardInstanceIds),
                  });
               case Action.SET_DELAY:
                  return Object.assign(
                  {}, state,
                  {
                     delay: action.delay,
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
               case Action.SET_SCENARIO_KEY:
                  return Object.assign(
                  {}, state,
                  {
                     scenarioKey: action.scenarioKey,
                  });
               case Action.SET_USER_MESSAGE:
                  return Object.assign(
                  {}, state,
                  {
                     userMessage: action.userMessage,
                  });
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

      function createEventData(eventKey, eventContext, eventCallback)
      {
         InputValidator.validateNotNull("eventKey", eventKey);
         // eventContext optional.
         // eventCallback optional.

         return Immutable.Map(
         {
            eventKey: eventKey,
            eventContext: eventContext,
            eventCallback: eventCallback,
         });
      }

      function createPhaseData(phaseKey, phaseContext, phaseCallback)
      {
         InputValidator.validateNotNull("phaseKey", phaseKey);
         // phaseContext optional.
         // phaseCallback optional.

         return Immutable.Map(
         {
            phaseKey: phaseKey,
            phaseContext: phaseContext,
            phaseCallback: phaseCallback,
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

      if (Object.freeze)
      {
         Object.freeze(Reducer);
      }

      return Reducer;
   });
