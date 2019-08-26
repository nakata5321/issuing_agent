pragma solidity ^0.5.0;

import './interfaces/ILiability.sol';
import './interfaces/IEmitent.sol';
import '../node_modules/openzeppelin-solidity/contracts/access/roles/WhitelistedRole.sol';
import './EnergyToken.sol';

contract Emitter is WhitelistedRole, IEmitter {
    /**
     * @dev Green certificate
     */
    struct Certificate {
        address token;
        uint256 value;
    }

    event NewToken(address addr, uint256 value);

    /**
     * @dev Green certificate mapping by liability address
     */
    mapping(address => Certificate) public certificates;

    function issueCertificate(address liability, uint256 value) external onlyWhitelisted {
        // require(certificates[liability].value == 0);

        EnergyToken et = new EnergyToken();

        emit NewToken(address(et), value);
        certificates[liability].token = address(et);
        certificates[liability].value = value;
    }

    function claimCertificate(address liability) external {
        require(certificates[liability].value > 0);
        // require(ILiability(liability).isFinalized());

        EnergyToken _token = EnergyToken(certificates[liability].token);
        _token.mint(msg.sender, certificates[liability].value);

        // Free storage space, for a gas refund reasons
        delete certificates[liability];
    }
}

