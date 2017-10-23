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
            var cardInstance = this.props.cardInstance;

            if (cardInstance)
            {
               var width = (this.state.hover ? 275 : 125);
               var image = React.createElement(CardImageContainer,
               {
                  myKey: cardInstance.toString(),
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
            }

            return DOM.div(
            {
               className: "bg-lotr-light dt ma0 pa0",
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
         resourceBase: PropTypes.string.isRequired,

         cardInstance: PropTypes.object, // default: undefined
      };

      return CardInstanceUI;
   });
