"use strict";

require(["react", "react-dom", "react-dom-factories", "react-redux", "redux", "common/js/Logger", "artifact/js/AllyCard", "artifact/js/AttachmentCard",
        "artifact/js/EnemyCard", "artifact/js/EventCard", "artifact/js/HeroCard", "artifact/js/LocationCard", "artifact/js/ObjectiveCard",
        "artifact/js/QuestCard", "artifact/js/Sphere", "artifact/js/TreacheryCard", "model/js/Action", "model/js/CardInstance", "model/js/Reducer",
        "view/js/SingleCardChooser"
      ],
   function(React, ReactDOM, DOM, ReactRedux, Redux, Logger, AllyCard, AttachmentCard, EnemyCard, EventCard, HeroCard, LocationCard, ObjectiveCard,
      QuestCard, Sphere, TreacheryCard, Action, CardInstance, Reducer, SingleCardChooser)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var store = Redux.createStore(Reducer.root);
      store.dispatch(Action.setResourceBase(resourceBase));
      var cardInstances = [];
      cardInstances.push(new CardInstance(store, AllyCard.properties[AllyCard.BEORN]));
      cardInstances.push(new CardInstance(store, AllyCard.properties[AllyCard.BIFUR]));
      cardInstances.push(new CardInstance(store, AllyCard.properties[AllyCard.DENETHOR]));
      cardInstances.push(new CardInstance(store, AttachmentCard.properties[AttachmentCard.A_BURNING_BRAND]));
      cardInstances.push(new CardInstance(store, AttachmentCard.properties[AttachmentCard.BLACK_ARROW]));
      cardInstances.push(new CardInstance(store, AttachmentCard.properties[AttachmentCard.CELEBRIANS_STONE]));
      cardInstances.push(new CardInstance(store, EventCard.properties[EventCard.ADVANCE_WARNING]));
      cardInstances.push(new CardInstance(store, EventCard.properties[EventCard.BEHIND_STRONG_WALLS]));
      cardInstances.push(new CardInstance(store, EventCard.properties[EventCard.CAMPFIRE_TALES]));
      cardInstances.lotrShuffle();

      var element1 = React.createElement(SingleCardChooser,
      {
         cardInstances: cardInstances.slice(),
         onChange: myOnChange,
         title: "Select a card",
      });

      ReactDOM.render(element1, document.getElementById("panel1"));

      var element2 = React.createElement(SingleCardChooser,
      {
         cardInstances: cardInstances.slice(),
         onChange: myOnChange,
         title: "Select a card",
         comparator: function(a, b)
         {
            return a.card().cost - b.card().cost;
         },
         labelFunction: function(value)
         {
            return value.card().name + " [" + value.card().cost + "]";
         },
         message: "DO SOMETHING!",
      });

      ReactDOM.render(element2, document.getElementById("panel2"));

      function myOnChange(selected, isAccepted)
      {
         LOGGER.info("myOnChange() selected = " + selected + " isAccepted ? " + isAccepted);
      }
   });