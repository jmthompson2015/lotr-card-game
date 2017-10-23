"use strict";

define(["create-react-class", "prop-types", "react-dom-factories", "artifact/js/CardType"],
   function(createReactClass, PropTypes, DOM, CardType)
   {
      var CardImage = createReactClass(
      {
         componentDidMount: function()
         {
            this.paint();
         },

         componentDidUpdate: function()
         {
            this.paint();
         },

         render: function()
         {
            var width;
            var height;

            if (this.isQuestCard())
            {
               width = this.height();
               height = this.props.width;
            }
            else
            {
               var isReady = this.props.isReady;
               width = (isReady ? this.props.width : this.height());
               height = (isReady ? this.height() : this.props.width);
            }

            return DOM.canvas(
            {
               className: "br3",
               id: this.canvasId(),
               height: height,
               width: width,
            });
         },
      });

      CardImage.prototype.canvasId = function()
      {
         return this.props.card.key + this.props.isFaceUp + this.props.isReady + "CardImageCanvas" + this.props.myKey;
      };

      CardImage.prototype.createSrc = function()
      {
         var answer;
         var card = this.props.card;
         var encounterSet = card.encounterSet;

         if (this.props.isFaceUp)
         {
            var cardSetUrl;

            if (encounterSet !== undefined)
            {
               cardSetUrl = (encounterSet.cardSubset ? encounterSet.cardSubset.imagePath : encounterSet.cardSet.imagePath);
            }
            else
            {
               cardSetUrl = (card.cardSubset ? card.cardSubset.imagePath : card.cardSet.imagePath);
            }

            var cardUrl = card.imagePath;

            answer = CardImage.BASE_URL + cardSetUrl + cardUrl + ".jpg";
         }
         else
         {
            if (encounterSet !== undefined)
            {
               answer = this.props.resourceBase + "card/EncounterCardBack.png";
            }
            else
            {
               answer = this.props.resourceBase + "card/PlayerCardBack.png";
            }
         }

         return answer;
      };

      CardImage.prototype.height = function()
      {
         return this.props.width * 600 / 429;
      };

      CardImage.prototype.isQuestCard = function()
      {
         return (this.props.card.cardTypeKey === CardType.QUEST);
      };

      CardImage.prototype.logLoadFailure = function(src)
      {
         var lastIndex = src.lastIndexOf("/");
         lastIndex = src.lastIndexOf("/", lastIndex - 1);
         var filename = src.substring(lastIndex + 1);
         LOGGER.error("HeroCardImage failed to load " + filename);
      };

      CardImage.prototype.paint = function()
      {
         var isQuestCard = this.isQuestCard();
         var isReady = this.props.isReady;
         var canvas = document.getElementById(this.canvasId());
         var context = canvas.getContext("2d");
         var width = this.props.width;
         var height = this.height();
         var src = this.createSrc();
         var image = new Image();
         image.onload = function()
         {
            if (isQuestCard)
            {
               context.drawImage(image, 0, 0, height, width);
            }
            else if (isReady)
            {
               context.drawImage(image, 0, 0, width, height);
            }
            else
            {
               context.save();
               context.translate(height / 2.0, width / 2.0);
               context.rotate(Math.PI / 2.0);
               context.drawImage(image, -width / 2.0, -height / 2.0, width, height);
               context.restore();
            }
         };
         image.onerror = this.logLoadFailure;
         image.src = src;
      };

      CardImage.BASE_URL = "https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/";

      CardImage.propTypes = {
         card: PropTypes.object.isRequired,
         resourceBase: PropTypes.string.isRequired,

         isFaceUp: PropTypes.bool,
         isReady: PropTypes.bool,
         myKey: PropTypes.string,
         width: PropTypes.number,
      };

      CardImage.defaultProps = {
         isFaceUp: true,
         isReady: true,
         width: 200,
      };

      return CardImage;
   });
