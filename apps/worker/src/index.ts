import db from '@repo/db/client'
import { Kafka } from "kafkajs";

const TOPIC_NAME = 'payment-app'

const kafka = new Kafka({
    clientId: 'outbox-consumer',
    brokers: ['localhost:9092'],
})

async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker' });
    await consumer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: false });

    await consumer.run({
        autoCommit: true, 
        eachMessage: async ({ topic, partition, message }) => {
            const onRampTxnId = message.value?.toString();

            if (!onRampTxnId) {
                console.warn("Received empty message, skipping");
                return;
            }

            console.log({
                topic,
                partition,
                offset: message.offset,
                onRampTxnId,
            });

            await db.onRampTransaction.update({
                where: { id: onRampTxnId },
                data: { status: "Processing" },
            });
        },
    });
}

main().catch(console.error);
