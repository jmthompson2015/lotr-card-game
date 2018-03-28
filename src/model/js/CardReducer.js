import CardAction from "./CardAction.js";

var CardReducer = {};

CardReducer.reduce = function(state, action)
{
   LOGGER.debug("CardReducer.root() type = " + action.type);

   var cardId;
   var newCardIsFaceUp, newCardIsQuesting, newCardIsReady, newCardIsUsed, newCardProgress, newCardResources, newCardWounds;
   var newCardPhaseBonusAttack, newCardPhaseBonusDefense, newCardPhaseBonusHitPoints, newCardPhaseBonusThreat, newCardPhaseBonusWillpower;
   var oldAttachments, oldBonus, oldProgress, oldResources, oldWounds;

   switch (action.type)
   {
      case CardAction.ADD_PHASE_BONUS_ATTACK:
         cardId = action.cardInstance.id();
         oldBonus = (state.cardPhaseBonusAttack[cardId] !== undefined ? state.cardPhaseBonusAttack[cardId] : 0);
         newCardPhaseBonusAttack = Object.assign(
         {}, state.cardPhaseBonusAttack);
         newCardPhaseBonusAttack[cardId] = oldBonus + action.value;
         return Object.assign(
         {}, state,
         {
            cardPhaseBonusAttack: newCardPhaseBonusAttack,
         });
      case CardAction.ADD_PHASE_BONUS_DEFENSE:
         cardId = action.cardInstance.id();
         oldBonus = (state.cardPhaseBonusDefense[cardId] !== undefined ? state.cardPhaseBonusDefense[cardId] : 0);
         newCardPhaseBonusDefense = Object.assign(
         {}, state.cardPhaseBonusDefense);
         newCardPhaseBonusDefense[cardId] = oldBonus + action.value;
         return Object.assign(
         {}, state,
         {
            cardPhaseBonusDefense: newCardPhaseBonusDefense,
         });
      case CardAction.ADD_PHASE_BONUS_HIT_POINTS:
         cardId = action.cardInstance.id();
         oldBonus = (state.cardPhaseBonusHitPoints[cardId] !== undefined ? state.cardPhaseBonusHitPoints[cardId] : 0);
         newCardPhaseBonusHitPoints = Object.assign(
         {}, state.cardPhaseBonusHitPoints);
         newCardPhaseBonusHitPoints[cardId] = oldBonus + action.value;
         return Object.assign(
         {}, state,
         {
            cardPhaseBonusHitPoints: newCardPhaseBonusHitPoints,
         });
      case CardAction.ADD_PHASE_BONUS_THREAT:
         cardId = action.cardInstance.id();
         oldBonus = (state.cardPhaseBonusThreat[cardId] !== undefined ? state.cardPhaseBonusThreat[cardId] : 0);
         newCardPhaseBonusThreat = Object.assign(
         {}, state.cardPhaseBonusThreat);
         newCardPhaseBonusThreat[cardId] = oldBonus + action.value;
         return Object.assign(
         {}, state,
         {
            cardPhaseBonusThreat: newCardPhaseBonusThreat,
         });
      case CardAction.ADD_PHASE_BONUS_WILLPOWER:
         cardId = action.cardInstance.id();
         oldBonus = (state.cardPhaseBonusWillpower[cardId] !== undefined ? state.cardPhaseBonusWillpower[cardId] : 0);
         newCardPhaseBonusWillpower = Object.assign(
         {}, state.cardPhaseBonusWillpower);
         newCardPhaseBonusWillpower[cardId] = oldBonus + action.value;
         return Object.assign(
         {}, state,
         {
            cardPhaseBonusWillpower: newCardPhaseBonusWillpower,
         });
      case CardAction.ADD_PROGRESS:
         cardId = action.cardInstance.id();
         oldProgress = (state.cardProgress[cardId] !== undefined ? state.cardProgress[cardId] : 0);
         newCardProgress = Object.assign(
         {}, state.cardProgress);
         newCardProgress[cardId] = Math.max(oldProgress + action.value, 0);
         return Object.assign(
         {}, state,
         {
            cardProgress: newCardProgress,
         });
      case CardAction.ADD_RESOURCES:
         cardId = action.cardInstance.id();
         oldResources = (state.cardResources[cardId] !== undefined ? state.cardResources[cardId] : 0);
         newCardResources = Object.assign(
         {}, state.cardResources);
         newCardResources[cardId] = Math.max(oldResources + action.value, 0);
         return Object.assign(
         {}, state,
         {
            cardResources: newCardResources,
         });
      case CardAction.ADD_ROUND_BONUS_ATTACK:
         cardId = action.cardInstance.id();
         oldBonus = (state.cardRoundBonusAttack[cardId] !== undefined ? state.cardRoundBonusAttack[cardId] : 0);
         return Object.assign(
         {}, state,
         {
            cardRoundBonusAttack: Object.assign(
            {}, state.cardRoundBonusAttack)[cardId] = oldBonus + action.value,
         });
      case CardAction.ADD_ROUND_BONUS_DEFENSE:
         cardId = action.cardInstance.id();
         oldBonus = (state.cardRoundBonusDefense[cardId] !== undefined ? state.cardRoundBonusDefense[cardId] : 0);
         return Object.assign(
         {}, state,
         {
            cardRoundBonusDefense: Object.assign(
            {}, state.cardRoundBonusDefense)[cardId] = oldBonus + action.value,
         });
      case CardAction.ADD_ROUND_BONUS_HIT_POINTS:
         cardId = action.cardInstance.id();
         oldBonus = (state.cardRoundBonusHitPoints[cardId] !== undefined ? state.cardRoundBonusHitPoints[cardId] : 0);
         return Object.assign(
         {}, state,
         {
            cardRoundBonusHitPoints: Object.assign(
            {}, state.cardRoundBonusHitPoints)[cardId] = oldBonus + action.value,
         });
      case CardAction.ADD_ROUND_BONUS_THREAT:
         cardId = action.cardInstance.id();
         oldBonus = (state.cardRoundBonusThreat[cardId] !== undefined ? state.cardRoundBonusThreat[cardId] : 0);
         return Object.assign(
         {}, state,
         {
            cardRoundBonusThreat: Object.assign(
            {}, state.cardRoundBonusThreat)[cardId] = oldBonus + action.value,
         });
      case CardAction.ADD_ROUND_BONUS_WILLPOWER:
         cardId = action.cardInstance.id();
         oldBonus = (state.cardRoundBonusWillpower[cardId] !== undefined ? state.cardRoundBonusWillpower[cardId] : 0);
         return Object.assign(
         {}, state,
         {
            cardRoundBonusWillpower: Object.assign(
            {}, state.cardRoundBonusWillpower)[cardId] = oldBonus + action.value,
         });
      case CardAction.ADD_WOUNDS:
         cardId = action.cardInstance.id();
         oldWounds = (state.cardWounds[cardId] !== undefined ? state.cardWounds[cardId] : 0);
         newCardWounds = Object.assign(
         {}, state.cardWounds);
         newCardWounds[cardId] = Math.max(oldWounds + action.value, 0);
         return Object.assign(
         {}, state,
         {
            cardWounds: newCardWounds,
         });
      case CardAction.ATTACH:
         LOGGER.info("Attach: " + action.attachmentInstance + " to " + action.cardInstance);
         cardId = action.cardInstance.id();
         oldAttachments = (state.cardAttachments[cardId] !== undefined ? state.cardAttachments[cardId] : []);
         return Object.assign(
         {}, state,
         {
            cardAttachments: Object.assign(
            {}, state.cardAttachments)[cardId] = oldAttachments.push(action.attachmentInstance.id()),
         });
      case CardAction.CLEAR_PHASE_BONUSES:
         // LOGGER.info("CLEAR_PHASE_BONUSES");
         return Object.assign(
         {}, state,
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
      case CardAction.CLEAR_ROUND_BONUSES:
         // LOGGER.info("CLEAR_ROUND_BONUSES");
         return Object.assign(
         {}, state,
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
      case CardAction.DELETE_FACE_UP:
         newCardIsFaceUp = Object.assign(
         {}, state.cardIsFaceUp);
         delete newCardIsFaceUp[action.cardInstance.id()];
         return Object.assign(
         {}, state,
         {
            cardIsFaceUp: newCardIsFaceUp,
         });
      case CardAction.DELETE_PROGRESS:
         newCardProgress = Object.assign(
         {}, state.cardProgress);
         delete newCardProgress[action.cardInstance.id()];
         return Object.assign(
         {}, state,
         {
            cardProgress: newCardProgress,
         });
      case CardAction.DELETE_QUESTING:
         newCardIsQuesting = Object.assign(
         {}, state.cardIsQuesting);
         delete newCardIsQuesting[action.cardInstance.id()];
         return Object.assign(
         {}, state,
         {
            cardIsQuesting: newCardIsQuesting,
         });
      case CardAction.DELETE_READY:
         newCardIsReady = Object.assign(
         {}, state.cardIsReady);
         delete newCardIsReady[action.cardInstance.id()];
         return Object.assign(
         {}, state,
         {
            cardIsReady: newCardIsReady,
         });
      case CardAction.DELETE_RESOURCES:
         newCardResources = Object.assign(
         {}, state.cardResources);
         delete newCardResources[action.cardInstance.id()];
         return Object.assign(
         {}, state,
         {
            cardResources: newCardResources,
         });
      case CardAction.DELETE_WOUNDS:
         newCardWounds = Object.assign(
         {}, state.cardWounds);
         delete newCardWounds[action.cardInstance.id()];
         return Object.assign(
         {}, state,
         {
            cardWounds: newCardWounds,
         });
      case CardAction.INCREMENT_NEXT_CARD_ID:
         return Object.assign(
         {}, state,
         {
            nextCardId: state.nextCardId + 1,
         });
      case CardAction.SET_FACE_UP:
         newCardIsFaceUp = Object.assign(
         {}, state.cardIsFaceUp);
         newCardIsFaceUp[action.cardInstance.id()] = action.isFaceUp;
         return Object.assign(
         {}, state,
         {
            cardIsFaceUp: newCardIsFaceUp,
         });
      case CardAction.SET_PROGRESS:
         newCardProgress = Object.assign(
         {}, state.cardProgress);
         newCardProgress[action.cardInstance.id()] = action.value;
         return Object.assign(
         {}, state,
         {
            cardProgress: newCardProgress,
         });
      case CardAction.SET_QUESTING:
         newCardIsQuesting = Object.assign(
         {}, state.cardIsQuesting);
         newCardIsQuesting[action.cardInstance.id()] = action.isQuesting;
         return Object.assign(
         {}, state,
         {
            cardIsQuesting: newCardIsQuesting,
         });
      case CardAction.SET_READY:
         newCardIsReady = Object.assign(
         {}, state.cardIsReady);
         newCardIsReady[action.cardInstance.id()] = action.isReady;
         return Object.assign(
         {}, state,
         {
            cardIsReady: newCardIsReady,
         });
      case CardAction.SET_RESOURCES:
         newCardResources = Object.assign(
         {}, state.cardResources);
         newCardResources[action.cardInstance.id()] = action.value;
         return Object.assign(
         {}, state,
         {
            cardResources: newCardResources,
         });
      case CardAction.SET_USED:
         newCardIsUsed = Object.assign(
         {}, state.cardIsUsed);
         newCardIsUsed[action.cardInstance.id()] = action.isUsed;
         return Object.assign(
         {}, state,
         {
            cardIsUsed: newCardIsUsed,
         });
      case CardAction.SET_WOUNDS:
         newCardWounds = Object.assign(
         {}, state.cardWounds);
         newCardWounds[action.cardInstance.id()] = action.value;
         return Object.assign(
         {}, state,
         {
            cardWounds: newCardWounds,
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

export default CardReducer;