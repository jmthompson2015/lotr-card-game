"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "artifact/js/EncounterSet", "artifact/js/GameHeader", "artifact/js/Scenario"],
   function(InputValidator, CardType, EncounterSet, GameHeader, Scenario)
   {
      var QuestCard = {
         PTM1A_FLIES_AND_SPIDERS: "ptm1aFliesAndSpiders",
         PTM1B_FLIES_AND_SPIDERS: "ptm1bFliesAndSpiders",
         PTM2A_A_FORK_IN_THE_ROAD: "ptm2aAForkInTheRoad",
         PTM2B_A_FORK_IN_THE_ROAD: "ptm2bAForkInTheRoad",
         PTM3A_A_CHOSEN_PATH: "ptm3aAChosenPath",
         PTM3B1_BEORNS_PATH: "ptm3b1BeornsPath",
         PTM3B2_DONT_LEAVE_THE_PATH: "ptm3b2DontLeaveThePath",

         JATA1A_TO_THE_RIVER: "jata1aToTheRiver",
         JATA1B_TO_THE_RIVER: "jata1bToTheRiver",
         JATA2A_ANDUIN_PASSAGE: "jata2aAnduinPassage",
         JATA2B_ANDUIN_PASSAGE: "jata2bAnduinPassage",
         JATA3A_AMBUSH_ON_THE_SHORE: "jata3AAmbushOnTheShore",
         JATA3B_AMBUSH_ON_THE_SHORE: "jata3BAmbushOnTheShore",

         EFDG1A_THE_NECROMANCERS_TOWER: "efdg1aTheNecromancersTower",
         EFDG1B_THE_NECROMANCERS_TOWER: "efdg1bTheNecromancersTower",
         EFDG2A_THROUGH_THE_CAVERNS: "efdg2aThroughTheCaverns",
         EFDG2B_THROUGH_THE_CAVERNS: "efdg2bThroughTheCaverns",
         EFDG3A_OUT_OF_THE_DUNGEONS: "efdg3aOutOfTheDungeons",
         EFDG3B_OUT_OF_THE_DUNGEONS: "efdg3bOutOfTheDungeons",

         THFG1A_THE_HUNT_BEGINS: "thfg1aTheHuntBegins",
         THFG1B_THE_HUNT_BEGINS: "thfg1bTheHuntBegins",
         THFG2A_A_NEW_TERROR_ABROAD: "thfg2aANewTerrorAbroad",
         THFG2B_A_NEW_TERROR_ABROAD: "thfg2bANewTerrorAbroad",
         THFG3A_ON_THE_TRAIL: "thfg3aOnTheTrail",
         THFG3B_ON_THE_TRAIL: "thfg3bOnTheTrail",

         CATC1A_GRIMBEORNS_QUEST: "catc1aGrimbeornsQuest",
         CATC1B_GRIMBEORNS_QUEST: "catc1bGrimbeornsQuest",
         CATC2A_AGAINST_THE_TROLLS: "catc2aAgainstTheTrolls",
         CATC2B_AGAINST_THE_TROLLS: "catc2bAgainstTheTrolls",

         AJTR1A_THE_WOUNDED_EAGLE: "ajtr1aTheWoundedEagle",
         AJTR1B_THE_WOUNDED_EAGLE: "ajtr1bTheWoundedEagle",
         AJTR2A_RADAGASTS_REQUEST: "ajtr2aRadagastsRequest",
         AJTR2B_RADAGASTS_REQUEST: "ajtr2bRadagastsRequest",
         AJTR3A_RETURN_TO_RHOSGOBEL: "ajtr3aReturnToRhosgobel",
         AJTR3B_RETURN_TO_RHOSGOBEL: "ajtr3bReturnToRhosgobel",

         properties:
         {
            "ptm1aFliesAndSpiders":
            {
               name: "Flies and Spiders",
               scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
               sequence: "1A",
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               gameText: [
                  {
                     headerKey: GameHeader.SETUP,
                     text: "Search the encounter deck for 1 copy of the Forest Spider and 1 copy of the Old Forest Road, and add them to the staging area. Then, shuffle the encounter deck.",
                  }],
               key: "ptm1aFliesAndSpiders",
            },
            "ptm1bFliesAndSpiders":
            {
               name: "Flies and Spiders",
               scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
               sequence: "1B",
               questPoints: 8,
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               key: "ptm1bFliesAndSpiders",
            },
            "ptm2aAForkInTheRoad":
            {
               name: "A Fork in the Road",
               scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
               sequence: "2A",
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               key: "ptm2aAForkInTheRoad",
            },
            "ptm2bAForkInTheRoad":
            {
               name: "A Fork in the Road",
               scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
               sequence: "2B",
               questPoints: 2,
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               gameText: [
                  {
                     headerKey: GameHeader.FORCED,
                     text: "When you defeat this state, proceed to one of the 2 \"A Chosen Path\" stages, at random.",
                  }],
               key: "ptm2bAForkInTheRoad",
            },
            "ptm3aAChosenPath":
            {
               name: "A Chosen Path",
               scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
               sequence: "3A",
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               key: "ptm3aAChosenPath",
            },
            "ptm3b1BeornsPath":
            {
               name: "Beorn's Path",
               scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
               sequence: "3B",
               questPoints: 10,
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               gameText: [
                  {
                     text: "Players cannot defeat this stage while Ungoliant's Spawn is in play. If players defeat this stage, they have won the game.",
                  }],
               key: "ptm3b1BeornsPath",
            },
            "ptm3b2DontLeaveThePath":
            {
               name: "Don't Leave the Path!",
               scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
               sequence: "3B",
               questPoints: 0,
               encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
               gameText: [
                  {
                     headerKey: GameHeader.WHEN_REVEALED,
                     text: "Each player must search the encounter deck and discard pile for 1 Spider card of his choice, and add it to the staging area.",
                  },
                  {
                     text: "The players must find and defeat Ungoliant's Spawn to win this game.",
                  }],
               key: "ptm3b2DontLeaveThePath",
            },

            ////////////////////////////////////////////////////////////////////

            "jata1aToTheRiver":
            {
               name: "To the River",
               scenarioKey: Scenario.JOURNEY_ALONG_THE_ANDUIN,
               sequence: "1A",
               questPoints: 0,
               encounterSetKey: EncounterSet.JOURNEY_ALONG_THE_ANDUIN,
               key: "jata1aToTheRiver",
            },
            "jata1bToTheRiver":
            {
               name: "To the River",
               scenarioKey: Scenario.JOURNEY_ALONG_THE_ANDUIN,
               sequence: "1B",
               questPoints: 8,
               encounterSetKey: EncounterSet.JOURNEY_ALONG_THE_ANDUIN,
               key: "jata1bToTheRiver",
            },
            "jata2aAnduinPassage":
            {
               name: "Anduin Passage",
               scenarioKey: Scenario.JOURNEY_ALONG_THE_ANDUIN,
               sequence: "2A",
               questPoints: 0,
               encounterSetKey: EncounterSet.JOURNEY_ALONG_THE_ANDUIN,
               key: "jata2aAnduinPassage",
            },
            "jata2bAnduinPassage":
            {
               name: "Anduin Passage",
               scenarioKey: Scenario.JOURNEY_ALONG_THE_ANDUIN,
               sequence: "2B",
               questPoints: 16,
               encounterSetKey: EncounterSet.JOURNEY_ALONG_THE_ANDUIN,
               key: "jata2bAnduinPassage",
            },
            "jata3AAmbushOnTheShore":
            {
               name: "Ambush on the Shore",
               scenarioKey: Scenario.JOURNEY_ALONG_THE_ANDUIN,
               sequence: "3A",
               questPoints: 0,
               encounterSetKey: EncounterSet.JOURNEY_ALONG_THE_ANDUIN,
               key: "jata3AAmbushOnTheShore",
            },
            "jata3BAmbushOnTheShore":
            {
               name: "Ambush on the Shore",
               scenarioKey: Scenario.JOURNEY_ALONG_THE_ANDUIN,
               sequence: "3B",
               questPoints: 0,
               encounterSetKey: EncounterSet.JOURNEY_ALONG_THE_ANDUIN,
               key: "jata3BAmbushOnTheShore",
            },

            ////////////////////////////////////////////////////////////////////

            "efdg1aTheNecromancersTower":
            {
               name: "The Necromancer's Tower",
               scenarioKey: Scenario.ESCAPE_FROM_DOL_GULDUR,
               sequence: "1A",
               encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
               key: "efdg1aTheNecromancersTower",
            },

            "efdg1bTheNecromancersTower":
            {
               name: "The Necromancer's Tower",
               scenarioKey: Scenario.ESCAPE_FROM_DOL_GULDUR,
               sequence: "1B",
               encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
               key: "efdg1bTheNecromancersTower",
            },

            "efdg2aThroughTheCaverns":
            {
               name: "Through the Caverns",
               scenarioKey: Scenario.ESCAPE_FROM_DOL_GULDUR,
               sequence: "2A",
               encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
               key: "efdg2aThroughTheCaverns",
            },

            "efdg2bThroughTheCaverns":
            {
               name: "Through the Caverns",
               scenarioKey: Scenario.ESCAPE_FROM_DOL_GULDUR,
               sequence: "2B",
               encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
               key: "efdg2bThroughTheCaverns",
            },

            "efdg3aOutOfTheDungeons":
            {
               name: "Out of the Dungeons",
               scenarioKey: Scenario.ESCAPE_FROM_DOL_GULDUR,
               sequence: "3A",
               encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
               key: "efdg3aOutOfTheDungeons",
            },

            "efdg3bOutOfTheDungeons":
            {
               name: "Out of the Dungeons",
               scenarioKey: Scenario.ESCAPE_FROM_DOL_GULDUR,
               sequence: "3B",
               encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
               key: "efdg3bOutOfTheDungeons",
            },

            ////////////////////////////////////////////////////////////////////

            "thfg1aTheHuntBegins":
            {
               name: "The Hunt Begins",
               scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
               sequence: "1A",
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameText: [
                  {
                     headerKey: GameHeader.SETUP,
                     text: "Reveal 1 card per player from the encounter deck, and add it to the staging area.",
                  }],
               key: "thfg1aTheHuntBegins",
            },
            "thfg1bTheHuntBegins":
            {
               name: "The Hunt Begins",
               scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
               sequence: "1B",
               questPoints: 8,
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameText: [
                  {
                     headerKey: GameHeader.FORCED,
                     text: "After the players quest successfully, the first player looks at the top 3 cards of the encounter deck. Reveal and add 1 of those cards to the staging area, and discard the other 2 cards.",
                  }],
               key: "thfg1bTheHuntBegins",
            },
            "thfg2aANewTerrorAbroad":
            {
               name: "A New Terror Abroad",
               scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
               sequence: "2A",
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               key: "thfg2aANewTerrorAbroad",
            },
            "thfg2bANewTerrorAbroad":
            {
               name: "A New Terror Abroad",
               scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
               sequence: "2B",
               questPoints: 10,
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameText: [
                  {
                     headerKey: GameHeader.FORCED,
                     text: "At the beginning of the quest phase, the first player looks at the top 2 cards of the encounter deck. Reveal and add 1 of those cards to the staging area, and discard the other.",
                  }],
               key: "thfg2bANewTerrorAbroad",
            },
            "thfg3aOnTheTrail":
            {
               name: "On the Trail",
               scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
               sequence: "3A",
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               key: "thfg3aOnTheTrail",
            },
            "thfg3bOnTheTrail":
            {
               name: "On the Trail",
               scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
               sequence: "3B",
               questPoints: 8,
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               gameText: [
                  {
                     text: "Any player who does not control a hero with at least 1 Clue objective attached cannot commit characters to this quest. If there are ever no heroes with Clue objectives attached in play, reset the quest deck to stage 2B. If the players defeat this stage, the players have once again found a true sign of Gollum's passing, and won the game.",
                  }],
               key: "thfg3bOnTheTrail",
            },

            ////////////////////////////////////////////////////////////////////

            "catc1aGrimbeornsQuest":
            {
               name: "Grimbeorn's Quest",
               scenarioKey: Scenario.CONFLICT_AT_THE_CARROCK,
               sequence: "1A",
               encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
               key: "catc1aGrimbeornsQuest",
            },

            "catc1bGrimbeornsQuest":
            {
               name: "Grimbeorn's Quest",
               scenarioKey: Scenario.CONFLICT_AT_THE_CARROCK,
               sequence: "1B",
               encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
               key: "catc1bGrimbeornsQuest",
            },

            "catc2aAgainstTheTrolls":
            {
               name: "Against the Trolls",
               scenarioKey: Scenario.CONFLICT_AT_THE_CARROCK,
               sequence: "2A",
               encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
               key: "catc2aAgainstTheTrolls",
            },

            "catc2bAgainstTheTrolls":
            {
               name: "Against the Trolls",
               scenarioKey: Scenario.CONFLICT_AT_THE_CARROCK,
               sequence: "2B",
               encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
               key: "catc2bAgainstTheTrolls",
            },

            ////////////////////////////////////////////////////////////////////

            "ajtr1aTheWoundedEagle":
            {
               name: "The Wounded Eagle",
               scenarioKey: Scenario.A_JOURNEY_TO_RHOSGOBEL,
               sequence: "1A",
               encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
               key: "ajtr1aTheWoundedEagle",
            },

            "ajtr1bTheWoundedEagle":
            {
               name: "The Wounded Eagle",
               scenarioKey: Scenario.A_JOURNEY_TO_RHOSGOBEL,
               sequence: "1B",
               encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
               key: "ajtr1bTheWoundedEagle",
            },

            "ajtr2aRadagastsRequest":
            {
               name: "Radagast's Request",
               scenarioKey: Scenario.A_JOURNEY_TO_RHOSGOBEL,
               sequence: "2A",
               encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
               key: "ajtr2aRadagastsRequest",
            },

            "ajtr2bRadagastsRequest":
            {
               name: "Radagast's Request",
               scenarioKey: Scenario.A_JOURNEY_TO_RHOSGOBEL,
               sequence: "2B",
               encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
               key: "ajtr2bRadagastsRequest",
            },

            "ajtr3aReturnToRhosgobel":
            {
               name: "Return to Rhosgobel",
               scenarioKey: Scenario.A_JOURNEY_TO_RHOSGOBEL,
               sequence: "3A",
               encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
               key: "ajtr3aReturnToRhosgobel",
            },

            "ajtr3bReturnToRhosgobel":
            {
               name: "Return to Rhosgobel",
               scenarioKey: Scenario.A_JOURNEY_TO_RHOSGOBEL,
               sequence: "3B",
               encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
               key: "ajtr3bReturnToRhosgobel",
            },
         },

         keys: function()
         {
            return Object.getOwnPropertyNames(QuestCard.properties);
         },

         keysByEncounterSet: function(encounterSetKey)
         {
            InputValidator.validateNotNull("encounterSetKey", encounterSetKey);

            var keys = QuestCard.keys();

            return keys.filter(function(cardKey)
            {
               var card = QuestCard.properties[cardKey];

               return card.encounterSetKey === encounterSetKey;
            });
         },

         keysByScenario: function(scenarioKey)
         {
            InputValidator.validateNotNull("scenarioKey", scenarioKey);

            var keys = QuestCard.keys();

            return keys.filter(function(cardKey)
            {
               var card = QuestCard.properties[cardKey];

               return card.scenarioKey === scenarioKey;
            });
         },
      };

      QuestCard.keys().forEach(function(cardKey)
      {
         var card = QuestCard.properties[cardKey];
         card.cardTypeKey = CardType.QUEST;
         card.cardType = CardType.properties[card.cardTypeKey];
         card.encounterSet = EncounterSet.properties[card.encounterSetKey];

         var imagePath = card.name + "-" + card.sequence;
         imagePath = imagePath.replace(/ /g, "-");

         switch (cardKey)
         {
            case QuestCard.PTM3A_A_CHOSEN_PATH:
               imagePath = "A-Chosen-Path-Don't-Leave-the-Path-3A";
               break;
            case QuestCard.PTM3B1_BEORNS_PATH:
               imagePath = "A-Chosen-Path-Beorn's-Path-3B";
               break;
            case QuestCard.PTM3B2_DONT_LEAVE_THE_PATH:
               imagePath = "A-Chosen-Path-Don't-Leave-the-Path-3B";
               break;
         }

         card.imagePath = imagePath;
      });

      if (Object.freeze)
      {
         Object.freeze(QuestCard);
      }

      return QuestCard;
   });
