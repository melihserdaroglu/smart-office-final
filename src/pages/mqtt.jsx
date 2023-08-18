import React, { useEffect, useState } from "react";
import mqtt from "precompiled-mqtt";


function Mqtt() {
  const URL = "ws://10.98.3.8:9001";
  const [client, setClient] = useState(null);
  const [payload, setPayload] = useState(null);
  const [door, setDoor] = useState(false);
  const [water, setWater] = useState(false);

  useEffect(() => {
    if (!client) {
      setClient(
        mqtt.connect(URL, {
          clientId:
            "client-" +
            (Math.floor(Math.random() * (1000 - 1 + 1)) + 1) +
            "-" +
            (Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000),
        })
      );
    } else {
      client.on("connect", () => {
        console.log("connection successful");
      });

      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });

      client.on("reconnect", () => {
        console.log("connection reconnecting");
      });

      client.on("message", (topic, message) => {
        const pld = { topic, message: message.toString() };

        setPayload(pld);
        const jsonPayloadMessage = JSON.parse(pld.message);
        
        console.log(message.to);
        //console.log(jsonPayloadMessage);

        if (pld.topic === "mintyfiIotMqtt/KapiSensoru") {
          setDoor(jsonPayloadMessage.contact);
          
        }
        
        if (pld.topic === "mintyfiIotMqtt/SuKacagi") {
          setWater(jsonPayloadMessage.water_leak);
        }
      });

      mqttSub({ topic: "mintyfiIotMqtt/#", qos: 1 });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          console.log("disconnected successfully");
        });
      } catch (error) {
        console.log("disconnect error:", error);
      }
    }
  };

  const Kapat = () => {
    mqttPublish({
      topic: "mintyfiIotMqtt/SuKacagi",
      qos: 1,
      payload:
        '{"battery":100,"battery_low":false,"linkquality":0,"tamper":false,"water_leak":false}',
    });
    mqttPublish({
        topic: "mintyfiIotMqtt/KapiSensoru",
        qos: 1,
        payload:
        '{"battery":100,"battery_low":false,"contact":true,"linkquality":94,"tamper":false,"voltage":3200}',
      });
  };

  const mqttPublish = (context) => {
    if (client) {
      // topic, QoS & payload for publishing message
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
      });
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.unsubscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        console.log(`unsubscribed topic: ${topic}`);
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello MQTT in React</h1>
        {payload && payload.message}
        <p>Kapi {`${door}`}</p>
        <img
          src={door ? "https://img.icons8.com/color/door" : "https://img.icons8.com/door"}
          alt="Door"
        />
        <img
          src={water ? "https://img.icons8.com/color/water" : "https://img.icons8.com/water"}
          alt="Water"
        />

        <button onClick={Kapat}>Kapat</button>
      </header>
    </div>
  );

}

export default Mqtt;
