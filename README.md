Renewable Enegry Agent
-------------------------

## Nodes

* *trader_node* - to work on offchain negotiations process

## Params

In the `launch/trader.launch`:

* `lighthouse` - default value is "0x202a09A451DE674d2d65Bf1C90968a8d8F72cf7b". Works in the sidechain
* `model` - QmUB6ajZTLLMZg7re1v4hw44aoG8HDQDHr9JyujU264Aw2
* `objective` - QmVAFgUxBitKqtV2sjaYcHkKfcAPVy3GswhaE5n5bcgLkf
* `token` - the value in sidechain is "0x966EbbFD7ECbCF44b1e05341976e0652CFA01360". Currently the price is 0
* `validator` - 0x17B82177D8753bd8090dadA60B953CFaDD9eF492. The owner is 0x4af74a76aA7B934C7397FDD0C2428762c8F7c550
* `order_lifetime` - 100

## Build

```
nix build -f release.nix
```

## Run

```
source result/setup.zsh
roslaunch renewable-enegry-agent trader.launch
```
