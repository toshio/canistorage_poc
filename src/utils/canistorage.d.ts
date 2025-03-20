import type {
  ActorSubclass,
  Identity,
} from "@dfinity/agent";
import type { Principal } from "@dfinity/principal";
import type { IDL } from "@dfinity/candid";

import { _SERVICE } from 'declarations/canistorage/canistorage.did';

export declare const idlFactory: IDL.InterfaceFactory;

/**
 * Intializes an {@link ActorSubclass}, configured with the provided SERVICE interface of a canister.
 * @constructs {@link ActorSubClass}
 * @param {string | Principal} canisterId - ID of the canister the {@link Actor} will talk to
 * @param {CreateActorOptions} options - see {@link CreateActorOptions}
 * @param {CreateActorOptions["agent"]} options.agent - a pre-configured agent you'd like to use. Supercedes agentOptions
 * @param {CreateActorOptions["agentOptions"]} options.agentOptions - options to set up a new agent
 * @param {CreateActorOptions["actorOptions"]} options.actorOptions - options for the Actor
 */
export function init(
  canisterId: string | Principal,
  identity?: Identity | Promise<Identity>
): ActorSubclass<_SERVICE>;
