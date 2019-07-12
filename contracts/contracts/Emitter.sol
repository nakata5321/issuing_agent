pragma solidity ^0.5.0;

import './interfaces/ILiability.sol';
import './interfaces/IEmitent.sol';
import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';
import './EnergyToken.sol';

contract Emitter is Ownable, IEmitter {
    /**
     * @dev Green certificate
     */
    struct Certificate {
        address token;
        uint256 value;
    }

    /**
     * @dev Green certificate mapping by liability address
     */
    mapping(address => Certificate) public certificates;

    function issueCertificate(address liability, address token, uint256 value) external onlyOwner {
        require(certificates[liability].value == 0);
        certificates[liability].token = token;
        certificates[liability].value = value;
    }

    function claimCertificate(address liability) external {
        require(certificates[liability].value > 0);
        require(ILiability(liability).isFinalized());

        EnergyToken _token = EnergyToken(certificates[liability].token);
        _token.mint(msg.sender, certificates[liability].value);

        // Free storage space, for a gas refund reasons
        delete certificates[liability];
    }
}

