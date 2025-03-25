import { Secp256k1KeyIdentity } from '@dfinity/identity-secp256k1';
import { AnonymousIdentity, Identity } from '@dfinity/agent';

export const CANISTORAGE_ID = (process.env.DFX_NETWORK == "ic") ? "TODO" : process.env.CANISTER_ID_CANISTORAGE;

interface User {
  identity: Identity;
  principal: string;
};

// anonymous identity
function creteUserFromSingleWord(word: string): User {
  const identity = Secp256k1KeyIdentity.fromSeedPhrase(` ${word}`.repeat(12).trim());
  const principal = identity.getPrincipal().toText();
  return { identity, principal };
}

// anonymous identity
const anonymousIdentity = new AnonymousIdentity();

// Test identities
export const USERS:{[name:string]: User} = {
  "userA": creteUserFromSingleWord("goddess"),
  "userB": creteUserFromSingleWord("baby"),
  "userC": creteUserFromSingleWord("test"),
  "anonymous": <User>{
    identity: anonymousIdentity,
    principal: anonymousIdentity.getPrincipal().toText()
  }
};

// mapping principal to name
export const PRINCIPALS = Object.fromEntries(Object.entries(USERS).map(([name, value]) => [value.principal, name]));
