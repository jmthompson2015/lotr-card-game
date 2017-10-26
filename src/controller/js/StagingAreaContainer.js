"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardInstancesArea"],
   function(ReactRedux, InputValidator, CardInstancesArea)
   {
      function mapStateToProps(state)
      {
         var environment = state.environment;
         var cardInstances = environment.stagingArea().toJS();
         var threat = environment.stagingThreat();

         return (
         {
            cardInstances: cardInstances,
            label: "Staging Area (threat: " + threat + ")",
            resourceBase: state.resourceBase,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardInstancesArea);
   });
