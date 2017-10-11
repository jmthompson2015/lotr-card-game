/*
 * see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
 */
"use strict";

define(["create-react-class", "prop-types", "react-dom-factories", "common/js/InputValidator"],
   function(createReactClass, PropTypes, DOM, InputValidator)
   {
      var AllyCardImage = createReactClass(
      {
         render: function()
         {
            var card = this.props.card;
            var src = this.createSrc(card);
            var myLogLoadFailure = this.logLoadFailure;

            return DOM.img(
            {
               crossOrigin: "anonymous",
               onError: function()
               {
                  myLogLoadFailure(src);
               },
               src: src,
               title: card.name,
               width: this.props.width,
            });
         },

         createSrc: function(card)
         {
            InputValidator.validateNotNull("card", card);

            var cardSetUrl = (card.cardSubset ? card.cardSubset.imagePath : card.cardSet.imagePath);
            var cardUrl = card.imagePath;

            return AllyCardImage.BASE_URL + cardSetUrl + cardUrl + ".jpg";
         },

         logLoadFailure: function(src)
         {
            var lastIndex = src.lastIndexOf("/");
            lastIndex = src.lastIndexOf("/", lastIndex - 1);
            var filename = src.substring(lastIndex + 1);
            LOGGER.error("AllyCardImage failed to load " + filename);
         },
      });

      AllyCardImage.propTypes = {
         card: PropTypes.object.isRequired,

         width: PropTypes.number,
      };

      AllyCardImage.defaultProps = {
         width: 422,
      };

      AllyCardImage.BASE_URL = "https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/";

      return AllyCardImage;
   });
