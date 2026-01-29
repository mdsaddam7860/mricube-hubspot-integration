import { createRequestExecutor } from "./requestExecutor.js";

const hubspotExecutor = createRequestExecutor({
  name: "HubSpot",
  rateLimit: 8,
  intervalMs: 1000,
  retries: 3,
});

const mriExecutor = createRequestExecutor({
  name: "MRI-CUBE",
  rateLimit: 5,
  intervalMs: 1000,
  retries: 3,
});
const intermediaExecutor = createRequestExecutor({
  name: "Intermedia",
  rateLimit: 4,
  intervalMs: 1000,
  retries: 3,
});

// const hubspotExecutor = createRequestExecutor({
//   name: "Gong",
//   rateLimit: 3,
//   intervalMs: 1000,
//   retries: 4,
// });

export { hubspotExecutor, mriExecutor };

/***!SECTION
 * 3. How you use it (this is the important part)
Axios call (Intermedia)
await intermediaExecutor(
  () => intermediaAxios(token).get(`users/${userId}/call-recordings`),
  { userId }
);

HubSpot update
await hubspotExecutor(
  () => hubspotClient.crm.contacts.basicApi.update(contactId, payload),
  { contactId }
);

Gong upload (your historic recordings sync)
await gongExecutor(
  () => uploadMediaToGong(recording),
  { recordingId: recording.id }
);
*/
