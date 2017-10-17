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

            if (label !== undefined)
            {
               rows.push(DOM.div(
               {
                  key: "labelRow" + rows.length,
                  className: "b dt-row f5 tc",
               }, label));
            }

            var cardInstance = this.props.cardInstance;
            var width = (this.state.hover ? 250 : 150);
            var image = React.createElement(CardImageContainer,
            {
               cardInstance: cardInstance,
               width: width,
            });

            rows.push(DOM.div(
            {
               key: "imageRow" + rows.length,
               className: "dt-row",
               onMouseOut: this.mouseOut,
               onMouseOver: this.mouseOver,
            }, image));

            rows.push(DOM.div(
            {
               key: "tokenRow" + rows.length,
               className: "dt-row",
            }, React.createElement(TokenPanelContainer,
            {
               cardInstance: cardInstance,
               resourceBase: this.props.resourceBase,
            })));

            return DOM.div(
            {
               className: "bg-cornsilk dt ma0 pa0",
            }, rows);
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
