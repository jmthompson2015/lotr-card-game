"use strict";

define(["immutable", "artifact/js/Phase"],
   function(Immutable, Phase)
   {
      function InitialState()
      {
         this.activeAgentId = undefined;
         this.activeLocationId = undefined;
         this.environment = undefined;
         this.firstAgentId = undefined;
         this.nextAgentId = 1;
         this.nextCardId = 1;
         this.phaseData = undefined;
         this.phaseKey = Phase.SETUP;
         this.phaseQueue = Immutable.List();
         this.resourceBase = "view/resource/";
         this.round = 0;
         this.userMessage = "";

         // cardInstance IDs.
         this.encounterDeck = Immutable.List();
         this.encounterDiscard = Immutable.List();
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
         this.cardProgress = Immutable.Map();
         // card instance id: sphereKey: resource count
         this.cardResources = Immutable.Map();
         this.cardShadowCards = Immutable.Map();
         this.cardWounds = Immutable.Map();
      }

      if (Object.freeze)
      {
         Object.freeze(InitialState);
      }

      return InitialState;
   });
