import CardAction from "./CardAction.js";
import ReducerUtilities from "./ReducerUtilities.js";

var CardReducer = {};

CardReducer.reduce = function(state, action)
{
   LOGGER.debug("CardReducer.root() type = " + action.type);

   switch (action.type)
   {
      case CardAction.ADD_PHASE_BONUS_ATTACK:
         return addValue(state, action, "cardPhaseBonusAttack");
      case CardAction.ADD_PHASE_BONUS_DEFENSE:
         return addValue(state, action, "cardPhaseBonusDefense");
      case CardAction.ADD_PHASE_BONUS_HIT_POINTS:
         return addValue(state, action, "cardPhaseBonusHitPoints");
      case CardAction.ADD_PHASE_BONUS_THREAT:
         return addValue(state, action, "cardPhaseBonusThreat");
      case CardAction.ADD_PHASE_BONUS_WILLPOWER:
         return addValue(state, action, "cardPhaseBonusWillpower");
      case CardAction.ADD_PROGRESS:
         return addValue(state, action, "cardProgress");
      case CardAction.ADD_RESOURCES:
         return addValue(state, action, "cardResources");
      case CardAction.ADD_ROUND_BONUS_ATTACK:
         return addValue(state, action, "cardRoundBonusAttack");
      case CardAction.ADD_ROUND_BONUS_DEFENSE:
         return addValue(state, action, "cardRoundBonusDefense");
      case CardAction.ADD_ROUND_BONUS_HIT_POINTS:
         return addValue(state, action, "cardRoundBonusHitPoints");
      case CardAction.ADD_ROUND_BONUS_THREAT:
         return addValue(state, action, "cardRoundBonusThreat");
      case CardAction.ADD_ROUND_BONUS_WILLPOWER:
         return addValue(state, action, "cardRoundBonusWillpower");
      case CardAction.ADD_WOUNDS:
         return addValue(state, action, "cardWounds");
      case CardAction.ATTACH:
         return attach(state, action);
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
         return setValue(state, action, "cardIsFaceUp");
      case CardAction.SET_PROGRESS:
         return setValue(state, action, "cardProgress");
      case CardAction.SET_QUESTING:
         return setValue(state, action, "cardIsQuesting");
      case CardAction.SET_READY:
         return setValue(state, action, "cardIsReady");
      case CardAction.SET_RESOURCES:
         return setValue(state, action, "cardResources");
      case CardAction.SET_USED:
         return setValue(state, action, "cardIsUsed");
      case CardAction.SET_WOUNDS:
         return setValue(state, action, "cardWounds");
      default:
         LOGGER.warn("CardReducer.root: Unhandled action type: " + action.type);
         return state;
   }
};

function addValue(state, action, name)
{
   let cardId = action.cardInstance.id();
   let oldValue = ReducerUtilities.integerOrZero(state[name][cardId]);
   let newMap = ReducerUtilities.copyObject(state[name]);
   newMap[cardId] = oldValue + action.value;
   let source = {};
   source[name] = newMap;

   return ReducerUtilities.updateObject(state, source);
}

function attach(state, action)
{
   LOGGER.info("Attach: " + action.attachmentInstance + " to " + action.cardInstance);
   let cardId = action.cardInstance.id();
   let oldAttachments = (state.cardAttachments[cardId] !== undefined ? state.cardAttachments[cardId] : []);
   let newAttachments = oldAttachments.slice();
   newAttachments.push(action.attachmentInstance.id());
   let newCardAttachments = ReducerUtilities.copyObject(state.cardAttachments);
   newCardAttachments[cardId] = newAttachments;

   return ReducerUtilities.updateObject(state,
   {
      cardAttachments: newCardAttachments
   });
}

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

function setValue(state, action, name)
{
   let cardId = action.cardInstance.id();
   let newMap = ReducerUtilities.copyObject(state[name]);
   newMap[cardId] = action.value;
   let source = {};
   source[name] = newMap;

   return ReducerUtilities.updateObject(state, source);
}

if (Object.freeze)
{
   Object.freeze(CardReducer);
}

export default CardReducer;