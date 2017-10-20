/*
 * Provides a React component which emulates a Java
 * <a href="http://docs.oracle.com/javase/6/docs/api/javax/swing/JOptionPane.html">JOptionPane</a>.
 */
"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories"],
   function(createReactClass, PropTypes, React, DOM)
   {
      var OptionPane = createReactClass(
      {
         propTypes:
         {
            buttons: PropTypes.object.isRequired,
            message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
            title: PropTypes.string.isRequired,

            initialInput: PropTypes.object,
            icon: PropTypes.object,
         },

         getInitialState: function()
         {
            return (
            {
               input: this.props.initialInput
            });
         },

         render: function()
         {
            var rows = [];

            var cell0 = DOM.td(
            {
               colSpan: 2,
               className: "bg-lotr-medium tc",
            }, this.props.title);
            rows.push(DOM.tr(
            {
               key: 0
            }, cell0));

            var cell10 = DOM.td(
            {
               key: 0,
               rowSpan: 2,
            }, this.props.icon);
            var cell11 = DOM.td(
            {
               key: 1,
            }, this.props.message);
            rows.push(DOM.tr(
            {
               key: 1
            }, [cell10, cell11]));

            var cell2 = DOM.td(
            {}, this.state.input);
            rows.push(DOM.tr(
            {
               key: 2
            }, cell2));

            var cell3 = DOM.td(
            {
               colSpan: 2,
               className: "pa2 tr",
            }, this.props.buttons);
            rows.push(DOM.tr(
            {
               key: 3
            }, cell3));

            return DOM.table(
            {
               className: "ba b--lotr-medium bg-lotr-light center v-top",
            }, DOM.tbody(
            {}, rows));
         }
      });

      return OptionPane;
   });
