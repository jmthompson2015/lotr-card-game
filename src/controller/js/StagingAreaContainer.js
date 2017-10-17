"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardInstancesArea"],
   function(ReactRedux, InputValidator, CardInstancesArea)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.resourceBase", ownProps.resourceBase);

         var environment = state.environment;
         var cardInstances = environment.stagingArea().toJS();

         return (
         {
            cardInstances: cardInstances,
            label: "Staging Area",
            resourceBase: ownProps.resourceBase,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardInstancesArea);
   });
