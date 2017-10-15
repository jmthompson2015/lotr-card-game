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

         var cardId, cardInstanceIds, id, newEncounterDeck, newPhaseData, newPhaseQueue, newResources, oldResources;

         switch (action.type)
         {
            case Action.ADD_AGENT_THREAT:
               id = action.agent.id();
               var oldThreat = (state.agentThreat.get(id) !== undefined ? state.agentThreat.get(id) : 0);
               return Object.assign(
               {}, state,
               {
                  agentThreat: state.agentThreat.set(id, oldThreat + action.value),
               });
            case Action.ADD_CARD_RESOURCE:
               id = action.cardInstance.id();
               // LOGGER.info("Add agent resource: " + id + " " + action.sphereKey + " " + action.value);
               oldResources = (state.resources.get(id) !== undefined ? state.resources.get(id) : Immutable.Map());
               var oldCount = (oldResources.get(action.sphereKey) ? oldResources.get(action.sphereKey) : 0);
               newResources = oldResources.set(action.sphereKey, oldCount + action.value);
               return Object.assign(
               {}, state,
               {
                  resources: state.resources.set(id, newResources),
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
               var oldStagingArea = (state.stagingArea !== undefined ? state.stagingArea : Immutable.List());
               return Object.assign(
               {}, state,
               {
                  encounterDeck: newEncounterDeck,
                  stagingArea: oldStagingArea.push(cardId),
               });
            case Action.DRAW_PLAYER_CARD:
               id = action.agent.id();
               cardId = state.agentPlayerDeck.get(id).first();
               var newPlayerDeck = state.agentPlayerDeck.get(id).shift();
               var oldAgentHand = (state.agentHand.get(id) !== undefined ? state.agentHand.get(id) : Immutable.List());
               var newAgentHand = oldAgentHand.push(cardId);
               return Object.assign(
               {}, state,
               {
                  agentPlayerDeck: state.agentPlayerDeck.set(id, newPlayerDeck),
                  agentHand: state.agentHand.set(id, newAgentHand),
               });
            case Action.ENQUEUE_PHASE:
               LOGGER.info("PhaseQueue: " + Phase.properties[action.phaseKey].name + ", token = " + action.phaseToken + ", callback " + (action.phaseCallback === undefined ? " === undefined" : " !== undefined") + ", context = " + JSON.stringify(action.phaseContext));
               newPhaseData = createPhaseData(action.phaseKey, action.phaseToken, action.phaseCallback, action.phaseContext);
               newPhaseQueue = state.phaseQueue.push(newPhaseData);
               return Object.assign(
               {}, state,
               {
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
            case Action.SET_ACTIVE_AGENT:
               LOGGER.info("Active Agent: " + action.agent);
               return Object.assign(
               {}, state,
               {
                  activeAgentId: (action.agent !== undefined ? action.agent.id() : undefined),
               });
            case Action.SET_ACTIVE_LOCATION:
               LOGGER.info("Active Location: " + action.cardInstance);
               return Object.assign(
               {}, state,
               {
                  activeLocationId: (action.cardInstance !== undefined ? action.cardInstance.id() : undefined),
               });
            case Action.SET_AGENT:
               return Object.assign(
               {}, state,
               {
                  agents: state.agents.set(action.id, action.values),
               });
            case Action.SET_AGENT_HERO_DECK:
               cardInstanceIds = CardInstance.cardInstancesToIds(action.deck);
               return Object.assign(
               {}, state,
               {
                  agentHeroDeck: state.agentHeroDeck.set(action.agent.id(), Immutable.List(cardInstanceIds)),
               });
            case Action.SET_AGENT_PLAYER_DECK:
               cardInstanceIds = CardInstance.cardInstancesToIds(action.deck);
               return Object.assign(
               {}, state,
               {
                  agentPlayerDeck: state.agentPlayerDeck.set(action.agent.id(), Immutable.List(cardInstanceIds)),
               });
            case Action.SET_AGENT_THREAT:
               return Object.assign(
               {}, state,
               {
                  agentThreat: state.agentThreat.set(action.agent.id(), action.value),
               });
            case Action.SET_CARD_INSTANCE:
               return Object.assign(
               {}, state,
               {
                  cardInstances: state.cardInstances.set(action.id, action.values),
               });
            case Action.SET_CARD_RESOURCE:
               id = action.cardInstance.id();
               oldResources = (state.resources.get(id) !== undefined ? state.resources.get(id) : Immutable.Map());
               newResources = oldResources.set(action.sphereKey, action.value);
               return Object.assign(
               {}, state,
               {
                  resources: state.resources.set(id, newResources),
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
            default:
               LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
               return state;
         }
      };

      function createPhaseData(phaseKey, phaseToken, phaseCallback, phaseContext)
      {
         InputValidator.validateNotNull("phaseKey", phaseKey);
         // phaseToken optional.
         // phaseCallback optional.
         // phaseContext optional.

         return Immutable.Map(
         {
            phaseKey: phaseKey,
            phaseToken: phaseToken,
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
