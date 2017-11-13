"use strict";

define(["create-react-class", "prop-types", "react", "view/js/SingleCardChooser"],
   function(createReactClass, PropTypes, React, SingleCardChooser)
   {
      var EnemyDefenderChooser = createReactClass(
      {
         render: function()
         {
            return React.createElement(SingleCardChooser,
            {
               cardInstances: this.props.cardInstances,
               onChange: this.props.onChange,
               title: "Select Enemy Defender",
               comparator: CardComparator,
               labelFunction: labelFunction,
            });
         },
      });

      var CardComparator = function(a, b)
      {
         var answer = compare(a.defense(), b.defense);

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

      EnemyDefenderChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
         onChange: PropTypes.func.isRequired,
      };

      return EnemyDefenderChooser;
   });
