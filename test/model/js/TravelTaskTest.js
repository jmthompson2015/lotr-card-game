"use strict";

define(["qunit", "redux", "artifact/js/CardType", "artifact/js/GameMode",
  "model/js/Action", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/TravelTask", "model/js/ScenarioDeckBuilder", "model/js/SimpleAgent"],
   function(QUnit, Redux, CardType, GameMode, Action, Environment, PlayerDeckBuilder, Reducer, TravelTask, ScenarioDeckBuilder, SimpleAgent)
   {
      QUnit.module("TravelTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         store.dispatch(Action.drawEncounterCard());
         store.dispatch(Action.drawEncounterCard());
         store.dispatch(Action.drawEncounterCard());
         var locationCount = environment.stagingArea(CardType.LOCATION).size;
         var callback = function()
         {
            // Verify.
            if (locationCount === 0)
            {
               assert.equal(store.getState().activeLocationId, undefined);
            }
            else
            {
               assert.ok(Number.isInteger(store.getState().activeLocationId));
            }
         };
         var task = new TravelTask(store, callback);

         // Run.
         task.doIt();
      });

      function createEnvironment()
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store, GameMode.EASY);
         var agent = new SimpleAgent(store, "agent");
         var playerData = [
            {
               agent: agent,
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
            },
         ];

         return new Environment(store, scenarioDeck, playerData);
      }
   });