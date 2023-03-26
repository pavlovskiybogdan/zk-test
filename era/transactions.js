const zksync = require('zksync-web3');
const { ethers } = require('ethers');

class EraTransaction {
  zkSyncProvider = null;
  ethProvider = null;

  constructor (providerUrl) {
    this.zkSyncProvider = new zksync.Provider(providerUrl);
    this.ethProvider = ethers.getDefaultProvider('homestead');
  }

  async depositToL2 (
    wallet,
    amount,
    tokenContractAddress = null,
  ) {
    try {
      const tokenDepositHandle = await wallet.deposit({
        token: tokenContractAddress || process.env.ETH_ADDRESS,
        amount,
      });

      const tokenDepositResponse = await tokenDepositHandle.wait();

      const ethDepositHandle = await wallet.deposit({
        token: zksync.utils.ETH_ADDRESS,
        amount,
      });

      const ethDepositResponse = await ethDepositHandle.wait();

      return {
        tokenDepositHandle,
        tokenDepositResponse,
        ethDepositHandle,
        ethDepositResponse
      };
    } catch (err) {
      console.error(`Deposit to L2 error: ${JSON.stringify(err)}`);
      throw new Error(err);
    }
  }
}

module.exports = { EraTransaction };
