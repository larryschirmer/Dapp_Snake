# Dapp Snake!

Donate! If you want to... (eth) `0x9495BA0b81f92d45C2F4cE2d4d2209e6ebdE787A`

### A decentralized game built with React and Ethereum

# How to play

[Rinkeby Network Demo](https://ipfs.io/ipfs/QmT7TMLfZs3A3TtTQsqxJHtoFzp9yxrHBj4wMpbPpUEbYs) - Make sure to have [Metamask](https://medium.com/@followcoin/how-to-install-metamask-88cbdabc1d28) installed and connected the the Rinkeby Network

#### App deployed on [IPFS](https://ipfs.io/) and Ethereum Rinkeby

## The Main Screen

![The Main Screen](https://raw.githubusercontent.com/larryschirmer/Dapp_Snake/master/repo_assets/Main%20Screen.png)

## Signin

![Signin](https://raw.githubusercontent.com/larryschirmer/Dapp_Snake/master/repo_assets/Signin.png)

## Play

![Play 1](https://raw.githubusercontent.com/larryschirmer/Dapp_Snake/master/repo_assets/Play%201.png)
![Play 2](https://raw.githubusercontent.com/larryschirmer/Dapp_Snake/master/repo_assets/Play%202.png)

## Submiting your score

![Submitting your score](https://raw.githubusercontent.com/larryschirmer/Dapp_Snake/master/repo_assets/Submit%20Your%20Score.png)

## Deploy Your Own

### Clone repo

`git clone https://github.com/larryschirmer/Dapp_Snake.git`

### Install project

`yarn install`

**Notes**
This project was built with yarn `1.6.0`, npm `6.0.0`, and node.js `10.0.0`. Web3 and the other projects for which this app depend are still in beta so they _might_ give trouble. I also didn't have much luck installing with npm so maybe install with yarn.

### Add config file

#### While inside your directory

```
  +-- /node_modules
  +-- /public
  +-- /src
  +-- /ethereum
  |   |
  |   `-- \build
  |   `-- compile.js
  |   `-- deploy.js
  |   `-- **config.json**
  |
  +-- package.json
  +-- ...
  +-- **config.json
```

#### Add a new file named `config.json`

```json
{
  "seedWords": "one two three four five six seven eight nine ten eleven twelve",
  "providerURL": "rinkeby infura provider url",
  "address": "contract address"
}
```

* [How to install metamask and get twelve word phrase](https://medium.com/@followcoin/how-to-install-metamask-88cbdabc1d28)
* [How to get an infura provider url](https://blog.infura.io/getting-started-with-infura-28e41844cc89)
* **Getting a contract address is coming up, see below**

#### Test that everything is running well

`yarn test_contract`

**Notes**
This uses jest to run the test in the ethereum directory. It covers the basic functionality of the contract. Also, I had to run `brew install watchman` during development. I'm not sure if I needed it to run tests with jest (maybe it was to run the test with mocha? It's all so blurry)

#### Deploy Contract

Everybody's favorite part
**Note: make sure the config.json file has been added to the directory before running this command. It's important**

`yarn deploy`

##### Capture console output

The console will show that it is attempting the deploy the contract to the rinkeby network. After 60 or 90 seconds (¯\_(ツ)\_/¯) it will show the address to the contract on the network.

**Take the output for the address of the contract and copy it in config.json, and we'll need it in two more places... coming up, so put it in a safe place**

#### Prefill the scores

This is a bug in the front-end. It needs at least three scores before it will render properly

See `dapp_snake/src/fetch/getScores.js` line 43 - 45 for details

I used the [http://remix.ethereum.org/](http://remix.ethereum.org/) website to do this.

1.  Create an instance of the contract with the address you promised with keep in a safe place.
2.  Use the `setName` method to give yourself a name
3.  Use the `setScore` method to give yourself a modest score (maybe zero)
4.  Repeat step 3 a second and third time

#### Update the address in a second config file

The contract address is used one more time in the final configuration file

```
  +-- /node_modules
  +-- /public
  +-- /src
  |   |
  |   `-- /fetch
  |   `-- /functions
  |   `-- ...
  |   `-- **contractConfig.json**
  +-- /ethereum
  +-- package.json
```

##### Update the contractAddress property

```json
{
  "contractAddress": "Update This",
  "contractInterface": "This is the contract interface, it's ok to leave this"
}
```

##### Apologize for how involved this deploy process is

So Sorry

##### Run the app locally

`yarn start`

# A Work in progress

## Pull requests are welcome

1.  Make it look way better (starting with redrawing that snake, it looked so much better in my head)
2.  Handle waiting for the network to process requests

* Right now, it updates the user name after signup but does nothing after a user submits a score

3.  Dry up state by moving everything into a single redux store
4.  Remove the need to have to send the user's address to the contract methed on each request

# See other great repositories

These three repositories were helpful in creating this project, thanks

* [Jordan Eldredge - Game Logic](https://github.com/captbaritone/snake.js)
* [Steven Gridder - Dapp Templates](https://github.com/StephenGrider/EthereumCasts)
* [Siraj Raval - Your_First_Decentralized_Application](https://github.com/llSourcell/Your_First_Decentralized_Application)
