"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   var TableRow = {};

   TableRow.createTableRow = function(card)
   {
      InputValidator.validateNotNull("card", card);

      var isImplemented = (card.isImplemented !== undefined ? card.isImplemented : false);

      return (
      {
         name: card.name,
         cardTypeKey: card.cardTypeKey,
         isImplemented: isImplemented,
         encounterSetKey: card.encounterSetKey,
         engagementCost: card.engagementCost,
         threat: card.threat,
         questPoints: card.questPoints,
         attack: card.attack,
         defense: card.defense,
         hitPoints: card.hitPoints,
      });
   };

   return TableRow;
});
