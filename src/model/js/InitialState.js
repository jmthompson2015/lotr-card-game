import Phase from "../../artifact/js/Phase.js";

function InitialState()
{
   this.activeAgentId = undefined;
   this.activeLocationId = undefined;
   this.activeQuestId = undefined;
   this.delay = 1000;
   this.environment = undefined;
   this.eventData = undefined;
   this.eventQueue = Immutable.List();
   this.firstAgentId = undefined;
   this.nextAgentId = 1;
   this.nextCardId = 1;
   this.phaseData = undefined;
   this.phaseKey = Phase.SETUP;
   this.phaseQueue = Immutable.List();
   this.resourceBase = "view/resource/";
   this.round = 0;
   this.scenarioKey = undefined;
   this.userMessage = "";

   // cardInstance IDs.
   this.encounterDeck = Immutable.List();
   this.encounterDiscard = Immutable.List();
   this.encounterSetAside = Immutable.List();
   this.questDeck = Immutable.List();
   this.questDiscard = Immutable.List();
   this.stagingArea = Immutable.List();

   // id: agent
   this.agents = Immutable.Map();

   // agent id: cardInstances
   this.agentEngagementArea = Immutable.Map();
   this.agentHand = Immutable.Map();
   this.agentPlayerDeck = Immutable.Map();
   this.agentPlayerDiscard = Immutable.Map();
   this.agentTableau = Immutable.Map();
   this.agentThreat = Immutable.Map();

   // id: cardInstance
   this.cardInstances = Immutable.Map();

   // cardInstance IDs.
   this.cardAttachments = Immutable.Map();
   this.cardIsFaceUp = Immutable.Map();
   this.cardIsQuesting = Immutable.Map();
   this.cardIsReady = Immutable.Map();
   this.cardIsUsed = Immutable.Map();
   this.cardPhaseBonusAttack = Immutable.Map();
   this.cardPhaseBonusDefense = Immutable.Map();
   this.cardPhaseBonusHitPoints = Immutable.Map();
   this.cardPhaseBonusThreat = Immutable.Map();
   this.cardPhaseBonusWillpower = Immutable.Map();
   this.cardProgress = Immutable.Map();
   this.cardResources = Immutable.Map();
   this.cardRoundBonusAttack = Immutable.Map();
   this.cardRoundBonusDefense = Immutable.Map();
   this.cardRoundBonusHitPoints = Immutable.Map();
   this.cardRoundBonusThreat = Immutable.Map();
   this.cardRoundBonusWillpower = Immutable.Map();
   this.cardShadowCards = Immutable.Map();
   this.cardWounds = Immutable.Map();
}

if (Object.freeze)
{
   Object.freeze(InitialState);
}

export default InitialState;