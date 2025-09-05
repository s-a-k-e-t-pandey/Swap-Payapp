import db from '@repo/db/client'
import {Kafka} from "kafkajs";


const TOPIC_NAME = 'payment-app'

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092'],
})


async function main(){
    const producer = kafka.producer()
    await producer.connect()

    while(1){
        const pendingRows = await db.onRampTransactionOutbox.findMany({
            where: {},
            take: 10
        });

        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map(r => ({
                value: r.onRampTxnId
            }))
        })

        await db.onRampTransactionOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(r => r.id)
                }
            }
        })

        await new Promise(r => setTimeout(r, 3000))
    }
}

main();