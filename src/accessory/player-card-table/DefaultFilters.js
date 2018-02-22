import EntityFilter from "../../model/js/EntityFilter.js";
import RangeFilter from "../../model/js/RangeFilter.js";
import TableColumns from "./TableColumns.js";

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
      this.entityColumns.push(TableColumns[0]); // sphereKey
      this.entityColumns.push(TableColumns[2]); // cardTypeName
      this.entityColumns.push(TableColumns[3]); // isImplemented
      this.entityColumns.push(TableColumns[4]); // cardSetName
      this.entityColumns.push(TableColumns[5]); // cardSubsetName

      this.rangeColumns.push(TableColumns[6]); // cost
      this.rangeColumns.push(TableColumns[7]); // willpower
      this.rangeColumns.push(TableColumns[8]); // attack
      this.rangeColumns.push(TableColumns[9]); // defense
      this.rangeColumns.push(TableColumns[10]); // hitPoints
      this.rangeColumns.push(TableColumns[11]); // sumStats
      this.rangeColumns.push(TableColumns[12]); // ratioSumStatsSquadPointCost
   },
};

DefaultFilters.initialize();

export default DefaultFilters;