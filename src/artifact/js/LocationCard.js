"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "artifact/js/EncounterSet", "artifact/js/GameHeader", "artifact/js/GameMode", "artifact/js/Scenario", "artifact/js/Trait"],
   function(InputValidator, CardType, EncounterSet, GameHeader, GameMode, Scenario, Trait)
   {
      var LocationCard = {
         AMON_HEN: "amonHen",
         AMON_LHAW: "amonLhaw",
         BANKS_OF_THE_ANDUIN: "banksOfTheAnduin",
         BEE_PASTURES: "beePastures",
         DRY_WATERCOURSE: "dryWatercourse",
         ENCHANTED_STREAM: "enchantedStream",
         ENDLESS_CAVERNS: "endlessCaverns",
         FENS_AND_MIRES: "fensAndMires",
         FOREST_GATE: "forestGate",
         FOREST_GROVE: "forestGrove",
         GLADDEN_FIELDS: "gladdenFields",
         GREAT_FOREST_WEB: "greatForestWeb",
         IMPASSABLE_BOG: "impassableBog",
         MOUNTAINS_OF_MIRKWOOD: "mountainsOfMirkwood",
         NECROMANCERS_PASS: "necromancersPass",
         OAK_WOOD_GROVE: "oakWoodGrove",
         OLD_FOREST_ROAD: "oldForestRoad",
         RAUROS_FALLS: "raurosFalls",
         RHOSGOBEL: "rhosgobel",
         RIVER_LANGFLOOD: "riverLangflood",
         RIVER_NINGLOR: "riverNinglor",
         THE_BROWN_LANDS: "theBrownLands",
         THE_CARROCK: "theCarrock",
         THE_EAST_BANK: "theEastBank",
         THE_EAST_BIGHT: "theEastBight",
         THE_EAST_WALL_OF_ROHAN: "theEastWallOfRohan",
         THE_EAVES_OF_MIRKWOOD: "theEavesOfMirkwood",
         THE_HEART_OF_THE_MARSHES: "theHeartOfTheMarshes",
         THE_HIGHLANDS: "theHighlands",
         THE_NORTH_STAIR: "theNorthStair",
         THE_OLD_FORD: "theOldFord",
         THE_OUTER_RIDGE: "theOuterRidge",
         THE_SHORES_OF_NEN_HITHOEL: "theShoresOfNenHithoel",
         THE_SPIDERS_RING: "theSpidersRing",
         THE_WEST_BANK: "theWestBank",
         TOWER_GATE: "towerGate",
         WOOD_ELF_PATH: "woodElfPath",
         WOODMANS_GLADE: "woodmansGlade",

         properties:
         {
            "amonHen":
            {
               name: "Amon Hen",
               isUnique: true,
               threat: undefined,
               questPoints: 5,
               victory: 5,
               traitKeys: [Trait.EMYN_MUIL],
               encounterSetKey: EncounterSet.THE_HILLS_OF_EMYN_MUIL,
               gameModeMap: GameMode.createMap(1),
               key: "amonHen",
            },
            "amonLhaw":
            {
               name: "Amon Lhaw",
               isUnique: true,
               threat: undefined,
               questPoints: 5,
               victory: 5,
               traitKeys: [Trait.EMYN_MUIL],
               encounterSetKey: EncounterSet.THE_HILLS_OF_EMYN_MUIL,
               gameModeMap: GameMode.createMap(1),
               key: "amonLhaw",
            },
            "banksOfTheAnduin":
            {
               name: "Banks of the Anduin",
               threat: 1,
               questPoints: 3,
               traitKeys: [Trait.RIVERLAND],
               encounterSetKey: EncounterSet.JOURNEY_ALONG_THE_ANDUIN,
               gameModeMap: GameMode.createMap(2),
               gameText: [
                  {
                     headerKey: GameHeader.FORCED,
                     text: "If Banks of the Anduin leaves play, return it to the top of the encounter deck instead of placing it in the discard pile.",
                  }],
               key: "banksOfTheAnduin",
            },
            "beePastures":
            {
               name: "Bee Pastures",
               threat: 1,
               questPoints: 2,
               traitKeys: [Trait.WILDERLANDS],
               encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
               gameModeMap: GameMode.createMap(3),
               key: "beePastures",
            },
            "dryWatercourse":
            {
               name: "Dry Watercourse",
               threat: 2,
               questPoints: 2,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.RETURN_TO_MIRKWOOD,
               gameModeMap: GameMode.createMap(3),
               key: "dryWatercourse",
            },
            "enchantedStream":
            {
               name: "Enchanted Stream",
               threat: 2,
               questPoints: 2,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
               gameModeMap: GameMode.createMap(2),
               gameText: [
                  {
                     text: "While Enchanted Stream is the active location, players cannot draw cards.",
                  }],
               key: "enchantedStream",
            },
            "endlessCaverns":
            {
               name: "Endless Caverns",
               threat: 1,
               questPoints: 3,
               traitKeys: [Trait.DUNGEON],
               encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
               gameModeMap: GameMode.createMap(2),
               key: "endlessCaverns",
            },
            "fensAndMires":
            {
               name: "Fens and Mires",
               threat: 2,
               questPoints: 2,
               escape: 2,
               traitKeys: [Trait.DEAD_MARSHES],
               encounterSetKey: EncounterSet.THE_DEAD_MARSHES,
               gameModeMap: GameMode.createMap(4),
               key: "fensAndMires",
            },
            "forestGate":
            {
               name: "Forest Gate",
               threat: 2,
               questPoints: 4,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               gameModeMap: GameMode.createMap(2),
               gameText: [
                  {
                     headerKey: GameHeader.RESPONSE,
                     text: "After you travel to Forest Gate, the first player may draw 2 cards.",
                  }],
               key: "forestGate",
            },
            "forestGrove":
            {
               name: "Forest Grove",
               threat: 2,
               questPoints: 3,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
               gameModeMap: GameMode.createMap(4),
               key: "forestGrove",
            },
            "gladdenFields":
            {
               name: "Gladden Fields",
               threat: 3,
               questPoints: 3,
               traitKeys: [Trait.MARSHLAND],
               encounterSetKey: EncounterSet.JOURNEY_ALONG_THE_ANDUIN,
               gameModeMap: GameMode.createMap(1, 2),
               gameText: [
                  {
                     headerKey: GameHeader.FORCED,
                     text: "While Gladden Fields is the active location, each player must raise his threat by an additional point during the refresh phase.",
                  }],
               key: "gladdenFields",
            },
            "greatForestWeb":
            {
               name: "Great Forest Web",
               threat: 2,
               questPoints: 2,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
               gameModeMap: GameMode.createMap(2),
               gameText: [
                  {
                     headerKey: GameHeader.TRAVEL,
                     text: "Each player must exhaust 1 hero he controls to travel here.",
                  }],
               key: "greatForestWeb",
            },
            "impassableBog":
            {
               name: "Impassable Bog",
               threat: 1,
               questPoints: 12,
               escape: 2,
               victory: 7,
               traitKeys: [Trait.DEAD_MARSHES],
               encounterSetKey: EncounterSet.THE_DEAD_MARSHES,
               gameModeMap: GameMode.createMap(2, 2),
               key: "impassableBog",
            },
            "mountainsOfMirkwood":
            {
               name: "Mountains of Mirkwood",
               threat: 2,
               questPoints: 3,
               traitKeys: [Trait.FOREST, Trait.MOUNTAIN],
               encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
               gameModeMap: GameMode.createMap(3),
               gameText: [
                  {
                     headerKey: GameHeader.TRAVEL,
                     text: "Reveal the top card of the encounter deck and add it to the staging area to travel here.",
                  },
                  {
                     headerKey: GameHeader.RESPONSE,
                     text: "After Mountains of Mirkwood leaves play as an explored location, each player may search the top 5 cards of his deck for 1 card and add it to his hand. Shuffle the rest of the searched cards back into their owners' decks.",
                  }],
               key: "mountainsOfMirkwood",
            },
            "necromancersPass":
            {
               name: "Necromancer's Pass",
               threat: 3,
               questPoints: 2,
               traitKeys: [Trait.STRONGHOLD, Trait.DOL_GULDUR],
               encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
               gameModeMap: GameMode.createMap(1, 1),
               gameText: [
                  {
                     headerKey: GameHeader.TRAVEL,
                     text: "The first player must discard 2 cards from his hand at random to travel here.",
                  }],
               key: "necromancersPass",
            },
            "oakWoodGrove":
            {
               name: "Oak-wood Grove",
               threat: 2,
               questPoints: 1,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
               gameModeMap: GameMode.createMap(3),
               key: "oakWoodGrove",
            },
            "oldForestRoad":
            {
               name: "Old Forest Road",
               threat: 1,
               questPoints: 3,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               gameModeMap: GameMode.createMap(2),
               gameText: [
                  {
                     headerKey: GameHeader.RESPONSE,
                     text: "After you travel to Old Forest Road, the first player may choose and ready 1 character he controls.",
                  }],
               key: "oldForestRoad",
            },
            "raurosFalls":
            {
               name: "Rauros Falls",
               threat: 2,
               questPoints: 4,
               victory: 3,
               traitKeys: [Trait.EMYN_MUIL],
               encounterSetKey: EncounterSet.THE_HILLS_OF_EMYN_MUIL,
               gameModeMap: GameMode.createMap(2),
               key: "raurosFalls",
            },
            "rhosgobel":
            {
               name: "Rhosgobel",
               threat: undefined,
               questPoints: 4,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
               gameModeMap: GameMode.createMap(1),
               key: "rhosgobel",
            },
            "riverLangflood":
            {
               name: "River Langflood",
               threat: 2,
               questPoints: 3,
               traitKeys: [Trait.RIVERLAND],
               encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
               gameModeMap: GameMode.createMap(2, 2),
               key: "riverLangflood",
            },
            "riverNinglor":
            {
               name: "River Ninglor",
               threat: 2,
               questPoints: 4,
               traitKeys: [Trait.RIVERLAND],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeMap: GameMode.createMap(2),
               gameText: [
                  {
                     text: "While River Ninglor is the active location, remove 1 progress token from it and from the current quest at the end of each round.",
                  },
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "Remove 1 progress token from the current quest. (2 progress tokens instead if this attack is undefended.)",
                  }],
               key: "riverNinglor",
            },
            "theBrownLands":
            {
               name: "The Brown Lands",
               threat: 5,
               questPoints: 1,
               traitKeys: [Trait.WASTELAND],
               encounterSetKey: EncounterSet.WILDERLANDS,
               gameModeMap: GameMode.createMap(2),
               key: "theBrownLands",
            },
            "theCarrock":
            {
               name: "The Carrock",
               threat: 2,
               questPoints: 6,
               traitKeys: [Trait.RIVERLAND],
               encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
               gameModeMap: GameMode.createMap(1),
               key: "theCarrock",
            },
            "theEastBank":
            {
               name: "The East Bank",
               threat: 3,
               questPoints: 3,
               traitKeys: [Trait.RIVERLAND],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeMap: GameMode.createMap(2),
               gameText: [
                  {
                     text: "While The East Bank is the active location, ally cards cost 1 additional matching resource to play from hand.",
                  },
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "If you do not control at least 1 hero with a Clue card attached, return this enemy to the staging area after its attack resolves.",
                  }],
               key: "theEastBank",
            },
            "theEastBight":
            {
               name: "The East Bight",
               threat: 1,
               questPoints: 6,
               traitKeys: [Trait.WASTELAND],
               encounterSetKey: EncounterSet.WILDERLANDS,
               gameModeMap: GameMode.createMap(2),
               key: "theEastBight",
            },
            "theEastWallOfRohan":
            {
               name: "The East Wall of Rohan",
               threat: 4,
               questPoints: 2,
               victory: 3,
               traitKeys: [Trait.EMYN_MUIL],
               encounterSetKey: EncounterSet.THE_HILLS_OF_EMYN_MUIL,
               gameModeMap: GameMode.createMap(0, 2),
               key: "theEastWallOfRohan",
            },
            "theEavesOfMirkwood":
            {
               name: "The Eaves of Mirkwood",
               threat: 2,
               questPoints: 2,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeMap: GameMode.createMap(3),
               gameText: [
                  {
                     text: "While The Eaves of Mirkwood is the active location, encounter card effects cannot be canceled.",
                  }],
               key: "theEavesOfMirkwood",
            },
            "theHeartOfTheMarshes":
            {
               name: "The Heart of the Marshes",
               threat: 3,
               questPoints: 4,
               escape: 1,
               traitKeys: [Trait.DEAD_MARSHES],
               encounterSetKey: EncounterSet.THE_DEAD_MARSHES,
               gameModeMap: GameMode.createMap(2, 2),
               key: "theHeartOfTheMarshes",
            },
            "theHighlands":
            {
               name: "The Highlands",
               threat: 1,
               questPoints: 1,
               victory: 1,
               traitKeys: [Trait.EMYN_MUIL],
               encounterSetKey: EncounterSet.THE_HILLS_OF_EMYN_MUIL,
               gameModeMap: GameMode.createMap(4),
               key: "theHighlands",
            },
            "theNorthStair":
            {
               name: "The North Stair",
               threat: 3,
               questPoints: 3,
               victory: 3,
               traitKeys: [Trait.EMYN_MUIL],
               encounterSetKey: EncounterSet.THE_HILLS_OF_EMYN_MUIL,
               gameModeMap: GameMode.createMap(2),
               key: "theNorthStair",
            },
            "theOldFord":
            {
               name: "The Old Ford",
               threat: undefined,
               questPoints: 2,
               traitKeys: [Trait.RIVERLAND],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeMap: GameMode.createMap(0, 2),
               gameText: [
                  {
                     text: "X is the number of ally cards in play."
                  },
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "Discard from play all allies with a printed cost lower than the number of Riverland locations in play.",
                  }],
               key: "theOldFord",
            },
            "theOuterRidge":
            {
               name: "The Outer Ridge",
               threat: 2,
               questPoints: 2,
               victory: 2,
               traitKeys: [Trait.EMYN_MUIL],
               encounterSetKey: EncounterSet.THE_HILLS_OF_EMYN_MUIL,
               gameModeMap: GameMode.createMap(3),
               key: "theOuterRidge",
            },
            "theShoresOfNenHithoel":
            {
               name: "The Shores of Nen Hithoel",
               threat: 2,
               questPoints: 2,
               victory: 2,
               traitKeys: [Trait.EMYN_MUIL],
               encounterSetKey: EncounterSet.THE_HILLS_OF_EMYN_MUIL,
               gameModeMap: GameMode.createMap(3),
               key: "theShoresOfNenHithoel",
            },
            "theSpidersRing":
            {
               name: "The Spiders' Ring",
               threat: 3,
               questPoints: 2,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.RETURN_TO_MIRKWOOD,
               gameModeMap: GameMode.createMap(2, 2),
               key: "theSpidersRing",
            },
            "theWestBank":
            {
               name: "The West Bank",
               threat: 3,
               questPoints: 3,
               traitKeys: [Trait.RIVERLAND],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeMap: GameMode.createMap(2),
               gameText: [
                  {
                     text: "While The West Bank is the active location, attachment and event cards cost 1 additional matching resource to play from hand.",
                  },
                  {
                     headerKey: GameHeader.SHADOW,
                     text: "If you do not control at least 1 hero with a Clue card attached, double this enemy's base Attack for this attack.",
                  }],
               key: "theWestBank",
            },
            "towerGate":
            {
               name: "Tower Gate",
               threat: 2,
               questPoints: 1,
               traitKeys: [Trait.DUNGEON],
               encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
               gameModeMap: GameMode.createMap(2),
               key: "towerGate",
            },
            "woodElfPath":
            {
               name: "Wood Elf Path",
               threat: 1,
               questPoints: 3,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.RETURN_TO_MIRKWOOD,
               gameModeMap: GameMode.createMap(3),
               key: "woodElfPath",
            },
            "woodmansGlade":
            {
               name: "Woodman's Glade",
               threat: 2,
               questPoints: 2,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.RETURN_TO_MIRKWOOD,
               gameModeMap: GameMode.createMap(3),
               key: "woodmansGlade",
            },
         },
      };

      LocationCard.keys = function()
      {
         return Object.keys(LocationCard.properties);
      };

      LocationCard.values = function()
      {
         return Object.values(LocationCard.properties);
      };

      LocationCard.keys().forEach(function(cardKey)
      {
         var card = LocationCard.properties[cardKey];
         card.cardTypeKey = CardType.LOCATION;
         card.cardType = CardType.properties[card.cardTypeKey];
         card.encounterSet = EncounterSet.properties[card.encounterSetKey];
         card.gameMode = GameMode.properties[card.gameModeKey];
         card.lotrType = LocationCard;

         var imagePath = card.name;
         imagePath = imagePath.replace(/ /g, "-");

         card.imagePath = imagePath;
      });

      LocationCard.keysByEncounterSet = function(encounterSetKey)
      {
         InputValidator.validateNotNull("encounterSetKey", encounterSetKey);

         var keys = LocationCard.keys();

         return keys.filter(function(cardKey)
         {
            var card = LocationCard.properties[cardKey];

            return card.encounterSetKey === encounterSetKey;
         });
      };

      LocationCard.keysByScenario = function(scenarioKey)
      {
         InputValidator.validateNotNull("scenarioKey", scenarioKey);

         var scenario = Scenario.properties[scenarioKey];
         var encounterSetKeys = scenario.encounterSetKeys;
         var keys = LocationCard.keys();

         return keys.filter(function(cardKey)
         {
            var card = LocationCard.properties[cardKey];

            return encounterSetKeys.includes(card.encounterSetKey);
         });
      };

      LocationCard.toString = function()
      {
         return "LocationCard";
      };

      if (Object.freeze)
      {
         Object.freeze(LocationCard);
      }

      return LocationCard;
   });
