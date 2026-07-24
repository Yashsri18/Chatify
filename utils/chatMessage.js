import moment from "moment";
import { addChat } from "./localStore.js";

const chatMessage = (room, username, text) => {
  const chat = {
    text,
    username,
    time: moment().format("h:mm a"),
  };

  return addChat(room, chat);
};
export default chatMessage;
