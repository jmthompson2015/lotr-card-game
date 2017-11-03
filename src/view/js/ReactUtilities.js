"use strict";

define(["react-dom-factories"], function(DOM)
{
   var ReactUtilities = {};

   ReactUtilities.createCell = function(element, key, className)
   {
      return DOM.div(
      {
         key: key,
         className: "dtc" + (className ? " " + className : ""),
      }, element);
   };

   ReactUtilities.createRow = function(cells, key, className)
   {
      return DOM.div(
      {
         key: key,
         className: "dt-row" + (className ? " " + className : ""),
      }, cells);
   };

   ReactUtilities.createTable = function(rows, key, className)
   {
      return DOM.div(
      {
         key: key,
         className: "dt" + (className ? " " + className : ""),
      }, rows);
   };

   return ReactUtilities;
});
