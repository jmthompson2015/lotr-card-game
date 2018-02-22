var GameHeader = {
   FORCED: "forced",
   SETUP: "setup",
   SHADOW: "shadow",
   TRAVEL: "travel",
   WHEN_REVEALED: "whenRevealed",

   properties:
   {
      "forced":
      {
         name: "Forced",
         key: "forced",
      },
      "setup":
      {
         name: "Setup",
         key: "setup",
      },
      "shadow":
      {
         name: "Shadow",
         key: "shadow",
      },
      "travel":
      {
         name: "Travel",
         key: "travel",
      },
      "whenRevealed":
      {
         name: "When Revealed",
         key: "whenRevealed",
      },
   },

   keys: function()
   {
      return Object.getOwnPropertyNames(GameHeader.properties);
   },
};

if (Object.freeze)
{
   Object.freeze(GameHeader);
}

export default GameHeader;