// base contract
export const baseContractAbi = [
    "function changeOwner(address newOwner) public",
    "function signAgreement(address user) public",
    "function hasAgreement(address user) public view returns(bool)",
    "event OwnerSet(address indexed oldOwner, address indexed newOwner)"
]

export const baseContractAddress: string = "0x625dcf831a90743da6BEE5d98Ae5D4a2d0074c42";


// song contract
export const songContractAbi = [
    // ERC-20 read functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",

    // ERC-20 write functions
    "function transfer(address to, uint amount) returns (bool)",

    // SongContract read functions
    "function getUserTokensData(address tokenholder) external view returns (uint256, uint256)",
    "function getFreeTokenBalance() external view returns (uint256)",
    "function getTokenholdersNumber() external view returns (uint256)",

    // SongContract write functions
    "function addTokenholderBalance(address user, uint256 amount) public",
    "function updateIncome(uint256 income) external",
    "function claimUSDT(address user) external",

    // ERC-20 Events
    "event Transfer(address indexed from, address indexed to, uint amount)",

    // SongContract Events
    "event OwnerSet(address indexed oldOwner, address indexed newOwner)",
    "event PlatformSet(address indexed oldAddress, address indexed newAddress)",
    "event Deposit(address indexed sender, uint256 value)"
];

export const myKyivAddress: string = "0x37Af7cc765226f80C3962B98d3e517C164f0F2f0"
export const dealerAddress: string = "0x7a7eAF21e22392b05c4698fC53611D4175b65572"


// erc-20
export const erc20Abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint amount)",
]