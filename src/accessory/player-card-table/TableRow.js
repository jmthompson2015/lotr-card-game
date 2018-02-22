import InputValidator from "../../common/js/InputValidator.js";
import MathAugments from "../../common/js/MathAugments.js";
import CardType from "../../artifact/js/CardType.js";

var TableRow = {};

TableRow.computeRatioSumStatsCost = function(card)
{
   InputValidator.validateNotNull("card", card);

   var sumStats = TableRow.computeSumStats(card);
   var cost = (card.cardTypeKey === CardType.HERO ? card.threatCost : card.cost);

   return (cost !== 0 ? Math.lotrRound(sumStats / cost, 4) : "");
};

TableRow.computeSumStats = function(card)
{
   InputValidator.validateNotNull("card", card);

   var answer = (card.willpower !== undefined ? card.willpower : 0);
   answer += (card.attack !== undefined ? card.attack : 0);
   answer += (card.defense !== undefined ? card.defense : 0);
   answer += (card.hitPoints !== undefined ? card.hitPoints : 0);

   return answer;
};

TableRow.createTableRow = function(card)
{
   InputValidator.validateNotNull("card", card);

   var isImplemented = (card.isImplemented !== undefined ? card.isImplemented : false);
   var cost = (card.cardTypeKey === CardType.HERO ? card.threatCost : card.cost);
   var sumStats = TableRow.computeSumStats(card);
   var ratioSumStatsCost = TableRow.computeRatioSumStatsCost(card);

   return (
   {
      card: card,
      sphere: card.sphere.name,
      sphereKey: card.sphereKey,
      name: card.name,
      cardTypeKey: card.cardTypeKey,
      isImplemented: isImplemented,
      cardSetKey: card.cardSetKey,
      cardSubsetKey: card.cardSubsetKey,
      cost: cost,
      willpower: card.willpower,
      attack: card.attack,
      defense: card.defense,
      hitPoints: card.hitPoints,
      sumStats: sumStats,
      ratioSumStatsCost: ratioSumStatsCost,
   });
};

export default TableRow;