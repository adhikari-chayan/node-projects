const {Kafka}=require("kafkajs")

run();

async function run(){
    try{
        const kafka=new Kafka({
            "clientId":"myapp",
            "brokers":["ec2-13-126-67-188.ap-south-1.compute.amazonaws.com:9092"]
        })

        const consumer=kafka.consumer({"groupId":"test"});
        console.log("Connecting....");
        await consumer.connect();
        console.log("Connected!");
        consumer.subscribe({
            "topic":"Users",
            "fromBeginning":true
        })

        await consumer.run({
            "eachMessage":async result=>{
                console.log(`Received message ${result.message.value} on partition ${result.partition}`);

            }
        })
    }
    catch(ex){
        console.error(`Something bad happened ${ex}`);
    }
    
}
