  "use strict";

  define(["common/js/ArrayAugments", "common/js/InputValidator", "artifact/js/GameEvent", "artifact/js/Sphere", "artifact/js/TreacheryCard",
    "model/js/Action", "model/js/AgentAction", "model/js/CardAction"],
     function(ArrayAugments, InputValidator, GameEvent, Sphere, TreacheryCard, Action, AgentAction, CardAction)
     {
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
                    store.dispatch(CardAction.addWounds(cardInstance));
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

        return ShadowAbility;
     });
