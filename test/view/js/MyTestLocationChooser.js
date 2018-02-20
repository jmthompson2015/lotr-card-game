"use strict";

require(["react", "react-dom", "react-dom-factories", "react-redux", "redux", "common/js/Logger", "artifact/js/AllyCard", "artifact/js/AttachmentCard",
        "artifact/js/EnemyCard", "artifact/js/EventCard", "artifact/js/HeroCard", "artifact/js/LocationCard", "artifact/js/ObjectiveCard",
        "artifact/js/QuestCard", "artifact/js/Sphere", "artifact/js/TreacheryCard", "model/js/Action", "model/js/CardInstance", "model/js/Reducer",
        "view/js/LocationChooser"
      ],
   function(React, ReactDOM, DOM, ReactRedux, Redux, Logger, AllyCard, AttachmentCard, EnemyCard, EventCard, HeroCard, LocationCard, ObjectiveCard,
      QuestCard, Sphere, TreacheryCard, Action, CardInstance, Reducer, LocationChooser)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var store = Redux.createStore(Reducer.root);
      store.dispatch(Action.setResourceBase(resourceBase));
      var locations = [];
      locations.push(new CardInstance(store, LocationCard.properties[LocationCard.ENCHANTED_STREAM]));
      locations.push(new CardInstance(store, LocationCard.properties[LocationCard.FOREST_GATE]));
      locations.push(new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]));

      var element = React.createElement(LocationChooser,
      {
         cardInstances: locations,
         onChange: myOnChange,
      });

      ReactDOM.render(element, document.getElementById("panel"));

      function myOnChange(selected, isAccepted)
      {
         LOGGER.info("myOnChange() selected = " + selected + " isAccepted ? " + isAccepted);
      }
   });