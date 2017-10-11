/*
 * see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
 */
"use strict";

define(["create-react-class", "prop-types", "react-dom-factories", "common/js/InputValidator"],
   function(createReactClass, PropTypes, DOM, InputValidator)
   {
      var TreacheryCardImage = createReactClass(
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

            var encounterSet = card.encounterSet;
            var cardSetUrl = (encounterSet.cardSubset ? encounterSet.cardSubset.imagePath : encounterSet.cardSet.imagePath);
            var cardUrl = card.imagePath;

            return TreacheryCardImage.BASE_URL + cardSetUrl + cardUrl + ".jpg";
         },

         logLoadFailure: function(src)
         {
            var lastIndex = src.lastIndexOf("/");
            lastIndex = src.lastIndexOf("/", lastIndex - 1);
            var filename = src.substring(lastIndex + 1);
            LOGGER.error("TreacheryCardImage failed to load " + filename);
         },
      });

      TreacheryCardImage.propTypes = {
         card: PropTypes.object.isRequired,

         width: PropTypes.number,
      };

      TreacheryCardImage.defaultProps = {
         width: 422,
      };

      TreacheryCardImage.BASE_URL = "https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/";

      return TreacheryCardImage;
   });
