"use strict";

define(["create-react-class", "prop-types", "react", "view/js/SingleCardChooser"],
   function(createReactClass, PropTypes, React, SingleCardChooser)
   {
      var PlayCardChooser = createReactClass(
      {
         render: function()
         {
            return React.createElement(SingleCardChooser,
            {
               cardInstances: this.props.cardInstances,
               onChange: this.props.onChange,
               title: "Select Card to Play",
               comparator: CardComparator,
               labelFunction: labelFunction,
            });
         },
      });

      var CardComparator = function(a, b)
      {
         var cardA = a.card();
         var cardB = b.card();

         var answer = compare(cardA.cardTypeKey, cardB.cardTypeKey);

         if (answer === 0)
         {
            answer = compare(cardB.cost, cardA.cost); // descending
         }

         if (answer === 0)
         {
            answer = compare(cardA.sphereKey, cardB.sphereKey);
         }

         if (answer === 0)
         {
            answer = compare(cardA.name, cardB.name);
         }

         return answer;
      };

      function compare(a, b)
      {
         return (a === b ? 0 : (a > b ? 1 : -1));
      }

      function labelFunction(value)
      {
         var card = value.card();
         return card.name + " (" + card.cardType.name + ", " + card.sphere.name + " " + card.cost + ")";
      }

      PlayCardChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
         onChange: PropTypes.func.isRequired,
      };

      return PlayCardChooser;
   });
