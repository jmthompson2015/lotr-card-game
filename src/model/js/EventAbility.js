  "use strict";

  define(["common/js/InputValidator", "artifact/js/CardType", "artifact/js/EventCard", "artifact/js/GameEvent", "model/js/CardAction"],
     function(InputValidator, CardType, EventCard, GameEvent, CardAction)
     {
        var EventAbility = {};

        ////////////////////////////////////////////////////////////////////////
        EventAbility[GameEvent.CARD_DRAWN] = {};

        // CardSet.CORE
        EventAbility[GameEvent.CARD_DRAWN][EventCard.GRIM_RESOLVE] = {
           condition: function(store, context)
           {
              InputValidator.validateNotNull("store", store);
              InputValidator.validateNotNull("context", context);

              return context.cardInstance !== undefined && context.cardInstance.card().key === EventCard.GRIM_RESOLVE;
           },
           consequent: function(store, context, callback)
           {
              InputValidator.validateNotNull("store", store);
              InputValidator.validateNotNull("context", context);
              InputValidator.validateIsFunction("callback", callback);

              // Action: Ready all character cards in play.
              var environment = store.getState().environment;
              var cardsInPlay = environment.cardsInPlay();
              var characterTypes = [CardType.HERO, CardType.ALLY];

              cardsInPlay.forEach(function(cardInstance)
              {
                 var card = cardInstance.card();

                 if (characterTypes.includes(card.cardTypeKey))
                 {
                    store.dispatch(CardAction.setReady(cardInstance, true));
                 }
              });

              callback();
           },
        };

        EventAbility.toString = function()
        {
           return "EventAbility";
        };

        if (EventAbility.freeze)
        {
           Object.freeze(EventAbility);
        }

        return EventAbility;
     });
