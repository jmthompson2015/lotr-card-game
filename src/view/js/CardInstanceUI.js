"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "controller/js/CardImageContainer", "controller/js/TokenPanelContainer"],
   function(createReactClass, PropTypes, React, DOM, CardImageContainer, TokenPanelContainer)
   {
      var CardInstanceUI = createReactClass(
      {
         getInitialState: function()
         {
            return (
            {
               hover: false,
            });
         },

         render: function()
         {
            var rows = [];
            var label = this.props.label;

            if (label)
            {
               rows.push(DOM.tr(
               {
                  key: "labelRow" + rows.length,
               }, DOM.td(
               {
                  className: "b f5",
               }, label)));
            }

            var cardInstance = this.props.cardInstance;
            var image = React.createElement(CardImageContainer,
            {
               cardInstance: cardInstance,
            });

            var cell1 = DOM.td(
            {}, image);
            rows.push(DOM.tr(
            {
               key: "imageRow" + rows.length,
            }, cell1));

            var cell2 = DOM.td(
            {}, React.createElement(TokenPanelContainer,
            {
               cardInstance: cardInstance,
               resourceBase: this.props.resourceBase,
            }));
            rows.push(DOM.tr(
            {
               key: "tokenRow" + rows.length,
            }, cell2));

            return DOM.table(
            {}, DOM.tbody(
            {}, rows));
         },

         mouseOver: function()
         {
            this.setState(
            {
               hover: true,
            });
         },

         mouseOut: function()
         {
            this.setState(
            {
               hover: false,
            });
         },
      });

      CardInstanceUI.propTypes = {
         cardInstance: PropTypes.object.isRequired,
         resourceBase: PropTypes.string.isRequired,

         label: PropTypes.string, // default: undefined
      };

      return CardInstanceUI;
   });
