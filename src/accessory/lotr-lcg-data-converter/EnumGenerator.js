import NameGenerator from "./NameGenerator.js";

var EnumGenerator = {};

EnumGenerator.asString = function(generated)
{
   let nameValuePairs = generated.nameValuePairs;
   let properties = generated.properties;
   nameValuePairs.sort(comparator);

   let content = "";

   nameValuePairs.forEach(item =>
   {
      content += item.enumName;
      content += ": \"";
      content += item.enumValue;
      content += "\",\n";
   });

   content += "\nproperties: {\n";

   let keys = Object.keys(properties);
   keys.sort();

   keys.forEach(key =>
   {
      let card = properties[key];
      content += "\"" + key + "\": ";
      content += JSON.stringify(card);
      content += ",\n";
   });

   content += "}\n";

   return content;
};

EnumGenerator.createNameValuePairs = function(data)
{
   let nameValuePairs = [];

   data.forEach(card =>
   {
      // let name = card.name + "_" + card.pack_code;
      let enumName = NameGenerator.createEnumName(card);
      let enumValue = NameGenerator.createEnumValue(card);

      nameValuePairs.push(
      {
         enumName: enumName,
         enumValue: enumValue,
      });
   });

   return nameValuePairs;
};

EnumGenerator.createProperties = function(data)
{
   let properties = {};

   data.forEach(card =>
   {
      // let name = card.name + "_" + card.pack_code;
      let enumValue = NameGenerator.createEnumValue(card);
      let props = {};

      props.name = card.name;
      props = maybeAddProperty(props, "threat", card.threat, "threatCost");
      props = maybeAddProperty(props, "cost", card.cost, "threatCost");
      props = maybeAddProperty(props, "willpower", card.willpower);
      props = maybeAddProperty(props, "attack", card.attack);
      props = maybeAddProperty(props, "defense", card.defense);
      props = maybeAddProperty(props, "health", card.health, "hitPoints");
      props = maybeAddProperty(props, "traits", card.traits);
      props = maybeAddProperty(props, "sphere_code", card.sphere_code, "sphereKey");

      props = maybeAddProperty(props, "encounter_set", card.encounter_set);
      props = maybeAddProperty(props, "is_unique", card.is_unique);
      props = maybeAddProperty(props, "sequence", card.sequence);
      props = maybeAddProperty(props, "quest_points", card.quest_points);
      props = maybeAddProperty(props, "encounter_sets", card.encounter_sets);
      props = maybeAddProperty(props, "image", card.image);

      props.pack_code = card.pack_code;
      props.cardSetNumber = card.position;
      props.key = enumValue;

      properties[enumValue] = props;
   });

   return properties;
};

EnumGenerator.generate = function(data)
{
   let nameValuePairs = EnumGenerator.createNameValuePairs(data);
   let properties = EnumGenerator.createProperties(data);

   return (
   {
      nameValuePairs: nameValuePairs,
      properties: properties,
   });
};

function comparator(a, b)
{
   let answer = compare(a.enumName, b.enumName);

   if (answer === 0)
   {
      answer = compare(a.enumValue, b.enumValue);
   }

   return answer;
}

function compare(a, b)
{
   return (a === b ? 0 : (a > b ? 1 : -1));
}

function maybeAddProperty(props, name, value, newName)
{
   if (value !== undefined)
   {
      let myName = (newName !== undefined ? newName : name);
      props[myName] = value;
   }

   return props;
}

export default EnumGenerator;