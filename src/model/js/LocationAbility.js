  "use strict";

  define(["common/js/ArrayAugments", "common/js/InputValidator", "artifact/js/GameEvent", "artifact/js/LocationCard", "model/js/AgentAction", "model/js/CardAction"],
     function(ArrayAugments, InputValidator, GameEvent, LocationCard, AgentAction, CardAction)
     {
        var LocationAbility = {};

        ////////////////////////////////////////////////////////////////////////
        LocationAbility[GameEvent.TRAVELED] = {};

        // Scenario.PASSAGE_THROUGH_MIRKWOOD
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

        // Scenario.PASSAGE_THROUGH_MIRKWOOD
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

        return LocationAbility;
     });
