import { Nurekit } from "./client.js";

export * from "./client.js";
export * from "./types/index.js";

const nurekit = new Nurekit()

console.log(await nurekit.groups.getSchedule({
  groupName: "пзпі-23-5",
  startTime: "2023-09-22",
  endTime: "2023-09-23"
}))
