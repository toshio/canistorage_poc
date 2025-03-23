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
        Internet Computer上でユーザーやアプリケーションを識別するための『Principal』ベースでアクセス制御を行い、<br/>
        個人や家族（または企業）のデータの記録・保管していくことを目指します。<br />
        これから先、数十年、数百年という長期にわたってデータを管理していくことを考えた場合に、ベンダーロックインされることなく、<br/>
        また、データの完全性・可用性の観点で、アクセスI/Fやデータ構造などの仕様がオープンに議論されて決定していくことは重要です。<br />
        Canistorageは、そのような観点から、オープンな仕様でデータを管理することを目指しています。
      </p>
      <p>
        Pricipalごとにディレクトリやファイルのアクセス制御が可能なため、使用するDAppごとに異なるPrincipalを用いることによって<br/>
        （つまり、Internet IdentityでDAppごとに異なるPrincipalが割り当てられる仕組みを利用することにより）<br/>
        Dappごとにアクセス制御を実現できます。<br />
        <br/>
        また、今後、様々なCanisterが自律分散型で動作していくという世界線で、自分のデータがどこにあり（→Canistorage内に集約されていて）、<br/>
        どのCanisterがどのデータに対して読取権限があるのか、Principalベースでのアクセス制御できる分散型のクラウドストレージは必要となるでしょう。
      </p>
      <p>
        本来、Canister自体がWASIに対応しPrincipalベースのアクセス制御を有するファイルシステム機能を持っていることが望ましいと個人的には考えており、<br/>
        このPoCは、あくまでもCanisterにファイルシステム機能が実装されるまでの過渡的な仕組みにすぎません。<br/>
        将来的には、単なるファイルの管理機能だけではなく、DBなど非ファイルデータやバージョン管理機能、改ざん抑止、<br/>
        タイムロック、署名など、より高度なデータ管理機能を、オープンなI/F仕様を検討し取り込んでいければと思います。
      </p>
      <h2>This site</h2>
      <p>
        この検証サイトは、Canistorageの動作を簡易確認するために用意したサンプルアプリケーションです。<br />
        Canistorageへアクセスするメソッドの簡易インターフェースを提供しています。
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
