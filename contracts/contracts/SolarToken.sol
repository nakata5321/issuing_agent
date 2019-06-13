pragma solidity >=0.4.21 <0.6.0;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';
import '../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';

contract SolarToken is ERC20Mintable, ERC20Detailed {
  constructor() ERC20Detailed("Solar Token", "SOT", 3) public {

  }
}
