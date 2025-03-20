import { useState } from 'react';
import { init } from '@/utils/canistorage';
import { CANISTORAGE_ID } from "@/const.ts";

let canistorage = null;

function App() {
  const [greeting, setGreeting] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;

    if (!canistorage) {
      canistorage = await init(CANISTORAGE_ID);
    }
    const version = await canistorage.version();

    setGreeting(version);

    return false;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
      <label htmlFor="name">Canister Id of your Canistorage:&nbsp;</label>
        <input id="name" alt="CanistorageId" type="text" value={CANISTORAGE_ID} disabled/>

        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
