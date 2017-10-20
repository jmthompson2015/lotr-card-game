"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardInstancesArea"],
   function(ReactRedux, InputValidator, CardInstancesArea)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.agent", ownProps.agent);
         InputValidator.validateNotNull("ownProps.resourceBase", ownProps.resourceBase);

         var agent = ownProps.agent;
         var cardInstances = agent.tableau().toJS();

         return (
         {
            cardInstances: cardInstances,
            label: "Tableau",
            resourceBase: ownProps.resourceBase,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardInstancesArea);
   });
