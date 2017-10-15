"use strict";

define(function()
{
   var Phase = {
      SETUP: "setup",

      RESOURCE_START: "resourceStart",
      RESOURCE_END: "resourceEnd",

      PLANNING_START: "planningStart",
      PLANNING_END: "planningEnd",

      QUEST_START: "questStart",
      QUEST_COMMIT_CHARACTERS: "questCommitCharacters",
      QUEST_REVEAL_ENCOUNTER_CARDS: "questRevealEncounterCards",
      QUEST_RESOLVE: "questResolve",
      QUEST_END: "questEnd",

      TRAVEL_START: "travelStart",
      TRAVEL_END: "travelEnd",

      ENCOUNTER_START: "encounterStart",
      ENCOUNTER_OPTIONAL_ENGAGEMENT_START: "encounterOptionalEngagementStart",
      ENCOUNTER_OPTIONAL_ENGAGEMENT_END: "encounterOptionalEngagementEnd",
      ENCOUNTER_ENGAGEMENT_CHECK_START: "encounterEngagementCheckStart",
      ENCOUNTER_ENGAGEMENT_CHECK_END: "encounterEngagementCheckEnd",
      ENCOUNTER_END: "encounterEnd",

      COMBAT_START: "combatStart",
      COMBAT_DEAL_SHADOW_CARDS_START: "combatDealShadowCardsStart",
      COMBAT_DEAL_SHADOW_CARDS_END: "combatDealShadowCardsEnd",
      COMBAT_DEFEND_START: "combatDefendStart",
      COMBAT_DEFEND_DECLARE_ATTACKER: "combatDefendDeclareAttacker",
      COMBAT_DEFEND_EXHAUST_DEFENDER: "combatDefendExhaustDefender",
      COMBAT_DEFEND_RESOLVE_SHADOW_EFFECT: "combatDefendResolveShadowEffect",
      COMBAT_DEFEND_DETERMINE_DAMAGE: "combatDefendDetermineDamage",
      COMBAT_DEFEND_END: "combatDefendEnd",
      COMBAT_ATTACK_START: "combatAttackStart",
      COMBAT_ATTACK_DECLARE_DEFENDER: "combatAttackDeclareDefender",
      COMBAT_ATTACK_EXHAUST_ATTACKERS: "combatAttackExhaustAttackers",
      COMBAT_ATTACK_DETERMINE_DAMAGE: "combatAttackDetermineDamage",
      COMBAT_ATTACK_END: "combatAttackEnd",
      COMBAT_END: "combatEnd",

      REFRESH_START: "refreshStart",
      REFRESH_END: "refreshEnd",

      properties:
      {
         "setup":
         {
            name: "Setup",
            key: "setup",
         },
         "resourceStart":
         {
            name: "Resource (start)",
            key: "resourceStart",
         },
         "resourceEnd":
         {
            name: "Resource (end)",
            key: "resourceEnd",
         },
         "planningStart":
         {
            name: "Planning (start)",
            key: "planningStart",
         },
         "planningEnd":
         {
            name: "Planning (end)",
            key: "planningEnd",
         },
         "questStart":
         {
            name: "Quest (start)",
            key: "questStart",
         },
         "questCommitCharacters":
         {
            name: "Quest (commit characters)",
            key: "questCommitCharacters",
         },
         "questRevealEncounterCards":
         {
            name: "Quest (reveal encounter cards)",
            key: "questRevealEncounterCards",
         },
         "questResolve":
         {
            name: "Quest (resolve)",
            key: "questResolve",
         },
         "questEnd":
         {
            name: "Quest (end)",
            key: "questEnd",
         },
         "travelStart":
         {
            name: "Travel (start)",
            key: "travelStart",
         },
         "travelEnd":
         {
            name: "Travel (end)",
            key: "travelEnd",
         },
         "encounterStart":
         {
            name: "Encounter (start)",
            key: "encounterStart",
         },
         "encounterOptionalEngagementStart":
         {
            name: "Encounter (optional engagement start)",
            key: "encounterOptionalEngagementStart",
         },
         "encounterOptionalEngagementEnd":
         {
            name: "Encounter (optional engagement end)",
            key: "encounterOptionalEngagementEnd",
         },
         "encounterEngagementCheckStart":
         {
            name: "Encounter (engagement check start)",
            key: "encounterEngagementCheckStart",
         },
         "encounterEngagementCheckEnd":
         {
            name: "Encounter (engagement check end)",
            key: "encounterEngagementCheckEnd",
         },
         "encounterEnd":
         {
            name: "Encounter (end)",
            key: "encounterEnd",
         },
         "combatStart":
         {
            name: "Combat (start)",
            key: "combatStart",
         },
         "combatDealShadowCardsStart":
         {
            name: "Combat (deal shadow cards start)",
            key: "combatDealShadowCardsStart",
         },
         "combatDealShadowCardsEnd":
         {
            name: "Combat (deal shadow cards end)",
            key: "combatDealShadowCardsEnd",
         },
         "combatDefendStart":
         {
            name: "Combat Defend (start)",
            key: "combatDefendStart",
         },
         "combatDefendDeclareAttacker":
         {
            name: "Combat Defend (declare attacker)",
            key: "combatDefendDeclareAttacker",
         },
         "combatDefendExhaustDefender":
         {
            name: "Combat Defend (exhaust defender)",
            key: "combatDefendExhaustDefender",
         },
         "combatDefendResolveShadowEffect":
         {
            name: "Combat Defend (combatDefendResolveShadowEffect)",
            key: "combatDefendResolveShadowEffect",
         },
         "combatDefendDetermineDamage":
         {
            name: "Combat Defend (combatDefendDetermineDamage)",
            key: "combatDefendDetermineDamage",
         },
         "combatDefendEnd":
         {
            name: "Combat Defend (end)",
            key: "combatDefendEnd",
         },
         "combatAttackStart":
         {
            name: "Combat Attack (start)",
            key: "combatAttackStart",
         },
         "combatAttackDeclareDefender":
         {
            name: "Combat Attack (combatAttackDeclareDefender)",
            key: "combatAttackDeclareDefender",
         },
         "combatAttackExhaustAttackers":
         {
            name: "Combat Attack (combatAttackExhaustAttackers)",
            key: "combatAttackExhaustAttackers",
         },
         "combatAttackDetermineDamage":
         {
            name: "Combat Attack (combatAttackDetermineDamage)",
            key: "combatAttackDetermineDamage",
         },
         "combatAttackEnd":
         {
            name: "Combat Attack (end)",
            key: "combatAttackEnd",
         },
         "combatEnd":
         {
            name: "Combat (end)",
            key: "combatEnd",
         },
         "refreshStart":
         {
            name: "Refresh (start)",
            key: "refreshStart",
         },
         "refreshEnd":
         {
            name: "Refresh (end)",
            key: "refreshEnd",
         },
      },

      keys: function()
      {
         return Object.getOwnPropertyNames(Phase.properties);
      },
   };

   if (Object.freeze)
   {
      Object.freeze(Phase);
   }

   return Phase;
});
