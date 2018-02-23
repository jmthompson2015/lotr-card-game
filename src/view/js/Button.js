class Button extends React.Component
{
   render()
   {
      var className = "ba br3 f6 ph2";

      if (this.props.disabled !== undefined)
      {
         className += (this.props.disabled ? " black-50 bg-white-50" : " black bg-white dim");
      }

      return ReactDOMFactories.button(
      {
         key: this.props.myKey,
         className: className,
         onClick: this.props.onClick,
         disabled: this.props.disabled,
      }, this.props.name);
   }
}

Button.propTypes = {
   name: PropTypes.string.isRequired,
   onClick: PropTypes.func.isRequired,

   disabled: PropTypes.bool,
   myKey: PropTypes.string,
};

Button.defaultProps = {
   disabled: false,
};

export default Button;