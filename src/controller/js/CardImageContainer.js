import InputValidator from "../../common/js/InputValidator.js";
import CardImage from "../../view/js/CardImage.js";

function mapStateToProps(state, ownProps)
{
   InputValidator.validateNotNull("ownProps.cardInstance", ownProps.cardInstance);

   var cardInstance = ownProps.cardInstance;
   var isFaceUp = state.cardIsFaceUp.get(cardInstance.id());
   var isReady = state.cardIsReady.get(cardInstance.id());

   return (
   {
      card: cardInstance.card(),
      isFaceUp: isFaceUp,
      isReady: isReady,
      myKey: ownProps.myKey,
      resourceBase: state.resourceBase,
      slicing: ownProps.slicing,
      width: ownProps.width,
   });
}

export default ReactRedux.connect(mapStateToProps)(CardImage);