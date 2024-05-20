// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketToken is ERC20, Ownable {
    uint256 public ticketPriceInWei;

    constructor(uint256 _ticketPriceInWei) ERC20("TicketToken", "TICKET") {
        ticketPriceInWei = _ticketPriceInWei;
    }

    function purchaseTicket(uint256 amount) external payable {
        require(
            msg.value >= ticketPriceInWei * amount,
            "Not enough Ether sent"
        );
        _mint(msg.sender, amount * 10 ** decimals());
    }

    function transferTicket(address recipient, uint256 amount) external {
        _transfer(msg.sender, recipient, amount * 10 ** decimals());
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function setTicketPrice(uint256 _ticketPriceInWei) external onlyOwner {
        ticketPriceInWei = _ticketPriceInWei;
    }

    function buyToken() external payable {
        require(
            msg.value >= ticketPriceInWei,
            "Not enough ETH sent; check price!"
        );
        uint256 tokenAmount = msg.value / ticketPriceInWei;
        tokenAmount = tokenAmount * 10 ** decimals();
        _mint(msg.sender, tokenAmount);
    }

    function returnToken(uint256 amount) external {
        require(
            balanceOf(msg.sender) >= amount,
            "Not enough tokens in your account!"
        );
        uint256 ethAmount = (amount / 10 ** decimals()) * ticketPriceInWei;
        payable(msg.sender).transfer(ethAmount);
        _burn(msg.sender, amount);
    }
}
