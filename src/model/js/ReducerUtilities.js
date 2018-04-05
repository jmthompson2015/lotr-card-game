var ReducerUtilities = {};

ReducerUtilities.addValue = function(state, action, name, key, value)
{
   let oldValue = ReducerUtilities.integerOrZero(state[name][key]);
   let newMap = ReducerUtilities.copyObject(state[name]);
   newMap[key] = oldValue + value;
   let source = {};
   source[name] = newMap;

   return ReducerUtilities.updateObject(state, source);
};

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

ReducerUtilities.set = function(state, key, value)
{
   let source = {};
   source[key] = value;

   return ReducerUtilities.updateObject(state, source);
};

ReducerUtilities.setValue = function(state, action, name, key, value)
{
   let newMap = ReducerUtilities.copyObject(state[name]);
   newMap[key] = value;
   let source = {};
   source[name] = newMap;

   return ReducerUtilities.updateObject(state, source);
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