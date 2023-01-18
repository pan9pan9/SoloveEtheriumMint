// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WhitelistSale is ERC721Enumerable, Ownable {
    using Strings for uint256;

    // For WL
    // Calculated from `merkle_tree.js`
    bytes32 immutable public merkleRoot;
    mapping(address => bool) public whitelistClaimed;

    // For minting
    string baseURI;
    string public baseExtension = ".json";
    string public baseImage = ".webp";
    uint256 public cost = 0.001 ether;
    uint256 public maxSupply = 99;
    bool public paused = false;

    event Sale(
        uint256 id,
        address indexed buyer,
        uint256 cost,
        string indexed tokenURI,
        uint256 timestamp
    );

    struct SaleStruct {
        uint256 id;
        address buyer;
        uint256 cost;
        string imageURL;
        uint256 timestamp;
    }

    SaleStruct[] minted;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        bytes32 _merkleRoot
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
        merkleRoot = _merkleRoot;
    }

    function toBytes32(address addr) pure internal returns (bytes32) {
        return bytes32(uint256(uint160(addr)));
    }

    function payToMint(bytes32[] calldata _merkleProof) public payable {
        uint256 supply = totalSupply();
        require(!paused, "NFTs under maintenance!");
        require(supply <= maxSupply, "Sorry, all NFTs have been minted!");
        require(msg.value > 0 ether, "Ether too low for minting!");


        // WL parts
        require(!whitelistClaimed[msg.sender], "Address already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid Merkle Proof."
        );
        whitelistClaimed[msg.sender] = true;
        //

        if (msg.sender != owner()) {
            require(msg.value >= cost);
        }

        _safeMint(msg.sender, supply + 1);

        minted.push(
            SaleStruct(
                supply + 1,
                msg.sender,
                msg.value,
                toImage(supply + 1),
                block.timestamp
            )
        );

        emit Sale(supply, msg.sender, msg.value, tokenURI(supply + 1), block.timestamp);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
    }

    function toImage(uint256 tokenId) internal view returns (string memory) {
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseImage))
        : "";
    }

    function getAllNFTs() public view returns (SaleStruct[] memory) {
        return minted;
    }

    function getAnNFTs(uint256 tokenId) public view returns (SaleStruct memory) {
        return minted[tokenId - 1];
    }

    function payTo(address to, uint256 amount) public onlyOwner {
        (bool success1, ) = payable(to).call{value: amount}("");
        require(success1);
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setPause(bool _state) public onlyOwner {
        paused = _state;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

}
