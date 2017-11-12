  "use strict";

  define(["common/js/InputValidator", "artifact/js/CardType", "artifact/js/EventCard", "artifact/js/GameEvent", "artifact/js/Trait", "model/js/AgentAction", "model/js/CardAction"],
     function(InputValidator, CardType, EventCard, GameEvent, Trait, AgentAction, CardAction)
     {
        var EventAbility = {};

        ////////////////////////////////////////////////////////////////////////
        EventAbility[GameEvent.CARD_DRAWN] = {};

        // CardSet.CORE
        EventAbility[GameEvent.CARD_DRAWN][EventCard.FOR_GONDOR] = {
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

              // Action: Until the end of the phase, all characters get +1 Attack.
              // All Gondor characters also get +1 Defense until the end of the phase.
              var environment = store.getState().environment;
              var charactersInPlay = environment.charactersInPlay();

              charactersInPlay.forEach(function(cardInstance)
              {
                 store.dispatch(CardAction.addPhaseBonusAttack(cardInstance));

                 if (cardInstance.hasTrait(Trait.GONDOR))
                 {
                    store.dispatch(CardAction.addPhaseBonusDefense(cardInstance));
                 }
              });

              store.dispatch(CardAction.setUsed(context.cardInstance, true));
              discard(context.agent, context.cardInstance);
              callback();
           },
        };

        // CardSet.CORE
        EventAbility[GameEvent.CARD_DRAWN][EventCard.GRIM_RESOLVE] = {
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

              store.dispatch(CardAction.setUsed(context.cardInstance, true));
              discard(context.agent, context.cardInstance);
              callback();
           },
        };

        function discard(agent, cardInstance)
        {
           InputValidator.validateNotNull("agent", agent);
           InputValidator.validateNotNull("cardInstance", cardInstance);

           var store = cardInstance.store();
           store.dispatch(AgentAction.discardFromTableau(agent, cardInstance));
        }

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
