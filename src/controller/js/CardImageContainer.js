"use strict";

define(["immutable", "react-redux", "common/js/InputValidator", "artifact/js/Sphere", "view/js/CardImage"],
   function(Immutable, ReactRedux, InputValidator, Sphere, CardImage)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.cardInstance", ownProps.cardInstance);

         var cardInstance = ownProps.cardInstance;
         var isReady = state.cardIsReady.get(cardInstance.id());

         return (
         {
            card: cardInstance.card(),
            isReady: isReady,
            width: ownProps.width,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardImage);
   });
