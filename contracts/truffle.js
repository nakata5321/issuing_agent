const HDWalletProvider = require("truffle-hdwallet-provider");
const privateKey = "6D507807FC4FF409959511BB1117078AD252972282DDC1493ACD33827BF1E280";


module.exports = {
    networks: {
        testing: {
            host: '127.0.0.1',
            port: 10545,
            network_id: 420123
        },
        development: {
            host: '127.0.0.1',
            port: 9545,
            network_id: 420123
        },
        sidechain: {
            host: '127.0.0.1',
            port: 8545,
            network_id: 4451,
            gas: 4000000,
            gasPrice: 0
        },
        /*
        kovan: {
            provider: new HDWalletProvider(privateKey, "https://kovan.infura.io/v3/<API_KEY>"),
            network_id: 42,
            skipDryRun: true
        },*/
        mainnet: {
            provider: new HDWalletProvider(privateKey, "https://mainnet.infura.io/v3/c763c5a7702c4ec4a3625556cf16a4a7"),
            network_id: 1,
            gasPrice: 30000000000,
            skipDryRun: true
        }
    },
    compilers: {
        solc: {
            version: "0.5.7",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                },
                evmVersion: "petersburg"
            }
        }
    },
    mocha: {
        reporter: 'eth-gas-reporter',
        reporterOptions: {
            currency: 'USD',
            gasPrice: 10
        }
    },
};

