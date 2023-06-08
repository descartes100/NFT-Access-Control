const { expect } = require('chai');

describe("MyNFT", function () {
  let MyNFT;
  let myNFT;
  let deployer;
  let user1;
  let user2;
  let tokenId = 1;
  let content = "Sample Content";

  before(async function () {
    MyNFT = await ethers.getContractFactory("MyNFT");
  });

  beforeEach(async function () {
    [deployer, user1, user2] = await ethers.getSigners();
    myNFT = await MyNFT.deploy();
    await myNFT.deployed();
  });

  it("should allow the owner to share content", async function () {
    // Share content as the deployer (owner)
    await myNFT.connect(deployer).shareContent(tokenId);

    // Check if the content can be accessed
    const canAccessContent = await myNFT.canAccessContent(tokenId);
    expect(canAccessContent).to.be.true;
  });

  it("should allow users with the NFT to access shared content", async function () {
    // Share content as the deployer (owner)
    await myNFT.connect(deployer).shareContent(tokenId);

    // Check if user2 cannot access the content
    const canAccessContentUser2 = await myNFT.connect(user2).canAccessContent(tokenId);
    expect(canAccessContentUser2).to.be.true;
  });


  it("should revoke access to shared content", async function () {
    // Share content as the deployer (owner)
    await myNFT.connect(deployer).shareContent(tokenId);
  
    // Revoke access to the content as the deployer (owner)
    await myNFT.connect(deployer).revokeAccess(tokenId);
  
    // Check if the content cannot be accessed
    const canAccessContent = await myNFT.canAccessContent(tokenId);
    expect(canAccessContent).to.be.false;
  });
  
});
