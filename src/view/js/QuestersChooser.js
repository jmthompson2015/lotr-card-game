"use strict";

define(["create-react-class", "prop-types", "react", "view/js/MultipleCardChooser"],
   function(createReactClass, PropTypes, React, MultipleCardChooser)
   {
      var QuestersChooser = createReactClass(
      {
         render: function()
         {
            var questInstance = this.props.questInstance;
            var remainingPoints = questInstance.card().questPoints - questInstance.progress();
            var message = "Quest: " + questInstance.card().name + " (points " + remainingPoints + ")";

            return React.createElement(MultipleCardChooser,
            {
               cardInstances: this.props.cardInstances,
               onChange: this.props.onChange,
               title: "Select Questers",

               comparator: CardComparator,
               labelFunction: labelFunction,
               message: message,
            });
         },
      });

      var CardComparator = function(a, b)
      {
         var answer = compare(b.willpower(), a.willpower()); // descending

         if (answer === 0)
         {
            answer = compare(a.defense(), b.defense());
         }

         if (answer === 0)
         {
            answer = compare(a.attack(), b.attack());
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
         return value.card().name + " (willpower " + value.willpower() + ")";
      }

      QuestersChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
         onChange: PropTypes.func.isRequired,
         questInstance: PropTypes.object.isRequired,
      };

      return QuestersChooser;
   });
