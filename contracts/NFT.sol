// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    mapping(uint256 => bool) private _accessControl;

    constructor() ERC721("MyNFT", "MNFT") {}

    function shareContent(uint256 tokenId) public onlyOwner {
        _accessControl[tokenId] = true;
    }

    function revokeAccess(uint256 tokenId) public onlyOwner {
        _accessControl[tokenId] = false;
    }

    function canAccessContent(uint256 tokenId) public view returns (bool) {
        return _accessControl[tokenId];
    }
}
