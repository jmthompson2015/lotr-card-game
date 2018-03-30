import CardAction from "./CardAction.js";
import ReducerUtilities from "./ReducerUtilities.js";

var CardReducer = {};

CardReducer.reduce = function(state, action)
{
   LOGGER.debug("CardReducer.root() type = " + action.type);

   switch (action.type)
   {
      case CardAction.ADD_PHASE_BONUS_ATTACK:
         return ReducerUtilities.addValue(state, action, "cardPhaseBonusAttack", action.cardInstance.id(), action.value);
      case CardAction.ADD_PHASE_BONUS_DEFENSE:
         return ReducerUtilities.addValue(state, action, "cardPhaseBonusDefense", action.cardInstance.id(), action.value);
      case CardAction.ADD_PHASE_BONUS_HIT_POINTS:
         return ReducerUtilities.addValue(state, action, "cardPhaseBonusHitPoints", action.cardInstance.id(), action.value);
      case CardAction.ADD_PHASE_BONUS_THREAT:
         return ReducerUtilities.addValue(state, action, "cardPhaseBonusThreat", action.cardInstance.id(), action.value);
      case CardAction.ADD_PHASE_BONUS_WILLPOWER:
         return ReducerUtilities.addValue(state, action, "cardPhaseBonusWillpower", action.cardInstance.id(), action.value);
      case CardAction.ADD_PROGRESS:
         return ReducerUtilities.addValue(state, action, "cardProgress", action.cardInstance.id(), action.value);
      case CardAction.ADD_RESOURCES:
         return ReducerUtilities.addValue(state, action, "cardResources", action.cardInstance.id(), action.value);
      case CardAction.ADD_ROUND_BONUS_ATTACK:
         return ReducerUtilities.addValue(state, action, "cardRoundBonusAttack", action.cardInstance.id(), action.value);
      case CardAction.ADD_ROUND_BONUS_DEFENSE:
         return ReducerUtilities.addValue(state, action, "cardRoundBonusDefense", action.cardInstance.id(), action.value);
      case CardAction.ADD_ROUND_BONUS_HIT_POINTS:
         return ReducerUtilities.addValue(state, action, "cardRoundBonusHitPoints", action.cardInstance.id(), action.value);
      case CardAction.ADD_ROUND_BONUS_THREAT:
         return ReducerUtilities.addValue(state, action, "cardRoundBonusThreat", action.cardInstance.id(), action.value);
      case CardAction.ADD_ROUND_BONUS_WILLPOWER:
         return ReducerUtilities.addValue(state, action, "cardRoundBonusWillpower", action.cardInstance.id(), action.value);
      case CardAction.ADD_WOUNDS:
         return ReducerUtilities.addValue(state, action, "cardWounds", action.cardInstance.id(), action.value);
      case CardAction.CLEAR_PHASE_BONUSES:
         return clearPhaseBonuses(state);
      case CardAction.CLEAR_ROUND_BONUSES:
         return clearRoundBonuses(state);
      case CardAction.DELETE_FACE_UP:
         return deleteValue(state, action, "cardIsFaceUp");
      case CardAction.DELETE_PROGRESS:
         return deleteValue(state, action, "cardProgress");
      case CardAction.DELETE_QUESTING:
         return deleteValue(state, action, "cardIsQuesting");
      case CardAction.DELETE_READY:
         return deleteValue(state, action, "cardIsReady");
      case CardAction.DELETE_RESOURCES:
         return deleteValue(state, action, "cardResources");
      case CardAction.DELETE_WOUNDS:
         return deleteValue(state, action, "cardWounds");
      case CardAction.INCREMENT_NEXT_CARD_ID:
         return incrementNextCardId(state);
      case CardAction.SET_FACE_UP:
         return ReducerUtilities.setValue(state, action, "cardIsFaceUp", action.cardInstance.id(), action.value);
      case CardAction.SET_PROGRESS:
         return ReducerUtilities.setValue(state, action, "cardProgress", action.cardInstance.id(), action.value);
      case CardAction.SET_QUESTING:
         return ReducerUtilities.setValue(state, action, "cardIsQuesting", action.cardInstance.id(), action.value);
      case CardAction.SET_READY:
         return ReducerUtilities.setValue(state, action, "cardIsReady", action.cardInstance.id(), action.value);
      case CardAction.SET_RESOURCES:
         return ReducerUtilities.setValue(state, action, "cardResources", action.cardInstance.id(), action.value);
      case CardAction.SET_USED:
         return ReducerUtilities.setValue(state, action, "cardIsUsed", action.cardInstance.id(), action.value);
      case CardAction.SET_WOUNDS:
         return ReducerUtilities.setValue(state, action, "cardWounds", action.cardInstance.id(), action.value);
      default:
         LOGGER.warn("CardReducer.root: Unhandled action type: " + action.type);
         return state;
   }
};

function clearPhaseBonuses(state)
{
   return ReducerUtilities.updateObject(state,
   {
      cardPhaseBonusThreat:
      {},
      cardPhaseBonusWillpower:
      {},
      cardPhaseBonusAttack:
      {},
      cardPhaseBonusDefense:
      {},
      cardPhaseBonusHitPoints:
      {},
   });
}

function clearRoundBonuses(state)
{
   return ReducerUtilities.updateObject(state,
   {
      cardRoundBonusThreat:
      {},
      cardRoundBonusWillpower:
      {},
      cardRoundBonusAttack:
      {},
      cardRoundBonusDefense:
      {},
      cardRoundBonusHitPoints:
      {},
   });
}

function deleteValue(state, action, name)
{
   let cardId = action.cardInstance.id();
   let newMap = ReducerUtilities.copyObject(state[name]);
   delete newMap[cardId];
   let source = {};
   source[name] = newMap;

   return ReducerUtilities.updateObject(state, source);
}

function incrementNextCardId(state)
{
   return ReducerUtilities.updateObject(state,
   {
      nextCardId: state.nextCardId + 1,
   });
}

if (Object.freeze)
{
   Object.freeze(CardReducer);
}

export default CardReducer;