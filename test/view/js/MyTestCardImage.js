"use strict";

require(["react", "react-dom", "react-dom-factories", "react-redux", "redux", "common/js/Logger", "artifact/js/AllyCard", "artifact/js/AttachmentCard",
        "artifact/js/EnemyCard", "artifact/js/EventCard", "artifact/js/HeroCard", "artifact/js/LocationCard", "artifact/js/ObjectiveCard",
        "artifact/js/QuestCard", "artifact/js/Sphere", "artifact/js/TreacheryCard", "model/js/CardAction", "model/js/CardInstance", "model/js/Reducer",
        "view/js/CardImage"
      ],
   function(React, ReactDOM, DOM, ReactRedux, Redux, Logger, AllyCard, AttachmentCard, EnemyCard, EventCard, HeroCard, LocationCard, ObjectiveCard,
      QuestCard, Sphere, TreacheryCard, CardAction, CardInstance, Reducer, CardImage)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var store = Redux.createStore(Reducer.root);

      var locationInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
      store.dispatch(CardAction.addProgress(locationInstance, 2));

      var questInstance = new CardInstance(store, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);
      store.dispatch(CardAction.addProgress(questInstance, 4));

      var heroInstance = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
      heroInstance.isQuesting = true;
      store.dispatch(CardAction.setReady(heroInstance, false));
      store.dispatch(CardAction.addResources(heroInstance));
      store.dispatch(CardAction.addWounds(heroInstance, 2));

      var allyInstance = new CardInstance(store, AllyCard.properties[AllyCard.GANDALF_CORE]);
      allyInstance.isQuesting = true;
      store.dispatch(CardAction.setReady(allyInstance, false));
      store.dispatch(CardAction.addWounds(allyInstance, 2));

      var attachmentInstance = new CardInstance(store, AttachmentCard.properties[AttachmentCard.STEWARD_OF_GONDOR]);
      store.dispatch(CardAction.setReady(attachmentInstance, false));

      var eventInstance = new CardInstance(store, EventCard.properties[EventCard.SNEAK_ATTACK]);

      var enemyInstance = new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
      store.dispatch(CardAction.addWounds(enemyInstance));

      var treacheryInstance = new CardInstance(store, TreacheryCard.properties[TreacheryCard.CAUGHT_IN_A_WEB]);

      var cells = [];
      addCardImage(cells, HeroCard.properties[HeroCard.ARAGORN_CORE]);
      addCardImage(cells, HeroCard.properties[HeroCard.GLOIN], false);
      var element = React.createElement(CardImage,
      {
         card: AttachmentCard.properties[AttachmentCard.STEWARD_OF_GONDOR],
         resourceBase: resourceBase,
         slicing: 0.45,
      });
      cells.push(DOM.div(
      {
         key: "card" + cells.length,
         className: "fl v-top",
      }, element));
      var element = React.createElement(CardImage,
      {
         card: AttachmentCard.properties[AttachmentCard.CITADEL_PLATE],
         isReady: false,
         resourceBase: resourceBase,
         slicing: 0.45,
      });
      cells.push(DOM.div(
      {
         key: "card" + cells.length,
         className: "fl v-top",
      }, element));

      ReactDOM.render(DOM.div(
      {}, cells), document.getElementById("attachmentPanel"));

      cells = [];
      addCardImage(cells, AllyCard.properties[AllyCard.GANDALF_CORE]);
      addCardImage(cells, AttachmentCard.properties[AttachmentCard.STEWARD_OF_GONDOR]);
      addCardImage(cells, EventCard.properties[EventCard.SNEAK_ATTACK]);
      addCardImage(cells, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
      addCardImage(cells, HeroCard.properties[HeroCard.ARAGORN_CORE]);
      addCardImage(cells, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
      addCardImage(cells, ObjectiveCard.properties[ObjectiveCard.SIGNS_OF_GOLLUM]);
      addCardImage(cells, TreacheryCard.properties[TreacheryCard.CAUGHT_IN_A_WEB]);
      addCardImage(cells, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);

      ReactDOM.render(DOM.div(
      {}, cells), document.getElementById("readyPanel"));

      cells = [];
      var isReady = false;
      addCardImage(cells, AllyCard.properties[AllyCard.GANDALF_CORE], isReady);
      addCardImage(cells, AttachmentCard.properties[AttachmentCard.STEWARD_OF_GONDOR], isReady);
      addCardImage(cells, EventCard.properties[EventCard.SNEAK_ATTACK], isReady);
      addCardImage(cells, EnemyCard.properties[EnemyCard.FOREST_SPIDER], isReady);
      addCardImage(cells, HeroCard.properties[HeroCard.ARAGORN_CORE], isReady);
      addCardImage(cells, LocationCard.properties[LocationCard.OLD_FOREST_ROAD], isReady);
      addCardImage(cells, ObjectiveCard.properties[ObjectiveCard.SIGNS_OF_GOLLUM], isReady);
      addCardImage(cells, TreacheryCard.properties[TreacheryCard.CAUGHT_IN_A_WEB], isReady);

      ReactDOM.render(DOM.div(
      {
         className: "mt5 pt5",
      }, cells), document.getElementById("exhaustedPanel"));

      var cells = [];
      var isFaceUp = false;
      isReady = true;
      addCardImage(cells, AllyCard.properties[AllyCard.GANDALF_CORE], isReady, isFaceUp);
      addCardImage(cells, EnemyCard.properties[EnemyCard.FOREST_SPIDER], isReady, isFaceUp);

      ReactDOM.render(DOM.div(
      {}, cells), document.getElementById("faceDownPanel"));

      function addCardImage(cells, card, isReady, isFaceUp)
      {
         var element = React.createElement(CardImage,
         {
            card: card,
            isFaceUp: isFaceUp,
            isReady: isReady,
            myKey: "" + cells.length,
            resourceBase: resourceBase,
         });

         cells.push(DOM.div(
         {
            key: "card" + cells.length,
            className: "bg-lotr-light fl v-top",
         }, element));
      }
   });