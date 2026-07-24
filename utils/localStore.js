import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const dataFile = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "chatify.json");
const createDefaultData = () => ({ rooms: {} });

const readData = () => {
  if (!existsSync(dataFile)) {
    return createDefaultData();
  }

  try {
    const data = JSON.parse(readFileSync(dataFile, "utf8"));
    return data && typeof data === "object" && data.rooms ? data : createDefaultData();
  } catch {
    return createDefaultData();
  }
};

let data = readData();

const saveData = () => {
  mkdirSync(dirname(dataFile), { recursive: true });
  const temporaryFile = `${dataFile}.tmp`;
  writeFileSync(temporaryFile, JSON.stringify(data, null, 2));
  renameSync(temporaryFile, dataFile);
};

const getRoom = (roomName) => {
  if (!data.rooms[roomName]) {
    data.rooms[roomName] = { chats: [] };
    saveData();
  }

  return data.rooms[roomName];
};

export const addChat = (roomName, chat) => {
  getRoom(roomName).chats.push(chat);
  saveData();
  return chat;
};

export const getChats = (roomName) => [...getRoom(roomName).chats];
