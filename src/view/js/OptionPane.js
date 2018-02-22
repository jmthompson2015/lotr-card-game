/*
 * Provides a React component which emulates a Java
 * <a href="http://docs.oracle.com/javase/6/docs/api/javax/swing/JOptionPane.html">JOptionPane</a>.
 */

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

      var cell0 = ReactDOMFactories.td(
      {
         colSpan: 2,
         className: "bg-lotr-medium tc",
      }, this.props.title);
      rows.push(ReactDOMFactories.tr(
      {
         key: 0
      }, cell0));

      var cell10 = ReactDOMFactories.td(
      {
         key: 0,
         rowSpan: 2,
      }, this.props.icon);
      var cell11 = ReactDOMFactories.td(
      {
         key: 1,
      }, this.props.message);
      rows.push(ReactDOMFactories.tr(
      {
         key: 1
      }, [cell10, cell11]));

      var cell2 = ReactDOMFactories.td(
      {}, this.state.input);
      rows.push(ReactDOMFactories.tr(
      {
         key: 2
      }, cell2));

      var cell3 = ReactDOMFactories.td(
      {
         colSpan: 2,
         className: "pa2 tr",
      }, this.props.buttons);
      rows.push(ReactDOMFactories.tr(
      {
         key: 3
      }, cell3));

      return ReactDOMFactories.table(
      {
         className: "ba b--lotr-medium bg-lotr-light center v-top",
      }, ReactDOMFactories.tbody(
      {}, rows));
   }
});

export default OptionPane;