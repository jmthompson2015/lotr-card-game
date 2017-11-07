"use strict";

define(function()
{
   var CardType = {
      ALLY: "ally",
      ATTACHMENT: "attachment",
      ENEMY: "enemy",
      EVENT: "event",
      HERO: "hero",
      LOCATION: "location",
      OBJECTIVE: "objective",
      QUEST: "quest",
      TREACHERY: "treachery",

      properties:
      {
         "ally":
         {
            name: "Ally",
            key: "ally",
         },
         "attachment":
         {
            name: "Attachment",
            key: "attachment",
         },
         "enemy":
         {
            name: "Enemy",
            key: "enemy",
         },
         "event":
         {
            name: "Event",
            key: "event",
         },
         "hero":
         {
            name: "Hero",
            key: "hero",
         },
         "location":
         {
            name: "Location",
            key: "location",
         },
         "objective":
         {
            name: "Objective",
            key: "objective",
         },
         "quest":
         {
            name: "Quest",
            key: "quest",
         },
         "treachery":
         {
            name: "Treachery",
            key: "treachery",
         },
      },
   };

   CardType.keys = function()
   {
      return Object.keys(CardType.properties);
   };

   CardType.values = function()
   {
      return Object.values(CardType.properties);
   };

   CardType.isEncounterType = function(cardTypeKey)
   {
      return [CardType.ENEMY, CardType.LOCATION, CardType.OBJECTIVE, CardType.TREACHERY].includes(cardTypeKey);
   };

   CardType.isPlayerType = function(cardTypeKey)
   {
      return [CardType.ALLY, CardType.ATTACHMENT, CardType.HERO, CardType.EVENT].includes(cardTypeKey);
   };

   CardType.isQuestType = function(cardTypeKey)
   {
      return CardType.QUEST === cardTypeKey;
   };

   if (Object.freeze)
   {
      Object.freeze(CardType);
   }

   return CardType;
});
