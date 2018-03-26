/*
 * Provides utility methods for Math.
 */

var MathUtilities = {};

/*
 * @param number The number to round.
 * @param digits The number of digits to appear after the decimal point.
 */
MathUtilities.round = function(number, digits)
{
   var factor = Math.pow(10.0, digits);

   return Math.round(factor * number) / factor;
};

export default MathUtilities;