import { mkdirSync, writeFileSync } from "fs";
import { guestList } from "../src/data/guests";
import { buildGuestInviteId } from "../src/lib/guestInvite";

const guests = guestList.map((name, i) => ({
  id: buildGuestInviteId(name, i + 1),
  name,
  order: i + 1,
}));

mkdirSync("data", { recursive: true });
writeFileSync("data/guests.json", JSON.stringify({ guests }, null, 2), "utf-8");
console.log(`Wrote ${guests.length} guests to data/guests.json`);
