import ArrayAugments from "../../common/js/ArrayAugments.js";
import InputValidator from "../../common/js/InputValidator.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import LocationCard from "../../artifact/js/LocationCard.js";
import AgentAction from "./AgentAction.js";
import CardAction from "./CardAction.js";

var LocationAbility = {};

////////////////////////////////////////////////////////////////////////
LocationAbility[GameEvent.TRAVELED] = {};

// EncounterSet.DOL_GULDUR_ORCS
LocationAbility[GameEvent.TRAVELED][LocationCard.NECROMANCERS_PASS] = {
   condition: function(store /*, context*/ )
   {
      InputValidator.validateNotNull("store", store);

      return isActiveLocation(store, LocationCard.NECROMANCERS_PASS);
   },
   consequent: function(store, context, callback)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateIsFunction("callback", callback);

      // Travel: The first player must discard 2 cards from his hand at random to travel here.
      var environment = store.getState().environment;
      var firstAgent = environment.firstAgent();

      for (var i = 0; i < 2; i++)
      {
         var hand = firstAgent.hand();

         if (hand.size > 0)
         {
            var cardInstance = hand.toJS().lotrRandomElement();
            store.dispatch(AgentAction.discardFromHand(firstAgent, cardInstance));
         }
      }

      if (callback)
      {
         callback();
      }
   },
};

// EncounterSet.PASSAGE_THROUGH_MIRKWOOD
LocationAbility[GameEvent.TRAVELED][LocationCard.FOREST_GATE] = {
   condition: function(store /*, context*/ )
   {
      InputValidator.validateNotNull("store", store);

      return isActiveLocation(store, LocationCard.FOREST_GATE);
   },
   consequent: function(store, context, callback)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateIsFunction("callback", callback);

      // Response: After you travel to Forest Gate the first player may draw 2 cards.
      var environment = store.getState().environment;
      var firstAgent = environment.firstAgent();
      store.dispatch(AgentAction.drawPlayerCard(firstAgent));
      store.dispatch(AgentAction.drawPlayerCard(firstAgent));

      if (callback)
      {
         callback();
      }
   },
};

// EncounterSet.PASSAGE_THROUGH_MIRKWOOD
LocationAbility[GameEvent.TRAVELED][LocationCard.OLD_FOREST_ROAD] = {
   condition: function(store /*, context*/ )
   {
      InputValidator.validateNotNull("store", store);

      return isActiveLocation(store, LocationCard.OLD_FOREST_ROAD);
   },
   consequent: function(store, context, callback)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateIsFunction("callback", callback);

      // Response: After you travel to Old Forest Road the first
      // player may choose and ready 1 character he controls.
      var environment = store.getState().environment;
      var firstAgent = environment.firstAgent();
      var characters = firstAgent.characters().filter(function(cardInstance)
      {
         return cardInstance.isExhausted();
      });

      if (characters.size > 0)
      {
         // FIXME: agent needs to choose a character.
         var character = characters.toJS().lotrRandomElement();
         store.dispatch(CardAction.setReady(character, true));
      }

      if (callback)
      {
         callback();
      }
   },
};

function isActiveLocation(store, cardKey)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateIsString("cardKey", cardKey);

   var environment = store.getState().environment;
   var activeLocation = environment.activeLocation();

   return activeLocation.card().key === cardKey;
}

LocationAbility.toString = function()
{
   return "LocationAbility";
};

if (LocationAbility.freeze)
{
   Object.freeze(LocationAbility);
}

export default LocationAbility;