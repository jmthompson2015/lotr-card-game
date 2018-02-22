import InputValidator from "../../common/js/InputValidator.js";
import TokenPanel from "../../view/js/TokenPanel.js";

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

export default ReactRedux.connect(mapStateToProps)(TokenPanel);