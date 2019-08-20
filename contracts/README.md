# Issuer Contracts

## EnergyToken

It's just a ERC20 Token for the project

## ConfirmValidator

The validator smart contract. An owner becomes a validator.

## Emitter

A service smart contract that holds the map of `recipient => amount of tokens`.

The issuer node calls `issueCertificate()` function and passes the liability address, the address of token and the amount of tokens.

The next step is call `claimCertificate()` function by the recipient and pass the address of the liability.

> Note! In order to claim certificates, a validator has to approve the result message

The Emitter contract uses a white list of addresses which are able to call the `issueCertificate()` function, so you should specify those addresses in `migrations/2_contracts_deploy.js`
