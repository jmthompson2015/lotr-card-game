var ReducerUtilities = {};

ReducerUtilities.copyObject = function(oldObject)
{
   // Encapsulate the idea of passing a new object as the first parameter
   // to Object.assign to ensure we correctly copy data instead of mutating.
   return Object.assign(
   {}, oldObject);
};

ReducerUtilities.integerOrZero = function(value)
{
   return (Number.isInteger(value) ? value : 0);
};

ReducerUtilities.updateObject = function(oldObject, newValues)
{
   // Encapsulate the idea of passing a new object as the first parameter
   // to Object.assign to ensure we correctly copy data instead of mutating.
   return Object.assign(
   {}, oldObject, newValues);
};

if (Object.freeze)
{
   Object.freeze(ReducerUtilities);
}

export default ReducerUtilities;