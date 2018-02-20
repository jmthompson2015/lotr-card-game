"use strict";

require(["react", "react-dom", "react-dom-factories", "react-redux", "redux", "common/js/Logger", "artifact/js/AllyCard", "artifact/js/AttachmentCard",
        "artifact/js/EnemyCard", "artifact/js/EventCard", "artifact/js/HeroCard", "artifact/js/LocationCard", "artifact/js/ObjectiveCard",
        "artifact/js/QuestCard", "artifact/js/Sphere", "artifact/js/TreacheryCard", "model/js/Action", "model/js/CardInstance", "model/js/Reducer",
        "view/js/OptionalEngagementEnemyChooser"
      ],
   function(React, ReactDOM, DOM, ReactRedux, Redux, Logger, AllyCard, AttachmentCard, EnemyCard, EventCard, HeroCard, LocationCard, ObjectiveCard,
      QuestCard, Sphere, TreacheryCard, Action, CardInstance, Reducer, OptionalEngagementEnemyChooser)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var store = Redux.createStore(Reducer.root);
      store.dispatch(Action.setResourceBase(resourceBase));
      var enemies = [];
      enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.BLACK_FOREST_BATS_PTM]));
      enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.DOL_GULDUR_ORCS]));
      enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]));

      var element = React.createElement(OptionalEngagementEnemyChooser,
      {
         cardInstances: enemies,
         onChange: myOnChange,
      });

      ReactDOM.render(element, document.getElementById("panel"));

      function myOnChange(selected, isAccepted)
      {
         LOGGER.info("myOnChange() selected = " + selected + " isAccepted ? " + isAccepted);
      }
   });