const dotenv = require('dotenv');
const { Logger } = require('./logger/logger');
const { EraTransaction, EraWallet } = require('./era/index');

dotenv.config();

const logger = new Logger();

// https://era.zksync.io/docs/api/js/providers.html#getconfirmedtokens
const depositToL2 = async (amount = 1000000000000000) => {
  logger.log('Initialization...');

  const zkEraTransactionProvider = new EraTransaction(
    process.env.ZKSYNC_ERA_MAINNET_PROVIDER_URL,
  );

  const wallet = new EraWallet(
    process.env.PRIVATE_KEY,
    zkEraTransactionProvider.zkSyncProvider,
    zkEraTransactionProvider.ethProvider,
  );

  await zkEraTransactionProvider.depositToL2(
    wallet,
    amount // your amount in Wei
  );
}

// (
//   async () => await depositToL2()
// )();
