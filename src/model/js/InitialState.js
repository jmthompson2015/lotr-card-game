import Phase from "../../artifact/js/Phase.js";

function InitialState()
{
   this.activeAgentId = undefined;
   this.activeLocationId = undefined;
   this.activeQuestId = undefined;
   this.delay = 1000;
   this.environment = undefined;
   this.eventData = undefined;
   this.eventQueue = [];
   this.firstAgentId = undefined;
   this.nextAgentId = 1;
   this.nextCardId = 1;
   this.phaseData = undefined;
   this.phaseKey = Phase.SETUP;
   this.phaseQueue = [];
   this.resourceBase = "view/resource/";
   this.round = 0;
   this.scenarioKey = undefined;
   this.userMessage = "";

   // cardInstance IDs.
   this.encounterDeck = [];
   this.encounterDiscard = [];
   this.encounterSetAside = [];
   this.questDeck = [];
   this.questDiscard = [];
   this.stagingArea = [];

   // id: agent
   this.agents = {};

   // agent id: cardInstances
   this.agentEngagementArea = {};
   this.agentHand = {};
   this.agentPlayerDeck = {};
   this.agentPlayerDiscard = {};
   this.agentTableau = {};
   this.agentThreat = {};

   // id: cardInstance
   this.cardInstances = {};

   // cardInstance IDs.
   this.cardAttachments = {};
   this.cardIsFaceUp = {};
   this.cardIsQuesting = {};
   this.cardIsReady = {};
   this.cardIsUsed = {};
   this.cardPhaseBonusAttack = {};
   this.cardPhaseBonusDefense = {};
   this.cardPhaseBonusHitPoints = {};
   this.cardPhaseBonusThreat = {};
   this.cardPhaseBonusWillpower = {};
   this.cardProgress = {};
   this.cardResources = {};
   this.cardRoundBonusAttack = {};
   this.cardRoundBonusDefense = {};
   this.cardRoundBonusHitPoints = {};
   this.cardRoundBonusThreat = {};
   this.cardRoundBonusWillpower = {};
   this.cardShadowCards = {};
   this.cardWounds = {};
}

if (Object.freeze)
{
   Object.freeze(InitialState);
}

export default InitialState;