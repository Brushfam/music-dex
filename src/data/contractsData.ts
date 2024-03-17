export const songContractAbi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function getFreeTokenBalance() public view returns(uint256)",
    "function getUserTotalEarned(address tokenholder) external view returns(uint256)",

    // ERC-20 write functions
    "function transfer(address to, uint amount) returns (bool)",
    "function getUserBalance(address tokenholder) public view returns(uint256)",

    // SongContract write functions
    "function changeOwner(address newOwner) external",
    "function addTokenholderBalance(address user, uint256 amount) public",
    "function sendIncome() external payable",

    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)",
    "event OwnerSet(address indexed oldOwner, address indexed newOwner)",
    "event Deposit(address indexed sender, uint256 value)"
];
export const songContractAddress: string = "0x57d6c9D93e5896694fe56d89e22ad60363e505E3";

export const baseContractAbi = [
    "function changeOwner(address newOwner) public",
    "function signAgreement(address user) public",
    "function hasAgreement(address user) public view returns(bool)",
    "event OwnerSet(address indexed oldOwner, address indexed newOwner)"
]
export const baseContractAddress: string = "0x42FAE16806D8e90D03b9CA54b005E0A31Ca6a89b";
