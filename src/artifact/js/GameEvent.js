"use strict";

define(function()
{
   var GameEvent = {
      CARD_DRAWN: "cardDrawn",
      QUEST_CARD_DRAWN: "questCardDrawn",
      QUEST_SUCCEEDED: "questSucceeded",

      properties:
      {
         "cardDrawn":
         {
            name: "Card drawn",
            key: "cardDrawn",
         },
         "questCardDrawn":
         {
            name: "Quest card drawn",
            key: "questCardDrawn",
         },
         "questSucceeded":
         {
            name: "Quest succeeded",
            key: "questSucceeded",
         },
      },
   };

   GameEvent.keys = function()
   {
      return Object.keys(GameEvent.properties);
   };

   GameEvent.values = function()
   {
      return Object.values(GameEvent.properties);
   };

   if (Object.freeze)
   {
      Object.freeze(GameEvent);
   }

   return GameEvent;
});
