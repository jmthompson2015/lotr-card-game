"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   var Action = {};

   Action.ADD_ROUND = "addRound";
   Action.INCREMENT_NEXT_CARD_ID = "incrementNextCardId";
   Action.SET_CARD_INSTANCE = "setCardInstance";

   Action.addRound = function()
   {
      return (
      {
         type: Action.ADD_ROUND,
      });
   };

   Action.incrementNextCardId = function()
   {
      return (
      {
         type: Action.INCREMENT_NEXT_CARD_ID,
      });
   };

   Action.setCardInstance = function(id, card)
   {
      InputValidator.validateIsNumber("id", id);
      InputValidator.validateNotNull("card", card);

      return (
      {
         type: Action.SET_CARD_INSTANCE,
         id: id,
         card: card,
      });
   };

   return Action;
});
