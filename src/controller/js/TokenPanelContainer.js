"use strict";

define(["immutable", "react-redux", "common/js/InputValidator", "artifact/js/Sphere", "view/js/TokenPanel"],
   function(Immutable, ReactRedux, InputValidator, Sphere, TokenPanel)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.cardInstance", ownProps.cardInstance);

         var cardInstance = ownProps.cardInstance;

         return (
         {
            bonusAttack: cardInstance.bonusAttack(),
            bonusDefense: cardInstance.bonusDefense(),
            bonusHitPoints: cardInstance.bonusHitPoints(),
            bonusThreat: cardInstance.bonusThreat(),
            bonusWillpower: cardInstance.bonusWillpower(),
            progressCount: cardInstance.progress(),
            resourceBase: state.resourceBase,
            resourceCount: cardInstance.resources(),
            sphereKey: cardInstance.card().sphereKey,
            sphereKeys: cardInstance.sphereKeys(),
            woundCount: cardInstance.wounds(),
         });
      }

      return ReactRedux.connect(mapStateToProps)(TokenPanel);
   });
