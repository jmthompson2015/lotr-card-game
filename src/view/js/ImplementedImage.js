class ImplementedImage extends React.Component
{
   render()
   {
      var isImplemented = this.props.isImplemented;
      var answer;

      if (isImplemented !== undefined)
      {
         var resourceBase = this.props.resourceBase;
         var src = resourceBase + "icon/" + (isImplemented ? "accept.png" : "delete.png");
         var title = (isImplemented ? "Implemented" : "Not Implemented");

         answer = ReactDOMFactories.img(
         {
            src: src,
            title: title,
         });
      }
      else
      {
         answer = ReactDOMFactories.span(
         {});
      }

      return answer;
   }
}

ImplementedImage.propTypes = {
   resourceBase: PropTypes.string.isRequired,

   isImplemented: PropTypes.bool,
};

export default ImplementedImage;