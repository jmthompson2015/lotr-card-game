import InputValidator from "../../common/js/InputValidator.js";
import AllyCard from "../../artifact/js/AllyCard.js";
import AttachmentCard from "../../artifact/js/AttachmentCard.js";
import EventCard from "../../artifact/js/EventCard.js";
import HeroCard from "../../artifact/js/HeroCard.js";
import EntityFilter from "../../model/js/EntityFilter.js";
import RangeFilter from "../../model/js/RangeFilter.js";
import DefaultFilters from "./DefaultFilters.js";
import TableRow from "./TableRow.js";

function InitialState()
{
   this.tableRows = [];
   this.filteredTableRows = [];

   var heroRows = this.createRows(HeroCard);
   var allyRows = this.createRows(AllyCard);
   var attachmentRows = this.createRows(AttachmentCard);
   var eventRows = this.createRows(EventCard);

   this.tableRows = heroRows.concat(allyRows.concat(attachmentRows.concat(eventRows)));
   this.filteredTableRows = this.tableRows.slice();

   // FIXME
   // localStorage.removeItem("filters");
   // FIXME

   this.isFilterShown = false;
   this.filters = DefaultFilters.create();
   var oldFilters = InitialState.loadFromLocalStorage();

   if (oldFilters)
   {
      this.merge(oldFilters);
   }
}

InitialState.prototype.createRows = function(cardClass)
{
   return cardClass.keys().reduce(function(accumulator, cardKey)
   {
      var card = cardClass.properties[cardKey];
      accumulator.push(TableRow.createTableRow(card));

      return accumulator;
   }, []);
};

InitialState.prototype.merge = function(oldFilters)
{
   InputValidator.validateNotNull("oldFilters", oldFilters);

   Object.getOwnPropertyNames(oldFilters).forEach(function(columnKey)
   {
      this.filters[columnKey] = oldFilters[columnKey];
   }, this);
};

InitialState.loadFromLocalStorage = function()
{
   var answer;
   var filterObjects = JSON.parse(localStorage.filters || null);

   if (filterObjects)
   {
      answer = {};

      filterObjects.forEach(function(object)
      {
         var filter;

         switch (object.type)
         {
            case "EntityFilter":
               filter = EntityFilter.fromObject(object);
               break;
            case "RangeFilter":
               filter = RangeFilter.fromObject(object);
               break;
            default:
               throw "Unknown filter type: " + JSON.stringify(object);
         }

         answer[filter.columnKey()] = filter;
      });
   }

   return answer;
};

export default InitialState;