import { getChats } from "./localStore.js";

const loadChats = (room) => getChats(room);
export default loadChats;
