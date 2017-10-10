"use strict";

define(["artifact/js/CardType", "artifact/js/EncounterSet", "artifact/js/GameMode", "artifact/js/ImageNameCreator", "artifact/js/Trait"],
   function(CardType, EncounterSet, GameMode, ImageNameCreator, Trait)
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
               gameModeKey: GameMode.STANDARD,
               key: "caughtInAWeb",
            },
            "drivenByShadow":
            {
               name: "Driven by Shadow",
               encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
               gameModeKey: GameMode.EASY,
               key: "drivenByShadow",
            },
            "evilStorm":
            {
               name: "Evil Storm",
               encounterSetKey: EncounterSet.SAURONS_REACH,
               gameModeKey: GameMode.STANDARD,
               key: "evilStorm",
            },
            "eyesOfTheForest":
            {
               name: "Eyes of the Forest",
               encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
               gameModeKey: GameMode.STANDARD,
               key: "eyesOfTheForest",
            },
            "falseLead":
            {
               name: "False Lead",
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeKey: GameMode.EASY,
               key: "falseLead",
            },
            "flooding":
            {
               name: "Flooding",
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeKey: GameMode.EASY,
               traitKeys: [Trait.DISASTER],
               key: "flooding",
            },
            "massingAtNight":
            {
               name: "Massing at Night",
               encounterSetKey: EncounterSet.JOURNEY_DOWN_THE_ANDUIN,
               gameModeKey: GameMode.EASY,
               key: "massingAtNight",
            },
            "oldWivesTales":
            {
               name: "Old Wives' Tales",
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeKey: GameMode.EASY,
               traitKeys: [Trait.GOSSIP],
               key: "oldWivesTales",
            },
            "pursuedByShadow":
            {
               name: "Pursued by Shadow",
               encounterSetKey: EncounterSet.SAURONS_REACH,
               gameModeKey: GameMode.EASY,
               // image missing at cardgamedb.com
               image: "https://s3.amazonaws.com/hallofbeorn-resources/Images/Cards/Core-Set/Pursued-by-Shadow.png",
               key: "pursuedByShadow",
            },
            "theNecromancersReach":
            {
               name: "The Necromancer's Reach",
               encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
               gameModeKey: GameMode.STANDARD,
               key: "theNecromancersReach",
            },
            "treacherousFog":
            {
               name: "Treacherous Fog",
               encounterSetKey: EncounterSet.SAURONS_REACH,
               gameModeKey: GameMode.EASY,
               key: "treacherousFog",
            },
         },

         keys: function()
         {
            return Object.getOwnPropertyNames(TreacheryCard.properties);
         },
      };

      TreacheryCard.keys().forEach(function(cardKey)
      {
         var card = TreacheryCard.properties[cardKey];
         card.cardTypeKey = CardType.TREACHERY;
         card.cardType = CardType.properties[card.cardTypeKey];
         card.encounterSet = EncounterSet.properties[card.encounterSetKey];
         card.gameMode = GameMode.properties[card.gameModeKey];

         if (!card.image)
         {
            card.image = ImageNameCreator.create(card);
         }
      });

      if (Object.freeze)
      {
         Object.freeze(TreacheryCard);
      }

      return TreacheryCard;
   });
