# PokeTypes: A Pokemon-Inspired Speed Typing Game

Type the names of the Pokemon as they appear on the screen before the time runs out to score points! This game was built in React as a project for Juno College's Immersive Web Development Bootcamp. Pokemon names and image urls are returned from the <a href="https://pokeapi.co/">PokeAPI</a>. Play the game <a href="https://robinnong.github.io/poketypes/">here</a>.

NOTICE: The PokeAPI is rate limited at 100 calls per minute - please don't try to start a new game more than 2 times within a minute or else you will receive an error. Thanks!

Dependencies:
- <a href="https://www.npmjs.com/package/react-full-screen">React Fullscreen</a>
- <a href="https://www.npmjs.com/package/axios">Axios</a>
- <a href="https://github.com/PokeAPI/pokedex-promise-v2">Poke Promsie</a>

To-do: 
 - Refactor animations with React hooks and React Transition Group components
 - Add music, initiated on first page load
 - Fix the initial image loading time and cache images in the user's browser on game load
 - Add simple Redux state management
 - Add error counter (max 3 errors, then it's an instant game over)
 - Add Typescript
 - Add options for the user to customize game settings (example, only show Pokemon from a certain generation)
