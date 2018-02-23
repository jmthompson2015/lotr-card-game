import CardType from "../../artifact/js/CardType.js";

class CardImage extends React.Component
{
   componentDidMount()
   {
      this.paint();
   }

   componentDidUpdate()
   {
      this.paint();
   }

   render()
   {
      var className;
      var isReady = (this.isQuestCard() ? false : this.props.isReady);
      var canvasHeight, canvasWidth;

      if (this.props.slicing === undefined)
      {
         className = "br3";
         canvasWidth = (isReady ? this.props.width : this.height());
         canvasHeight = (isReady ? this.height() : this.props.width);
      }
      else
      {
         canvasWidth = (isReady ? this.props.width : this.height() * this.props.slicing);
         canvasHeight = (isReady ? this.height() * this.props.slicing : this.props.width);
      }

      return ReactDOMFactories.canvas(
      {
         key: this.canvasId(),
         className: className,
         height: canvasHeight,
         id: this.canvasId(),
         title: this.props.card.name,
         width: canvasWidth,
      });
   }
}

CardImage.prototype.canvasId = function()
{
   return this.props.card.key + this.props.isFaceUp + this.props.isReady + this.props.slicing + "CardImageCanvas" + this.props.myKey;
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
   return this.props.width * 1.4;
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
   var dWidth = this.props.width;
   var height = this.height();
   var slicing = this.props.slicing;
   var src = this.createSrc();
   var image = new Image();
   image.onload = function()
   {
      if (slicing === undefined)
      {
         if (isQuestCard)
         {
            context.drawImage(image, 0, 0, height, dWidth);
         }
         else if (isReady)
         {
            context.drawImage(image, 0, 0, dWidth, height);
         }
         else
         {
            context.save();
            context.translate(height / 2.0, dWidth / 2.0);
            context.rotate(Math.PI / 2.0);
            context.drawImage(image, -dWidth / 2.0, -height / 2.0, dWidth, height);
            context.restore();
         }
      }
      else
      {
         var sWidth = image.naturalWidth;
         var sy = image.naturalHeight * (1.0 - slicing);
         var sHeight = image.naturalHeight * slicing;
         var dHeight = height * slicing;

         if (isReady)
         {
            context.drawImage(image, 0, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);
         }
         else
         {
            context.save();
            context.translate(dHeight / 2.0, dWidth / 2.0);
            context.rotate(Math.PI / 2.0);
            context.drawImage(image, 0, sy, sWidth, sHeight, -dWidth / 2.0, -dHeight / 2.0, dWidth, dHeight);
            context.restore();
         }
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
   myKey: PropTypes.string, // default: undefined
   slicing: PropTypes.number, // default: undefined
   width: PropTypes.number,
};

CardImage.defaultProps = {
   isFaceUp: true,
   isReady: true,
   width: 200,
};

export default CardImage;