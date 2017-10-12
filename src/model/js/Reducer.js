"use strict";

define(["immutable", "model/js/Action", "model/js/InitialState"],
   function(Immutable, Action, InitialState)
   {
      var Reducer = {};

      Reducer.root = function(state, action)
      {
         LOGGER.debug("rootReducer() type = " + action.type);

         if (typeof state === 'undefined')
         {
            return new InitialState();
         }

         switch (action.type)
         {
            case Action.ADD_ROUND:
               return Object.assign(
               {}, state,
               {
                  round: state.round + 1,
               });
            case Action.INCREMENT_NEXT_CARD_ID:
               return Object.assign(
               {}, state,
               {
                  nextCardId: state.nextCardId + 1,
               });
            case Action.SET_CARD_INSTANCE:
               var values = Immutable.Map(
               {
                  id: action.id,
                  cardKey: action.card.key,
                  cardTypeKey: action.card.cardTypeKey,
               });
               return Object.assign(
               {}, state,
               {
                  cardInstances: state.cardInstances.set(action.id, values),
               });
            default:
               LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
               return state;
         }
      };

      return Reducer;
   });
