  "use strict";

  define(["common/js/InputValidator", "artifact/js/GameEvent", "artifact/js/ObjectiveCard", "artifact/js/Phase", "model/js/Action", "model/js/CardAction"],
     function(InputValidator, GameEvent, ObjectiveCard, Phase, Action, CardAction)
     {
        var ObjectiveAbility = {};

        ////////////////////////////////////////////////////////////////////////
        ObjectiveAbility[GameEvent.CARD_DRAWN] = {};

        ObjectiveAbility[GameEvent.CARD_DRAWN][ObjectiveCard.WILYADOR] = {
           // No attachments. The first player gains control of Wilyador.
           // Forced: At the end of each round, Wilyador suffers 2 damage.
           // Wilyador cannot be healed of more than 5 wounds by a single effect.
           // If Wilyador leaves play, the players have lost the game.
           condition: function(store, context)
           {
              InputValidator.validateNotNull("store", store);
              InputValidator.validateNotNull("context", context);

              var cardInstance = context.cardInstance;

              return store.getState().stagingArea.includes(cardInstance.id());
           },
           consequent: function(store, context, callback)
           {
              InputValidator.validateNotNull("store", store);
              InputValidator.validateNotNull("context", context);

              var environment = store.getState().environment;
              var cardInstance = context.cardInstance;
              var firstAgent = environment.agentQueue()[0];
              store.dispatch(Action.stagingToAgentTableau(firstAgent, cardInstance));

              if (callback)
              {
                 callback();
              }
           },
        };

        ////////////////////////////////////////////////////////////////////////
        ObjectiveAbility[Phase.REFRESH_END] = {};

        ObjectiveAbility[Phase.REFRESH_END][ObjectiveCard.WILYADOR] = {
           // No attachments. The first player gains control of Wilyador.
           // Forced: At the end of each round, Wilyador suffers 2 damage.
           // Wilyador cannot be healed of more than 5 wounds by a single effect.
           // If Wilyador leaves play, the players have lost the game.
           condition: function(store /*, context*/ )
           {
              InputValidator.validateNotNull("store", store);

              var environment = store.getState().environment;
              var cardInstance = environment.firstCardInstance(ObjectiveCard.WILYADOR);

              return cardInstance !== undefined && !cardInstance.isUsed();
           },
           consequent: function(store, context, callback)
           {
              InputValidator.validateNotNull("store", store);

              var environment = store.getState().environment;
              var cardInstance = environment.firstCardInstance(ObjectiveCard.WILYADOR);
              var agent = environment.agentWhoControls(cardInstance);
              store.dispatch(CardAction.setUsed(cardInstance, true));
              agent.addCardWounds(cardInstance, 2, callback);
           },
        };

        ObjectiveAbility.toString = function()
        {
           return "ObjectiveAbility";
        };

        if (ObjectiveAbility.freeze)
        {
           Object.freeze(ObjectiveAbility);
        }

        return ObjectiveAbility;
     });
