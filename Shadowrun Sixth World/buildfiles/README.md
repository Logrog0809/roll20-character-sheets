# Shadowrun 6th Edition Character Sheet for Roll20.net

A character sheet for Shadowrun 6e for use in Roll20. Planned feature's & stuff can be found [here](https://trello.com/b/nvwz9GWl/shadowrun-6e-roll20-character-sheet).

## Requirements

To work on the project, ensure you have [NodeJS](https://nodejs.org/) installed, then run `npm install` in the root directory. Happy hunting!

## Programming Conventions

  1. `mixins.pug` has a lot of pug templates and helper functions for you to use
  2. Please use the `attr()` method for field names
  3. All stored attributes should be kept in `attributenames.json`.
  4. Use mixins and small components as much as possible
  5. When setting i18n data, use the `i18nize()` function

## Legal Stuff

Because I'm scared Topps is gonna try to hunt us down:

The Topps Company, Inc. has sole ownership of the names, logo, artwork, marks, photographs, sounds, audio, video and/or any proprietary material used in connection with the game Shadowrun. The Topps Company, Inc. has granted permission to use such names, logos, artwork, marks and/or any proprietary materials for promotional and informational purposes on its website but does not endorse, and is not affiliated with any official capacity whatsoever.