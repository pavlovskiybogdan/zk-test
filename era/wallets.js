const ZkSync = require('zksync-web3');

class EraWallet {
  constructor(
    privateKey,
    zkSyncProvider,
    ethProvider,
  ) {
    try {
      return new ZkSync.Wallet(
        privateKey,
        zkSyncProvider,
        ethProvider,
      );
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}

module.exports = { EraWallet };
