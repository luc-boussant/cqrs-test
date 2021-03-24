import { Producer } from 'node-rdkafka';
import { BOOTSTRAP_SERVER, TOPIC_NAME } from '../constants/kafka';

function createProducer(onDeliveryReport): Promise<Producer> {
  const producer = new Producer({
    'bootstrap.servers': BOOTSTRAP_SERVER,
    dr_msg_cb: true
  });

  return new Promise((resolve, reject) => {
    producer
      .on('ready', () => resolve(producer))
      .on('delivery-report', onDeliveryReport)
      .on('event.error', (err) => {
        console.warn('event.error', err);
        reject(err);
      });
    producer.connect();
  });
}

export async function produceMessage(input: string): Promise<void> {
  return new Promise((resolve, reject) => {
    createProducer((err, report) => {
      if (err) {
        console.warn('Error producing', err);
        reject();
      } else {
        const { topic, value } = report;
        console.debug(
          `Successfully produced record ${value} to topic "${topic}"`
        );
        resolve();
      }
    }).then((producer) => {
      const message = Buffer.from(input);
      console.debug(`Producing record ${message}`);
      producer.produce(TOPIC_NAME, -1, message, 'key');

      producer.flush(10000, () => {
        producer.disconnect();
      });
    });
  });
}
