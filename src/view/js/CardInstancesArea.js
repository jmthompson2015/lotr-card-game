"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/Button", "view/js/CardInstanceUI", "view/js/ReactUtilities"],
   function(createReactClass, PropTypes, React, DOM, Button, CardInstanceUI, ReactUtilities)
   {
      var CardInstancesArea = createReactClass(
      {
         getInitialState: function()
         {
            return (
            {
               isExpanded: this.props.isExpanded,
            });
         },

         render: function()
         {
            var rows = [];

            rows.push(this.createLabelUI());
            rows.push(this.createCardInstanceCells());

            return ReactUtilities.createTable(rows, undefined, "bg-lotr-light");
         },
      });

      CardInstancesArea.prototype.createCardInstanceCells = function()
      {
         var cardInstances = this.props.cardInstances;
         var resourceBase = this.props.resourceBase;
         var isExpanded = this.state.isExpanded;

         var cells = cardInstances.map(function(cardInstance, i)
         {
            var cardInstanceUI = React.createElement(CardInstanceUI,
            {
               key: cardInstance.toString() + i,
               cardInstance: cardInstance,
               resourceBase: resourceBase,
            });

            var myClassName;

            if (isExpanded || i === cardInstances.length - 1)
            {
               myClassName = "dtc pa1 v-mid";
            }
            else if (i < cardInstances.length - 1)
            {
               myClassName = "dn";
            }

            return DOM.div(
            {
               key: "cardCell" + i,
               className: myClassName,
            }, cardInstanceUI);
         });

         var cell = ReactUtilities.createCell(cells);

         return ReactUtilities.createRow(cell, "mainRow", "bg-lotr-medium");
      };

      CardInstancesArea.prototype.createLabelUI = function()
      {
         var label = ReactUtilities.createCell(this.props.label, "labelCell", "b lotr-light tc");

         var cardCount = this.props.cardInstances.length;
         var isExpanded = this.state.isExpanded;
         var expandLabel = (cardCount > 1 ? (isExpanded ? "\u25B6" : "\u25BC") : "");
         var expandControl = DOM.div(
         {
            key: "expandCell",
            onClick: this.toggleExpand.bind(this),
         }, expandLabel);

         var row = ReactUtilities.createRow([label, expandControl], "labelExpandRow");
         var table = ReactUtilities.createTable(row, "labelExpandTable", "w-100");

         var tableCell = ReactUtilities.createCell(table, "tableCell");
         return ReactUtilities.createRow(tableCell, "labelRow", "bg-lotr-dark");
      };

      CardInstancesArea.prototype.toggleExpand = function()
      {
         this.setState(
         {
            isExpanded: !this.state.isExpanded,
         });
      };

      CardInstancesArea.propTypes = {
         cardInstances: PropTypes.array.isRequired,
         resourceBase: PropTypes.string.isRequired,

         isExpanded: PropTypes.bool,
         label: PropTypes.string, // default: undefined
      };

      CardInstancesArea.defaultProps = {
         isExpanded: true,
      };

      return CardInstancesArea;
   });
