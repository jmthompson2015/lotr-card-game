"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "artifact/js/EncounterSet", "artifact/js/GameHeader", "artifact/js/GameMode", "artifact/js/Trait"],
   function(InputValidator, CardType, EncounterSet, GameHeader, GameMode, Trait)
   {
      var LocationCard = {
         BANKS_OF_THE_ANDUIN: "banksOfTheAnduin",
         ENCHANTED_STREAM: "enchantedStream",
         FOREST_GATE: "forestGate",
         GLADDEN_FIELDS: "gladdenFields",
         GREAT_FOREST_WEB: "greatForestWeb",
         MOUNTAINS_OF_MIRKWOOD: "mountainsOfMirkwood",
         NECROMANCERS_PASS: "necromancersPass",
         OLD_FOREST_ROAD: "oldForestRoad",
         RIVER_NINGLOR: "riverNinglor",
         THE_EAST_BANK: "theEastBank",
         THE_EAVES_OF_MIRKWOOD: "theEavesOfMirkwood",
         THE_OLD_FORD: "theOldFord",
         THE_WEST_BANK: "theWestBank",

         properties:
         {
            "banksOfTheAnduin":
            {
               name: "Banks of the Anduin",
               threat: 1,
               questPoints: 3,
               traitKeys: [Trait.RIVERLAND],
               encounterSetKey: EncounterSet.JOURNEY_DOWN_THE_ANDUIN,
               gameModeKeys: [GameMode.EASY],
               key: "banksOfTheAnduin",
            },
            "enchantedStream":
            {
               name: "Enchanted Stream",
               threat: 2,
               questPoints: 2,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
               gameModeKeys: [GameMode.EASY, GameMode.EASY],
               gameText: [
                  {
                     text: "While Enchanted Stream is the active location, players cannot draw cards.",
                  }],
               key: "enchantedStream",
            },
            "forestGate":
            {
               name: "Forest Gate",
               threat: 2,
               questPoints: 4,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               gameModeKeys: [GameMode.EASY, GameMode.EASY],
               gameText: [
                  {
                     headerKey: GameHeader.RESPONSE,
                     text: "After you travel to Forest Gate, the first player may draw 2 cards.",
                  }],
               key: "forestGate",
            },
            "gladdenFields":
            {
               name: "Gladden Fields",
               threat: 3,
               questPoints: 3,
               traitKeys: [Trait.MARSHLAND],
               encounterSetKey: EncounterSet.JOURNEY_DOWN_THE_ANDUIN,
               gameModeKeys: [GameMode.EASY],
               key: "gladdenFields",
            },
            "greatForestWeb":
            {
               name: "Great Forest Web",
               threat: 2,
               questPoints: 2,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
               gameModeKeys: [GameMode.EASY, GameMode.EASY],
               gameText: [
                  {
                     headerKey: GameHeader.TRAVEL,
                     text: "Each player must exhaust 1 hero he controls to travel here.",
                  }],
               key: "greatForestWeb",
            },
            "mountainsOfMirkwood":
            {
               name: "Mountains of Mirkwood",
               threat: 2,
               questPoints: 3,
               traitKeys: [Trait.FOREST, Trait.MOUNTAIN],
               encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
               gameModeKeys: [GameMode.EASY, GameMode.EASY, GameMode.EASY],
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
               gameModeKeys: [GameMode.EASY, GameMode.STANDARD],
               gameText: [
                  {
                     headerKey: GameHeader.TRAVEL,
                     text: "The first player must discard 2 cards from his hand at random to travel here.",
                  }],
               key: "necromancersPass",
            },
            "oldForestRoad":
            {
               name: "Old Forest Road",
               threat: 1,
               questPoints: 3,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               gameModeKeys: [GameMode.EASY, GameMode.EASY],
               gameText: [
                  {
                     headerKey: GameHeader.RESPONSE,
                     text: "After you travel to Old Forest Road, the first player may choose and ready 1 character he controls.",
                  }],
               key: "oldForestRoad",
            },
            "riverNinglor":
            {
               name: "River Ninglor",
               threat: 2,
               questPoints: 4,
               traitKeys: [Trait.RIVERLAND],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeKeys: [GameMode.EASY],
               key: "riverNinglor",
            },
            "theEastBank":
            {
               name: "The East Bank",
               threat: 3,
               questPoints: 3,
               traitKeys: [Trait.RIVERLAND],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeKeys: [GameMode.EASY],
               key: "theEastBank",
            },
            "theEavesOfMirkwood":
            {
               name: "The Eaves of Mirkwood",
               threat: 2,
               questPoints: 2,
               traitKeys: [Trait.FOREST],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeKeys: [GameMode.EASY],
               key: "theEavesOfMirkwood",
            },
            "theOldFord":
            {
               name: "The Old Ford",
               threat: undefined,
               questPoints: 2,
               traitKeys: [Trait.RIVERLAND],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeKeys: [GameMode.STANDARD],
               key: "theOldFord",
            },
            "theWestBank":
            {
               name: "The West Bank",
               threat: 3,
               questPoints: 3,
               traitKeys: [Trait.RIVERLAND],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameModeKeys: [GameMode.EASY],
               key: "theWestBank",
            },
         },

         keys: function()
         {
            return Object.getOwnPropertyNames(LocationCard.properties);
         },

         keysByEncounterSet: function(encounterSetKey)
         {
            InputValidator.validateNotNull("encounterSetKey", encounterSetKey);

            var keys = LocationCard.keys();

            return keys.filter(function(cardKey)
            {
               var card = LocationCard.properties[cardKey];

               return card.encounterSetKey === encounterSetKey;
            });
         },
      };

      LocationCard.keys().forEach(function(cardKey)
      {
         var card = LocationCard.properties[cardKey];
         card.cardTypeKey = CardType.LOCATION;
         card.cardType = CardType.properties[card.cardTypeKey];
         card.encounterSet = EncounterSet.properties[card.encounterSetKey];
         card.gameMode = GameMode.properties[card.gameModeKey];

         var imagePath = card.name;
         imagePath = imagePath.replace(/ /g, "-");

         card.imagePath = imagePath;
      });

      if (Object.freeze)
      {
         Object.freeze(LocationCard);
      }

      return LocationCard;
   });
