"use strict";

define(["immutable", "artifact/js/Phase"],
   function(Immutable, Phase)
   {
      function InitialState()
      {
         this.nextCardId = 1;
         this.phaseKey = Phase.SETUP;
         this.round = 0;

         // cardInstance IDs.
         this.activeLocation = undefined;
         this.encounterDeck = Immutable.List();
         this.encounterDiscard = Immutable.List();
         this.questDeck = Immutable.List();
         this.questDiscard = Immutable.List();
         this.stagingArea = Immutable.List();

         // id: cardInstance
         this.cardInstances = Immutable.Map();
      }

      if (Object.freeze)
      {
         Object.freeze(InitialState);
      }

      return InitialState;
   });
