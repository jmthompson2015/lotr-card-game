"use strict";

var prefix = "../test/model/js/";
var suffix = "Test";
var testModules = ["Ability", "Action", "Adjudicator", "Agent", "AgentReducer", "AllyAbility", "AttachmentAbility", "CardInstance", "CardReducer",
  "CombatAttackTask", "CombatDealShadowCardsTask", "CombatDefendTask", "CombatTask", "EncounterEngagementCheckTask", "EncounterOptionalEngagementTask",
  "EncounterTask", "Environment", "EventAbility", "EventObserver", "Game", "HeroAbility", "InitialState", "LocationAbility", "PhaseAbility",
  "PhaseObserver", "PlanningTask", "PlayerDeckBuilder", "QueueProcessor", "QuestAbility", "QuestTask", "Reducer", "RefreshTask", "ResourceTask",
  "ScenarioDeckBuilder", "ShadowAbility", "SimpleAgentStrategy", "TransferReducer", "TravelTask", "TreacheryAbility"
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