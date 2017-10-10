"use strict";

define(["artifact/js/CardType", "artifact/js/EncounterSet", "artifact/js/GameMode", "artifact/js/ImageNameCreator", "artifact/js/Trait"],
   function(CardType, EncounterSet, GameMode, ImageNameCreator, Trait)
   {
      var EnemyCard = {
         BLACK_FOREST_BATS: "blackForestBats",
         CHIEFTAN_UFTHAK: "chieftanUfthak",
         DOL_GULDUR_BEASTMASTER: "dolGuldurBeastmaster",
         DOL_GULDUR_ORCS: "dolGuldurOrcs",
         EAST_BIGHT_PATROL: "eastBightPatrol",
         EASTERN_CROWS: "easternCrows",
         FOREST_SPIDER: "forestSpider",
         GOBLIN_SNIPER: "goblinSniper",
         GOBLINTOWN_SCAVENGERS: "goblintownScavengers",
         HUMMERHORNS: "hummerhorns",
         HUNTERS_FROM_MORDOR: "huntersFromMordor",
         KING_SPIDER: "kingSpider",
         MISTY_MOUNTAIN_GOBLINS: "mistyMountainGoblins",
         UNGOLIANTS_SPAWN: "ungoliantsSpawn",

         properties:
         {
            "blackForestBats":
            {
               name: "Black Forest Bats",
               engagementCost: 15,
               threat: 1,
               attack: 1,
               defense: 0,
               hitPoints: 2,
               traitKeys: [Trait.CREATURE],
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               gameModeKey: GameMode.EASY,
               key: "blackForestBats",
            },
            "chieftanUfthak":
            {
               name: "Chieftan Ufthak",
               engagementCost: 35,
               threat: 2,
               attack: 3,
               defense: 3,
               hitPoints: 6,
               traitKeys: [Trait.DOL_GULDUR, Trait.ORC],
               encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
               gameModeKey: GameMode.STANDARD,
               key: "chieftanUfthak",
            },
            "dolGuldurBeastmaster":
            {
               name: "Dol Guldur Beastmaster",
               engagementCost: 35,
               threat: 2,
               attack: 3,
               defense: 1,
               hitPoints: 5,
               traitKeys: [Trait.DOL_GULDUR, Trait.ORC],
               encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
               gameModeKey: GameMode.STANDARD,
               key: "dolGuldurBeastmaster",
            },
            "dolGuldurOrcs":
            {
               name: "Dol Guldur Orcs",
               engagementCost: 10,
               threat: 2,
               attack: 2,
               defense: 0,
               hitPoints: 3,
               traitKeys: [Trait.DOL_GULDUR, Trait.ORC],
               encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
               gameModeKey: GameMode.EASY,
               key: "dolGuldurOrcs",
            },
            "eastBightPatrol":
            {
               name: "East Bight Patrol",
               engagementCost: 5,
               threat: 3,
               attack: 3,
               defense: 1,
               hitPoints: 2,
               traitKeys: [Trait.GOBLIN, Trait.ORC],
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               gameModeKey: GameMode.EASY,
               key: "eastBightPatrol",
            },
            "easternCrows":
            {
               name: "Eastern Crows",
               engagementCost: 30,
               threat: 1,
               attack: 1,
               defense: 0,
               hitPoints: 1,
               traitKeys: [Trait.CREATURE],
               encounterSetKey: EncounterSet.SAURONS_REACH,
               gameModeKey: GameMode.EASY,
               key: "easternCrows",
            },
            "forestSpider":
            {
               name: "Forest Spider",
               engagementCost: 25,
               threat: 2,
               attack: 2,
               defense: 1,
               hitPoints: 4,
               traitKeys: [Trait.CREATURE, Trait.SPIDER],
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               gameModeKey: GameMode.EASY,
               key: "forestSpider",
            },
            "goblinSniper":
            {
               name: "Goblin Sniper",
               engagementCost: 48,
               threat: 2,
               attack: 2,
               defense: 0,
               hitPoints: 2,
               traitKeys: [Trait.GOBLIN, Trait.ORC],
               encounterSetKey: EncounterSet.WILDERLANDS,
               gameModeKey: GameMode.STANDARD,
               key: "goblinSniper",
            },
            "goblintownScavengers":
            {
               name: "Goblintown Scavengers",
               engagementCost: 12,
               threat: 1,
               attack: 1,
               defense: 0,
               hitPoints: 3,
               traitKeys: [Trait.GOBLIN, Trait.ORC],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeKey: GameMode.EASY,
               key: "goblintownScavengers",
            },
            "hummerhorns":
            {
               name: "Hummerhorns",
               engagementCost: 40,
               threat: 1,
               attack: 2,
               defense: 0,
               hitPoints: 3,
               traitKeys: [Trait.CREATURE, Trait.INSECT],
               encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
               gameModeKey: GameMode.STANDARD,
               key: "hummerhorns",
            },
            "huntersFromMordor":
            {
               name: "Hunters from Mordor",
               engagementCost: 34,
               threat: 2,
               attack: 2,
               defense: 2,
               hitPoints: 6,
               traitKeys: [Trait.MORDOR],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeKey: GameMode.EASY,
               key: "huntersFromMordor",
            },
            "kingSpider":
            {
               name: "King Spider",
               engagementCost: 20,
               threat: 2,
               attack: 3,
               defense: 1,
               hitPoints: 3,
               traitKeys: [Trait.CREATURE, Trait.SPIDER],
               encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
               gameModeKey: GameMode.EASY,
               key: "kingSpider",
            },
            "mistyMountainGoblins":
            {
               name: "Misty Mountain Goblins",
               engagementCost: 15,
               threat: 2,
               attack: 2,
               defense: 1,
               hitPoints: 3,
               traitKeys: [Trait.GOBLIN, Trait.ORC],
               encounterSetKey: EncounterSet.JOURNEY_DOWN_THE_ANDUIN,
               gameModeKey: GameMode.EASY,
               // image missing at cardgamedb.com
               image: "https://talesfromthecards.files.wordpress.com/2013/03/misty-mountain-goblins.jpg?w=200&h=279",
               key: "mistyMountainGoblins",
            },
            "ungoliantsSpawn":
            {
               name: "Ungoliant's Spawn",
               engagementCost: 32,
               threat: 3,
               attack: 5,
               defense: 2,
               hitPoints: 9,
               traitKeys: [Trait.CREATURE, Trait.SPIDER],
               encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
               gameModeKey: GameMode.EASY,
               key: "ungoliantsSpawn",
            },
         },

         keys: function()
         {
            return Object.getOwnPropertyNames(EnemyCard.properties);
         },
      };

      EnemyCard.keys().forEach(function(cardKey)
      {
         var card = EnemyCard.properties[cardKey];
         card.cardTypeKey = CardType.ENEMY;
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
         Object.freeze(EnemyCard);
      }

      return EnemyCard;
   });
