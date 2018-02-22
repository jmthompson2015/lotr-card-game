var SphereUI = createReactClass(
{
   render: function()
   {
      var sphere = this.props.sphere;
      var myKey = (this.props.myKey !== undefined ? this.props.myKey : sphere.key);
      var size = (this.props.isSmall ? 24 : 32);
      var src = this.props.resourceBase + "sphere/" + sphere.name + size + ".png";
      var icon = ReactDOMFactories.img(
      {
         key: myKey,
         className: "v-mid",
         height: size,
         src: src,
         title: sphere.name,
      });

      var answer = icon;
      var showName = this.props.showName;

      if (showName)
      {
         answer = ReactDOMFactories.span(
         {}, icon, " ", sphere.name);
      }

      return answer;
   },
});

SphereUI.propTypes = {
   resourceBase: PropTypes.string.isRequired,
   sphere: PropTypes.object.isRequired,

   isSmall: PropTypes.bool,
   myKey: PropTypes.string, // default: sphere key
   showName: PropTypes.bool,
};

SphereUI.defaultProps = {
   isSmall: false,
   showName: false,
};

export default SphereUI;