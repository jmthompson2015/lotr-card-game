"use strict";

define(["artifact/js/CardSetType"], function(CardSetType)
{
   var CardSet = {
      AGAINST_THE_SHADOW: "againstTheShadow",
      ANGMAR_AWAKENED: "angmarAwakened",
      CORE: "core",
      DWARROWDELF: "dwarrowdelf",
      HEIRS_OF_NUMENOR: "heirsOfNumenor",
      KHAZAD_DUM: "khazadDum",
      ON_THE_DOORSTEP: "onTheDoorstep",
      OVER_HILL_AND_UNDER_HILL: "overHillAndUnderHill",
      SHADOWS_OF_MIRKWOOD: "shadowsOfMirkwood",
      THE_BLACK_RIDERS: "theBlackRiders",
      THE_GREY_HAVENS: "theGreyHavens",
      THE_LAND_OF_SHADOW: "theLandOfShadow",
      THE_LOST_REALM: "theLostRealm",
      THE_RING_MAKER: "theRingMaker",
      THE_ROAD_DARKENS: "theRoadDarkens",
      THE_TREASON_OF_SARUMAN: "theTreasonOfSaruman",
      THE_VOICE_OF_ISENGARD: "theVoiceOfIsengard",

      properties:
      {
         "againstTheShadow":
         {
            name: "Against the Shadow",
            typeKey: CardSetType.CYCLE,
            key: "againstTheShadow",
         },
         "angmarAwakened":
         {
            name: "Angmar Awakened",
            typeKey: CardSetType.CYCLE,
            key: "angmarAwakened",
         },
         "core":
         {
            name: "Core",
            typeKey: CardSetType.CORE,
            key: "core",
         },
         "dwarrowdelf":
         {
            name: "Dwarrowdelf",
            typeKey: CardSetType.CYCLE,
            key: "dwarrowdelf",
         },
         "heirsOfNumenor":
         {
            name: "Heirs of Númenor",
            shortName: "HoN",
            typeKey: CardSetType.DELUXE,
            key: "heirsOfNumenor",
         },
         "khazadDum":
         {
            name: "Khazad-Dûm",
            shortName: "KD",
            typeKey: CardSetType.DELUXE,
            key: "khazadDum",
         },
         "onTheDoorstep":
         {
            name: "On the Doorstep",
            shortName: "OtD",
            typeKey: CardSetType.SAGA,
            key: "onTheDoorstep",
         },
         "overHillAndUnderHill":
         {
            name: "Over Hill and Under Hill",
            shortName: "OHaUH",
            typeKey: CardSetType.SAGA,
            key: "overHillAndUnderHill",
         },
         "shadowsOfMirkwood":
         {
            name: "Shadows of Mirkwood",
            shortName: "SoM",
            typeKey: CardSetType.CYCLE,
            key: "shadowsOfMirkwood",
         },
         "theBlackRiders":
         {
            name: "The Black Riders",
            shortName: "TBR",
            typeKey: CardSetType.SAGA,
            key: "theBlackRiders",
         },
         "theGreyHavens":
         {
            name: "The Grey Havens",
            shortName: "MEC47",
            typeKey: CardSetType.DELUXE,
            key: "theGreyHavens",
         },
         "theLandOfShadow":
         {
            name: "The Land of Shadow",
            shortName: "MEC46",
            typeKey: CardSetType.SAGA,
            key: "theLandOfShadow",
         },
         "theLostRealm":
         {
            name: "The Lost Realm",
            shortName: "MEC38",
            typeKey: CardSetType.DELUXE,
            key: "theLostRealm",
         },
         "theRingMaker":
         {
            name: "The Ring-Maker",
            typeKey: CardSetType.CYCLE,
            key: "theRingMaker",
         },
         "theRoadDarkens":
         {
            name: "The Road Darkens",
            shortName: "MEC34",
            typeKey: CardSetType.SAGA,
            key: "theRoadDarkens",
         },
         "theTreasonOfSaruman":
         {
            name: "The Treason of Saruman",
            shortName: "MEC45",
            typeKey: CardSetType.SAGA,
            key: "theTreasonOfSaruman",
         },
         "theVoiceOfIsengard":
         {
            name: "The Voice of Isengard",
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
