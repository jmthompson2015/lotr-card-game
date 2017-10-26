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
               isSmall: true,
            });
         },

         render: function()
         {
            var rows = [];
            var cardInstance = this.props.cardInstance;

            if (cardInstance)
            {
               var image = this.createCardImage(cardInstance);
               var tokenPanel = this.createTokenPanel(cardInstance);

               rows.push(DOM.div(
               {
                  key: "imageRow" + rows.length,
                  className: "dt-row",
                  onClick: this.toggleSize,
               }, image));

               rows.push(DOM.div(
               {
                  key: "tokenRow" + rows.length,
                  className: "dt-row",
               }, tokenPanel));

               var attachments = cardInstance.attachments().toJS();

               if (attachments.length > 0)
               {
                  for (var i = attachments.length - 1; i >= 0; i--)
                  {
                     var attachment = attachments[i];
                     var attachmentUI = this.createAttachmentUI(attachment);
                     rows.push(DOM.div(
                     {
                        key: "attachmentRow" + rows.length,
                     }, attachmentUI));
                  }
               }

               var shadowCards = cardInstance.shadowCards().toJS();

               if (shadowCards.length > 0)
               {
                  for (var j = shadowCards.length - 1; j >= 0; j--)
                  {
                     var shadowCard = shadowCards[j];
                     var shadowCardUI = this.createShadowCardUI(shadowCard);
                     rows.push(DOM.div(
                     {
                        key: "shadowCardRow" + rows.length,
                     }, shadowCardUI));
                  }
               }
            }

            return DOM.div(
            {
               className: "bg-lotr-light dt ma0 pa0",
            }, rows);
         },

         toggleSize: function()
         {
            this.setState(
            {
               isSmall: !this.state.isSmall,
            });
         },
      });

      CardInstanceUI.prototype.createAttachmentUI = function(cardInstance)
      {
         return React.createElement(CardInstanceUI,
         {
            cardInstance: cardInstance,
            slicing: 0.45,
         });
      };

      CardInstanceUI.prototype.createCardImage = function(cardInstance)
      {
         var width = (this.state.isSmall ? 125 : 275);

         return React.createElement(CardImageContainer,
         {
            myKey: cardInstance.toString(),
            cardInstance: cardInstance,
            slicing: this.props.slicing,
            width: width,
         });
      };

      CardInstanceUI.prototype.createShadowCardUI = function(cardInstance)
      {
         return React.createElement(CardInstanceUI,
         {
            cardInstance: cardInstance,
            slicing: 0.25,
         });
      };

      CardInstanceUI.prototype.createTokenPanel = function(cardInstance)
      {
         return React.createElement(TokenPanelContainer,
         {
            cardInstance: cardInstance,
         });
      };

      CardInstanceUI.propTypes = {
         cardInstance: PropTypes.object, // default: undefined
         slicing: PropTypes.number, // default: undefined
      };

      return CardInstanceUI;
   });
