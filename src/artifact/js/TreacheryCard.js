"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "artifact/js/EncounterSet", "artifact/js/GameHeader", "artifact/js/GameMode", "artifact/js/Scenario", "artifact/js/Trait"],
   function(InputValidator, CardType, EncounterSet, GameHeader, GameMode, Scenario, Trait)
   {
      var TreacheryCard = {
         A_FRIGHTENED_BEAST: "aFrightenedBeast",
         CAUGHT_IN_A_WEB: "caughtInAWeb",
         DESPAIR: "despair",
         DRIVEN_BY_SHADOW: "drivenByShadow",
         EVIL_STORM: "evilStorm",
         EXHAUSTION: "exhaustion",
         EYES_OF_THE_FOREST: "eyesOfTheForest",
         FALSE_LEAD: "falseLead",
         FESTERING_WOUNDS: "festeringWounds",
         FLOODING: "flooding",
         IRON_SHACKLES: "ironShackles",
         MASSING_AT_NIGHT: "massingAtNight",
         OLD_WIVES_TALES: "oldWivesTales",
         PURSUED_BY_SHADOW: "pursuedByShadow",
         ROASTED_SLOWLY: "roastedSlowly",
         SACKED: "sacked",
         SWARMING_INSECTS: "swarmingInsects",
         THE_NECROMANCERS_REACH: "theNecromancersReach",
         TREACHEROUS_FOG: "treacherousFog",
         UNDER_THE_SHADOW: "underTheShadow",

         properties:
         {
            "aFrightenedBeast":
            {
               name: "A Frightened Beast",
               encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
               gameModeMap: GameMode.createMap(1, 2),
               key: "aFrightenedBeast",
            },
            "caughtInAWeb":
            {
               name: "Caught in a Web",
               encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
               gameModeMap: GameMode.createMap(0, 2),
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "The player with the highest threat level attaches this card to one of his heroes. (Counts as a Condition attachment with the text: \"Attached hero does not ready during the refresh phase unless you pay 2 resources from that hero's pool.\")",
                  }],
               key: "caughtInAWeb",
            },
            "despair":
            {
               name: "Despair",
               encounterSetKey: EncounterSet.WILDERLANDS,
               gameModeMap: GameMode.createMap(0, 2),
               key: "despair",
            },
            "drivenByShadow":
            {
               name: "Driven by Shadow",
               encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
               gameModeMap: GameMode.createMap(1),
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Each enemy and each location currently in the staging area gets +1 Threat until the end of the phase. If there are no cards in the staging area, Driven by Shadow gains surge.",
                  },
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "Choose and discard 1 attachment from the defending character. (If this attack is undefended, discard all attachments you control.)",
                  }],
               key: "drivenByShadow",
            },
            "evilStorm":
            {
               name: "Evil Storm",
               encounterSetKey: EncounterSet.SAURONS_REACH,
               gameModeMap: GameMode.createMap(2, 1),
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Deal 1 damage to each character controlled by each player with a threat of 35 or higher.",
                  }],
               key: "evilStorm",
            },
            "exhaustion":
            {
               name: "Exhaustion",
               encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
               gameModeMap: GameMode.createMap(1, 3),
               key: "exhaustion",
            },
            "eyesOfTheForest":
            {
               name: "Eyes of the Forest",
               encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
               gameModeMap: GameMode.createMap(0, 1),
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Each player discards all event cards in his hand.",
                  }],
               key: "eyesOfTheForest",
            },
            "falseLead":
            {
               name: "False Lead",
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeMap: GameMode.createMap(2),
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "The first player chooses and shuffles a card with the printed Clue trait back into the encounter deck. If there are no Clue cards in play, False Lead gains surge.",
                  }],
               key: "falseLead",
            },
            "festeringWounds":
            {
               name: "Festering Wounds",
               encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
               gameModeMap: GameMode.createMap(1, 1),
               key: "festeringWounds",
            },
            "flooding":
            {
               name: "Flooding",
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeMap: GameMode.createMap(2),
               traitKeys: [Trait.DISASTER],
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Remove all progress tokens from all Riverland locations.",
                  },
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "Resolve the 'when revealed' effect of this card.",
                  }],
               key: "flooding",
            },
            "ironShackles":
            {
               name: "Iron Shackles",
               encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
               gameModeMap: GameMode.createMap(1),
               key: "ironShackles",
            },
            "massingAtNight":
            {
               name: "Massing at Night",
               encounterSetKey: EncounterSet.JOURNEY_ALONG_THE_ANDUIN,
               gameModeMap: GameMode.createMap(0, 1),
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Reveal X additional cards from the encounter deck. X is the number of players in the game.",
                  },
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "Deal X shadow cards to this attacker. X is the number of players in the game.",
                  }],
               key: "massingAtNight",
            },
            "oldWivesTales":
            {
               name: "Old Wives' Tales",
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeMap: GameMode.createMap(1, 2),
               traitKeys: [Trait.GOSSIP],
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Discard 1 resource from each hero's resource pool, if able. Exhaust any hero that could not discard a resource from its pool.",
                  }],
               key: "oldWivesTales",
            },
            "pursuedByShadow":
            {
               name: "Pursued by Shadow",
               encounterSetKey: EncounterSet.SAURONS_REACH,
               gameModeMap: GameMode.createMap(2),
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Each player raises his threat by 1 for each character he controls that is not currently committed to a quest.",
                  },
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "Defending player chooses and returns 1 exhausted ally he controls to its owner's hand. If he controls no exhausted allies, raise his threat by 3.",
                  }],
               key: "pursuedByShadow",
            },
            "roastedSlowly":
            {
               name: "Roasted Slowly",
               encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
               gameModeMap: GameMode.createMap(0, 2),
               key: "roastedSlowly",
            },
            "sacked":
            {
               name: "Sacked!",
               encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
               gameModeMap: GameMode.createMap(4, 1),
               key: "sacked",
            },
            "swarmingInsects":
            {
               name: "Swarming Insects",
               encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
               gameModeMap: GameMode.createMap(1, 3),
               key: "swarmingInsects",
            },
            "theNecromancersReach":
            {
               name: "The Necromancer's Reach",
               encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
               gameModeMap: GameMode.createMap(1, 2),
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Deal 1 damage to each exhausted character.",
                  }],
               key: "theNecromancersReach",
            },
            "treacherousFog":
            {
               name: "Treacherous Fog",
               encounterSetKey: EncounterSet.SAURONS_REACH,
               gameModeMap: GameMode.createMap(2),
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Each location in the staging area gets +1 Threat until the end of the phase. Then, each player with a threat of 35 or higher chooses and discards 1 card from his hand.",
                  }],
               key: "treacherousFog",
            },
            "underTheShadow":
            {
               name: "Under the Shadow",
               encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
               gameModeMap: GameMode.createMap(2),
               key: "underTheShadow",
            },
         },

         keys: function()
         {
            return Object.getOwnPropertyNames(TreacheryCard.properties);
         },

         keysByEncounterSet: function(encounterSetKey)
         {
            InputValidator.validateNotNull("encounterSetKey", encounterSetKey);

            var keys = TreacheryCard.keys();

            return keys.filter(function(cardKey)
            {
               var card = TreacheryCard.properties[cardKey];

               return card.encounterSetKey === encounterSetKey;
            });
         },

         keysByScenario: function(scenarioKey)
         {
            InputValidator.validateNotNull("scenarioKey", scenarioKey);

            var scenario = Scenario.properties[scenarioKey];
            var encounterSetKeys = scenario.encounterSetKeys;
            var keys = TreacheryCard.keys();

            return keys.filter(function(cardKey)
            {
               var card = TreacheryCard.properties[cardKey];

               return encounterSetKeys.includes(card.encounterSetKey);
            });
         },
      };

      TreacheryCard.keys().forEach(function(cardKey)
      {
         var card = TreacheryCard.properties[cardKey];
         card.cardTypeKey = CardType.TREACHERY;
         card.cardType = CardType.properties[card.cardTypeKey];
         card.encounterSet = EncounterSet.properties[card.encounterSetKey];
         card.gameMode = GameMode.properties[card.gameModeKey];

         var imagePath = card.name;
         imagePath = imagePath.replace(/ /g, "-");
         imagePath = imagePath.replace(/!/g, "");

         card.imagePath = imagePath;
      });

      if (Object.freeze)
      {
         Object.freeze(TreacheryCard);
      }

      return TreacheryCard;
   });
