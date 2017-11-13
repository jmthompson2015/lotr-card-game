"use strict";

define(["create-react-class", "prop-types", "react", "view/js/SingleCardChooser"],
   function(createReactClass, PropTypes, React, SingleCardChooser)
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
               comparator: CardComparator,
               labelFunction: labelFunction,
            });
         },
      });

      var CardComparator = function(a, b)
      {
         var answer = compare(b.threat(), a.threat());

         if (answer === 0)
         {
            answer = compare(a.questPoints(), b.questPoints());
         }

         if (answer === 0)
         {
            answer = compare(a.card().name, b.card().name);
         }

         return answer;
      };

      function compare(a, b)
      {
         return (a === b ? 0 : (a > b ? 1 : -1));
      }

      function labelFunction(value)
      {
         return value.card().name + " (quest " + value.card().questPoints + ", threat " + value.card().threat + ")";
      }

      LocationChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
      };

      return LocationChooser;
   });
