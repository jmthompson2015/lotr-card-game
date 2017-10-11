"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "artifact/js/EncounterSet", "artifact/js/GameHeader", "artifact/js/GameMode", "artifact/js/Trait"],
   function(InputValidator, CardType, EncounterSet, GameHeader, GameMode, Trait)
   {
      var TreacheryCard = {
         CAUGHT_IN_A_WEB: "caughtInAWeb",
         DRIVEN_BY_SHADOW: "drivenByShadow",
         EVIL_STORM: "evilStorm",
         EYES_OF_THE_FOREST: "eyesOfTheForest",
         FALSE_LEAD: "falseLead",
         FLOODING: "flooding",
         MASSING_AT_NIGHT: "massingAtNight",
         OLD_WIVES_TALES: "oldWivesTales",
         PURSUED_BY_SHADOW: "pursuedByShadow",
         THE_NECROMANCERS_REACH: "theNecromancersReach",
         TREACHEROUS_FOG: "treacherousFog",

         properties:
         {
            "caughtInAWeb":
            {
               name: "Caught in a Web",
               encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
               gameModeKeys: [GameMode.STANDARD, GameMode.STANDARD],
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "The player with the highest threat level attaches this card to one of his heroes. (Counts as a Condition attachment with the text: \"Attached hero does not ready during the refresh phase unless you pay 2 resources from that hero's pool.\")",
                  }],
               key: "caughtInAWeb",
            },
            "drivenByShadow":
            {
               name: "Driven by Shadow",
               encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
               gameModeKeys: [GameMode.EASY],
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
               gameModeKeys: [GameMode.STANDARD],
               key: "evilStorm",
            },
            "eyesOfTheForest":
            {
               name: "Eyes of the Forest",
               encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
               gameModeKeys: [GameMode.STANDARD],
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
               gameModeKeys: [GameMode.EASY],
               key: "falseLead",
            },
            "flooding":
            {
               name: "Flooding",
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeKeys: [GameMode.EASY],
               traitKeys: [Trait.DISASTER],
               key: "flooding",
            },
            "massingAtNight":
            {
               name: "Massing at Night",
               encounterSetKey: EncounterSet.JOURNEY_DOWN_THE_ANDUIN,
               gameModeKeys: [GameMode.EASY],
               key: "massingAtNight",
            },
            "oldWivesTales":
            {
               name: "Old Wives' Tales",
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeKeys: [GameMode.EASY],
               traitKeys: [Trait.GOSSIP],
               key: "oldWivesTales",
            },
            "pursuedByShadow":
            {
               name: "Pursued by Shadow",
               encounterSetKey: EncounterSet.SAURONS_REACH,
               gameModeKeys: [GameMode.EASY],
               key: "pursuedByShadow",
            },
            "theNecromancersReach":
            {
               name: "The Necromancer's Reach",
               encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
               gameModeKeys: [GameMode.EASY, GameMode.STANDARD, GameMode.STANDARD],
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
               gameModeKeys: [GameMode.EASY],
               key: "treacherousFog",
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

         card.imagePath = imagePath;
      });

      if (Object.freeze)
      {
         Object.freeze(TreacheryCard);
      }

      return TreacheryCard;
   });
