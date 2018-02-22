import InputValidator from "../../common/js/InputValidator.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import TreacheryCard from "../../artifact/js/TreacheryCard.js";
import Action from "./Action.js";

var ShadowAbility = {};

////////////////////////////////////////////////////////////////////////
ShadowAbility[GameEvent.SHADOW_CARD_REVEALED] = {};

// Scenario.A_JOURNEY_TO_RHOSGOBEL
ShadowAbility[GameEvent.SHADOW_CARD_REVEALED][TreacheryCard.EXHAUSTION] = {
   condition: function( /*store, context*/ )
   {
      return true;
   },
   consequent: function(store, context, callback)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);
      InputValidator.validateIsFunction("callback", callback);

      // Shadow: Deal 1 damage to each exhausted character.
      var environment = store.getState().environment;
      var isReady = false;
      environment.agentQueue().forEach(function(agent)
      {
         agent.tableauCharacters(isReady).forEach(function(cardInstance)
         {
            agent.addCardWounds(cardInstance, 1);
         });
      });

      discard(context.cardInstance, context.shadowInstance);

      if (callback)
      {
         callback();
      }
   },
};

function discard(cardInstance, shadowInstance)
{
   var store = cardInstance.store();
   store.dispatch(Action.discardShadowCard(cardInstance, shadowInstance));
}

ShadowAbility.toString = function()
{
   return "ShadowAbility";
};

if (ShadowAbility.freeze)
{
   Object.freeze(ShadowAbility);
}

export default ShadowAbility;