import InputValidator from "../../common/js/InputValidator.js";

var CardAction = {};

CardAction.ADD_PHASE_BONUS_ATTACK = "addPhaseBonusAttack";
CardAction.ADD_PHASE_BONUS_DEFENSE = "addPhaseBonusDefense";
CardAction.ADD_PHASE_BONUS_HIT_POINTS = "addPhaseBonusHitPoints";
CardAction.ADD_PHASE_BONUS_THREAT = "addPhaseBonusThreat";
CardAction.ADD_PHASE_BONUS_WILLPOWER = "addPhaseBonusWillpower";
CardAction.ADD_PROGRESS = "addProgress";
CardAction.ADD_RESOURCES = "addResources";
CardAction.ADD_ROUND_BONUS_ATTACK = "addRoundBonusAttack";
CardAction.ADD_ROUND_BONUS_DEFENSE = "addRoundBonusDefense";
CardAction.ADD_ROUND_BONUS_HIT_POINTS = "addRoundBonusHitPoints";
CardAction.ADD_ROUND_BONUS_THREAT = "addRoundBonusThreat";
CardAction.ADD_ROUND_BONUS_WILLPOWER = "addRoundBonusWillpower";
CardAction.ADD_WOUNDS = "addWounds";
CardAction.CLEAR_PHASE_BONUSES = "clearPhaseBonuses";
CardAction.CLEAR_ROUND_BONUSES = "clearRoundBonuses";
CardAction.DELETE_FACE_UP = "deleteFaceUp";
CardAction.DELETE_PROGRESS = "deleteProgress";
CardAction.DELETE_QUESTING = "deleteQuesting";
CardAction.DELETE_READY = "deleteReady";
CardAction.DELETE_RESOURCES = "deleteResources";
CardAction.DELETE_WOUNDS = "deleteWounds";
CardAction.INCREMENT_NEXT_CARD_ID = "incrementNextCardId";
CardAction.SET_FACE_UP = "setFaceUp";
CardAction.SET_PROGRESS = "setProgress";
CardAction.SET_QUESTING = "setQuesting";
CardAction.SET_READY = "setReady";
CardAction.SET_RESOURCES = "setResources";
CardAction.SET_USED = "setUsed";
CardAction.SET_WOUNDS = "setWounds";

CardAction.addPhaseBonusAttack = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_PHASE_BONUS_ATTACK,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.addPhaseBonusDefense = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_PHASE_BONUS_DEFENSE,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.addPhaseBonusHitPoints = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_PHASE_BONUS_HIT_POINTS,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.addPhaseBonusThreat = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_PHASE_BONUS_THREAT,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.addPhaseBonusWillpower = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_PHASE_BONUS_WILLPOWER,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.addProgress = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_PROGRESS,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.addResources = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_RESOURCES,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.addRoundBonusAttack = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_ROUND_BONUS_ATTACK,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.addRoundBonusDefense = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_ROUND_BONUS_DEFENSE,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.addRoundBonusHitPoints = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_ROUND_BONUS_HIT_POINTS,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.addRoundBonusThreat = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_ROUND_BONUS_THREAT,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.addRoundBonusWillpower = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_ROUND_BONUS_WILLPOWER,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.addWounds = function(cardInstance, value = 1)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.ADD_WOUNDS,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.clearPhaseBonuses = function()
{
   return (
   {
      type: CardAction.CLEAR_PHASE_BONUSES,
   });
};

CardAction.clearRoundBonuses = function()
{
   return (
   {
      type: CardAction.CLEAR_ROUND_BONUSES,
   });
};

CardAction.deleteFaceUp = function(cardInstance)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.DELETE_FACE_UP,
      cardInstance: cardInstance,
   });
};

CardAction.deleteProgress = function(cardInstance)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.DELETE_PROGRESS,
      cardInstance: cardInstance,
   });
};

CardAction.deleteQuesting = function(cardInstance)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.DELETE_QUESTING,
      cardInstance: cardInstance,
   });
};

CardAction.deleteReady = function(cardInstance)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.DELETE_READY,
      cardInstance: cardInstance,
   });
};

CardAction.deleteResources = function(cardInstance)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.DELETE_RESOURCES,
      cardInstance: cardInstance,
   });
};

CardAction.deleteWounds = function(cardInstance)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.DELETE_WOUNDS,
      cardInstance: cardInstance,
   });
};

CardAction.incrementNextCardId = function()
{
   return (
   {
      type: CardAction.INCREMENT_NEXT_CARD_ID,
   });
};

CardAction.setFaceUp = function(cardInstance, isFaceUp)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);
   InputValidator.validateIsBoolean("isFaceUp", isFaceUp);

   return (
   {
      type: CardAction.SET_FACE_UP,
      cardInstance: cardInstance,
      value: isFaceUp,
   });
};

CardAction.setProgress = function(cardInstance, value = 0)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.SET_PROGRESS,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.setQuesting = function(cardInstance, isQuesting)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);
   InputValidator.validateIsBoolean("isQuesting", isQuesting);

   return (
   {
      type: CardAction.SET_QUESTING,
      cardInstance: cardInstance,
      value: isQuesting,
   });
};

CardAction.setReady = function(cardInstance, isReady)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);
   InputValidator.validateIsBoolean("isReady", isReady);

   return (
   {
      type: CardAction.SET_READY,
      cardInstance: cardInstance,
      value: isReady,
   });
};

CardAction.setResources = function(cardInstance, value = 0)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.SET_RESOURCES,
      cardInstance: cardInstance,
      value: value,
   });
};

CardAction.setUsed = function(cardInstance, isUsed)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);
   InputValidator.validateIsBoolean("isUsed", isUsed);

   return (
   {
      type: CardAction.SET_USED,
      cardInstance: cardInstance,
      value: isUsed,
   });
};

CardAction.setWounds = function(cardInstance, value = 0)
{
   InputValidator.validateNotNull("cardInstance", cardInstance);

   return (
   {
      type: CardAction.SET_WOUNDS,
      cardInstance: cardInstance,
      value: value,
   });
};

export default CardAction;