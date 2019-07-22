Issuing Service
---------------

**model:** `QmUB6ajZTLLMZg7re1v4hw44aoG8HDQDHr9JyujU264Aw2`

The agent is responsible for checking the data and issuing the green certificates.

The collector service is located [here](https://github.com/DAO-IPCI/collector-service).

## Nodes

* *checker* - listens to demand messages, checks the data is valid and if it's true sends the offer message
* *issuer* - watches for a new liability, packs the log into a result message and sends a transaction to the emitter smart contract with the amount of green certificates

## Params

* `lighthouse` - default value is `0x202a09A451DE674d2d65Bf1C90968a8d8F72cf7b`. Works in the sidechain
* `token` - the value in sidechain is `0x966EbbFD7ECbCF44b1e05341976e0652CFA01360`. Currently the price is 0
* `emitter_contract` - the address of the emitter smart contract
* `validator` - `0x96f2AFE0Dd16393dF8E9Ccb8864F40eD0159956d`. The owner is `0x4af74a76aA7B934C7397FDD0C2428762c8F7c550`
* `order_lifetime` - the deadline, by default 100 blocks
* `keyfile` - a file contains a string that indicates a private key of the sender (the address of CPS) 

## Build

To build the package run:

```
nix build -f release.nix
```

To deploy smart contracts (requires truffle):

```
cd contracts
truffle deploy 
```

## Run

```
source result/setup.zsh
roslaunch issuing_service_agent issuer.launch keyfile:=./keyfile
```
