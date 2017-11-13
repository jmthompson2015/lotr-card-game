"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardComparator", "view/js/CardInstancesArea"],
   function(ReactRedux, InputValidator, CardComparator, CardInstancesArea)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.agent", ownProps.agent);

         var agent = ownProps.agent;
         var cardInstances = agent.hand().toJS();
         cardInstances.sort(CardComparator.TypeCostSphereName);

         return (
         {
            cardInstances: cardInstances,
            isExpanded: false,
            label: "Hand",
            resourceBase: state.resourceBase,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardInstancesArea);
   });
