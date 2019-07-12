pragma solidity ^0.5.0;

/**
 * @title Standard liability smart contract interface
 */
contract ILiability {
    /**
     * @dev Liability termination signal
     */
    event Finalized(bool indexed success, bytes result);

    /**
     * @dev Behaviour model multihash
     */
    bytes public model;

    /**
     * @dev Objective ROSBAG multihash
     * @notice ROSBAGv2 is used: http://wiki.ros.org/Bags/Format/2.0
     */
    bytes public objective;

    /**
     * @dev Report ROSBAG multihash
     * @notice ROSBAGv2 is used: http://wiki.ros.org/Bags/Format/2.0
     */
    bytes public result;

    /**
     * @dev Payment token address
     */
    address public token;

    /**
     * @dev Liability cost
     */
    uint256 public cost;

    /**
     * @dev Lighthouse fee in wn
     */
    uint256 public lighthouseFee;

    /**
     * @dev Validator fee in wn
     */
    uint256 public validatorFee;

    /**
     * @dev Robonomics demand message hash
     */
    bytes32 public demandHash;

    /**
     * @dev Robonomics offer message hash
     */
    bytes32 public offerHash;

    /**
     * @dev Liability promisor address
     */
    address public promisor;

    /**
     * @dev Liability promisee address
     */
    address public promisee;

    /**
     * @dev Lighthouse assigned to this liability
     */
    address public lighthouse;

    /**
     * @dev Liability validator address
     */
    address public validator;

    /**
     * @dev Liability success flag
     */
    bool public isSuccess;

    /**
     * @dev Liability finalization status flag
     */
    bool public isFinalized;
}

