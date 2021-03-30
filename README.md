Issuing Service
---------------

**model:** `QmfK3LyEPLoYJCKXate1PceGLBNBaodwqcV9XirwHZFbsc`

The agent is responsible for checking the data and issuing the green certificates.

The collector service is located [here](https://github.com/DAO-IPCI/collector-service).

## Nodes

### Checker

Listens to demand messages, checks the data is valid and if it's true sends the offer message.
It expects an objective with the following topic:

* `/log` - IPFS hash to the log file

All the left topics are skipped.

Parameters:

* `lighthouse` - default value is `0x202a09A451DE674d2d65Bf1C90968a8d8F72cf7b` (sidechain)
* `token` - the value in sidechain is `0x966EbbFD7ECbCF44b1e05341976e0652CFA01360`. Currently the price is 0
* `validator` - `0x96f2AFE0Dd16393dF8E9Ccb8864F40eD0159956d`. The owner is `0x4af74a76aA7B934C7397FDD0C2428762c8F7c550`
* `order_lifetime` - the deadline, by default 100 blocks

### Issuer

Watches for a new liability, packs the log into a result message and sends a transaction to the emitter smart contract with the amount of green certificates

Parameters:

* `web3_http_provider` - the address of Web3 RPC
* `emitter_contract` - the address of the emitter smart contract
* `private_key` - a string that indicates a private key of the sender (the address of CPS)

Result message contains the following topics:

* `/liability/eth_<liability_address>/log` - contains the same log as in `/log` topic
* `/liability/eth_<liability_address>/period_start` - the beginning of measurement
* `/liability/eth_<liability_address>/period_end` - the ending of measurement
* `/liability/eth_<liability_address>/token` - the address of the token in Ethereum
* `/liability/eth_<liability_address>/total_production` - the amount of produced energy
* `/liability/eth_<liability_address>/unit` - the unit of energy
* `/liability/eth_<liability_address>/txhash` - the hash of sent transaction

Every topic's type is `std_msgs/String`

## Smart Contracts

During its work the issuer node sends a transaction to a smart contract by address `emitter_contract`.

There are all the necessary contracts deployed to [sidechain](https://github.com/airalab/airalab-sidechain) network, but the easiest way to create a new set of contracts is:

```
cd contracts
truffle deploy
```

For more information look at the [README.md](contracts/README.md) file in contracts folder.

## Build

To build the package run:

```
nix build -f release.nix
```

## Run
To launch manually run:
```
source result/setup.zsh
roslaunch issuing_service_agent issuer.launch
```
or as a NixOS service add the following lines to `/etc/nixos/configuration.nix`:
```
    # enable issuing agent servise
    systemd.services.issuing_agent = {
      enable = true;
      description = "Service for issuing agent";
      requires = [ "roscore.service" ];
      after = ["roscore.service" ];
      wantedBy = [ "multi-user.target" ];
      script = ''
        source /var/lib/liability/issuing_agent/result/setup.bash \
        && roslaunch issuing_service_agent issuer.launch
      '';
      serviceConfig = {
         Restart = "on-failure";
         StartLimitInterval = 0;
         RestartSec = 60;
         User = "liability";
         };
      };  
```
and apply changes:
```
nixos-rebuild switch
```
