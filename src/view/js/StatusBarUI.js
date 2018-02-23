class StatusBarUI extends React.Component
{
   render()
   {
      var round = this.props.round;
      var phase = this.props.phase;
      var phaseName = (phase ? phase.name : " ");
      var activeAgentName = (this.props.activeAgentName ? this.props.activeAgentName : " ");
      var userMessage = this.props.userMessage;

      var roundUI = ReactDOMFactories.span(
      {}, "Round: ", round);
      var phaseUI = ReactDOMFactories.span(
      {}, "Phase: ", phaseName);
      var activePilotUI = ReactDOMFactories.span(
      {}, "Active Agent: ", activeAgentName);
      var messageAreaUI = ReactDOMFactories.span(
      {}, userMessage);
      var helpLinkUI = ReactDOMFactories.a(
      {
         href: "view/html/help.html",
         target: "_blank",
      }, "Help");

      var cells = [];

      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
         className: "ba",
      }, roundUI));
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
         className: "ba",
      }, phaseUI));
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
         className: "ba",
      }, activePilotUI));
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
         className: "ba",
      }, messageAreaUI));
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
         className: "ba",
      }, helpLinkUI));

      var row = ReactDOMFactories.tr(
      {}, cells);

      return ReactDOMFactories.table(
      {
         className: "bg-lotr-light w-100",
      }, ReactDOMFactories.tbody(
      {}, row));
   }
}

StatusBarUI.propTypes = {
   activeAgentName: PropTypes.string.isRequired,
   phase: PropTypes.object.isRequired,
   round: PropTypes.number.isRequired,
   userMessage: PropTypes.string.isRequired,
};

export default StatusBarUI;