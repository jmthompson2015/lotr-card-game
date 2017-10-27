"use strict";

define(["react-redux", "view/js/CardInstancesArea"],
   function(ReactRedux, CardInstancesArea)
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
