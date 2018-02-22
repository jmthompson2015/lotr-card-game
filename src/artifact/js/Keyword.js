var Keyword = {
   RANGED: "ranged",
   RESTRICTED: "restricted",
   SENTINEL: "sentinel",

   properties:
   {
      "ranged":
      {
         name: "Ranged",
         description: "This character can be declared by its controller as an attacker against enemies engaged with other players. " +
            "This can be declared when its owner is declaring attacks, or it can participate in attacks declared by other players. " +
            "The character must exhaust and meet any other necessary requirements.",
         key: "ranged",
      },
      "restricted":
      {
         name: "Restricted",
         description: "A character can never have more than 2 restricted attachments. " +
            "If a third is ever attached, one must immediately be moved to its owner's discard pile.",
         key: "restricted",
      },
      "sentinel":
      {
         name: "Sentinel",
         description: "The character can be declared by its controller as a defender during enemy attacks made against other players. " +
            "Sentinel defense can be declared after the engaged player declares 'no defenders'. " +
            "The character must exhaust and meet any other necessary requirements.",
         key: "sentinel",
      },
   },
};

Keyword.keys = function()
{
   return Object.keys(Keyword.properties);
};

Keyword.values = function()
{
   return Object.values(Keyword.properties);
};

if (Object.freeze)
{
   Object.freeze(Keyword);
}

export default Keyword;