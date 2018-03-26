import InputValidator from "../../common/js/InputValidator.js";
import ObjectUtilities from "../../common/js/ObjectUtilities.js";
import Action from "./Action.js";
import DefaultFilters from "./DefaultFilters.js";
import InitialState from "./InitialState.js";

var Reducer = {};

Reducer.root = function(state, action)
{
   LOGGER.debug("root() type = " + action.type);

   if (typeof state === 'undefined')
   {
      return new InitialState();
   }

   var newFilters, newFilteredTableRow;

   switch (action.type)
   {
      case Action.REMOVE_FILTERS:
         newFilteredTableRow = [];
         newFilteredTableRow = newFilteredTableRow.concat(state.tableRows);
         return Object.assign(
         {}, state,
         {
            filteredTableRows: newFilteredTableRow,
         });
      case Action.SET_DEFAULT_FILTERS:
         newFilters = DefaultFilters.create();
         return Object.assign(
         {}, state,
         {
            filters: newFilters,
         });
      case Action.SET_FILTERS:
         LOGGER.debug("Reducer filters = ");
         Object.getOwnPropertyNames(action.filters).forEach(function(propertyName)
         {
            LOGGER.debug(propertyName + ": " + action.filters[propertyName]);
         });
         newFilters = Object.assign(
         {}, state.filters);
         newFilters = ObjectUtilities.merge(newFilters, action.filters);
         newFilteredTableRow = Reducer.filterTableRow(state.tableRows, newFilters);
         Reducer.saveToLocalStorage(newFilters);
         return Object.assign(
         {}, state,
         {
            filters: newFilters,
            filteredTableRows: newFilteredTableRow,
         });
      case Action.TOGGLE_FILTER_SHOWN:
         return Object.assign(
         {}, state,
         {
            isFilterShown: !state.isFilterShown,
         });
      default:
         LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
         return state;
   }
};

Reducer.filterTableRow = function(tableRows, filters)
{
   InputValidator.validateNotNull("tableRows", tableRows);
   InputValidator.validateNotNull("filters", filters);

   var answer = [];

   tableRows.forEach(function(data)
   {
      if (Reducer.passes(data, filters))
      {
         answer.push(data);
      }
   });

   return answer;
};

Reducer.passes = function(data, filters)
{
   InputValidator.validateNotNull("data", data);
   InputValidator.validateNotNull("filters", filters);

   var answer = true;
   var propertyNames = Object.getOwnPropertyNames(filters);

   for (var i = 0; i < propertyNames.length; i++)
   {
      var propertyName = propertyNames[i];
      var filter = filters[propertyName];

      if (!filter.passes(data))
      {
         answer = false;
         break;
      }
   }

   return answer;
};

Reducer.saveToLocalStorage = function(filters)
{
   InputValidator.validateNotNull("filters", filters);

   var filterObjects = [];

   Object.getOwnPropertyNames(filters).forEach(function(columnKey)
   {
      var filter = filters[columnKey];
      filterObjects.push(filter.toObject());
   });

   localStorage.filters = JSON.stringify(filterObjects);
};

export default Reducer;