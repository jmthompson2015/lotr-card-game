import CardType from "../../artifact/js/CardType.js";
import EncounterSet from "../../artifact/js/EncounterSet.js";
import EntityFilter from "../../model/js/EntityFilter.js";
import RangeFilter from "../../model/js/RangeFilter.js";
import Button from "../../view/js/Button.js";
import InputPanel from "../../view/js/InputPanel.js";
import Action from "./Action.js";
import DefaultFilters from "./DefaultFilters.js";

class FilterUI extends React.Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         cardTypeValues: (this.props.filters.cardTypeKey ? this.props.filters.cardTypeKey.values() : []),
         encounterSetValues: (this.props.filters.encounterSetKey ? this.props.filters.encounterSetKey.values() : []),
         isImplementedValues: (this.props.filters.isImplemented ? this.props.filters.isImplemented.values() : []),
      };
   }

   render()
   {
      var cells = [];
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
      }, this.createRangeTable()));
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
         className: "f6 v-top",
      }, this.createEntityTable()));

      var rows = [];
      rows.push(ReactDOMFactories.tr(
      {
         key: rows.length,
      }, cells));

      rows.push(ReactDOMFactories.tr(
      {
         key: rows.length,
      }, ReactDOMFactories.td(
      {
         colSpan: 5,
      }, this.createButtonTable())));

      return ReactDOMFactories.table(
      {
         className: "f6 v-top",
      }, ReactDOMFactories.tbody(
      {}, rows));
   }

   createButtonTable()
   {
      var restoreButton = React.createElement(Button,
      {
         name: "Restore Defaults",
         onClick: this.restoreActionPerformed,
      });
      var unfilterButton = React.createElement(Button,
      {
         name: "Remove Filter",
         onClick: this.unfilterActionPerformed,
      });
      var filterButton = React.createElement(Button,
      {
         name: "Apply Filter",
         onClick: this.filterActionPerformed,
      });

      var cells = [];
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
      }, restoreButton));
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
      }, unfilterButton));
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
      }, filterButton));
      var row = ReactDOMFactories.tr(
      {}, cells);

      return ReactDOMFactories.table(
      {}, ReactDOMFactories.tbody(
      {}, row));
   }

   createEntityTable()
   {
      var cells = [];

      DefaultFilters.entityColumns.forEach(function(column)
      {
         var values;
         var labelFunction;
         var clientProps = {};

         switch (column.key)
         {
            case "cardTypeKey":
               values = [CardType.ALLY, CardType.ATTACHMENT, CardType.EVENT, CardType.HERO];
               labelFunction = function(value)
               {
                  return CardType.properties[value].name;
               };
               clientProps["data-entitytype"] = "cardTypeKey";
               break;
            case "isImplemented":
               values = [true, false];
               labelFunction = function(value)
               {
                  return (value ? "true" : "false");
               };
               clientProps["data-entitytype"] = "isImplemented";
               break;
            case "encounterSetKey":
               values = EncounterSet.keys();
               labelFunction = function(value)
               {
                  return EncounterSet.properties[value].name;
               };
               clientProps["data-entitytype"] = "encounterSetKey";
               break;
            default:
               throw "Unknown entity column: " + column.key;
         }

         var oldFilter = this.context.store.getState().filters[column.key];
         var initialValues = [];

         if (oldFilter)
         {
            initialValues = initialValues.concat(oldFilter.values());
         }

         var label = ReactDOMFactories.span(
         {
            className: "b f6",
         }, column.label);
         var checkboxPanel = React.createElement(InputPanel,
         {
            type: InputPanel.Type.CHECKBOX,
            values: values,
            labelFunction: labelFunction,
            initialValues: initialValues,
            onChange: this.handleEntityChange,
            panelClass: "bg-white f7 tl",
            clientProps: clientProps,
         });

         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
            className: "pl1 v-top",
         }, label, ReactDOMFactories.div(
         {
            className: "entitiesContainer overflow-y-auto pl1",
         }, checkboxPanel)));
      }, this);

      var row = ReactDOMFactories.tr(
      {}, cells);

      return ReactDOMFactories.table(
      {
         className: "f6 v-top",
      }, ReactDOMFactories.tbody(
      {}, row));
   }

   createRangeTable()
   {
      var rows = [];

      DefaultFilters.rangeColumns.forEach(function(column)
      {
         var filter = this.props.filters[column.key];
         var cells = [];
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
         }, ReactDOMFactories.input(
         {
            id: column.key + "MinChecked",
            type: "checkbox",
            defaultChecked: (filter ? filter.isMinEnabled() : false),
            onChange: this.handleRangeChange,
         })));
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
         }, ReactDOMFactories.input(
         {
            id: column.key + "Min",
            type: "number",
            className: "filterField",
            defaultValue: (filter ? filter.minValue() : 0),
            onChange: this.handleRangeChange,
         })));
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
         }, "\u2264 " + column.label + " \u2264"));
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
         }, ReactDOMFactories.input(
         {
            id: column.key + "MaxChecked",
            type: "checkbox",
            defaultChecked: (filter ? filter.isMaxEnabled() : false),
            onChange: this.handleRangeChange,
         })));
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
         }, ReactDOMFactories.input(
         {
            id: column.key + "Max",
            type: "number",
            className: "filterField",
            defaultValue: (filter ? filter.maxValue() : 10),
            onChange: this.handleRangeChange,
         })));

         rows.push(ReactDOMFactories.tr(
         {
            key: rows.length,
            className: "striped--light-gray",
         }, cells));
      }, this);

      return ReactDOMFactories.table(
      {
         className: "bg-white",
      }, ReactDOMFactories.tbody(
      {}, rows));
   }

   filterActionPerformed()
   {
      LOGGER.trace("FilterUI.filterActionPerformed() start");

      var filters = {};

      DefaultFilters.entityColumns.forEach(function(column)
      {
         var values = [];

         switch (column.key)
         {
            case "cardTypeKey":
               values = values.concat(this.state.cardTypeValues);
               break;
            case "isImplemented":
               values = values.concat(this.state.isImplementedValues);
               break;
            case "encounterSetKey":
               values = values.concat(this.state.encounterSetValues);
               break;
            default:
               throw "Unknown entity column: " + column.key;
         }

         var filter = new EntityFilter(column.key, values);
         filters[column.key] = filter;
      }, this);

      DefaultFilters.rangeColumns.forEach(function(column)
      {
         var isMinEnabled = document.getElementById(column.key + "MinChecked").checked;
         var minValue = document.getElementById(column.key + "Min").value;
         var isMaxEnabled = document.getElementById(column.key + "MaxChecked").checked;
         var maxValue = document.getElementById(column.key + "Max").value;

         var filter = new RangeFilter(column.key, isMinEnabled, minValue, isMaxEnabled, maxValue);
         filters[column.key] = filter;
      });

      this.context.store.dispatch(Action.setFilters(filters));

      LOGGER.trace("FilterUI.filterActionPerformed() end");
   }

   handleEntityChange(event, selected)
   {
      LOGGER.trace("FilterUI.handleEntityChange() start");

      var entityType = event.target.dataset.entitytype;
      LOGGER.debug("entityType = " + entityType);
      var values = [];
      values = values.concat(selected);

      switch (entityType)
      {
         case "cardTypeKey":
            this.setState(
            {
               cardTypeValues: values,
            });
            break;
         case "isImplemented":
            this.setState(
            {
               isImplementedValues: values,
            });
            break;
         case "encounterSetKey":
            this.setState(
            {
               encounterSetValues: values,
            });
            break;
         default:
            throw "Unknown entityType: " + entityType;
      }

      LOGGER.trace("FilterUI.handleEntityChange() end");
   }

   restoreActionPerformed()
   {
      LOGGER.trace("FilterUI.restoreActionPerformed() start");
      this.context.store.dispatch(Action.setDefaultFilters());
      LOGGER.trace("FilterUI.restoreActionPerformed() end");
   }

   unfilterActionPerformed()
   {
      LOGGER.trace("FilterUI.unfilterActionPerformed() start");
      this.context.store.dispatch(Action.removeFilters());
      LOGGER.trace("FilterUI.unfilterActionPerformed() end");
   }
}

FilterUI.contextTypes = {
   store: PropTypes.object.isRequired,
};

FilterUI.propTypes = {
   filters: PropTypes.object.isRequired,
};

export default FilterUI;