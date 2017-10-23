"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/CardInstancesArea"],
   function(ReactRedux, InputValidator, CardInstancesArea)
   {
      function mapStateToProps(state)
      {
         var environment = state.environment;
         var cardInstance = environment.questDeck().get(0);

         return (
         {
            cardInstances: (cardInstance ? [cardInstance] : []),
            label: "Active Quest",
            resourceBase: state.resourceBase,
         });
      }

      return ReactRedux.connect(mapStateToProps)(CardInstancesArea);
   });
