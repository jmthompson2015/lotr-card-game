"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   var CardAction = {};

   CardAction.ADD_PHASE_BONUS_ATTACK = "addPhaseBonusAttack";
   CardAction.ADD_PHASE_BONUS_DEFENSE = "addPhaseBonusDefense";
   CardAction.ADD_PHASE_BONUS_HIT_POINTS = "addPhaseBonusHitPoints";
   CardAction.ADD_PHASE_BONUS_THREAT = "addPhaseBonusThreat";
   CardAction.ADD_PHASE_BONUS_WILLPOWER = "addPhaseBonusWillpower";
   CardAction.ADD_ROUND_BONUS_ATTACK = "addRoundBonusAttack";
   CardAction.ADD_ROUND_BONUS_DEFENSE = "addRoundBonusDefense";
   CardAction.ADD_ROUND_BONUS_HIT_POINTS = "addRoundBonusHitPoints";
   CardAction.ADD_ROUND_BONUS_THREAT = "addRoundBonusThreat";
   CardAction.ADD_ROUND_BONUS_WILLPOWER = "addRoundBonusWillpower";
   CardAction.ADD_PROGRESS = "addProgress";
   CardAction.ADD_RESOURCE = "addResource";
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
   CardAction.SET_RESOURCE = "setResource";
   CardAction.SET_USED = "setUsed";
   CardAction.SET_WOUNDS = "setWounds";

   CardAction.addPhaseBonusAttack = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_PHASE_BONUS_ATTACK,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   CardAction.addPhaseBonusDefense = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_PHASE_BONUS_DEFENSE,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   CardAction.addPhaseBonusHitPoints = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_PHASE_BONUS_HIT_POINTS,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   CardAction.addPhaseBonusThreat = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_PHASE_BONUS_THREAT,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   CardAction.addPhaseBonusWillpower = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_PHASE_BONUS_WILLPOWER,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   CardAction.addRoundBonusAttack = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_ROUND_BONUS_ATTACK,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   CardAction.addRoundBonusDefense = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_ROUND_BONUS_DEFENSE,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   CardAction.addRoundBonusHitPoints = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_ROUND_BONUS_HIT_POINTS,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   CardAction.addRoundBonusThreat = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_ROUND_BONUS_THREAT,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   CardAction.addRoundBonusWillpower = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_ROUND_BONUS_WILLPOWER,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   CardAction.addProgress = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_PROGRESS,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   CardAction.addResource = function(cardInstance, sphereKey, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      InputValidator.validateIsString("sphereKey", sphereKey);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_RESOURCE,
         cardInstance: cardInstance,
         sphereKey: sphereKey,
         value: myValue,
      });
   };

   CardAction.addWounds = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 1

      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: CardAction.ADD_WOUNDS,
         cardInstance: cardInstance,
         value: myValue,
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
         isFaceUp: isFaceUp,
      });
   };

   CardAction.setProgress = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 0

      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: CardAction.SET_PROGRESS,
         cardInstance: cardInstance,
         value: myValue,
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
         isQuesting: isQuesting,
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
         isReady: isReady,
      });
   };

   CardAction.setResource = function(cardInstance, sphereKey, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      InputValidator.validateIsString("sphereKey", sphereKey);
      // value optional. default: 0

      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: CardAction.SET_RESOURCE,
         cardInstance: cardInstance,
         sphereKey: sphereKey,
         value: myValue,
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
         isUsed: isUsed,
      });
   };

   CardAction.setWounds = function(cardInstance, value)
   {
      InputValidator.validateNotNull("cardInstance", cardInstance);
      // value optional. default: 0

      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: CardAction.SET_WOUNDS,
         cardInstance: cardInstance,
         value: myValue,
      });
   };

   return CardAction;
});
