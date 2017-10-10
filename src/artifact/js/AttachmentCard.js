"use strict";

define(["artifact/js/CardSet", "artifact/js/CardSubset", "artifact/js/CardType", "artifact/js/ImageNameCreator", "artifact/js/Sphere", "artifact/js/Trait"],
   function(CardSet, CardSubset, CardType, ImageNameCreator, Sphere, Trait)
   {
      var AttachmentCard = {
         A_BURNING_BRAND: "aBurningBrand",
         AMBUSH: "ambush",
         ANCIENT_MATHOM: "ancientMathom",
         AROD: "arod",
         ASFALOTH: "asfaloth",
         ATHELAS: "athelas",
         BLACK_ARROW: "blackArrow",
         BLADE_OF_GONDOLIN: "bladeOfGondolin",
         BLOOD_OF_NUMENOR: "bloodOfNumenor",
         BOOK_OF_ELDACAR: "bookOfEldacar",
         BOOTS_FROM_EREBOR: "bootsFromErebor",
         BORN_ALOFT: "bornAloft",
         BOW_OF_THE_GALADHRIM: "bowOfTheGaladhrim",
         CAPTAIN_OF_GONDOR: "captainOfGondor",
         CELEBRIANS_STONE: "celebriansStone",
         CITADEL_PLATE: "citadelPlate",
         CLOAK_OF_LORIEN: "cloakOfLorien",
         CRAM: "cram",
         DAGGER_OF_WESTERNESSE: "daggerOfWesternesse",
         DARK_KNOWLEDGE: "darkKnowledge",
         DEFENDER_OF_THE_WEST: "defenderOfTheWest",
         DUNEDAIN_CACHE: "dunedainCache",
         DUNEDAIN_MARK: "dunedainMark",
         DUNEDAIN_QUEST: "dunedainQuest",
         DUNEDAIN_SIGNAL: "dunedainSignal",
         DUNEDAIN_WARNING: "dunedainWarning",
         DWARROWDELF_AXE: "dwarrowdelfAxe",
         DWARVEN_AXE: "dwarvenAxe",
         ELF_FRIEND: "elfFriend",
         ELF_STONE: "elfStone",
         ELVEN_MAIL: "elvenMail",
         ELVEN_SPEAR: "elvenSpear",
         ENT_DRAUGHT: "entDraught",
         EVER_MY_HEART_RISES: "everMyHeartRises",
         EXPERT_TREASURE_HUNTER: "expertTreasureHunter",
         EXPLORERS_ALMANAC: "explorersAlmanac",
         FAST_HITCH: "fastHitch",
         FAVOR_OF_THE_VALAR: "favorOfTheValar",
         FIREFOOT: "firefoot",
         FOREST_SNARE: "forestSnare",
         GANDALFS_STAFF: "gandalfsStaff",
         GONDORIAN_FIRE: "gondorianFire",
         GONDORIAN_SHIELD: "gondorianShield",
         GOOD_MEAL: "goodMeal",
         GRAPPLING_HOOK: "grapplingHook",
         GREAT_YEW_BOW: "greatYewBow",
         HARDY_LEADERSHIP: "hardyLeadership",
         HEALING_HERBS: "healingHerbs",
         HEIR_OF_MARDIL: "heirOfMardil",
         HEIR_OF_VALANDIL: "heirOfValandil",
         HERUGRIM: "herugrim",
         HOBBIT_CLOAK: "hobbitCloak",
         HOBBIT_PIPE: "hobbitPipe",
         HOBBIT_PONY: "hobbitPony",
         HORN_OF_GONDOR: "hornOfGondor",
         ITHILIEN_PIT: "ithilienPit",
         KEEPING_COUNT: "keepingCount",
         KEYS_OF_ORTHANC: "keysOfOrthanc",
         KING_UNDER_THE_MOUNTAIN: "kingUnderTheMountain",
         LEAF_BROOCH: "leafBrooch",
         LEGACY_OF_DURIN: "legacyOfDurin",
         LEMBAS: "lembas",
         LIGHT_OF_VALINOR: "lightOfValinor",
         LORD_OF_MORTHOND: "lordOfMorthond",
         LOVE_OF_TALES: "loveOfTales",
         MAP_OF_EARNIL: "mapOfEarnil",
         MARINERS_COMPASS: "marinersCompass",
         MIRROR_OF_GALADRIEL: "mirrorOfGaladriel",
         MIRUVOR: "miruvor",
         MIGHTY_PROWESS: "mightyProwess",
         NARVIS_BELT: "narvisBelt",
         NARYA: "narya",
         NENYA: "nenya",
         NOR_AM_I_A_STRANGER: "norAmIAStranger",
         O_LORIEN: "oLorien",
         PALANTIR: "palantir",
         PATH_OF_NEED: "pathOfNeed",
         POISONED_STAKES: "poisonedStakes",
         POWER_IN_THE_EARTH: "powerInTheEarth",
         PROTECTOR_OF_LORIEN: "protectorOfLorien",
         RANGER_BOW: "rangerBow",
         RANGER_PROVISIONS: "rangerProvisions",
         RANGER_SPIKES: "rangerSpikes",
         RAVEN_WINGED_HELM: "ravenWingedHelm",
         RESOURCEFUL: "resourceful",
         RING_OF_BARAHIR: "ringOfBarahir",
         RING_MAIL: "ringMail",
         RIVENDELL_BLADE: "rivendellBlade",
         RIVENDELL_BOW: "rivendellBow",
         ROHAN_WARHORSE: "rohanWarhorse",
         SCROLL_OF_ISILDUR: "scrollOfIsildur",
         SECRET_VIGIL: "secretVigil",
         SELF_PRESERVATION: "selfPreservation",
         SHADOWFAX: "shadowfax",
         SILVER_HARP: "silverHarp",
         SILVER_LAMP: "silverLamp",
         SONG_OF_BATTLE: "songOfBattle",
         SONG_OF_EARENDIL: "songOfEarendil",
         SONG_OF_KINGS: "songOfKings",
         SONG_OF_MOCKING: "songOfMocking",
         SONG_OF_TRAVEL: "songOfTravel",
         SONG_OF_WISDOM: "songOfWisdom",
         SNOWMANE: "snowmane",
         SPARE_HOOD_AND_CLOAK: "spareHoodAndCloak",
         SPEAR_OF_THE_CITADEL: "spearOfTheCitadel",
         SPEAR_OF_THE_MARK: "spearOfTheMark",
         STAFF_OF_LEBETHRON: "staffOfLebethron",
         STAR_BROOCH: "starBrooch",
         STEED_OF_IMLADRIS: "steedOfImladris",
         STEED_OF_THE_MARK: "steedOfTheMark",
         STEWARD_OF_GONDOR: "stewardOfGondor",
         SUPPORT_OF_THE_EAGLES: "supportOfTheEagles",
         SWORD_OF_MORTHOND: "swordOfMorthond",
         SWORD_OF_NUMENOR: "swordOfNumenor",
         SWORD_THAIN: "swordThain",
         SWORD_THAT_WAS_BROKEN: "swordThatWasBroken",
         THE_DAYS_RISING: "theDaysRising",
         THE_FALL_OF_GIL_GALAD: "theFallOfGilGalad",
         THE_FAVOR_OF_THE_LADY: "theFavorOfTheLady",
         THE_LONG_DEFEAT: "theLongDefeat",
         THRORS_KEY: "throrsKey",
         THRORS_MAP: "throrsMap",
         TO_THE_SEA_TO_THE_SEA: "toTheSeaToTheSea",
         TOME_OF_ATANATAR: "tomeOfAtanatar",
         UNEXPECTED_COURAGE: "unexpectedCourage",
         VILYA: "vilya",
         VISIONARY_LEADERSHIP: "visionaryLeadership",
         WARDEN_OF_ARNOR: "wardenOfArnor",
         WEATHER_STAINED_CLOAK: "weatherStainedCloak",
         WINGFOOT: "wingfoot",
         WIZARD_PIPE: "wizardPipe",

         properties:
         {
            "aBurningBrand":
            {
               name: "A Burning Brand",
               cost: 2,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
               key: "aBurningBrand",
            },
            "ambush":
            {
               name: "Ambush",
               cost: 2,
               traitKeys: [Trait.CONDITION, Trait.TRAP],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_LAND_OF_SHADOW,
               cardSetNumber: 9,
               key: "ambush",
            },
            "ancientMathom":
            {
               name: "Ancient Mathom",
               cost: 1,
               traitKeys: [Trait.MATHOM],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
               key: "ancientMathom",
            },
            "arod":
            {
               name: "Arod",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.MOUNT],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
               cardSetNumber: 8,
               key: "arod",
            },
            "asfaloth":
            {
               name: "Asfaloth",
               isUnique: true,
               cost: 2,
               traitKeys: [Trait.MOUNT],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
               key: "asfaloth",
            },
            "athelas":
            {
               name: "Athelas",
               cost: 1,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_LOST_REALM,
               cardSetNumber: 11,
               key: "athelas",
            },
            "blackArrow":
            {
               name: "Black Arrow",
               isUnique: true,
               cost: 0,
               traitKeys: [Trait.ARTIFACT, Trait.ITEM],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.ON_THE_DOORSTEP,
               key: "blackArrow",
            },
            "bladeOfGondolin":
            {
               name: "Blade of Gondolin",
               cost: 1,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.CORE,
               key: "bladeOfGondolin",
            },
            "bloodOfNumenor":
            {
               name: "Blood of Númenor",
               cost: 0,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.HEIRS_OF_NUMENOR,
               key: "bloodOfNumenor",
            },
            "bookOfEldacar":
            {
               name: "Book of Eldacar",
               isUnique: true,
               cost: 4,
               traitKeys: [Trait.RECORD],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS3_ENCOUNTER_AT_AMON_DIN,
               key: "bookOfEldacar",
            },
            "bootsFromErebor":
            {
               name: "Boots from Erebor",
               cost: 0,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.KHAZAD_DUM,
               key: "bootsFromErebor",
            },
            "bornAloft":
            {
               name: "Born Aloft",
               cost: 0,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
               key: "bornAloft",
            },
            "bowOfTheGaladhrim":
            {
               name: "Bow of the Galadhrim",
               cost: 1,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
               cardSetNumber: 88,
               key: "bowOfTheGaladhrim",
            },
            "captainOfGondor":
            {
               name: "Captain of Gondor",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.TITLE],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM6_THE_ANTLERED_CROWN,
               cardSetNumber: 140,
               key: "captainOfGondor",
            },
            "celebriansStone":
            {
               name: "Celebrían's Stone",
               isUnique: true,
               cost: 2,
               traitKeys: [Trait.ARTIFACT, Trait.ITEM],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.CORE,
               key: "celebriansStone",
            },
            "citadelPlate":
            {
               name: "Citadel Plate",
               cost: 4,
               traitKeys: [Trait.ITEM, Trait.ARMOR],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.CORE,
               key: "citadelPlate",
            },
            "cloakOfLorien":
            {
               name: "Cloak of Lórien",
               cost: 1,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM5_CELEBRIMBORS_SECRET,
               cardSetNumber: 120,
               key: "cloakOfLorien",
            },
            "cram":
            {
               name: "Cram",
               cost: 0,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
               key: "cram",
            },
            "daggerOfWesternesse":
            {
               name: "Dagger of Westernesse",
               cost: 1,
               traitKeys: [Trait.ARTIFACT, Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_BLACK_RIDERS,
               key: "daggerOfWesternesse",
            },
            "darkKnowledge":
            {
               name: "Dark Knowledge",
               cost: 1,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.CORE,
               key: "darkKnowledge",
            },
            "defenderOfTheWest":
            {
               name: "Defender of the West",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.TITLE],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
               cardSetNumber: 93,
               key: "defenderOfTheWest",
            },
            "dunedainCache":
            {
               name: "Dúnedain Cache",
               cost: 2,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
               key: "dunedainCache",
            },
            "dunedainMark":
            {
               name: "Dúnedain Mark",
               cost: 1,
               traitKeys: [Trait.SIGNAL],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
               key: "dunedainMark",
            },
            "dunedainQuest":
            {
               name: "Dúnedain Quest",
               cost: 2,
               traitKeys: [Trait.SIGNAL],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
               key: "dunedainQuest",
            },
            "dunedainSignal":
            {
               name: "Dúnedain Signal",
               cost: 1,
               traitKeys: [Trait.SIGNAL],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
               key: "dunedainSignal",
            },
            "dunedainWarning":
            {
               name: "Dúnedain Warning",
               cost: 1,
               traitKeys: [Trait.SIGNAL],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
               key: "dunedainWarning",
            },
            "dwarrowdelfAxe":
            {
               name: "Dwarrowdelf Axe",
               cost: 1,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.KHAZAD_DUM,
               key: "dwarrowdelfAxe",
            },
            "dwarvenAxe":
            {
               name: "Dwarven Axe",
               cost: 2,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.CORE,
               key: "dwarvenAxe",
            },
            "elfFriend":
            {
               name: "Elf-Friend",
               cost: 1,
               traitKeys: [Trait.TITLE],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA4_THE_TREACHERY_OF_RHUDAUR,
               cardSetNumber: 93,
               key: "elfFriend",
            },
            "elfStone":
            {
               name: "Elf-Stone",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.ARTIFACT, Trait.ITEM],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_BLACK_RIDERS,
               key: "elfStone",
            },
            "elvenMail":
            {
               name: "Elven Mail",
               cost: 2,
               traitKeys: [Trait.ITEM, Trait.ARMOR],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM2_THE_THREE_TRIALS,
               cardSetNumber: 29,
               key: "elvenMail",
            },
            "elvenSpear":
            {
               name: "Elven Spear",
               cost: 0,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA4_THE_TREACHERY_OF_RHUDAUR,
               cardSetNumber: 87,
               key: "elvenSpear",
            },
            "entDraught":
            {
               name: "Ent Draught",
               cost: 1,
               traitKeys: [Trait.ITEM, Trait.ENT],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
               cardSetNumber: 9,
               key: "entDraught",
            },
            "everMyHeartRises":
            {
               name: "Ever My Heart Rises",
               cost: 0,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
               key: "everMyHeartRises",
            },
            "expertTreasureHunter":
            {
               name: "Expert Treasure-Hunter",
               cost: 0,
               traitKeys: [Trait.SKILL],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.ON_THE_DOORSTEP,
               key: "expertTreasureHunter",
            },
            "explorersAlmanac":
            {
               name: "Explorer's Almanac",
               cost: 0,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_GREY_HAVENS,
               cardSetNumber: 11,
               key: "explorersAlmanac",
            },
            "fastHitch":
            {
               name: "Fast Hitch",
               cost: 1,
               traitKeys: [Trait.SKILL],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
               key: "fastHitch",
            },
            "favorOfTheValar":
            {
               name: "Favor of the Valar",
               cost: 3,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA5_THE_BATTLE_OF_CARN_DUM,
               cardSetNumber: 124,
               key: "favorOfTheValar",
            },
            "firefoot":
            {
               name: "Firefoot",
               cost: 2,
               traitKeys: [Trait.MOUNT],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM1_THE_DUNLAND_TRAP,
               cardSetNumber: 4,
               key: "firefoot",
            },
            "forestSnare":
            {
               name: "Forest Snare",
               cost: 3,
               traitKeys: [Trait.ITEM, Trait.TRAP],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.CORE,
               key: "forestSnare",
            },
            "gandalfsStaff":
            {
               name: "Gandalf's Staff",
               isUnique: true,
               cost: 2,
               traitKeys: [Trait.ARTIFACT, Trait.ITEM, Trait.STAFF],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.THE_ROAD_DARKENS,
               cardSetNumber: "008",
               key: "gandalfsStaff",
            },
            "gondorianFire":
            {
               name: "Gondorian Fire",
               cost: 0,
               traitKeys: [Trait.GONDOR],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS4_ASSAULT_ON_OSGILIATH,
               key: "gondorianFire",
            },
            "gondorianShield":
            {
               name: "Gondorian Shield",
               cost: 1,
               traitKeys: [Trait.ARMOR, Trait.ITEM],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS1_THE_STEWARDS_FEAR,
               key: "gondorianShield",
            },
            "goodMeal":
            {
               name: "Good Meal",
               cost: 0,
               traitKeys: [],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
               key: "goodMeal",
            },
            "grapplingHook":
            {
               name: "Grappling Hook",
               cost: 1,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_GREY_HAVENS,
               cardSetNumber: 5,
               key: "grapplingHook",
            },
            "greatYewBow":
            {
               name: "Great Yew Bow",
               cost: 2,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.ON_THE_DOORSTEP,
               key: "greatYewBow",
            },
            "hardyLeadership":
            {
               name: "Hardy Leadership",
               isUnique: true,
               cost: 2,
               traitKeys: [],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
               key: "hardyLeadership",
            },
            "healingHerbs":
            {
               name: "Healing Herbs",
               cost: 0,
               traitKeys: [],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
               key: "healingHerbs",
            },
            "heirOfMardil":
            {
               name: "Heir of Mardil",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.TITLE],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM5_CELEBRIMBORS_SECRET,
               cardSetNumber: 113,
               key: "heirOfMardil",
            },
            "heirOfValandil":
            {
               name: "Heir of Valandil",
               isUnique: true,
               cost: 2,
               traitKeys: [Trait.TITLE],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_LOST_REALM,
               cardSetNumber: 10,
               key: "heirOfValandil",
            },
            "herugrim":
            {
               name: "Herugrim",
               isUnique: true,
               cost: 3,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
               cardSetNumber: 10,
               key: "herugrim",
            },
            "hobbitCloak":
            {
               name: "Hobbit Cloak",
               cost: 1,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_BLACK_RIDERS,
               key: "hobbitCloak",
            },
            "hobbitPipe":
            {
               name: "Hobbit Pipe",
               cost: 0,
               traitKeys: [Trait.ITEM, Trait.PIPE],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_BLACK_RIDERS,
               key: "hobbitPipe",
            },
            "hobbitPony":
            {
               name: "Hobbit Pony",
               cost: 0,
               traitKeys: [Trait.MOUNT],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA1_THE_WASTES_OF_ERIADOR,
               cardSetNumber: 7,
               key: "hobbitPony",
            },
            "hornOfGondor":
            {
               name: "Horn Of Gondor",
               cost: 1,
               traitKeys: [Trait.ITEM, Trait.ARTIFACT],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.CORE,
               key: "hornOfGondor",
            },
            "ithilienPit":
            {
               name: "Ithilien Pit",
               cost: 1,
               traitKeys: [Trait.TRAP],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS3_ENCOUNTER_AT_AMON_DIN,
               key: "ithilienPit",
            },
            "keepingCount":
            {
               name: "Keeping Count",
               cost: 0,
               traitKeys: [],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
               key: "keepingCount",
            },
            "keysOfOrthanc":
            {
               name: "Keys of Orthanc",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
               key: "keysOfOrthanc",
            },
            "kingUnderTheMountain":
            {
               name: "King Under the Mountain",
               isUnique: true,
               cost: 2,
               traitKeys: [Trait.TITLE],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.ON_THE_DOORSTEP,
               key: "kingUnderTheMountain",
            },
            "leafBrooch":
            {
               name: "Leaf Brooch",
               cost: 1,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM2_THE_THREE_TRIALS,
               cardSetNumber: 34,
               key: "leafBrooch",
            },
            "legacyOfDurin":
            {
               name: "Legacy of Durin",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D3_THE_WATCHER_IN_THE_WATER,
               key: "legacyOfDurin",
            },
            "lembas":
            {
               name: "Lembas",
               cost: 1,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM3_TROUBLE_IN_THARBAD,
               cardSetNumber: 64,
               key: "lembas",
            },
            "lightOfValinor":
            {
               name: "Light of Valinor",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
               key: "lightOfValinor",
            },
            "lordOfMorthond":
            {
               name: "Lord of Morthond",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.TITLE],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS3_ENCOUNTER_AT_AMON_DIN,
               key: "lordOfMorthond",
            },
            "loveOfTales":
            {
               name: "Love of Tales",
               cost: 0,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
               key: "loveOfTales",
            },
            "mapOfEarnil":
            {
               name: "Map of Earnil",
               cost: 4,
               traitKeys: [Trait.RECORD],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS4_ASSAULT_ON_OSGILIATH,
               key: "mapOfEarnil",
            },
            "marinersCompass":
            {
               name: "Mariner's Compass",
               cost: 1,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_GREY_HAVENS,
               cardSetNumber: 8,
               key: "marinersCompass",
            },
            "mightyProwess":
            {
               name: "Mighty Prowess",
               cost: 1,
               traitKeys: [Trait.SKILL],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS2_THE_DRUADAN_FOREST,
               key: "mightyProwess",
            },
            "mirrorOfGaladriel":
            {
               name: "Mirror of Galadriel",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.ARTIFACT, Trait.ITEM],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM5_CELEBRIMBORS_SECRET,
               cardSetNumber: 118,
               key: "mirrorOfGaladriel",
            },
            "miruvor":
            {
               name: "Miruvor",
               cost: 1,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
               key: "miruvor",
            },
            "narvisBelt":
            {
               name: "Narvi's Belt",
               cost: 2,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.KHAZAD_DUM,
               key: "narvisBelt",
            },
            "narya":
            {
               name: "Narya",
               isUnique: true,
               cost: 2,
               traitKeys: [Trait.RING, Trait.ARTIFACT],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.THE_GREY_HAVENS,
               cardSetNumber: 15,
               key: "narya",
            },
            "nenya":
            {
               name: "Nenya",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.ARTIFACT, Trait.RING],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM5_CELEBRIMBORS_SECRET,
               cardSetNumber: 121,
               key: "nenya",
            },
            "norAmIAStranger":
            {
               name: "Nor am I a Stranger",
               cost: 1,
               traitKeys: [Trait.TITLE],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
               key: "norAmIAStranger",
            },
            "oLorien":
            {
               name: "O Lórien!",
               cost: 1,
               traitKeys: [Trait.SONG],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM3_TROUBLE_IN_THARBAD,
               cardSetNumber: 58,
               key: "oLorien",
            },
            "palantir":
            {
               name: "Palantir",
               cost: 1,
               traitKeys: [Trait.ARTIFACT, Trait.ITEM],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS4_ASSAULT_ON_OSGILIATH,
               key: "palantir",
            },
            "pathOfNeed":
            {
               name: "Path of Need",
               cost: 4,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
               key: "pathOfNeed",
            },
            "poisonedStakes":
            {
               name: "Poisoned Stakes",
               cost: 2,
               traitKeys: [Trait.TRAP],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
               key: "poisonedStakes",
            },
            "powerInTheEarth":
            {
               name: "Power in the Earth",
               cost: 1,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.CORE,
               key: "powerInTheEarth",
            },
            "protectorOfLorien":
            {
               name: "Protector of Lórien",
               cost: 1,
               traitKeys: [Trait.TITLE],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.CORE,
               key: "protectorOfLorien",
            },
            "rangerBow":
            {
               name: "Ranger Bow",
               cost: 1,
               traitKeys: [Trait.WEAPON],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS4_ASSAULT_ON_OSGILIATH,
               key: "rangerBow",
            },
            "rangerProvisions":
            {
               name: "Ranger Provisions",
               cost: 1,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA3_ACROSS_THE_ETTENMOORS,
               cardSetNumber: 55,
               key: "rangerProvisions",
            },
            "rangerSpikes":
            {
               name: "Ranger Spikes",
               cost: 2,
               traitKeys: [Trait.TRAP],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.HEIRS_OF_NUMENOR,
               key: "rangerSpikes",
            },
            "ravenWingedHelm":
            {
               name: "Raven-Winged Helm",
               cost: 2,
               traitKeys: [Trait.ITEM, Trait.ARMOR],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA1_THE_WASTES_OF_ERIADOR,
               cardSetNumber: 5,
               key: "ravenWingedHelm",
            },
            "resourceful":
            {
               name: "Resourceful",
               cost: 4,
               traitKeys: [],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D3_THE_WATCHER_IN_THE_WATER,
               key: "resourceful",
            },
            "ringOfBarahir":
            {
               name: "Ring of Barahir",
               cost: 1,
               traitKeys: [Trait.ARTIFACT, Trait.ITEM, Trait.RING],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS1_THE_STEWARDS_FEAR,
               key: "ringOfBarahir",
            },
            "ringMail":
            {
               name: "Ring Mail",
               cost: 2,
               traitKeys: [Trait.ITEM, Trait.ARMOR],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
               key: "ringMail",
            },
            "rivendellBlade":
            {
               name: "Rivendell Blade",
               cost: 1,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D2_ROAD_TO_RIVENDELL,
               key: "rivendellBlade",
            },
            "rivendellBow":
            {
               name: "Rivendell Bow",
               cost: 1,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D3_THE_WATCHER_IN_THE_WATER,
               key: "rivendellBow",
            },
            "rohanWarhorse":
            {
               name: "Rohan Warhorse",
               cost: 1,
               traitKeys: [Trait.MOUNT],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
               key: "rohanWarhorse",
            },
            "scrollOfIsildur":
            {
               name: "Scroll of Isildur",
               isUnique: true,
               cost: 4,
               traitKeys: [Trait.RECORD],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS6_THE_MORGUL_VALE,
               key: "scrollOfIsildur",
            },
            "secretVigil":
            {
               name: "Secret Vigil",
               cost: 1,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_LOST_REALM,
               cardSetNumber: 12,
               key: "secretVigil",
            },
            "selfPreservation":
            {
               name: "Self Preservation",
               cost: 3,
               traitKeys: [Trait.SKILL],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.CORE,
               key: "selfPreservation",
            },
            "shadowfax":
            {
               name: "Shadowfax",
               isUnique: true,
               cost: 3,
               traitKeys: [Trait.MOUNT, Trait.MEARAS],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.THE_TREASON_OF_SARUMAN,
               cardSetNumber: 14,
               key: "shadowfax",
            },
            "silverHarp":
            {
               name: "Silver Harp",
               cost: 2,
               traitKeys: [Trait.ITEM, Trait.INSTRUMENT],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA4_THE_TREACHERY_OF_RHUDAUR,
               cardSetNumber: 90,
               key: "silverHarp",
            },
            "silverLamp":
            {
               name: "Silver Lamp",
               cost: 2,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
               key: "silverLamp",
            },
            "snowmane":
            {
               name: "Snowmane",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.MOUNT],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_LAND_OF_SHADOW,
               cardSetNumber: 10,
               key: "snowmane",
            },
            "songOfBattle":
            {
               name: "Song of Battle",
               cost: 1,
               traitKeys: [Trait.SONG],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
               key: "songOfBattle",
            },
            "songOfEarendil":
            {
               name: "Song of Eärendil",
               cost: 1,
               traitKeys: [Trait.SONG],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D2_ROAD_TO_RIVENDELL,
               key: "songOfEarendil",
            },
            "songOfKings":
            {
               name: "Song of Kings",
               cost: 1,
               traitKeys: [Trait.SONG],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
               key: "songOfKings",
            },
            "songOfMocking":
            {
               name: "Song of Mocking",
               cost: 1,
               traitKeys: [Trait.SONG],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
               key: "songOfMocking",
            },
            "songOfTravel":
            {
               name: "Song of Travel",
               cost: 1,
               traitKeys: [Trait.SONG],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
               key: "songOfTravel",
            },
            "songOfWisdom":
            {
               name: "Song of Wisdom",
               cost: 1,
               traitKeys: [Trait.SONG],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
               key: "songOfWisdom",
            },
            "spareHoodAndCloak":
            {
               name: "Spare Hood and Cloak",
               cost: 0,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
               key: "spareHoodAndCloak",
            },
            "spearOfTheCitadel":
            {
               name: "Spear of the Citadel",
               cost: 2,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.HEIRS_OF_NUMENOR,
               key: "spearOfTheCitadel",
            },
            "spearOfTheMark":
            {
               name: "Spear of the Mark",
               cost: 1,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS6_THE_MORGUL_VALE,
               key: "spearOfTheMark",
            },
            "staffOfLebethron":
            {
               name: "Staff of Lebethron",
               cost: 1,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_LAND_OF_SHADOW,
               cardSetNumber: 8,
               key: "staffOfLebethron",
            },
            "starBrooch":
            {
               name: "Star Brooch",
               cost: 1,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_LOST_REALM,
               cardSetNumber: 13,
               key: "starBrooch",
            },
            "steedOfImladris":
            {
               name: "Steed of Imladris",
               cost: 1,
               traitKeys: [Trait.MOUNT],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA3_ACROSS_THE_ETTENMOORS,
               cardSetNumber: 59,
               key: "steedOfImladris",
            },
            "steedOfTheMark":
            {
               name: "Steed of the Mark",
               cost: 1,
               traitKeys: [Trait.MOUNT],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS6_THE_MORGUL_VALE,
               key: "steedOfTheMark",
            },
            "stewardOfGondor":
            {
               name: "Steward of Gondor",
               isUnique: true,
               cost: 2,
               traitKeys: [Trait.GONDOR, Trait.TITLE],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.CORE,
               key: "stewardOfGondor",
            },
            "supportOfTheEagles":
            {
               name: "Support of the Eagles",
               cost: 3,
               traitKeys: [Trait.BOON],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
               key: "supportOfTheEagles",
            },
            "swordOfMorthond":
            {
               name: "Sword of Morthond",
               cost: 1,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS4_ASSAULT_ON_OSGILIATH,
               key: "swordOfMorthond",
            },
            "swordOfNumenor":
            {
               name: "Sword of Númenor",
               cost: 1,
               traitKeys: [Trait.ITEM, Trait.WEAPON],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA6_THE_DREAD_REALM,
               key: "swordOfNumenor",
            },
            "swordThain":
            {
               name: "Sword-thain",
               isUnique: true,
               cost: 4,
               traitKeys: [Trait.TITLE],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA6_THE_DREAD_REALM,
               key: "swordThain",
            },
            "swordThatWasBroken":
            {
               name: "Sword that was Broken",
               isUnique: true,
               cost: 3,
               traitKeys: [Trait.ARTIFACT],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D3_THE_WATCHER_IN_THE_WATER,
               key: "swordThatWasBroken",
            },
            "theDaysRising":
            {
               name: "The Day's Rising",
               cost: 1,
               traitKeys: [Trait.SONG],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM6_THE_ANTLERED_CROWN,
               cardSetNumber: 139,
               key: "theDaysRising",
            },
            "theFallOfGilGalad":
            {
               name: "The Fall of Gil-Galad",
               cost: 1,
               traitKeys: [Trait.SONG],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM1_THE_DUNLAND_TRAP,
               cardSetNumber: 7,
               image: "http://www.cardgamedb.com/forums/uploads/lotr/ffg_the-fall-of-gil--galad_the-dunland-trap_7.jpg",
               key: "theFallOfGilGalad",
            },
            "theFavorOfTheLady":
            {
               name: "The Favor of the Lady",
               cost: 2,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.CORE,
               key: "theFavorOfTheLady",
            },
            "theLongDefeat":
            {
               name: "The Long Defeat",
               cost: 1,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA5_THE_BATTLE_OF_CARN_DUM,
               cardSetNumber: 122,
               key: "theLongDefeat",
            },
            "throrsKey":
            {
               name: "Thrór's Key",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.ARTIFACT, Trait.ITEM],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.ON_THE_DOORSTEP,
               key: "throrsKey",
            },
            "throrsMap":
            {
               name: "Thrór's Map",
               cost: 1,
               traitKeys: [Trait.ARTIFACT, Trait.ITEM],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.OVER_HILL_AND_UNDER_HILL,
               key: "throrsMap",
            },
            "toTheSeaToTheSea":
            {
               name: "To the Sea, to the Sea!",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.SONG],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_GREY_HAVENS,
               cardSetNumber: 14,
               key: "toTheSeaToTheSea",
            },
            "tomeOfAtanatar":
            {
               name: "Tome of Atanatar",
               isUnique: true,
               cost: 4,
               traitKeys: [Trait.RECORD],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
               key: "tomeOfAtanatar",
            },
            "unexpectedCourage":
            {
               name: "Unexpected Courage",
               cost: 2,
               traitKeys: [Trait.CONDITION],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.CORE,
               key: "unexpectedCourage",
            },
            "vilya":
            {
               name: "Vilya",
               cost: 2,
               traitKeys: [Trait.RING, Trait.ARTIFACT],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
               key: "vilya",
            },
            "visionaryLeadership":
            {
               name: "Visionary Leadership",
               isUnique: true,
               cost: 2,
               traitKeys: [Trait.SKILL],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS6_THE_MORGUL_VALE,
               key: "visionaryLeadership",
            },
            "wardenOfArnor":
            {
               name: "Warden of Arnor",
               cost: 1,
               traitKeys: [Trait.TITLE],
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM2_THE_THREE_TRIALS,
               cardSetNumber: 31,
               image: "http://www.cardgamedb.com/forums/uploads/lotr/ffg_warden-of-anor-the-three-trials-31.jpg",
               key: "wardenOfArnor",
            },
            "weatherStainedCloak":
            {
               name: "Weather-stained Cloak",
               cost: 0,
               traitKeys: [Trait.ITEM],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA6_THE_DREAD_REALM,
               key: "weatherStainedCloak",
            },
            "wingfoot":
            {
               name: "Wingfoot",
               isUnique: true,
               cost: 1,
               traitKeys: [Trait.TITLE],
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
               cardSetNumber: 92,
               key: "wingfoot",
            },
            "wizardPipe":
            {
               name: "Wizard Pipe",
               cost: 1,
               traitKeys: [Trait.ITEM, Trait.PIPE],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.THE_ROAD_DARKENS,
               cardSetNumber: "009",
               key: "wizardPipe",
            },
         },

         keys: function()
         {
            return Object.getOwnPropertyNames(AttachmentCard.properties);
         },
      };

      AttachmentCard.keys().forEach(function(cardKey)
      {
         var card = AttachmentCard.properties[cardKey];
         card.cardSet = CardSet.properties[card.cardSetKey];
         if (card.cardSubsetKey)
         {
            card.cardSubset = CardSubset.properties[card.cardSubsetKey];
         }
         card.cardTypeKey = CardType.ATTACHMENT;
         card.cardType = CardType.properties[card.cardTypeKey];
         card.sphere = Sphere.properties[card.sphereKey];

         if (!card.image)
         {
            card.image = ImageNameCreator.create(card);
         }
      });

      if (Object.freeze)
      {
         Object.freeze(AttachmentCard);
      }

      return AttachmentCard;
   });
