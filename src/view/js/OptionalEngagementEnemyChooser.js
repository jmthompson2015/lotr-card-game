"use strict";

define(["create-react-class", "prop-types", "react", "view/js/SingleCardChooser"],
   function(createReactClass, PropTypes, React, SingleCardChooser)
   {
      var OptionalEngagementEnemyChooser = createReactClass(
      {
         render: function()
         {
            return React.createElement(SingleCardChooser,
            {
               cardInstances: this.props.cardInstances,
               onChange: this.props.onChange,
               title: "Select Enemy",
               comparator: CardComparator,
               labelFunction: labelFunction,
               message: "for optional engagement",
            });
         },
      });

      var CardComparator = function(a, b)
      {
         var answer = compare(a.defense(), b.defense());

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
         return value.card().name + " (defense " + value.defense() + ")";
      }

      OptionalEngagementEnemyChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
      };

      return OptionalEngagementEnemyChooser;
   });
