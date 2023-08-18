import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './routes/root.jsx'
import Homepage from './pages/homepage.jsx';
import ControlPanel from './pages/controlPanel.jsx';
import TemperatureSensor from './component/TemperatureSensor.jsx';
import LightSwitch from './component/LightSwitch.jsx';
import Scenery from './pages/scenery.jsx';
import Clock from './component/Clock.jsx';
import EnergyConsumption from './pages/energyconsumption.jsx';
import Settings from './pages/settings.jsx';
import Notifications from './pages/notifications.jsx';
import Profiles from './pages/profiles.jsx';
import Scenerycreater from './pages/scenerycreater.jsx';
import Adddevices from './pages/adddevices.jsx';
import Logbook from './pages/logbook.jsx';
import Mqtt from './pages/mqtt.jsx';






const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "homepage",
        element: <Homepage />,
      },
      {
        path: "control-panel",
        element: <ControlPanel />,
      
      },
      {
        path: "scenery",
        element: <Scenery />,
      },
      {
        path: "energyconsumption",
        element: <EnergyConsumption/>,
      },
      
      {
        path: "settings",
        element: <Settings/>,
      },

      {
        path: "notifications",
        element: <Notifications />,
      },

      {
        path: "profiles",
        element: <Profiles />,
      },

      {
        path: "/scenerycreater",
        element: <Scenerycreater />,
      },
     
      {
        path: "LightSwitch",
        element: <LightSwitch />,
      },

      {
        path: "/adddevices",
        element: <Adddevices />,
      },

      {
        path: "clock",
        element: <Clock />,
      },
      {
        path: "Logbook",
        element: <Logbook />,
      },
      {
        path: "/mqtt",
        element: <Mqtt />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <RouterProvider router={router} />
  </React.StrictMode>,
)
