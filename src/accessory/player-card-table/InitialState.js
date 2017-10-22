"use strict";

define(["common/js/InputValidator", "artifact/js/AllyCard", "artifact/js/AttachmentCard", "artifact/js/EventCard", "artifact/js/HeroCard", "model/js/EntityFilter", "model/js/RangeFilter",
  "accessory/player-card-table/DefaultFilters", "accessory/player-card-table/TableRow"],
   function(InputValidator, AllyCard, AttachmentCard, EventCard, HeroCard, EntityFilter, RangeFilter, DefaultFilters, TableRow)
   {
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

      return InitialState;
   });
