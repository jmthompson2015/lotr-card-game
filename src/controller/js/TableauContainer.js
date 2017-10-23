"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardInstancesArea"],
   function(ReactRedux, InputValidator, CardInstancesArea)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.agent", ownProps.agent);

         var agent = ownProps.agent;
         var cardInstances = agent.tableau().toJS();
         cardInstances.sort(CardComparator);

         return (
         {
            cardInstances: cardInstances,
            label: "Tableau",
            resourceBase: state.resourceBase,
         });
      }

      var CardComparator = function(a, b)
      {
         var answer = -1;
         var cardTypeKeyA = a.card().cardTypeKey;
         var cardTypeKeyB = b.card().cardTypeKey;

         if (cardTypeKeyA === cardTypeKeyB)
         {
            answer = 0;
         }
         else if (cardTypeKeyA < cardTypeKeyB)
         {
            answer = 1;
         }

         if (answer === 0)
         {
            var costA = a.card().hitPoints;
            var costB = b.card().hitPoints;
            if (costA === costB)
            {
               answer = 0;
            }
            else if (costA < costB)
            {
               answer = 1;
            }
            else
            {
               answer = -1;
            }
         }

         if (answer === 0)
         {
            var nameA = a.card().name;
            var nameB = b.card().name;
            if (nameA === nameB)
            {
               answer = 0;
            }
            else if (nameA > nameB)
            {
               answer = 1;
            }
            else
            {
               answer = -1;
            }
         }

         return answer;
      };

      return ReactRedux.connect(mapStateToProps)(CardInstancesArea);
   });
