# dnd-dungeon-master

Using OpenAI ChatGPT and Dall-E, run a D&D game and show pictures of the current scene.
Uses vue & tailwind, initial code generated by ChatGPT.

Keep your developer console open, there is no visual feedback when the app is loading or when an error happens. After around 20 interactions you will exceed the token limit because of all the history I have to keep sending back, I haven't tried the compression trick yet.

The chat API is pretty inconsistent and it's likely that something will break. Reload a couple times. I'm looking for ways to improve my prompts, they're pretty bad right now.

## Project setup
```
yarn install
cp .env-example .env
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
