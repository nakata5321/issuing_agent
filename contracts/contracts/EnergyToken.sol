pragma solidity ^0.5.0;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';
import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';
import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol';

contract EnergyToken is ERC20Detailed, ERC20Mintable, ERC20Burnable {
  constructor(address account, uint256 amount) ERC20Detailed("Green Certificate Token", "GCT", 3) public {
    mint(account, amount);
  }
}

