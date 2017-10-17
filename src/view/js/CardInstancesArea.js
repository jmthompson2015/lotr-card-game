"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/CardInstanceUI"],
   function(createReactClass, PropTypes, React, DOM, CardInstanceUI)
   {
      var CardInstancesArea = createReactClass(
      {
         render: function()
         {
            var cardInstances = this.props.cardInstances;
            var resourceBase = this.props.resourceBase;

            var cells = cardInstances.map(function(cardInstance, i)
            {
               var cardInstanceUI = React.createElement(CardInstanceUI,
               {
                  key: cardInstance.toString() + i,
                  cardInstance: cardInstance,
                  resourceBase: resourceBase,
               });

               return DOM.div(
               {
                  key: "cardCell" + i,
                  className: "dtc pa1 v-mid",
               }, cardInstanceUI);
            });

            var rows = [];
            var label = this.props.label;

            if (label !== undefined)
            {
               rows.push(DOM.div(
               {
                  key: "labelRow",
                  className: "b bg-lotr-dark f5 lotr-light tc",
               }, label));
            }

            var cards = DOM.div(
            {
               key: "cardsRow",
               className: "bg-lotr-medium dt",
            }, cells);
            rows.push(cards);

            return DOM.div(
            {
               className: "bg-lotr-light",
            }, rows);
         },
      });

      CardInstancesArea.propTypes = {
         cardInstances: PropTypes.array.isRequired,
         resourceBase: PropTypes.string.isRequired,

         label: PropTypes.string, // default: undefined
      };

      return CardInstancesArea;
   });
