"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "artifact/js/EncounterSet", "artifact/js/GameHeader", "artifact/js/GameMode", "artifact/js/Trait"],
   function(InputValidator, CardType, EncounterSet, GameHeader, GameMode, Trait)
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
               gameModeKeys: [GameMode.EASY],
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Each player must choose 1 character currently committed to a quest, and remove that character from the quest. (The chosen character does not ready.)",
                  }],
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
               gameModeKeys: [GameMode.STANDARD],
               gameText: [
                  {
                     text: "Chieftain Ufthak gets +2 Attack for each resource token on him.",
                  },
                  {
                     headerKey: GameHeader.FORCED,
                     text: "After Chieftain Ufthak attacks, place 1 resource token on him.",
                  }],
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
               gameModeKeys: [GameMode.EASY, GameMode.STANDARD],
               gameText: [
                  {
                     headerKey: GameHeader.FORCED,
                     text: "When Dol Guldur Beastmaster attacks, deal it 1 additional shadow card.",
                  }],
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
               gameModeKeys: [GameMode.EASY, GameMode.EASY, GameMode.EASY],
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "The first player chooses 1 character currently committed to a quest. Deal 2 damage to that character.",
                  },
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "Attacking enemy gets +1 Attack. (+3 Attack instead if this attack is undefended.)",
                  }],
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
               gameModeKeys: [GameMode.EASY],
               gameText: [
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "Attacking enemy gets +1 Attack. (If this attack is undefended, also raise your threat by 3.)",
                  }],
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
               gameModeKeys: [GameMode.EASY],
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
               gameModeKeys: [GameMode.EASY, GameMode.EASY, GameMode.EASY, GameMode.EASY],
               gameText: [
                  {
                     headerKey: GameHeader.FORCED,
                     text: "After Forest Spider engages a player, it gets +1 Attack until the end of the round.",
                  },
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "Defending player must choose and discard 1 attachment he controls.",
                  }],
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
               gameModeKeys: [GameMode.STANDARD],
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
               gameModeKeys: [GameMode.EASY],
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
               gameModeKeys: [GameMode.STANDARD],
               gameText: [
                  {
                     headerKey: GameHeader.FORCED,
                     text: "After Hummerhorns engages you, deal 5 damage to a single hero you control.",
                  },
                  {
                     gameHeaderKey: GameHeader.SHADOW,
                     shadowEffect: "Deal 1 damage to each character the defending player controls. (2 damage instead if this attack is undefended.)",
                  }],
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
               gameModeKeys: [GameMode.EASY],
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
               gameModeKeys: [GameMode.EASY, GameMode.EASY],
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Each player must choose and exhaust 1 character he controls.",
                  },
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "Defending player must choose and exhaust 1 character he controls. (2 characters instead if this attack is undefended.)",
                  }],
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
               gameModeKeys: [GameMode.EASY],
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
               gameModeKeys: [GameMode.EASY],
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Each character currently committed to a quest gets -1 Willpower until the end of the phase.",
                  },
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "Raise defending player's threat by 4. (Raise defending player's threat by 8 instead if this attack is undefended.)",
                  }],
               key: "ungoliantsSpawn",
            },
         },

         keys: function()
         {
            return Object.getOwnPropertyNames(EnemyCard.properties);
         },

         keysByEncounterSet: function(encounterSetKey)
         {
            InputValidator.validateNotNull("encounterSetKey", encounterSetKey);

            var keys = EnemyCard.keys();

            return keys.filter(function(cardKey)
            {
               var card = EnemyCard.properties[cardKey];

               return card.encounterSetKey === encounterSetKey;
            });
         },
      };

      EnemyCard.keys().forEach(function(cardKey)
      {
         var card = EnemyCard.properties[cardKey];
         card.cardTypeKey = CardType.ENEMY;
         card.cardType = CardType.properties[card.cardTypeKey];
         card.encounterSet = EncounterSet.properties[card.encounterSetKey];
         card.gameMode = GameMode.properties[card.gameModeKey];

         var imagePath = card.name;
         imagePath = imagePath.replace(/ /g, "-");

         switch (cardKey)
         {
            case EnemyCard.DOL_GULDUR_ORCS:
               imagePath += "-Enemy";
               break;
         }

         card.imagePath = imagePath;
      });

      if (Object.freeze)
      {
         Object.freeze(EnemyCard);
      }

      return EnemyCard;
   });
