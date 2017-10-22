"use strict";

define(["model/js/EntityFilter", "model/js/RangeFilter", "accessory/encounter-card-table/TableColumns"],
   function(EntityFilter, RangeFilter, TableColumns)
   {
      var DefaultFilters = {
         entityColumns: [],
         rangeColumns: [],

         create: function()
         {
            var filters = {};

            this.entityColumns.forEach(function(column)
            {
               var values = [];
               var filter = new EntityFilter(column.key, values);
               filters[column.key] = filter;
            });

            this.rangeColumns.forEach(function(column)
            {
               var isMinEnabled = false;
               var minValue = 1;
               var isMaxEnabled = false;
               var maxValue = 10;

               if (column.key === "squadPointCost")
               {
                  minValue = 0;
                  maxValue = 46;
               }
               else if (column.key === "sumStats")
               {
                  minValue = 8;
                  maxValue = 27;
               }
               else if (column.key === "ratioPrimaryWeaponAgility")
               {
                  minValue = 0;
                  maxValue = 3;
               }
               else if (column.key === "hullPlusShield")
               {
                  minValue = 3;
                  maxValue = 16;
               }
               else if (column.key === "ratioSumStatsSquadPointCost")
               {
                  minValue = 0;
                  maxValue = 1;
               }

               var filter = new RangeFilter(column.key, isMinEnabled, minValue, isMaxEnabled, maxValue);
               filters[column.key] = filter;
            });

            return filters;
         },

         initialize: function()
         {
            this.entityColumns.push(TableColumns[1]); // cardTypeName
            this.entityColumns.push(TableColumns[2]); // isImplemented
            this.entityColumns.push(TableColumns[3]); // encounterSetKey

            this.rangeColumns.push(TableColumns[4]); // cost
            this.rangeColumns.push(TableColumns[5]); // threat
            this.rangeColumns.push(TableColumns[6]); // quest
            this.rangeColumns.push(TableColumns[7]); // attack
            this.rangeColumns.push(TableColumns[8]); // defense
            this.rangeColumns.push(TableColumns[9]); // hitPoints
         },
      };

      DefaultFilters.initialize();

      return DefaultFilters;
   });
