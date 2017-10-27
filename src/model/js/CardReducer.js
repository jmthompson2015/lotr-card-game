"use strict";

define(["immutable", "model/js/CardAction"],
   function(Immutable, CardAction)
   {
      var CardReducer = {};

      CardReducer.reduce = function(state, action)
      {
         LOGGER.debug("CardReducer.root() type = " + action.type);

         var cardId;
         var newResources;
         var oldCount, oldProgress, oldResources, oldWounds;

         switch (action.type)
         {
            case CardAction.ADD_PROGRESS:
               cardId = action.cardInstance.id();
               oldProgress = (state.cardProgress.get(cardId) !== undefined ? state.cardProgress.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardProgress: state.cardProgress.set(cardId, oldProgress + action.value),
               });
            case CardAction.ADD_RESOURCE:
               cardId = action.cardInstance.id();
               oldResources = (state.cardResources.get(cardId) !== undefined ? state.cardResources.get(cardId) : Immutable.Map());
               oldCount = (oldResources.get(action.sphereKey) ? oldResources.get(action.sphereKey) : 0);
               newResources = oldResources.set(action.sphereKey, oldCount + action.value);
               return Object.assign(
               {}, state,
               {
                  cardResources: state.cardResources.set(cardId, newResources),
               });
            case CardAction.ADD_WOUNDS:
               cardId = action.cardInstance.id();
               oldWounds = (state.cardWounds.get(cardId) !== undefined ? state.cardWounds.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardWounds: state.cardWounds.set(cardId, oldWounds + action.value),
               });
            case CardAction.DELETE_FACE_UP:
               return Object.assign(
               {}, state,
               {
                  cardIsFaceUp: state.cardIsFaceUp.delete(action.cardInstance.id()),
               });
            case CardAction.DELETE_PROGRESS:
               return Object.assign(
               {}, state,
               {
                  cardProgress: state.cardProgress.delete(action.cardInstance.id()),
               });
            case CardAction.DELETE_QUESTING:
               return Object.assign(
               {}, state,
               {
                  cardIsQuesting: state.cardIsQuesting.delete(action.cardInstance.id()),
               });
            case CardAction.DELETE_READY:
               return Object.assign(
               {}, state,
               {
                  cardIsReady: state.cardIsReady.delete(action.cardInstance.id()),
               });
            case CardAction.DELETE_RESOURCES:
               return Object.assign(
               {}, state,
               {
                  cardResources: state.cardResources.delete(action.cardInstance.id()),
               });
            case CardAction.DELETE_WOUNDS:
               return Object.assign(
               {}, state,
               {
                  cardWounds: state.cardWounds.delete(action.cardInstance.id()),
               });
            case CardAction.INCREMENT_NEXT_CARD_ID:
               return Object.assign(
               {}, state,
               {
                  nextCardId: state.nextCardId + 1,
               });
            case CardAction.SET_FACE_UP:
               return Object.assign(
               {}, state,
               {
                  cardIsFaceUp: state.cardIsFaceUp.set(action.cardInstance.id(), action.isFaceUp),
               });
            case CardAction.SET_PROGRESS:
               return Object.assign(
               {}, state,
               {
                  cardProgress: state.cardProgress.set(action.cardInstance.id(), action.value),
               });
            case CardAction.SET_QUESTING:
               return Object.assign(
               {}, state,
               {
                  cardIsQuesting: state.cardIsQuesting.set(action.cardInstance.id(), action.isQuesting),
               });
            case CardAction.SET_READY:
               return Object.assign(
               {}, state,
               {
                  cardIsReady: state.cardIsReady.set(action.cardInstance.id(), action.isReady),
               });
            case CardAction.SET_RESOURCE:
               cardId = action.cardInstance.id();
               oldResources = (state.cardResources.get(cardId) !== undefined ? state.cardResources.get(cardId) : Immutable.Map());
               newResources = oldResources.set(action.sphereKey, action.value);
               return Object.assign(
               {}, state,
               {
                  cardResources: state.cardResources.set(cardId, newResources),
               });
            case CardAction.SET_WOUNDS:
               return Object.assign(
               {}, state,
               {
                  cardWounds: state.cardWounds.set(action.cardInstance.id(), action.value),
               });
            default:
               LOGGER.warn("CardReducer.root: Unhandled action type: " + action.type);
               return state;
         }
      };

      if (Object.freeze)
      {
         Object.freeze(CardReducer);
      }

      return CardReducer;
   });
