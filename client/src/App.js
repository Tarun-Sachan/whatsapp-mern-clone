import classes from "./App.module.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);
 

  useEffect(() => {
    axios.get("/api/v1/messages/sync").then((response) => {
      setMessages(response.data.tasks);
      console.log(messages.tasks)
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("671dac2ca88bf7778a09", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      //alert(newMessage);
      
      //console.log(newMessage);
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages.tasks);
  return (
    <div className={classes.app}>
      <div className={classes.app_body}>
        <Sidebar />
        <Chat  messages={messages} />
      </div>
    </div>
  );
}

export default App;
