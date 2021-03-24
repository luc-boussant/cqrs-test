import { KafkaConsumer } from 'node-rdkafka';
import { createConnection } from 'typeorm';
import { Product } from '../model/product';
import ormConfig from '../../config/ormConfig';
import { BOOTSTRAP_SERVER, GROUP_ID, TOPIC_NAME } from '../constants/kafka';

function createConsumer(onData): Promise<KafkaConsumer> {
  const consumer = new KafkaConsumer(
    {
      'bootstrap.servers': BOOTSTRAP_SERVER,
      'group.id': GROUP_ID
    },
    {}
  );

  return new Promise((resolve) => {
    consumer.on('ready', () => resolve(consumer)).on('data', onData);

    consumer.connect();
  });
}

async function startConsumer() {
  await createConnection(ormConfig);

  const consumer = await createConsumer(async ({ value }) => {
    const parsedValue: Product = JSON.parse(value);
    const product = Product.create(parsedValue);
    await product.save();
  });

  consumer.subscribe([TOPIC_NAME]);
  consumer.consume();

  setTimeout(() => {
    console.log('\nDisconnecting consumer ...');
    consumer.disconnect();
    process.exit();
  }, 10000);
}

startConsumer();
