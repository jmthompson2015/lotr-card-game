"use strict";

define(["qunit", "redux", "artifact/js/CardType",
  "model/js/Action", "model/js/Agent", "model/js/Environment", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/TravelTask", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, CardType, Action, Agent, Environment, Game, PlayerDeckBuilder, Reducer, TravelTask, ScenarioDeckBuilder)
   {
      QUnit.module("TravelTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var game = createGame();
         var environment = game.engine().environment();
         var store = environment.store();
         store.dispatch(Action.drawEncounterCard());
         store.dispatch(Action.drawEncounterCard());
         store.dispatch(Action.drawEncounterCard());
         var locationCount = environment.stagingArea(CardType.LOCATION).size;
         var task = new TravelTask(store);
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

         // Run.
         task.doIt(callback);
      });

      function createGame(callback)
      {
         var store = Redux.createStore(Reducer.root);
         store.dispatch(Action.setDelay(10));
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         var playerData = [
            {
               agent: new Agent(store, "agent1"),
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
           },
         ];

         return new Game(store, scenarioDeck, playerData, callback);
      }
   });
