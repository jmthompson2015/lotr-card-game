import InputValidator from "../../common/js/InputValidator.js";
import CardType from "../../artifact/js/CardType.js";

var TableRow = {};

TableRow.createTableRow = function(card)
{
   InputValidator.validateNotNull("card", card);

   var name = card.name + (card.cardTypeKey === CardType.QUEST ? " " + card.sequence : "");
   var isImplemented = (card.isImplemented !== undefined ? card.isImplemented : false);

   return (
   {
      card: card,
      name: name,
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

export default TableRow;