var ReactUtilities = {};

ReactUtilities.createCell = function(element, key, className)
{
   return ReactDOMFactories.div(
   {
      key: key,
      className: "dtc" + (className ? " " + className : ""),
   }, element);
};

ReactUtilities.createRow = function(cells, key, className)
{
   return ReactDOMFactories.div(
   {
      key: key,
      className: "dt-row" + (className ? " " + className : ""),
   }, cells);
};

ReactUtilities.createTable = function(rows, key, className)
{
   return ReactDOMFactories.div(
   {
      key: key,
      className: "dt" + (className ? " " + className : ""),
   }, rows);
};

export default ReactUtilities;