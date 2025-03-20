import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "declarations/canistorage/canistorage.did.js";
export { idlFactory } from "declarations/canistorage/canistorage.did.js";

/**
 * 
 * @param canisterId canisterId of deployed Canistorage
 * @param identity
 * @returns 
 */
export async function init(canisterId, identity) {
  const agent = await HttpAgent.create({
    identity
  });

  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
}
