import InputValidator from "../../common/js/InputValidator.js";
import CardType from "../../artifact/js/CardType.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import TreacheryCard from "../../artifact/js/TreacheryCard.js";
import Action from "./Action.js";
import AgentAction from "./AgentAction.js";
import CardAction from "./CardAction.js";

var TreacheryAbility = {};

////////////////////////////////////////////////////////////////////////
TreacheryAbility[GameEvent.CARD_PLAYED] = {};

// EncounterSet.A_JOURNEY_TO_RHOSGOBEL
TreacheryAbility[GameEvent.CARD_PLAYED][TreacheryCard.EXHAUSTION] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return isInStagingArea(context.cardInstance);
   },
   consequent: function(store, context, callback)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateIsFunction("callback", callback);

      // When Revealed: Deal 2 damage to each exhausted character.
      var environment = store.getState().environment;
      var isReady = false;
      environment.agentQueue().forEach(function(agent)
      {
         agent.tableauCharacters(isReady).forEach(function(cardInstance)
         {
            agent.addCardWounds(cardInstance, 2);
         });
      });

      discard(context.cardInstance);

      if (callback)
      {
         callback();
      }
   },
};

// EncounterSet.SPIDERS_OF_MIRKWOOD
TreacheryAbility[GameEvent.CARD_PLAYED][TreacheryCard.EYES_OF_THE_FOREST] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return isInStagingArea(context.cardInstance);
   },
   consequent: function(store, context, callback)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateIsFunction("callback", callback);

      // When Revealed: Each player discards all event cards in his hand.
      var environment = store.getState().environment;
      environment.agentQueue().forEach(function(agent)
      {
         agent.hand(CardType.EVENT).forEach(function(cardInstance)
         {
            store.dispatch(AgentAction.discardFromHand(agent, cardInstance));
         });
      });

      discard(context.cardInstance);

      if (callback)
      {
         callback();
      }
   },
};

// EncounterSet.THE_HUNT_FOR_GOLLUM
TreacheryAbility[GameEvent.CARD_PLAYED][TreacheryCard.OLD_WIVES_TALES] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return isInStagingArea(context.cardInstance);
   },
   consequent: function(store, context, callback)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateIsFunction("callback", callback);

      // When Revealed: Discard 1 resource from each hero's resource pool,
      // if able. Exhaust any hero that could not discard a resource from its pool.
      var environment = store.getState().environment;
      environment.agentQueue().forEach(function(agent)
      {
         agent.tableauHeroes().forEach(function(cardInstance)
         {
            var resources = cardInstance.resources();

            if (resources > 0)
            {
               store.dispatch(CardAction.addResources(cardInstance, -1));
            }
            else if (cardInstance.isReady())
            {
               store.dispatch(CardAction.setReady(cardInstance, false));
            }
         });
      });

      discard(context.cardInstance);

      if (callback)
      {
         callback();
      }
   },
};

// EncounterSet.DOL_GULDUR_ORCS
TreacheryAbility[GameEvent.CARD_PLAYED][TreacheryCard.THE_NECROMANCERS_REACH] = {
   condition: function(store, context)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateNotNull("context", context);

      return isInStagingArea(context.cardInstance);
   },
   consequent: function(store, context, callback)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateIsFunction("callback", callback);

      // When Revealed: Deal 1 damage to each exhausted character.
      var environment = store.getState().environment;
      var isReady = false;
      environment.agentQueue().forEach(function(agent)
      {
         agent.tableauCharacters(isReady).forEach(function(cardInstance)
         {
            agent.addCardWounds(cardInstance, 1);
         });
      });

      discard(context.cardInstance);

      if (callback)
      {
         callback();
      }
   },
};

function discard(cardInstance)
{
   var store = cardInstance.store();
   store.dispatch(Action.discardStagingCard(cardInstance));
}

function isInStagingArea(cardInstance)
{
   var answer = false;

   if (cardInstance)
   {
      var store = cardInstance.store();
      answer = store.getState().stagingArea.includes(cardInstance.id());
   }

   return answer;
}

TreacheryAbility.toString = function()
{
   return "TreacheryAbility";
};

if (TreacheryAbility.freeze)
{
   Object.freeze(TreacheryAbility);
}

export default TreacheryAbility;