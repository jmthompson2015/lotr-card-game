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
         THFG1A_THE_HUNT_BEGINS: "thfg1aTheHuntBegins",
         THFG1B_THE_HUNT_BEGINS: "thfg1bTheHuntBegins",
         THFG2A_A_NEW_TERROR_ABROAD: "thfg2aANewTerrorAbroad",
         THFG2B_A_NEW_TERROR_ABROAD: "thfg2bANewTerrorAbroad",
         THFG3A_ON_THE_TRAIL: "thfg3aOnTheTrail",
         THFG3B_ON_THE_TRAIL: "thfg3bOnTheTrail",

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
            "thfg1aTheHuntBegins":
            {
               name: "The Hunt Begins",
               scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
               sequence: "1A",
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               key: "thfg1aTheHuntBegins",
            },
            "thfg1bTheHuntBegins":
            {
               name: "The Hunt Begins",
               scenarioKey: Scenario.THE_HUNT_FOR_GOLLUM,
               sequence: "1B",
               questPoints: 8,
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
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
               key: "thfg3bOnTheTrail",
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
