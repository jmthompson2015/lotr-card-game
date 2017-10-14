"use strict";

define(["immutable", "artifact/js/Phase"],
   function(Immutable, Phase)
   {
      function InitialState()
      {
         this.activeAgentId = undefined;
         this.environment = undefined;
         this.firstAgentId = undefined;
         this.nextAgentId = 1;
         this.nextCardId = 1;
         this.phaseData = undefined;
         this.phaseKey = Phase.SETUP;
         this.phaseQueue = Immutable.List();
         this.round = 0;

         // agent id: cardInstances
         this.agentHand = Immutable.Map();
         this.agentHeroDeck = Immutable.Map();
         this.agentPlayerDeck = Immutable.Map();
         this.agentThreat = Immutable.Map();

         // cardInstance IDs.
         this.activeLocation = undefined;
         this.encounterDeck = Immutable.List();
         this.encounterDiscard = Immutable.List();
         this.questDeck = Immutable.List();
         this.questDiscard = Immutable.List();
         // card instance id: sphereKey: resource count
         this.resources = Immutable.Map();
         this.stagingArea = Immutable.List();

         // id: agent
         this.agents = Immutable.Map();

         // id: cardInstance
         this.cardInstances = Immutable.Map();
      }

      if (Object.freeze)
      {
         Object.freeze(InitialState);
      }

      return InitialState;
   });
