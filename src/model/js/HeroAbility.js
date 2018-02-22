import InputValidator from "../../common/js/InputValidator.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import HeroCard from "../../artifact/js/HeroCard.js";
import CardAction from "./CardAction.js";

var HeroAbility = {};

////////////////////////////////////////////////////////////////////////
HeroAbility[GameEvent.WOUNDED] = {};

// CardSet.CORE
HeroAbility[GameEvent.WOUNDED][HeroCard.GLOIN] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return context.cardInstance !== undefined && !context.cardInstance.isUsed();
   },
   consequent: function(store, context, callback)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);
      InputValidator.validateIsFunction("callback", callback);

      // Response: After Glóin suffers damage, add 1 resource to his resource
      // pool for each point of damage he just suffered.
      var cardInstance = context.cardInstance;
      var woundCount = context.woundCount;
      store.dispatch(CardAction.addResources(cardInstance, woundCount));
      store.dispatch(CardAction.setUsed(cardInstance, true));

      callback();
   },
};

HeroAbility.toString = function()
{
   return "HeroAbility";
};

if (HeroAbility.freeze)
{
   Object.freeze(HeroAbility);
}

export default HeroAbility;