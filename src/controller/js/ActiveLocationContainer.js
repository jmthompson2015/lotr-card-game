"use strict";

define(["react-redux", "view/js/CardInstancesArea"],
   function(ReactRedux, CardInstancesArea)
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
