# Memory Card Game

## Project Content

Memory card game starting by offerring selection of cards ([4, 8, 12]). By cliking of the each card, random set of numbers retrieving from backend via api call. At this stage user expecting to order the cards after first seen of them. When the game finishes, gaming history is storing. 
## Tech Stack

```
### Client Side:

Vue.js
Vuex
Vue-moment
Vue-jest
axios

### Server side:

Node.js
Express.js
Jest
Superagent
Supertest

```

## Project setup
```
### For Both Client and Server side

npm install
```

### Compiles and hot-reloads for development
```
### For Client side 

npm run serve

### For Server side

npm start
```

### Compiles and minifies for production
```
### For Both Client and Server side

npm run build
```

### Lints and fixes files
```
### For Both Client and Server side

npm run lint
```

### Running tests
```
### For Client side

npm run test:unit

### For Server side

npm run test
```

### Project URLs

```
Game: http://localhost:8080/

Server: http://localhost:3000

Selection of numbers : http://localhost:3000/api/v1

Random numbers: http://localhost:3000/api/v1/numbers?size=<number>

History of game: http://localhost:3000/api/v1/results

```
