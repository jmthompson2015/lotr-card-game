"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardInstancesArea"],
   function(ReactRedux, InputValidator, CardInstancesArea)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.resourceBase", ownProps.resourceBase);

         var environment = state.environment;
         var cardInstance = environment.activeLocation();

         return (
         {
            cardInstances: (cardInstance ? [cardInstance] : []),
            label: "Active Location",
            resourceBase: ownProps.resourceBase,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardInstancesArea);
   });
