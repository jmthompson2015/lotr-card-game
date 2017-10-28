/*
 * see http://hallofbeorn.com/LotR/Scenarios/
 * see http://ringsdb.com/search
 */
"use strict";

define(["artifact/js/CardSetType"], function(CardSetType)
{
   var CardSet = {
      AGAINST_THE_SHADOW: "againstTheShadow",
      ANGMAR_AWAKENED: "angmarAwakened",
      CORE: "core",
      DREAM_CHASER: "dreamChaser",
      DWARROWDELF: "dwarrowdelf",
      HARADRIM: "haradrim",
      HEIRS_OF_NUMENOR: "heirsOfNumenor",
      KHAZAD_DUM: "khazadDum",
      ON_THE_DOORSTEP: "onTheDoorstep",
      OVER_HILL_AND_UNDER_HILL: "overHillAndUnderHill",
      SHADOWS_OF_MIRKWOOD: "shadowsOfMirkwood",
      THE_BLACK_RIDERS: "theBlackRiders",
      THE_FLAME_OF_THE_WEST: "theFlameOfTheWest",
      THE_GREY_HAVENS: "theGreyHavens",
      THE_LAND_OF_SHADOW: "theLandOfShadow",
      THE_LOST_REALM: "theLostRealm",
      THE_MOUNTAIN_OF_FIRE: "theMountainOfFire",
      THE_RING_MAKER: "theRingMaker",
      THE_ROAD_DARKENS: "theRoadDarkens",
      THE_SANDS_OF_HARAD: "theSandsOfHarad",
      THE_TREASON_OF_SARUMAN: "theTreasonOfSaruman",
      THE_VOICE_OF_ISENGARD: "theVoiceOfIsengard",

      properties:
      {
         "againstTheShadow":
         {
            name: "Against the Shadow",
            number: 6,
            typeKey: CardSetType.CYCLE,
            key: "againstTheShadow",
         },
         "angmarAwakened":
         {
            name: "Angmar Awakened",
            number: 10,
            typeKey: CardSetType.CYCLE,
            key: "angmarAwakened",
         },
         "core":
         {
            name: "Core Set",
            number: 1,
            typeKey: CardSetType.CORE,
            key: "core",
         },
         "dreamChaser":
         {
            name: "Dream-chaser",
            number: 12,
            typeKey: CardSetType.CYCLE,
            key: "dreamChaser",
         },
         "dwarrowdelf":
         {
            name: "Dwarrowdelf",
            number: 4,
            typeKey: CardSetType.CYCLE,
            key: "dwarrowdelf",
         },
         "haradrim":
         {
            name: "Haradrim",
            number: 14,
            typeKey: CardSetType.CYCLE,
            key: "haradrim",
         },
         "heirsOfNumenor":
         {
            name: "Heirs of Númenor",
            number: 5,
            shortName: "HoN",
            typeKey: CardSetType.DELUXE,
            key: "heirsOfNumenor",
         },
         "khazadDum":
         {
            name: "Khazad-Dûm",
            number: 3,
            shortName: "KD",
            typeKey: CardSetType.DELUXE,
            key: "khazadDum",
         },
         "onTheDoorstep":
         {
            name: "On the Doorstep",
            number: 102,
            shortName: "OtD",
            typeKey: CardSetType.SAGA,
            key: "onTheDoorstep",
         },
         "overHillAndUnderHill":
         {
            name: "Over Hill and Under Hill",
            number: 101,
            shortName: "OHaUH",
            typeKey: CardSetType.SAGA,
            key: "overHillAndUnderHill",
         },
         "shadowsOfMirkwood":
         {
            name: "Shadows of Mirkwood",
            number: 2,
            shortName: "SoM",
            typeKey: CardSetType.CYCLE,
            key: "shadowsOfMirkwood",
         },
         "theBlackRiders":
         {
            name: "The Black Riders",
            number: 103,
            shortName: "TBR",
            typeKey: CardSetType.SAGA,
            key: "theBlackRiders",
         },
         "theFlameOfTheWest":
         {
            name: "The Flame of the West",
            number: 107,
            typeKey: CardSetType.SAGA,
            key: "theFlameOfTheWest",
         },
         "theGreyHavens":
         {
            name: "The Grey Havens",
            number: 11,
            shortName: "MEC47",
            typeKey: CardSetType.DELUXE,
            key: "theGreyHavens",
         },
         "theLandOfShadow":
         {
            name: "The Land of Shadow",
            number: 106,
            shortName: "MEC46",
            typeKey: CardSetType.SAGA,
            key: "theLandOfShadow",
         },
         "theLostRealm":
         {
            name: "The Lost Realm",
            number: 9,
            shortName: "MEC38",
            typeKey: CardSetType.DELUXE,
            key: "theLostRealm",
         },
         "theMountainOfFire":
         {
            name: "The Mountain of Fire",
            number: 108,
            typeKey: CardSetType.SAGA,
            key: "theMountainOfFire",
         },
         "theRingMaker":
         {
            name: "The Ring-Maker",
            number: 8,
            typeKey: CardSetType.CYCLE,
            key: "theRingMaker",
         },
         "theRoadDarkens":
         {
            name: "The Road Darkens",
            number: 104,
            shortName: "MEC34",
            typeKey: CardSetType.SAGA,
            key: "theRoadDarkens",
         },
         "theSandsOfHarad":
         {
            name: "The Sands of Harad",
            number: 13,
            typeKey: CardSetType.DELUXE,
            key: "theSandsOfHarad",
         },
         "theTreasonOfSaruman":
         {
            name: "The Treason of Saruman",
            number: 105,
            shortName: "MEC45",
            typeKey: CardSetType.SAGA,
            key: "theTreasonOfSaruman",
         },
         "theVoiceOfIsengard":
         {
            name: "The Voice of Isengard",
            number: 7,
            shortName: "VoI",
            typeKey: CardSetType.DELUXE,
            key: "theVoiceOfIsengard",
         },
      },

      keys: function()
      {
         return Object.getOwnPropertyNames(CardSet.properties);
      },
   };

   CardSet.keys().forEach(function(cardKey)
   {
      var card = CardSet.properties[cardKey];
      card.type = CardSetType.properties[card.typeKey];

      var imagePath;

      switch (cardKey)
      {
         case CardSet.CORE:
            imagePath = "Core-Set/";
            break;
         case CardSet.KHAZAD_DUM:
            imagePath = "Khazad-dum/";
            break;
         case CardSet.ON_THE_DOORSTEP:
            imagePath = "The-Hobbit-On-the-Doorstep/";
            break;
         case CardSet.OVER_HILL_AND_UNDER_HILL:
            imagePath = "The-Hobbit-Over-Hill-and-Under-Hill/";
            break;
         default:
            imagePath = card.name + "/";
            imagePath = imagePath.replace(/ /g, "-");
            imagePath = imagePath.replace(/ú/g, "u");
      }

      card.imagePath = imagePath;
   });

   if (Object.freeze)
   {
      Object.freeze(CardSet);
   }

   return CardSet;
});
