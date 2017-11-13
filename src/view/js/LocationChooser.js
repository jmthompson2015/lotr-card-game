"use strict";

define(["create-react-class", "prop-types", "react", "view/js/CardComparator", "view/js/SingleCardChooser"],
   function(createReactClass, PropTypes, React, CardComparator, SingleCardChooser)
   {
      var LocationChooser = createReactClass(
      {
         render: function()
         {
            return React.createElement(SingleCardChooser,
            {
               cardInstances: this.props.cardInstances,
               onChange: this.props.onChange,
               title: "Select Travel Location",
               comparator: CardComparator.ThreatQuestName,
               labelFunction: labelFunction,
            });
         },
      });

      function labelFunction(value)
      {
         return value.card().name + " (threat " + value.threat() + ", quest " + value.questPoints() + ")";
      }

      LocationChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
      };

      return LocationChooser;
   });
