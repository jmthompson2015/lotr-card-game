"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   var CardAction = {};

   CardAction.ADD_PROGRESS = "addProgress";
   CardAction.ADD_RESOURCE = "addResource";
   CardAction.ADD_WOUNDS = "addWounds";
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
   CardAction.SET_WOUNDS = "setWounds";

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
