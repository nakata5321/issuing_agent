// export const CHAIN_ID = 1;
// export const ROBONOMICS = {
//   version: 5,
//   ens: '',
//   ensSuffix: 'eth',
//   lighthouse: 'airalab.lighthouse.5.robonomics.eth'
// };
export const CHAIN_ID = 4451;
export const ROBONOMICS = {
  version: 5,
  ens: '0xaC4Ac4801b50b74aa3222B5Ba282FF54407B3941',
  ensSuffix: 'sid',
  lighthouse: 'airalab.lighthouse.5.robonomics.sid'
};

export const VALIDATOR = '0x17B82177D8753bd8090dadA60B953CFaDD9eF492';
// export const VALIDATOR = '0x0000000000000000000000000000000000000000';
export const MODEL = 'QmUB6ajZTLLMZg7re1v4hw44aoG8HDQDHr9JyujU264Aw2';
export const OBJECTIVE = 'QmVAFgUxBitKqtV2sjaYcHkKfcAPVy3GswhaE5n5bcgLkf';
export const RESULT = 'QmVZzCia7Ptm3CiDUcF9ZYkKQuMMjFCKYjS2ckZYzMJsm7';
export const PRICE = 0;

export const IPFS_CONFIG = {
  repo: 'ipfs/robonomics',
  relay: {
    enabled: true,
    hop: {
      enabled: true
    }
  },
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/1.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/',
        '/dns4/2.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/',
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      ]
    },
    Bootstrap: [
      // '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
      '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
      '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
      // '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
      '/dns4/node0.preload.ipfs.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
      '/dns4/node1.preload.ipfs.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6',
      '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8',
      '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
    ]
  }
};
