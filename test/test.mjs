import hardhat from "hardhat";
const { ethers } = hardhat;
import * as chai from "chai";
import { solidity } from "ethereum-waffle";
chai.use(solidity);
const { expect } = chai;

describe("Tickets", function () {
  it("Should set the right ticketPriceInWei", async function () {
    const Tickets = await ethers.getContractFactory("Tickets");
    const tickets = await Tickets.deploy(ethers.utils.parseEther("0.01"));
    const actualPrice = await tickets.ticketPriceInWei();
    console.log("Actual price: ", actualPrice.toString());
    expect(actualPrice).to.equal(ethers.utils.parseEther("0.01"));
  });

  it("Should allow to purchase tickets with enough Ether", async function () {
    const Tickets = await ethers.getContractFactory("Tickets");
    const tickets = await Tickets.deploy(ethers.utils.parseEther("0.01"));
    await tickets.purchaseTicket(1, { value: ethers.utils.parseEther("0.01") });
    const actualBalance = await tickets.balanceOf(await tickets.owner());
    console.log("Actual balance: ", actualBalance.toString());
    expect(actualBalance).to.equal(ethers.utils.parseEther("1"));
  });

  it("Should not allow to purchase tickets without enough Ether", async function () {
    const Tickets = await ethers.getContractFactory("Tickets");
    const tickets = await Tickets.deploy(ethers.utils.parseEther("0.01"));
    await expect(tickets.purchaseTicket(1, { value: ethers.utils.parseEther("0.005") })).to.be.revertedWith("Not enough Ether sent");
  });
});