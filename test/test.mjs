import hardhat from "hardhat";
const { ethers } = hardhat;
import * as chai from "chai";
import { solidity } from "ethereum-waffle";
chai.use(solidity);
const { expect } = chai;
// list of local Eth accounts
const [recipient] = await ethers.getSigners();

// tests for buying tickets using the contract
describe("Tickets", function () {
  it("Should set the right ticketPriceInWei", async function () {
    const Tickets = await ethers.getContractFactory("Tickets");
    const tickets = await Tickets.deploy(ethers.utils.parseEther("0.01"));
    const actualPrice = await tickets.ticketPriceInWei();
    expect(actualPrice).to.equal(ethers.utils.parseEther("0.01"));
  });

  it("Should allow to purchase tickets with enough Ether", async function () {
    const Tickets = await ethers.getContractFactory("Tickets");
    const tickets = await Tickets.deploy(ethers.utils.parseEther("0.01"));
    await tickets.purchaseTicket(1, { value: ethers.utils.parseEther("0.01") });
    const actualBalance = await tickets.balanceOf(await tickets.owner());
    expect(actualBalance).to.equal(ethers.utils.parseEther("1"));
  });

  it("Should not allow to purchase tickets without enough Ether", async function () {
    const Tickets = await ethers.getContractFactory("Tickets");
    const tickets = await Tickets.deploy(ethers.utils.parseEther("0.01"));
    await expect(
      tickets.purchaseTicket(1, { value: ethers.utils.parseEther("0.005") })
    ).to.be.revertedWith("Not enough Ether sent");
  });
});

// tests for transfering tickets using the contract
describe("Transfer", function () {
  it("Should revert if sender tries to transfer more tickets than they have", async function () {
    const Tickets = await ethers.getContractFactory("Tickets");
    const tickets = await Tickets.deploy(ethers.utils.parseEther("0.01"));
    await tickets.purchaseTicket(1, { value: ethers.utils.parseEther("0.01") });
    await expect(
      tickets.transferTicket(recipient.address, ethers.utils.parseEther("2"))
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });

  it("Should revert if sender tries to transfer tickets to the zero address", async function () {
    const Tickets = await ethers.getContractFactory("Tickets");
    const tickets = await Tickets.deploy(ethers.utils.parseEther("0.01"));
    await tickets.purchaseTicket(1, { value: ethers.utils.parseEther("0.01") });
    await expect(
      tickets.transferTicket(
        ethers.constants.AddressZero,
        ethers.utils.parseEther("1")
      )
    ).to.be.revertedWith("ERC20: transfer to the zero address");
  });
});
