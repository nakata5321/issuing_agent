pragma solidity ^0.5.0;

interface IEmitter {
    function issueCertificate(address liability, address token, uint256 value) external;
    function claimCertificate(address liability) external;
}

