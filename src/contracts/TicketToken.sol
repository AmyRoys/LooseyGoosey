// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketToken is ERC20, Ownable {
    uint256 public ticketPriceInWei;

    event TicketPurchased(address indexed buyer, uint256 amount);
    event TicketTransferred(address indexed from, address indexed to, uint256 amount);

    constructor(uint256 _ticketPriceInWei) ERC20("TicketToken", "TTK") {
        ticketPriceInWei = _ticketPriceInWei;
    }

    function purchaseTicket(uint256 amount) public payable {
        require(msg.value >= ticketPriceInWei * amount, "Not enough SETH sent");
        _mint(msg.sender, amount);
        emit TicketPurchased(msg.sender, amount);
    }

    function transferTicket(address to, uint256 amount) public {
        _transfer(msg.sender, to, amount);
        emit TicketTransferred(msg.sender, to, amount);
    }

    function setTicketPrice(uint256 _ticketPriceInWei) public onlyOwner {
        ticketPriceInWei = _ticketPriceInWei;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
