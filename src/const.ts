import { Secp256k1KeyIdentity } from '@dfinity/identity-secp256k1';

export const CANISTORAGE_ID = (process.env.DFX_NETWORK == "ic") ? "TODO" : process.env.CANISTER_ID_CANISTORAGE;

interface User {
  identity: Secp256k1KeyIdentity;
  principal: string;
};

function creteUserFromSingleWord(word: string): User {
  const identity = Secp256k1KeyIdentity.fromSeedPhrase(` ${word}`.repeat(12).trim());
  const principal = identity.getPrincipal().toText();
  return { identity, principal };
}

// Test identities
export const USERS:{[name:string]: User} = {
  "admin": creteUserFromSingleWord("goddess"),
  "test": creteUserFromSingleWord("test"),
};
