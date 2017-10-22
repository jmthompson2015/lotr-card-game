"use strict";

define(["common/js/InputValidator", "artifact/js/EnemyCard", "artifact/js/LocationCard", "artifact/js/ObjectiveCard", "artifact/js/QuestCard", "artifact/js/TreacheryCard",
  "model/js/EntityFilter", "model/js/RangeFilter",
  "accessory/encounter-card-table/DefaultFilters", "accessory/encounter-card-table/TableRow"],
   function(InputValidator, EnemyCard, LocationCard, ObjectiveCard, QuestCard, TreacheryCard, EntityFilter, RangeFilter, DefaultFilters, TableRow)
   {
      function InitialState()
      {
         this.tableRows = [];
         this.filteredTableRows = [];

         var enemyRows = this.createRows(EnemyCard);
         var locationRows = this.createRows(LocationCard);
         var objectiveRows = this.createRows(ObjectiveCard);
         var questRows = this.createRows(QuestCard);
         var treacheryRows = this.createRows(TreacheryCard);

         this.tableRows = enemyRows.concat(locationRows.concat(objectiveRows.concat(questRows.concat(treacheryRows))));
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
