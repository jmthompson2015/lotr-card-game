"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardInstancesArea"],
   function(ReactRedux, InputValidator, CardInstancesArea)
   {
      function mapStateToProps(state)
      {
         var environment = state.environment;
         var cardInstance = environment.activeLocation();

         return (
         {
            cardInstances: (cardInstance ? [cardInstance] : []),
            label: "Active Location",
            resourceBase: state.resourceBase,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardInstancesArea);
   });
