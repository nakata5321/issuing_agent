pragma solidity ^0.5.0;

import './interfaces/IValidator.sol';
import './interfaces/ILiability.sol';
import '../node_modules/openzeppelin-solidity/contracts/access/roles/WhitelistedRole.sol';

contract ConfirmValidator is WhitelistedRole, IValidator {
    function isValidator(address _validator) external returns (bool) {
        return isWhitelisted(_validator);
    }
}

