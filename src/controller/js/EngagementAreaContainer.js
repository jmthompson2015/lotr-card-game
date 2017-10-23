"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardInstancesArea"],
   function(ReactRedux, InputValidator, CardInstancesArea)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.agent", ownProps.agent);

         var agent = ownProps.agent;
         var cardInstances = agent.engagementArea().toJS();

         return (
         {
            cardInstances: cardInstances,
            label: "Engagement Area",
            resourceBase: state.resourceBase,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardInstancesArea);
   });
