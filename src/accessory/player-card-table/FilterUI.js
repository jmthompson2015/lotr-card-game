"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories",
  "artifact/js/CardSet", "artifact/js/CardSubset", "artifact/js/CardType", "artifact/js/Sphere",
  "model/js/EntityFilter", "model/js/RangeFilter", "view/js/Button", "view/js/InputPanel",
  "accessory/player-card-table/Action", "accessory/player-card-table/DefaultFilters"
  ],
   function(createReactClass, PropTypes, React, DOM,
      CardSet, CardSubset, CardType, Sphere,
      EntityFilter, RangeFilter, Button, InputPanel, Action, DefaultFilters)
   {
      var FilterUI = createReactClass(
      {
         contextTypes:
         {
            store: PropTypes.object.isRequired,
         },

         propTypes:
         {
            filters: PropTypes.object.isRequired,
         },

         getInitialState: function()
         {
            return (
            {
               sphereValues: (this.props.filters.sphereKey ? this.props.filters.sphereKey.values() : []),
               cardTypeValues: (this.props.filters.cardTypeKey ? this.props.filters.cardTypeKey.values() : []),
               cardSetValues: (this.props.filters.cardSetKey ? this.props.filters.cardSetKey.values() : []),
               cardSubsetValues: (this.props.filters.cardSubsetKey ? this.props.filters.cardSubsetKey.values() : []),
               isImplementedValues: (this.props.filters.isImplemented ? this.props.filters.isImplemented.values() : []),
            });
         },

         render: function()
         {
            var cells = [];
            cells.push(DOM.td(
            {
               key: cells.length,
            }, this.createRangeTable()));
            cells.push(DOM.td(
            {
               key: cells.length,
               className: "f6 v-top",
            }, this.createEntityTable()));

            var rows = [];
            rows.push(DOM.tr(
            {
               key: rows.length,
            }, cells));

            rows.push(DOM.tr(
            {
               key: rows.length,
            }, DOM.td(
            {
               colSpan: 5,
            }, this.createButtonTable())));

            return DOM.table(
            {
               className: "f6 v-top",
            }, DOM.tbody(
            {}, rows));
         },

         createButtonTable: function()
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
            cells.push(DOM.td(
            {
               key: cells.length,
            }, restoreButton));
            cells.push(DOM.td(
            {
               key: cells.length,
            }, unfilterButton));
            cells.push(DOM.td(
            {
               key: cells.length,
            }, filterButton));
            var row = DOM.tr(
            {}, cells);

            return DOM.table(
            {}, DOM.tbody(
            {}, row));
         },

         createEntityTable: function()
         {
            var cells = [];

            DefaultFilters.entityColumns.forEach(function(column)
            {
               var values;
               var labelFunction;
               var clientProps = {};

               switch (column.key)
               {
                  case "sphereKey":
                     values = Sphere.keys();
                     labelFunction = function(value)
                     {
                        return Sphere.properties[value].name;
                     };
                     clientProps["data-entitytype"] = "sphereKey";
                     break;
                  case "cardTypeKey":
                     values = [CardType.ALLY, CardType.ATTACHMENT, CardType.EVENT, CardType.HERO];
                     labelFunction = function(value)
                     {
                        return CardType.properties[value].name;
                     };
                     clientProps["data-entitytype"] = "cardTypeKey";
                     break;
                  case "cardSetKey":
                     values = CardSet.keys();
                     labelFunction = function(value)
                     {
                        return CardSet.properties[value].name;
                     };
                     clientProps["data-entitytype"] = "cardSetKey";
                     break;
                  case "cardSubsetKey":
                     values = CardSubset.keys();
                     labelFunction = function(value)
                     {
                        return (CardSubset.properties[value] ? CardSubset.properties[value].name : undefined);
                     };
                     clientProps["data-entitytype"] = "cardSubsetKey";
                     break;
                  case "isImplemented":
                     values = [true, false];
                     labelFunction = function(value)
                     {
                        return (value ? "true" : "false");
                     };
                     clientProps["data-entitytype"] = "isImplemented";
                     break;
                  default:
                     throw "Unknown entity column: " + column.key;
               }

               var oldFilter = this.context.store.getState().filters[column.key];
               var initialValues = [];

               if (oldFilter)
               {
                  initialValues.lotrAddAll(oldFilter.values());
               }

               var label = DOM.span(
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

               cells.push(DOM.td(
               {
                  key: cells.length,
                  className: "pl1 v-top",
               }, label, DOM.div(
               {
                  className: "entitiesContainer overflow-y-auto pl1",
               }, checkboxPanel)));
            }, this);

            var row = DOM.tr(
            {}, cells);

            return DOM.table(
            {
               className: "f6 v-top",
            }, DOM.tbody(
            {}, row));
         },

         createRangeTable: function()
         {
            var rows = [];

            DefaultFilters.rangeColumns.forEach(function(column)
            {
               var filter = this.props.filters[column.key];
               var cells = [];
               cells.push(DOM.td(
               {
                  key: cells.length,
               }, DOM.input(
               {
                  id: column.key + "MinChecked",
                  type: "checkbox",
                  defaultChecked: (filter ? filter.isMinEnabled() : false),
                  onChange: this.handleRangeChange,
               })));
               cells.push(DOM.td(
               {
                  key: cells.length,
               }, DOM.input(
               {
                  id: column.key + "Min",
                  type: "number",
                  className: "filterField",
                  defaultValue: (filter ? filter.minValue() : 0),
                  onChange: this.handleRangeChange,
               })));
               cells.push(DOM.td(
               {
                  key: cells.length,
               }, "\u2264 " + column.label + " \u2264"));
               cells.push(DOM.td(
               {
                  key: cells.length,
               }, DOM.input(
               {
                  id: column.key + "MaxChecked",
                  type: "checkbox",
                  defaultChecked: (filter ? filter.isMaxEnabled() : false),
                  onChange: this.handleRangeChange,
               })));
               cells.push(DOM.td(
               {
                  key: cells.length,
               }, DOM.input(
               {
                  id: column.key + "Max",
                  type: "number",
                  className: "filterField",
                  defaultValue: (filter ? filter.maxValue() : 10),
                  onChange: this.handleRangeChange,
               })));

               rows.push(DOM.tr(
               {
                  key: rows.length,
                  className: "striped--light-gray",
               }, cells));
            }, this);

            return DOM.table(
            {
               className: "bg-white",
            }, DOM.tbody(
            {}, rows));
         },

         filterActionPerformed: function()
         {
            LOGGER.trace("FilterUI.filterActionPerformed() start");

            var filters = {};

            DefaultFilters.entityColumns.forEach(function(column)
            {
               var values = [];

               switch (column.key)
               {
                  case "sphereKey":
                     values.lotrAddAll(this.state.sphereValues);
                     break;
                  case "cardTypeKey":
                     values.lotrAddAll(this.state.cardTypeValues);
                     break;
                  case "cardSetKey":
                     values.lotrAddAll(this.state.cardSetValues);
                     break;
                  case "cardSubsetKey":
                     values.lotrAddAll(this.state.cardSubsetValues);
                     break;
                  case "isImplemented":
                     values.lotrAddAll(this.state.isImplementedValues);
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
         },

         handleEntityChange: function(event, selected)
         {
            LOGGER.trace("FilterUI.handleEntityChange() start");

            var entityType = event.target.dataset.entitytype;
            LOGGER.debug("entityType = " + entityType);
            var values = [];
            values.lotrAddAll(selected);

            switch (entityType)
            {
               case "sphereKey":
                  this.setState(
                  {
                     sphereValues: values,
                  });
                  break;
               case "cardTypeKey":
                  this.setState(
                  {
                     cardTypeValues: values,
                  });
                  break;
               case "cardSetKey":
                  this.setState(
                  {
                     cardSetValues: values,
                  });
                  break;
               case "cardSubsetKey":
                  this.setState(
                  {
                     cardSubsetValues: values,
                  });
                  break;
               case "isImplemented":
                  this.setState(
                  {
                     isImplementedValues: values,
                  });
                  break;
               default:
                  throw "Unknown entityType: " + entityType;
            }

            LOGGER.trace("FilterUI.handleEntityChange() end");
         },

         restoreActionPerformed: function()
         {
            LOGGER.trace("FilterUI.restoreActionPerformed() start");
            this.context.store.dispatch(Action.setDefaultFilters());
            LOGGER.trace("FilterUI.restoreActionPerformed() end");
         },

         unfilterActionPerformed: function()
         {
            LOGGER.trace("FilterUI.unfilterActionPerformed() start");
            this.context.store.dispatch(Action.removeFilters());
            LOGGER.trace("FilterUI.unfilterActionPerformed() end");
         },
      });

      return FilterUI;
   });
