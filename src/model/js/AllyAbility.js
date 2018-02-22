import InputValidator from "../../common/js/InputValidator.js";
import AllyCard from "../../artifact/js/AllyCard.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import Trait from "../../artifact/js/Trait.js";
import Action from "./Action.js";
import CardAction from "./CardAction.js";

var AllyAbility = {};

////////////////////////////////////////////////////////////////////////
AllyAbility[GameEvent.CARD_PLAYED] = {};

// CardSet.CORE
AllyAbility[GameEvent.CARD_PLAYED][AllyCard.LONGBEARD_ORC_SLAYER] = {
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

      // Response: After Longbeard Orc Slayer enters play, deal 1 damage
      // to each Orc enemy in play.
      var environment = store.getState().environment;
      var stagingArea = environment.stagingArea();
      stagingArea.forEach(function(cardInstance)
      {
         if (cardInstance.hasTrait(Trait.ORC))
         {
            store.dispatch(CardAction.addWounds(cardInstance, 1));

            if (cardInstance.remainingHitPoints() <= 0)
            {
               store.dispatch(Action.discardStagingCard(cardInstance));
            }
         }
      });

      var agents = environment.agentQueue();
      agents.forEach(function(agent)
      {
         var engagementArea = agent.engagementArea();
         engagementArea.forEach(function(cardInstance)
         {
            if (cardInstance.hasTrait(Trait.ORC))
            {
               store.dispatch(CardAction.addWounds(cardInstance, 1));

               if (cardInstance.remainingHitPoints() <= 0)
               {
                  store.dispatch(Action.agentDiscardEnemyCard(agent, cardInstance));
               }
            }
         });
      });

      store.dispatch(CardAction.setUsed(context.cardInstance, true));
      callback();
   },
};

AllyAbility.toString = function()
{
   return "AllyAbility";
};

if (AllyAbility.freeze)
{
   Object.freeze(AllyAbility);
}

export default AllyAbility;