import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import mqtt from "precompiled-mqtt";

const KontrolPaneli = () => {
  const URL = "ws://10.98.3.8:9001";
  const [client, setClient] = useState(null);
  const [payload, setPayload] = useState(null);
  const [door, setDoor] = useState(false);
  const [doorBattery, setdoorBattery] = useState(0);
  const [doorLinkquality, setdoorLinkquality] = useState(0);
  const [water, setWater] = useState(false);
  const [waterLinkquality, setwaterLinkquality] = useState(false);
  const [waterBattery, setwaterbattery] = useState(0);
  const [motion, setmotion] = useState(0);
  const [motionBattery, setmotionBattery] = useState(0);
  const [motionLinkquality, setmotionLinkquality] = useState(0);
  const [IsiNem, setIsiNem] = useState(0);
  const [isiNemTemperature, setIsiNemTemperature] = useState(null);
  const [IsiNemLinkquality, setIsiNemLinkquality] = useState(0);
  const [IsiNemHumidity, setIsiNemHumidity] = useState(null);


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

        // console.log(message.toString);
        console.log(jsonPayloadMessage);

        if (pld.topic === "mintyfiIotMqtt/KapiSensoru") {
          setDoor(jsonPayloadMessage.contact);
          setdoorLinkquality(jsonPayloadMessage.linkquality);
          setdoorBattery(jsonPayloadMessage.battery);
        }

        if (pld.topic === "mintyfiIotMqtt/SuKacagi") {
          setWater(jsonPayloadMessage.water_leak);
          setwaterLinkquality(jsonPayloadMessage.linkquality);
          setwaterbattery(jsonPayloadMessage.battery);
        }

        if (pld.topic === "mintyfiIotMqtt/Hareket") {
          setmotion(jsonPayloadMessage.occupancy);
          setmotionBattery(jsonPayloadMessage.battery);
          setmotionLinkquality(jsonPayloadMessage.linkquality);
        }

        if (pld.topic === "mintyfiIotMqtt/IsiNem") {
          setIsiNemTemperature(jsonPayloadMessage.temperature);
          setIsiNemLinkquality(jsonPayloadMessage.linkquality);
          setIsiNemWaterbattery(jsonPayloadMessage.battery);
          setIsiNemHumidity(jsonPayloadMessage.humidity);
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

  let svgToShow;

  if (doorBattery >= 70 && doorBattery <= 100) {
    svgToShow = (
      <button>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
          >
            <path
              fill-rule="evenodd"
              d="M3.75 6.75a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 00-3-3h-15zm15 1.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h15zM4.5 9.75a.75.75 0 00-.75.75V15c0 .414.336.75.75.75H18a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75H4.5z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </button>
    );
  } else if (doorBattery >= 30 && doorBattery < 70) {
    svgToShow = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6 text-gray-200"
      >
        <path d="M4.5 9.75a.75.75 0 00-.75.75V15c0 .414.336.75.75.75h6.75A.75.75 0 0012 15v-4.5a.75.75 0 00-.75-.75H4.5z" />
        <path
          fill-rule="evenodd"
          d="M3.75 6.75a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 00-3-3h-15zm15 1.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h15z"
          clip-rule="evenodd"
        />
      </svg>
    );
  } else if (doorBattery >= 0 && doorBattery < 30) {
    svgToShow = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6 text-gray-200"
      >
        <path
          fill-rule="evenodd"
          d="M.75 9.75a3 3 0 013-3h15a3 3 0 013 3v.038c.856.173 1.5.93 1.5 1.837v2.25c0 .907-.644 1.664-1.5 1.838v.037a3 3 0 01-3 3h-15a3 3 0 01-3-3v-6zm19.5 0a1.5 1.5 0 00-1.5-1.5h-15a1.5 1.5 0 00-1.5 1.5v6a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5v-6z"
          clip-rule="evenodd"
        />
      </svg>
    );
  }

  let svgToShow2;

  if (doorLinkquality >= 30 && doorLinkquality <= 100) {
    svgToShow2 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
      </svg>
    );
  } else if (doorLinkquality >= 30 && doorLinkquality < 70) {
    svgToShow2 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    );
  }

  let svgToShow1;

  if (waterBattery >= 70 && waterBattery <= 100) {
    svgToShow1 = (
      <button>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
          >
            <path
              fill-rule="evenodd"
              d="M3.75 6.75a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 00-3-3h-15zm15 1.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h15zM4.5 9.75a.75.75 0 00-.75.75V15c0 .414.336.75.75.75H18a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75H4.5z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </button>
    );
  } else if (waterBattery >= 30 && waterBattery < 70) {
    svgToShow1 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6 text-gray-200"
      >
        <path d="M4.5 9.75a.75.75 0 00-.75.75V15c0 .414.336.75.75.75h6.75A.75.75 0 0012 15v-4.5a.75.75 0 00-.75-.75H4.5z" />
        <path
          fill-rule="evenodd"
          d="M3.75 6.75a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 00-3-3h-15zm15 1.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h15z"
          clip-rule="evenodd"
        />
      </svg>
    );
  } else if (waterBattery >= 0 && waterBattery < 30) {
    svgToShow1 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6 text-gray-200"
      >
        <path
          fill-rule="evenodd"
          d="M.75 9.75a3 3 0 013-3h15a3 3 0 013 3v.038c.856.173 1.5.93 1.5 1.837v2.25c0 .907-.644 1.664-1.5 1.838v.037a3 3 0 01-3 3h-15a3 3 0 01-3-3v-6zm19.5 0a1.5 1.5 0 00-1.5-1.5h-15a1.5 1.5 0 00-1.5 1.5v6a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5v-6z"
          clip-rule="evenodd"
        />
      </svg>
    );
  }

  let svgToShow5;

  if (waterLinkquality >= 30 && waterLinkquality <= 100) {
    svgToShow5 = (
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
        >
          <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
        </svg>
      </a>
    );
  } else if (waterLinkquality >= 30 && waterLinkquality < 70) {
    svgToShow5 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    );
  }

  let svgToShow3;

  if (motionBattery >= 70 && motionBattery <= 100) {
    svgToShow3 = (
      <button>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
          >
            <path
              fill-rule="evenodd"
              d="M3.75 6.75a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 00-3-3h-15zm15 1.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h15zM4.5 9.75a.75.75 0 00-.75.75V15c0 .414.336.75.75.75H18a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75H4.5z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </button>
    );
  } else if (motionBattery >= 30 && motionBattery < 70) {
    svgToShow3 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6 text-gray-200"
      >
        <path d="M4.5 9.75a.75.75 0 00-.75.75V15c0 .414.336.75.75.75h6.75A.75.75 0 0012 15v-4.5a.75.75 0 00-.75-.75H4.5z" />
        <path
          fill-rule="evenodd"
          d="M3.75 6.75a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 00-3-3h-15zm15 1.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h15z"
          clip-rule="evenodd"
        />
      </svg>
    );
  } else if (motionBattery >= 0 && motionBattery < 30) {
    svgToShow3 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6 text-gray-200"
      >
        <path
          fill-rule="evenodd"
          d="M.75 9.75a3 3 0 013-3h15a3 3 0 013 3v.038c.856.173 1.5.93 1.5 1.837v2.25c0 .907-.644 1.664-1.5 1.838v.037a3 3 0 01-3 3h-15a3 3 0 01-3-3v-6zm19.5 0a1.5 1.5 0 00-1.5-1.5h-15a1.5 1.5 0 00-1.5 1.5v6a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5v-6z"
          clip-rule="evenodd"
        />
      </svg>
    );
  }

  let svgToShow4;

  if (motionLinkquality >= 30 && motionLinkquality <= 100) {
    svgToShow4 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
      </svg>
    );
  } else if (motionLinkquality >= 30 && motionLinkquality < 70) {
    svgToShow4 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    );
  }

  const Kapat = () => {
    mqttPublish({
      topic: "mintyfiIotMqtt/KapiSensoru",
      qos: 1,
      payload:
        '{"battery":100,"battery_low":false,"contact":true,"linkquality":94,"tamper":false,"voltage":3200}',
    });
    mqttPublish({
      topic: "mintyfiIotMqtt/SuKacagi",
      qos: 1,
      payload:
        '{"battery":100,"battery_low":false,"linkquality":0,"tamper":false,"water_leak":false}',
    });
    mqttPublish({
      topic: "mintyfiIotMqtt/Hareket",
      qos: 1,
      payload:
        '{"battery":100,"battery_low":false,"linkquality":109,"occupancy":true,"tamper":false,"voltage":3200}',
    });
    mqttPublish({
      topic: "mintyfiIotMqtt/IsiNem",
      qos: 1,
      payload:
        '{"battery":100,"humidity":64.05,"linkquality":14,"temperature":27.62,"voltage":3100}',
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

  const [isOpen, setIsOpen] = useState({
    senaryoolustur: false,
    hareketbatarya: false,
    sıcaklıkbatarya: false,
    hareketbaglantı: false,
    sıcaklıkbaglantı: false,
    ısıklarbaglantı: false,
    perdebaglantı: false,
    havalandırmabaglantı: false,
    nemlendirmebaglantı: false,
  });

  const [buttonText, setButtonText] = useState("Cihaz Ekle"); // Başlangıç metni "Tıkla" olarak ayarlanıyor

  const cihazEkle = () => {
    setButtonText("Cihaz Ekle");
  };

  const [button2Text, setButton2Text] = useState("Kapıyı aç");
  const [button3Text, setButton3Text] = useState("Klimayı aç");
  const [button4Text, setButton4Text] = useState("Nemlendiriciyi aç");

  const handleButtonClick = (buttonNumber) => {
    if (buttonNumber === 2) {
      setButton2Text(
        button2Text === "Kapıyı aç" ? "Kapıyı kapat" : "Kapıyı aç"
      );
    } else if (buttonNumber === 3) {
      setButton3Text(
        button3Text === "Klimayı aç" ? "Klimayı kapat" : "Klimayı aç"
      );
    } else if (buttonNumber === 4) {
      setButton4Text(
        button4Text === "Nemlendiriciyi aç"
          ? "Nemlendiriciyi kapat"
          : "Nemlendiriciyi aç"
      );
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [isFirstIcon, setIsFirstIcon] = useState(true);
  const handleClick = () => {
    setIsFirstIcon((prevState) => !prevState);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <Link
          to={`/adddevices`}
          class="flex items-center p-2 text-gray-200 rounded-lg dark:text-gray-900 "
        >
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-500 focus:outline-none dark:bg-gray-400 dark:hover:bg-gray-500 "
            onClick={cihazEkle}
          >
            {buttonText}

            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            ></svg>
          </button>
        </Link>

        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-500 focus:outline-none dark:bg-gray-400 dark:hover:bg-gray-500 "
          onClick={toggleVisibility}
        >
          {isVisible ? "" : ""}
          Sayfayı düzenle
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          />
        </button>
      </div>
      <div className="flex justify-end mt-5">
        {/* <p className="mr-3">
          <button
            onClick={handleClick}
            className="w-6 h-6 text-gray-200 focus:outline-none"
          >
            {isFirstIcon ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-200"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-200"
              >
                <path
                  fillRule="evenodd"
                  d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </p> */}
      </div>

      <div className="grid grid-cols-2 mt-4 ">
        {/* Hareket sensörü*/}
        <div className="max-w-md bg-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 mb-6  opacity-95">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <div className="flex justify-between items-center">
                <h5 className="flex justify-start mb-2 text-xl font-bold tracking-tight text-black dark:text-gray-200">
                  Hareket sensörü
                </h5>
                <p>
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  )}
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  )}
                  <button>{svgToShow3}</button>

                  <button>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                      </svg>
                    </a>
                  </button>
                </p>
              </div>
            </a>
            <div className="text-black dark:text-gray-200">
              <p>Hareket {motion ? "belirlenmedi" : "belirlendi"}</p>
            </div>
          </div>
        </div>

        {/* Sıcaklık */}
        <div className="max-w-md bg-gray-200  rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 mb-6  opacity-95">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <div className="flex justify-between items-center">
                <h5 className="flex justify-start mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
                  Sıcaklık
                </h5>
                <p>
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  )}
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  )}
                  <button>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3.75 6.75a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 00-3-3h-15zm15 1.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h15zM4.5 9.75a.75.75 0 00-.75.75V15c0 .414.336.75.75.75H18a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75H4.5z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </button>

                  <button>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                      </svg>
                    </a>
                  </button>
                </p>
              </div>
            </a>
            <p className="mb-2 font-normal text-gray-800 dark:text-gray-200">
              <div>
                {isiNemTemperature !== null ? (
                  <div>
                    <p>Sıcaklık: {isiNemTemperature}</p>
                  </div>
                ) : (
                  <p>Veri bekleniyor...</p>
                )}
              </div>{" "}
              <div>
                {IsiNemHumidity !== null ? (
                  <div>
                    <p>Nem: {IsiNemHumidity}</p>
                  </div>
                ) : (
                  <p>Veri bekleniyor...</p>
                )}
              </div>{" "}
            </p>
          </div>
        </div>

        {/* Işıklar */}
        <div className="max-w-md bg-gray-200  rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 mb-6  opacity-95">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <div className="flex justify-between items-center">
                <h5 className="flex justify-start mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
                  Işıklar
                </h5>
                <p>
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  )}
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  )}
                  <button>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3.75 6.75a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 00-3-3h-15zm15 1.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h15zM4.5 9.75a.75.75 0 00-.75.75V15c0 .414.336.75.75.75H18a.75.75 0 00.75-.75v-4.5a.75.75 0 00-.75-.75H4.5z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </button>
                  <button>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                      </svg>
                    </a>
                  </button>
                </p>
              </div>
            </a>

            <div className="flex justify-between"></div>

            <Tab.Group>
              <Tab.Panels>
                <Tab.Panel>
                  <div>
                    <p class="mb-3 font-normal text-gray-800 dark:text-gray-200">
                      Perde sistemini buradan kontrol edebilirsiniz.
                    </p>
                    <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 bg-gray-400 rounded-2xl hover:bg-gray-500 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-900">
                      <button>Parlaklık</button>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div>
                    <p class="mb-3 font-normal text-gray-800 dark:text-gray-200">
                      Işık sıcaklığını buradan kontrol edebilirsiniz.
                    </p>

                    <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-500 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-900">
                      <button> Işık sıcaklığı</button>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div>
                    <p className="mb-3 font-normal text-gray-800 dark:text-gray-200">
                      Enerji tüketimini buradan takip edebilirsiniz.
                    </p>
                    <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-900">
                      <button>Enerji tüketimi</button>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
              <div className="mt-5"></div>
              <Tab.List>
                <div className="flex justify-between">
                  <Tab>
                    <div>
                      <div className="flex justify-between">
                        <svg
                          class=" w-6 h-6  text-gray-800 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                        >
                          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                        </svg>
                        <a className="text-gray-800 dark:text-gray-200">
                          {" "}
                          Parlaklık{" "}
                        </a>
                      </div>
                    </div>
                  </Tab>
                  <Tab>
                    <div>
                      <div className="flex justify-between">
                        <svg
                          class=" w-6 h-6  text-gray-800 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                        >
                          <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5z" />{" "}
                          <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0zM8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5zM12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5zm-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708zM8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z" />
                        </svg>
                        <a className="text-gray-800 dark:text-gray-200">
                          {" "}
                          Işık sıcaklığı{" "}
                        </a>
                      </div>
                    </div>
                  </Tab>
                  <Tab>
                    <div>
                      <div className="flex justify-between">
                        <svg
                          class="w-6 h-6 text-gray-800 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 110 110"
                        >
                          <path d="M10.64,61C12.85,63.55,18,70.4,18,78v8A12,12,0,0,0,30,98H46A12,12,0,0,0,58,86V82H70A28,28,0,0,0,98,54V50a4,4,0,0,0-4-4H78A28,28,0,0,0,50,74V86a4,4,0,0,1-4,4H30a4,4,0,0,1-4-4V78H38a4,4,0,0,0,4-4V53.43A16,16,0,0,0,54,38V34a4,4,0,0,0-8,0v4a8,8,0,0,1-16,0V34a4,4,0,0,0-8,0v4A16,16,0,0,0,34,53.43V70H26a4,4,0,0,0-1.19.24,40.83,40.83,0,0,0-8.09-14.48,28,28,0,0,1-4.06-5.85A27.78,27.78,0,0,1,10,38a28,28,0,0,1,55.65-4.47A29.21,29.21,0,0,1,66,38a4,4,0,0,0,8,0,37.54,37.54,0,0,0-.44-5.67A36,36,0,0,0,2,38,35.58,35.58,0,0,0,5.43,53.33,35.14,35.14,0,0,0,10.64,61ZM78,54H90A20,20,0,0,1,70,74H58A20,20,0,0,1,78,54Z" />
                        </svg>
                        <a className="text-gray-800 dark:text-gray-200">
                          {" "}
                          Enerji tüketimi{" "}
                        </a>
                      </div>
                    </div>
                  </Tab>
                </div>
              </Tab.List>
            </Tab.Group>
          </div>
        </div>

        {/* Kapı */}
        <div className="max-w-md bg-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 mb-6  opacity-95">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <div className="flex justify-between items-center">
                <h5 className="flex justify-start mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
                  Kapı
                </h5>

                <p>
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  )}
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  )}
                  <button>{svgToShow}</button>
                  <button>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                      </svg>
                    </a>
                  </button>
                </p>
              </div>
            </a>
            <header className="App-header">
              {/* <p>Şarj: {`${doorBattery}`}</p> */}
              <div>
                <div className="text-black dark:text-gray-200">
                  <p>Kapı {door ? "kapalı" : "açık"}</p>
                </div>
              </div>

              {/* <div className="flex justify-between">
                <img
                  src={
                    door
                      ? "https://img.icons8.com/color/door"
                      : "https://img.icons8.com/door"
                  }
                  alt="Door"
                />
                <img
                  src={
                    water
                      ? "https://img.icons8.com/color/water"
                      : "https://img.icons8.com/water"
                  }
                  alt="Water"
                />
              </div> */}
              {/* <button onClick={Kapat}>Kapat</button> */}
            </header>
            <p className="mb-3 font-normal text-gray-800 dark:text-gray-200">
              Kapı sistemini buradan kontrol edebilirsiniz.
            </p>

            {/* <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-900 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-900"
              onClick={() => handleButtonClick(2)}
              style={{
                minWidth: "160px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {button2Text}
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              ></svg>

              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              ></svg>
            </button> */}
          </div>
        </div>

        {/* Klima*/}
        <div className="max-w-md bg-gray-200  rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 mb-6  opacity-95">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <div className="flex justify-between items-center">
                <h5 className="flex justify-start mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
                  Klima
                </h5>
                <p>
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  )}
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  )}

                  <button>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                      </svg>
                    </a>
                  </button>
                </p>
              </div>
            </a>
            <p className="mb-3 font-normal text-gray-800 dark:text-gray-200">
              Havalandırma sistemini buradan kontrol edebilirsiniz.
            </p>

            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-900 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-900"
              onClick={() => handleButtonClick(3)}
              style={{
                minWidth: "156px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {button3Text}
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              ></svg>

              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              ></svg>
            </button>
          </div>
        </div>

        {/* Nemlendirme */}
        <div className="max-w-md bg-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 mb-6  opacity-95">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <div className="flex justify-between items-center">
                <h5 className="flex justify-start mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
                  Nemlendirme
                </h5>
                <p>
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  )}
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  )}

                  <button>
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                      </svg>
                    </a>
                  </button>
                </p>
              </div>
            </a>
            <p className="mb-3 font-normal text-gray-800 dark:text-gray-200">
              Nemlendirme sistemini buradan kontrol edebilirsiniz.
            </p>

            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-400 rounded-2xl hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-900 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-900"
              onClick={() => handleButtonClick(4)}
              style={{
                minWidth: "205px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {button4Text}
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              ></svg>

              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              ></svg>
            </button>
          </div>
        </div>
        {/* Kart 5 */}
        <div className="max-w-md bg-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 mb-6  opacity-95">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>

          <div className="p-5">
            <a href="#">
              <div className="flex justify-between items-center">
                <h5 className="text-xl font-bold tracking-tight dark:border-gray-700 border-gray-700 text-gray-800 text-black dark:text-gray-200">
                  Sel sensörü
                </h5>

                <p>
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  )}
                  {isVisible && (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-xl font-bold tracking-tight dark:text-gray-200 border-gray-700  opacity-90 text-gray-800"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  )}
                  <button>{svgToShow1}</button>
                  <button>{svgToShow5}</button>
                </p>
              </div>
            </a>
            <header className="App-header">
              <div className="mt-4"></div>
              <div className="text-black dark:text-gray-200">
                <p> Su kaçağı {water ? "var" : "yok"}</p>
              </div>
            </header>
            <p className="mb-3 font-normal opacity-90 mt-4 dark:border-gray-700 border-gray-700 text-black dark:text-gray-200">
              Su kaçağı olup olmadığını buradan takip edebilirsiniz.
            </p>
            <div className=" space-x-8"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KontrolPaneli;
