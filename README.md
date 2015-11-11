# RedFlow Universal Example

This is a sample application using React, RedFlow Flux variant with immutable collections via mori and Director isomorphic router.

This example uses React server-side rendering capabilities to run client routes both in client and server, dispatch actions that modify the atom and then re-hydrate the client-side atom with data sent from the server.

It's a simple CRUD of contact objects, but requires a logged-in user to create/edit/delete contacts.

## Installation & running
This one uses latest versions of everything (as of Nov 11): Babel 6, React 14, etc, and it's being developed on node.js v4+

```
npm install
```
To start the webpack bundling with --watch flag:
```
npm run watch
```

To start the server (will take long, babel has to transpile on the fly);
```
nodemon index.js
```

or if you don't mind restarting manually the server:

```
npm start
```


## How it works
1. On the client side, it's a standard Redflow application (atom, Stores, eventEmitter-style Dispatcher)
2. We use Director's async routing feature, so we can KNOW when all actions are finished and so we can render the app with a proper atom state.
3. On the server side, we translate Director's client routes to server-compatible ones
4. On each request (for a page), the full Redflow app will be run (atom will be initialized to its default state, route handlers will dispatch actions that fetch data from the API and React will render the whole app tree).

## Requirements
1. node.js v4 (.nvmrc file included)
2. React 0.14+
3. `babel-node` from `babel-cli` available globally
4. Careful as Babel 6 introduces some big breaking changes, you should do `npm install -g babel-core` or `npm update -g babel-core`
5. Start webpack bundling with `npm run watch`
6. Start server with `npm start` (will try to execute `babel-node src/server.js`)

## Work ahead
1. Better JSX-compilation and ES6 for node (don't have --watch with babel-node)

 
