"use strict";

define(function()
{
   var TableColumns = [
      {
         key: "name",
         label: "Name",
         className: "textCell tl",
       },
      {
         key: "cardTypeKey",
         label: "Type",
         className: "textCell tl",
       },
      {
         key: "isImplemented",
         label: "Implemented",
         className: "tc",
        },
      {
         key: "encounterSetKey",
         label: "Encounter Set",
         className: "textCell tl",
       },
      {
         key: "engagementCost",
         label: "Cost",
         className: "numberCell tr",
       },
      {
         key: "threat",
         label: "Threat",
         className: "numberCell tr",
       },
      {
         key: "questPoints",
         label: "Quest",
         className: "numberCell tr",
        },
      {
         key: "attack",
         label: "Attack",
         className: "numberCell tr",
       },
      {
         key: "defense",
         label: "Defense",
         className: "numberCell tr",
       },
      {
         key: "hitPoints",
         label: "Hit Points",
         className: "numberCell tr",
       },
     ];

   return TableColumns;
});
