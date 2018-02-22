var LabeledImage = createReactClass(
{
   render: function()
   {
      var title = this.props.title;
      var label = this.props.label;
      var labelClass = "dtc v-mid " + this.props.labelClass;

      if (!this.props.showOne && label === "1")
      {
         // Hack: weird bottom padding if no label.
         labelClass += " o-0"; // opacity 0 (transparent)
      }

      var cell = ReactDOMFactories.div(
      {
         className: labelClass,
         height: this.props.height,
         width: this.props.width,
      }, label);

      return ReactDOMFactories.div(
      {
         className: "bg-center dt tc",
         title: title,
         style:
         {
            backgroundImage: 'url(' + this.props.resourceBase + this.props.src + ')',
            height: this.props.height,
            width: this.props.width,
         }
      }, cell);
   },
});

LabeledImage.propTypes = {
   label: PropTypes.string.isRequired,
   resourceBase: PropTypes.string.isRequired,
   src: PropTypes.string.isRequired,

   height: PropTypes.number,
   labelClass: PropTypes.string, // default: undefined
   showOne: PropTypes.bool,
   title: PropTypes.string, // default: undefined
   width: PropTypes.number,
};

LabeledImage.defaultProps = {
   height: 32,
   showOne: false,
   width: 32,
};

export default LabeledImage;