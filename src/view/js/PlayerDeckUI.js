import MathUtilities from "../../common/js/MathUtilities.js";

import CardSet from "../../artifact/js/CardSet.js";
import CardSubset from "../../artifact/js/CardSubset.js";
import CardType from "../../artifact/js/CardType.js";
import Sphere from "../../artifact/js/Sphere.js";

import DataTable from "./DataTable.js";
import ImplementedImage from "./ImplementedImage.js";
import PlayerDeckColumns from "./PlayerDeckColumns.js";
import SphereUI from "./SphereUI.js";

function createImageLink(src, href)
{
   let image = ReactDOMFactories.img(
   {
      className: "imageBlock fr v-mid",
      src: src,
   });

   return ReactDOMFactories.a(
   {
      href: href,
      target: "_blank",
   }, image);
}

class PlayerDeckUI extends React.Component
{
   render()
   {
      let deck = this.props.deck;
      let resourceBase = this.props.resourceBase;

      let cardInstances = deck.heroInstances.concat(deck.playerInstances);
      let rowData = cardInstances.map(cardInstance =>
      {
         return PlayerDeckUI.createRowData(cardInstance.card());
      });

      let cellFunctions = PlayerDeckUI.getCellFunctions(resourceBase);

      let table = React.createElement(DataTable,
      {
         columns: PlayerDeckColumns,
         rowData: rowData,
         cellFunctions: cellFunctions,
         showFooter: true,
      });

      return table;
   }
}

PlayerDeckUI.createRowData = (card) =>
{
   let isImplemented = (card.isImplemented !== undefined ? card.isImplemented : false);
   let sumStats = ["willpower", "attack", "defense", "hitPoints"].reduce((accumulator, key) => accumulator + (card[key] !== undefined ? card[key] : 0), 0);
   let cost = (card.cardTypeKey === CardType.HERO ? card.threatCost : card.cost);
   let ratioSumStatsCost = (cost !== 0 ? MathUtilities.round(sumStats / cost, 4) : "");

   return (
   {
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

PlayerDeckUI.getCellFunctions = (resourceBase) =>
{
   return (
   {
      "sphereKey": function(data)
      {
         if (data.sphereKey !== undefined)
         {
            let sphere = Sphere.properties[data.sphereKey];
            return React.createElement(SphereUI,
            {
               sphere: sphere,
               isSmall: true,
               resourceBase: resourceBase,
            });
         }
         else
         {
            return undefined;
         }
      },
      "name": function(data)
      {
         if (data.name !== undefined)
         {
            let src = resourceBase + "icon/HallOfBeorn16.png";
            let searchString = data.name.replace(/ /g, "%20");
            let href = "http://hallofbeorn.com/LotR?Query=" + searchString;
            let link = createImageLink(src, href);
            let src2 = resourceBase + "icon/RingsDB16.png";
            let searchString2 = data.name.replace(/ /g, "+");
            let href2 = "http://ringsdb.com/find?q=" + searchString2;
            let link2 = createImageLink(src2, href2);
            return ReactDOMFactories.span(
            {
               className: "dib w-100",
            }, data.name, link2, link);
         }
         else
         {
            return undefined;
         }
      },
      "cardTypeKey": function(data)
      {
         return (data.cardTypeKey !== undefined ? CardType.properties[data.cardTypeKey].name : undefined);
      },
      "cardSetKey": function(data)
      {
         return (data.cardSetKey !== undefined ? CardSet.properties[data.cardSetKey].name : undefined);
      },
      "cardSubsetKey": function(data)
      {
         let name, link;
         if (data.cardSubsetKey)
         {
            let src = resourceBase + "icon/HallOfBeorn16.png";
            name = CardSubset.properties[data.cardSubsetKey].name;
            let searchString = name.replace(/ /g, "-");
            let href = "http://hallofbeorn.com/LotR/Scenarios/" + searchString;
            link = createImageLink(src, href);
         }
         return ReactDOMFactories.span(
         {
            className: "textImageLink dib w-100",
         }, name, link);
      },
      "isImplemented": function(data)
      {
         return React.createElement(ImplementedImage,
         {
            resourceBase: resourceBase,
            isImplemented: data.isImplemented,
         });
      },
   });
};

PlayerDeckUI.propTypes = {
   deck: PropTypes.object.isRequired,
   resourceBase: PropTypes.string.isRequired,
};

export default PlayerDeckUI;