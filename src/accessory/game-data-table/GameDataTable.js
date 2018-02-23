import AllyCard from "../../artifact/js/AllyCard.js";
import AttachmentCard from "../../artifact/js/AttachmentCard.js";
import CardSet from "../../artifact/js/CardSet.js";
import CardSetType from "../../artifact/js/CardSetType.js";
import CardSubset from "../../artifact/js/CardSubset.js";
import CardType from "../../artifact/js/CardType.js";
import EncounterSet from "../../artifact/js/EncounterSet.js";
import EnemyCard from "../../artifact/js/EnemyCard.js";
import EventCard from "../../artifact/js/EventCard.js";
import GameHeader from "../../artifact/js/GameHeader.js";
import GameMode from "../../artifact/js/GameMode.js";
import HeroCard from "../../artifact/js/HeroCard.js";
import LocationCard from "../../artifact/js/LocationCard.js";
import ObjectiveCard from "../../artifact/js/ObjectiveCard.js";
import Phase from "../../artifact/js/Phase.js";
import QuestCard from "../../artifact/js/QuestCard.js";
import Scenario from "../../artifact/js/Scenario.js";
import Sphere from "../../artifact/js/Sphere.js";
import Trait from "../../artifact/js/Trait.js";
import TreacheryCard from "../../artifact/js/TreacheryCard.js";

var GameColumns = [
   {
      key: "item",
      label: "Item",
      className: "textCell tl",
   },
   {
      key: "count",
      label: "Count",
      className: "numberCell tr",
   },
];

// Factories.
let Table = React.createFactory(Reactable.Table);
let Tr = React.createFactory(Reactable.Tr);
let Td = React.createFactory(Reactable.Td);

class GameDataTable extends React.Component
{
   render()
   {
      var rows = [];

      rows.push(this.createRow("AllyCard", AllyCard.keys().length, rows.length));
      rows.push(this.createRow("AttachmentCard", AttachmentCard.keys().length, rows.length));
      rows.push(this.createRow("CardSet", CardSet.keys().length, rows.length));
      rows.push(this.createRow("CardSetType", CardSetType.keys().length, rows.length));
      rows.push(this.createRow("CardSubset", CardSubset.keys().length, rows.length));
      rows.push(this.createRow("CardType", CardType.keys().length, rows.length));
      rows.push(this.createRow("EncounterSet", EncounterSet.keys().length, rows.length));
      rows.push(this.createRow("EnemyCard", EnemyCard.keys().length, rows.length));
      rows.push(this.createRow("EventCard", EventCard.keys().length, rows.length));
      rows.push(this.createRow("GameHeader", GameHeader.keys().length, rows.length));
      rows.push(this.createRow("GameMode", GameMode.keys().length, rows.length));
      rows.push(this.createRow("HeroCard", HeroCard.keys().length, rows.length));
      rows.push(this.createRow("LocationCard", LocationCard.keys().length, rows.length));
      rows.push(this.createRow("ObjectiveCard", ObjectiveCard.keys().length, rows.length));
      rows.push(this.createRow("Phase", Phase.keys().length, rows.length));
      rows.push(this.createRow("QuestCard", QuestCard.keys().length, rows.length));
      rows.push(this.createRow("Scenario", Scenario.keys().length, rows.length));
      rows.push(this.createRow("Sphere", Sphere.keys().length, rows.length));
      rows.push(this.createRow("Trait", Trait.keys().length, rows.length));
      rows.push(this.createRow("TreacheryCard", TreacheryCard.keys().length, rows.length));

      return Table(
      {
         id: "gameTable",
         className: "bg-white f6",
         columns: GameColumns,
         sortable: true,
      }, rows);
   }

   createCell(key, column, value)
   {
      return Td(
      {
         key: key,
         className: column.className,
         column: column.key,
      }, (value !== undefined ? value : ""));
   }

   createRow(item, count, key)
   {
      var cells = [];
      var j = 0;

      cells.push(this.createCell(cells.length, GameColumns[j++], item));
      cells.push(this.createCell(cells.length, GameColumns[j++], count));

      return Tr(
      {
         key: key,
         className: "striped--light-gray",
      }, cells);
   }
}

export default GameDataTable;