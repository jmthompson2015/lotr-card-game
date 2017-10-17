"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardInstanceUI"],
   function(ReactRedux, InputValidator, CardInstanceUI)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.resourceBase", ownProps.resourceBase);

         var environment = state.environment;
         var cardInstance = environment.activeLocation();

         return (
         {
            cardInstance: cardInstance,
            label: "Active Location",
            resourceBase: ownProps.resourceBase,
            width: ownProps.width,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardInstanceUI);
   });
