"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardInstancesArea"],
   function(ReactRedux, InputValidator, CardInstancesArea)
   {
      function mapStateToProps(state)
      {
         var environment = state.environment;
         var cardInstances = environment.stagingArea().toJS();

         return (
         {
            cardInstances: cardInstances,
            label: "Staging Area",
            resourceBase: state.resourceBase,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardInstancesArea);
   });
