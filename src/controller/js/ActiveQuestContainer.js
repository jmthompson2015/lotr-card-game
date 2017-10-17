"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardInstanceUI"],
   function(ReactRedux, InputValidator, CardInstanceUI)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.resourceBase", ownProps.resourceBase);

         var environment = state.environment;
         var cardInstance = environment.questDeck().get(0);

         return (
         {
            cardInstance: cardInstance,
            label: "Active Quest",
            resourceBase: ownProps.resourceBase,
            width: ownProps.width,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardInstanceUI);
   });
