"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/InputPanel", "view/js/OptionPane"],
   function(createReactClass, PropTypes, React, DOM, InputPanel, OptionPane)
   {
      var UndefendedAttackHeroChooser = createReactClass(
      {
         render: function()
         {
            var cardInstances = this.props.cardInstances;

            var labelFunction = function(value)
            {
               return value.card().name + " (defense " + value.card().defense + ")";
            };

            var initialInput = React.createElement(InputPanel,
            {
               type: InputPanel.Type.RADIO,
               values: cardInstances,
               name: "selectHero",
               labelFunction: labelFunction,
               onChange: this.myOnChange,
               panelClass: "f6 tl",
            });

            var title = "Select Hero";
            var buttons = DOM.span();

            return React.createElement(OptionPane,
            {
               panelClass: "bg-lotr-light",
               title: title,
               titleClass: "bg-lotr-dark",
               message: "for undefended damage",
               messageClass: "ma2 pa2",
               initialInput: initialInput,
               buttons: buttons,
            });
         },

         myOnChange: function(event, selected)
         {
            var isAccepted = (selected !== undefined);
            this.props.onChange(selected, isAccepted);
         },

         pass: function()
         {
            var isAccepted = false;
            this.props.onChange(undefined, isAccepted);
         },
      });

      UndefendedAttackHeroChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
      };

      return UndefendedAttackHeroChooser;
   });
