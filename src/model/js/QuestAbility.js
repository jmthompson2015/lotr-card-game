  "use strict";

  define(["common/js/InputValidator", "artifact/js/EnemyCard", "artifact/js/GameEvent", "artifact/js/LocationCard", "artifact/js/ObjectiveCard", "artifact/js/QuestCard",
  "model/js/Action", "model/js/CardAction"],
     function(InputValidator, EnemyCard, GameEvent, LocationCard, ObjectiveCard, QuestCard, Action, CardAction)
     {
        var QuestAbility = {};

        ////////////////////////////////////////////////////////////////////////
        QuestAbility[GameEvent.QUEST_CARD_DRAWN] = {};

        // Scenario.A_JOURNEY_TO_RHOSGOBEL
        QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.AJTR1A_THE_WOUNDED_EAGLE] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              // Setup: Search the encounter deck for Rhosgobel and Wilyador, and add
              // them to the staging area with 2 damage tokens on Wilyador. Then, shuffle
              // the encounter deck.
              var environment = store.getState().environment;
              environment.drawEncounterCard(LocationCard.RHOSGOBEL);
              environment.drawEncounterCard(ObjectiveCard.WILYADOR);
              var wilyador = environment.stagingArea().last();
              store.dispatch(CardAction.addWounds(wilyador, 2));

              var encounterDeck = environment.encounterDeck().toJS();
              encounterDeck.lotrShuffle();
              store.dispatch(Action.setEncounterDeck(encounterDeck));

              // FIXME: first player gains control of Wilyador?

              // Advance the quest.
              store.dispatch(Action.discardActiveQuest());

              if (callback)
              {
                 callback();
              }
           },
        };

        // Scenario.CONFLICT_AT_THE_CARROCK
        QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.CATC1A_GRIMBEORNS_QUEST] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              // Setup: Add The Carrock to the staging area. Remove 4 unique Troll cards
              // and 4 copies of the 'Sacked!' card from the encounter deck and set them
              // aside, out of play. Then shuffle 1 'Sacked!' card per player back into
              // the encounter deck.
              var environment = store.getState().environment;
              environment.drawEncounterCard(LocationCard.THE_CARROCK);

              // FIXME: handle Troll cards

              // FIXME: handle Sacked! cards

              // Advance the quest.
              store.dispatch(Action.discardActiveQuest());

              if (callback)
              {
                 callback();
              }
           },
        };

        // Scenario.ESCAPE_FROM_DOL_GULDUR
        QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.EFDG1A_THE_NECROMANCERS_TOWER] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              // Setup: Search the encounter deck for the 3 objective cards, reveal and
              // place them in the staging area. Also, place the Nazgûl of Dol Guldur
              // face up but out of play, alongside the quest deck. Then, shuffle the
              // encounter deck, and attach 1 encounter to each objective card.
              var environment = store.getState().environment;
              environment.drawEncounterCard(ObjectiveCard.DUNGEON_TORCH);
              environment.drawEncounterCard(ObjectiveCard.GANDALFS_MAP);
              environment.drawEncounterCard(ObjectiveCard.SHADOW_KEY);

              // FIXME: handle Nazgûl

              var encounterDeck = environment.encounterDeck().toJS();
              encounterDeck.lotrShuffle();
              store.dispatch(Action.setEncounterDeck(encounterDeck));

              // FIXME: how to attach?
              // var stagingArea = environment.stagingArea();
              //
              // for (var i=0; i<3; i++)
              // {
              // var objectiveInstance = stagingArea.get(i);
              // store.dispatch(Action.drawEncounterCardToAttachment(objectiveInstance));
              // }

              // Advance the quest.
              store.dispatch(Action.discardActiveQuest());

              if (callback)
              {
                 callback();
              }
           },
        };

        // Scenario.JOURNEY_ALONG_THE_ANDUIN
        QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.JATA1A_TO_THE_RIVER] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              // Setup: Each player reveals 1 card from the top of the encounter deck,
              // and adds it to the staging area.
              var environment = store.getState().environment;
              var agentCount = environment.agents().size;

              for (var i = 0; i < agentCount; i++)
              {
                 store.dispatch(Action.drawEncounterCard());
              }

              // Advance the quest.
              store.dispatch(Action.discardActiveQuest());

              if (callback)
              {
                 callback();
              }
           },
        };

        // Scenario.PASSAGE_THROUGH_MIRKWOOD
        QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.PTM1A_FLIES_AND_SPIDERS] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              // Setup: Search the encounter deck for 1 copy of the Forest Spider
              // and 1 copy of the Old Forest Road, and add them to the staging area.
              // Then Shuffle the encounter deck.
              var environment = store.getState().environment;
              environment.drawEncounterCard(EnemyCard.FOREST_SPIDER);
              environment.drawEncounterCard(LocationCard.OLD_FOREST_ROAD);

              var encounterDeck = environment.encounterDeck().toJS();
              encounterDeck.lotrShuffle();
              store.dispatch(Action.setEncounterDeck(encounterDeck));

              // Advance the quest.
              store.dispatch(Action.discardActiveQuest());

              if (callback)
              {
                 callback();
              }
           },
        };

        // Scenario.THE_HUNT_FOR_GOLLUM
        QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.THFG1A_THE_HUNT_BEGINS] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              // Setup: Reveal 1 card per player from the encounter deck, and add it
              // to the staging area.
              var environment = store.getState().environment;
              var agentCount = environment.agents().size;

              for (var i = 0; i < agentCount; i++)
              {
                 store.dispatch(Action.drawEncounterCard());
              }

              // Advance the quest.
              store.dispatch(Action.discardActiveQuest());

              if (callback)
              {
                 callback();
              }
           },
        };

        return QuestAbility;
     });
