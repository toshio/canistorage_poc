import { useState } from 'react';
import { Actor } from "@dfinity/agent";
import { init } from '@/utils/canistorage';
import { CANISTORAGE_ID, USERS } from "@/const.ts";

let canistorage;

// Canistorageのインスタンスを初期化
(async ()=>{
  console.log("init()");
  canistorage = await init(CANISTORAGE_ID);
})();

function App() {
  const [version, setVersion] = useState('');
  // User
  const [user, setUser] = useState('');
  const [principal, setPrincipal] = useState('');
  // listFiles
  const [path, setPath] = useState('');
  const [files, setFiles] = useState('');
  const [errorListFiles, setErrorListFiles] = useState('');

  function changeUser(e) {
    const newUser = e.target.value;
    setUser(newUser);
    setPrincipal(USERS[newUser]?.principal || "");

    // Replace identity
    if (newUser) {
      const newIdentity = USERS[newUser]?.identity;
      console.log(`newIdentity: ${newIdentity}`);

      const agent = Actor.agentOf(canistorage);
      agent.replaceIdentity(newIdentity);
    }
  }

  async function getVersion() {
    setVersion("");
    try {
      setVersion(await canistorage.version());
    } catch (e) {
      // do nothing
    }
  }

  async function listFiles() {
    setErrorListFiles("");
    setFiles("");

    try {
      const result = await canistorage.listFiles(path);

      if (result.Err) {
        setErrorListFiles(result.Err.message);
        setFiles("");
      } else {
        setErrorListFiles("");
        setFiles(result.Ok);
      }
    } catch (e) {
      setErrorListFiles("");
      setErrorListFiles(e.message);
    }
  }

  return (
    <main>
      <h1>Canistorage (Proof of Concept)</h1>
      <hr/>
      <h2>Concept</h2>
      <p>
        Canistorageは、Internet Computerの仕組みを利用した分散型のクラウドストレージです。まだ開発の初期段階です。<br />
        Internet Computer上でユーザーやアプリケーション（Canister）を識別するための『Principal』ベースでアクセス制御を行い、個人（や企業）のデータの記録・保管していくことを目指しています。<br />
        これから先、数十年、数百年という長期にわたってデータを管理していくことを考えた場合に、ベンダーロックインされることなく、また、データの完全性・可用性の観点で、アクセスI/Fやデータ構造などの仕様がオープンに議論されて決定していくことが重要です。<br />
      </p>
      <h2>This site</h2>
      <p>
        この検証サイトは、Canistorageの動作を簡易確認するために用意したサンプルアプリケーションです。<br />
      </p>
      <hr/>
      <h2>Interface</h2>

      {/* col1: Name, col2: arguments, col3: button, col4: result */}
      <table>
        <tr>
          <th colSpan="4">Access User</th>
        </tr>
        <tr>
          <td>
            <select id="user" onChange={changeUser}>
              <option value=""></option>
              {Object.keys(USERS).map((name, index) =>
                <option value={name}>{name}</option>
              )}
            </select>
         </td>
         <td>&nbsp;</td>
         <td>&nbsp;</td>
         <td><input type="text" value={principal} readOnly /></td>
        </tr>

        <tr>
          <th colSpan="4">Canistorage Information</th>
        </tr>
        <tr>
          <td>Canister Id</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>
            <input type="text" value={CANISTORAGE_ID} readOnly />
          </td>
        </tr>
        <tr>
          <td>Version</td>
          <td>&nbsp;</td>
          <td>
            <button onClick={getVersion} type="submit" disabled={!user}>version()</button>
          </td>
          <td>
            <input type="text" value={version} readOnly />
          </td>
        </tr>

        <tr>
          <td>listFiles</td>
          <td>
            <input id="listFilesPath" type="text" placeholder="Directory (Starts with '/')" onChange={(e)=>setPath(e.target.value)}/>
          </td>
          <td>
            <button onClick={listFiles} type="submit" disabled={!user||!path}>listFile()</button>
          </td>
          <td>
            <span className="error">{errorListFiles}</span>&nbsp;<br/>
            <textarea defaultValue={files} readOnly />
          </td>
        </tr>
      </table>
      <hr/>
      <h2>Permissions</h2>
      <table>
        <tr>
          <th>Path</th>
          <th>User</th>
          <th>Principal</th>
          <th>Readable</th>
          <th>Writable</th>
        </tr>
        <tr>
          <td>/</td>
          <td>admin</td>
          <td>{USERS["admin"]?.principal}</td>
          <td>true</td>
          <td>true</td>
        </tr>
      </table>

    </main>
  );
}

export default App;
