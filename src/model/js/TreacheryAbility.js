  "use strict";

  define(["common/js/ArrayAugments", "common/js/InputValidator", "artifact/js/GameEvent", "artifact/js/Sphere", "artifact/js/TreacheryCard",
    "model/js/Action", "model/js/AgentAction", "model/js/CardAction"],
     function(ArrayAugments, InputValidator, GameEvent, Sphere, TreacheryCard, Action, AgentAction, CardAction)
     {
        var TreacheryAbility = {};

        ////////////////////////////////////////////////////////////////////////
        TreacheryAbility[GameEvent.CARD_DRAWN] = {};

        // Scenario.A_JOURNEY_TO_RHOSGOBEL
        TreacheryAbility[GameEvent.CARD_DRAWN][TreacheryCard.EXHAUSTION] = {
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
                    store.dispatch(CardAction.addWounds(cardInstance, 2));
                 });
              });

              discard(context.cardInstance);

              if (callback)
              {
                 callback();
              }
           },
        };

        // Scenario.THE_HUNT_FOR_GOLLUM
        TreacheryAbility[GameEvent.CARD_DRAWN][TreacheryCard.OLD_WIVES_TALES] = {
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
                    var resourceDiscarded = false;
                    var resourceMap = cardInstance.resourceMap();
                    var sphereKeys = Sphere.keys();
                    sphereKeys.lotrShuffle();

                    for (var i = 0; i < sphereKeys.length && !resourceDiscarded; i++)
                    {
                       var sphereKey = sphereKeys[i];
                       var resourceCount = (resourceMap.get(sphereKey) ? resourceMap.get(sphereKey) : 0);

                       if (resourceCount > 0)
                       {
                          store.dispatch(CardAction.addResource(cardInstance, sphereKey, -1));
                          resourceDiscarded = true;
                          break;
                       }
                    }

                    if (!resourceDiscarded && cardInstance.isReady())
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

        return TreacheryAbility;
     });
