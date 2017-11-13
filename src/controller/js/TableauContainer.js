"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardComparator", "view/js/CardInstancesArea"],
   function(ReactRedux, InputValidator, CardComparator, CardInstancesArea)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.agent", ownProps.agent);

         var agent = ownProps.agent;
         var cardInstances = agent.tableau().toJS();
         cardInstances.sort(CardComparator.TypeHitPointsName);

         return (
         {
            cardInstances: cardInstances,
            label: "Tableau",
            resourceBase: state.resourceBase,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardInstancesArea);
   });
