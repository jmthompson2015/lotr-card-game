"use strict";

define(["immutable", "react-redux", "common/js/InputValidator", "artifact/js/Sphere", "view/js/TokenPanel"],
   function(Immutable, ReactRedux, InputValidator, Sphere, TokenPanel)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.cardInstance", ownProps.cardInstance);
         InputValidator.validateIsString("ownProps.resourceBase", ownProps.resourceBase);

         var cardInstance = ownProps.cardInstance;
         var id = cardInstance.id();
         var progressCount = state.cardProgress.get(id);
         var woundCount = state.cardDamage.get(id);
         var resourceMap = (state.cardResources.get(id) ? state.cardResources.get(id) : Immutable.Map());

         return (
         {
            bagginsCount: resourceMap.get(Sphere.BAGGINS),
            fellowshipCount: resourceMap.get(Sphere.FELLOWSHIP),
            leadershipCount: resourceMap.get(Sphere.LEADERSHIP),
            loreCount: resourceMap.get(Sphere.LORE),
            neutralCount: resourceMap.get(Sphere.NEUTRAL),
            progressCount: progressCount,
            resourceBase: ownProps.resourceBase,
            spiritCount: resourceMap.get(Sphere.SPIRIT),
            tacticsCount: resourceMap.get(Sphere.TACTICS),
            woundCount: woundCount,
         });
      }

      return ReactRedux.connect(mapStateToProps)(TokenPanel);
   });
