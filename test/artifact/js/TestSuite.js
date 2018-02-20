"use strict";

var prefix = "../test/artifact/js/";
var suffix = "Test";
var testModules = ["AllyCard", "AttachmentCard", "CardResolver", "CardSet", "CardSetType", "CardSubset", "CardType", "EncounterSet", "EnemyCard",
      "EventCard", "GameEvent", "GameMode", "HeroCard", "Keyword", "LocationCard", "ObjectiveCard", "Phase", "QuestCard", "Scenario", "Sphere", "Trait",
      "TreacheryCard"
    ];
testModules = testModules.map(function(testModule)
{
   return prefix + testModule + suffix;
});
testModules.unshift("common/js/Logger");

require(testModules, function(Logger)
{
   window.LOGGER = new Logger();
   LOGGER.setTraceEnabled(false);
   LOGGER.setDebugEnabled(false);
   LOGGER.setInfoEnabled(false);

   QUnit.start();
});