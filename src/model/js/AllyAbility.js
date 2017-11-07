  "use strict";

  define(["common/js/InputValidator", "artifact/js/AllyCard", "artifact/js/GameEvent", "artifact/js/Trait",
    "model/js/Action", "model/js/CardAction"],
     function(InputValidator, AllyCard, GameEvent, Trait, Action, CardAction)
     {
        var AllyAbility = {};

        ////////////////////////////////////////////////////////////////////////
        AllyAbility[GameEvent.CARD_DRAWN] = {};

        // CardSet.CORE
        AllyAbility[GameEvent.CARD_DRAWN][AllyCard.LONGBEARD_ORC_SLAYER] = {
           condition: function(store, context)
           {
              InputValidator.validateNotNull("store", store);
              InputValidator.validateNotNull("context", context);

              return context.cardInstance !== undefined && context.cardInstance.card().key === AllyCard.LONGBEARD_ORC_SLAYER;
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

        return AllyAbility;
     });
