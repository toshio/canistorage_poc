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
  // User
  const [user, setUser] = useState('');
  const [principal, setPrincipal] = useState('');
  // Version
  const [version, setVersion] = useState('');

  // initCanistorage
  const [resultInitCanistorage, setResultInitCanistorage] = useState('');
  const [errorInitCanistorage, setErrorInitCanistorage] = useState('');

  // listFiles
  const [listFilesPath, setListFilesPath] = useState('');
  const [resultListFiles, setResultListFiles] = useState('');
  const [errorListFiles, setErrorListFiles] = useState('');
  // getInfo
  const [getInfoPath, setGetInfoPath] = useState('');
  const [resultGetInfo, setResultGetInfo] = useState('');
  const [errorGetInfo, setErrorGetInfo] = useState('');
  // hasPermission
  const [hasPermissionPath, setHasPermissionPath] = useState('');
  const [resultHasPermission, setResultHasPermission] = useState('');
  const [errorHasPermission, setErrorHasPermission] = useState('');
  // addPermission
  const [addPermissionPath, setAddPermissionPath] = useState('');
  const [addPermissionUser, setAddPermissionUser] = useState('');
  const [addPermissionType, setAddPermissionType] = useState('');
  const [resultAddPermission, setResultAddPermission] = useState('');
  const [errorAddPermission, setErrorAddPermission] = useState('');
  // removePermission
  const [removePermissionPath, setRemovePermissionPath] = useState('');
  const [removePermissionUser, setRemovePermissionUser] = useState('');
  const [removePermissionType, setRemovePermissionType] = useState('');
  const [resultRemovePermission, setResultRemovePermission] = useState('');
  const [errorRemovePermission, setErrorRemovePermission] = useState('');
  // createDirectory
  const [createDirectoryPath, setCreateDirectoryPath] = useState('');
  const [resultCreateDirectory, setResultCreateDirectory] = useState('');
  const [errorCreateDirectory, setErrorCreateDirectory] = useState('');
  // deleteDirectory
  const [deleteDirectoryPath, setDeleteDirectoryPath] = useState('');
  const [resultDeleteDirectory, setResultDeleteDirectory] = useState('');
  const [errorDeleteDirectory, setErrorDeleteDirectory] = useState('');

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

  async function initCanistorage() {
    setResultInitCanistorage("");
    setErrorInitCanistorage("");

    try {
      const result = await canistorage.initCanistorage();
      if (result.Err) {
        setErrorInitCanistorage(result.Err.message);
      } else {
        // result.Ok
        setResultInitCanistorage("initialized.");
      }
    } catch (e) {
      setErrorInitCanistorage(e.message);
    }
  }

  async function listFiles() {
    setResultListFiles("");
    setErrorListFiles("");

    try {
      const result = await canistorage.listFiles(listFilesPath);

      if (result.Err) {
        setErrorListFiles(result.Err.message);
      } else {
        // result.Ok
        setResultListFiles(result.Ok);
      }
    } catch (e) {
      setErrorListFiles(e.message);
    }
  }

  async function getInfo() {
    setResultGetInfo("");
    setErrorGetInfo("");

    try {
      const result = await canistorage.getInfo(getInfoPath);

      if (result.Err) {
        setErrorGetInfo(result.Err.message);
      } else {
        // result.Ok
        setResultGetInfo(JSON.stringify(result.Ok, (key,value) => {
          return typeof value === 'bigint'
            ? Number(value.toString()) // return bigint as number (2^53-1; too enough for date)
            : value
        }, 2));
      }
    } catch (e) {
      setErrorGetInfo(e.message);
    }
  }


  async function hasPermission() {
    setResultHasPermission("");
    setErrorHasPermission("");

    try {
      const result = await canistorage.hasPermission(hasPermissionPath);

      if (result.Err) {
        setErrorHasPermission(result.Err.message);
      } else {
        // result.Ok
        const { manageable, readable, writable } = result.Ok;
        setResultHasPermission(`${readable?"read ":""}${writable?"write ":""}${manageable?"manage ":""}`);
      }
    } catch (e) {
      setErrorHasPermission(e.message);
    }
  }

  async function addPermission() {
    setResultAddPermission("");
    setErrorAddPermission("");

    try {

      const result = await canistorage.addPermission(
        addPermissionPath,
        USERS[addPermissionUser].identity.getPrincipal(),
        addPermissionType == "manageable",
        addPermissionType == "readable",
        addPermissionType == "writable"
      );

      if (result.Err) {
        alert(result.Err);
        setErrorAddPermission(result.Err.message);
      } else {
        // result.Ok
        setResultAddPermission("Success");
      }
    } catch (e) {
      setErrorAddPermission(e.message);
    }
  }

  async function removePermission() {
    setResultRemovePermission("");
    setErrorRemovePermission("");

    try {

      const result = await canistorage.removePermission(
        removePermissionPath,
        USERS[removePermissionUser].identity.getPrincipal(),
        removePermissionType == "manageable",
        removePermissionType == "readable",
        removePermissionType == "writable"
      );

      if (result.Err) {
        setErrorRemovePermission(result.Err.message);
      } else {
        // result.Ok
        setResultRemovePermission("Success")
      }
    } catch (e) {
      setErrorRemovePermission(e.message);
    }
  }

  async function createDirectory() {
    setResultCreateDirectory("");
    setErrorCreateDirectory("");

    try {
      const result = await canistorage.createDirectory(createDirectoryPath);

      if (result.Err) {
        setErrorCreateDirectory(result.Err.message);
      } else {
        // result.Ok
        setResultCreateDirectory("Success")
      }
    } catch (e) {
      setErrorCreateDirectory(e.message);
    }
  }


  async function deleteDirectory() {
    setResultDeleteDirectory("");
    setErrorDeleteDirectory("");

    try {
      const result = await canistorage.deleteDirectory(deleteDirectoryPath);

      if (result.Err) {
        setErrorDeleteDirectory(result.Err.message);
      } else {
        // result.Ok
        setResultDeleteDirectory("Success")
      }
    } catch (e) {
      setErrorDeleteDirectory(e.message);
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
            <select onChange={changeUser}>
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
          <td>initCanistorage</td>
          <td>&nbsp;</td>
          <td>
            <button onClick={initCanistorage} type="submit" disabled={!user}>initCanistorage()</button>
          </td>
          <td>
            <span>{resultInitCanistorage}</span>
            <span className="error">{errorInitCanistorage}</span>&nbsp;<br/>
          </td>
        </tr>

        <tr>
          <td>listFiles</td>
          <td>
            <input type="text" placeholder="Directory (Starts with '/')" onChange={(e)=>setListFilesPath(e.target.value)}/>
          </td>
          <td>
            <button onClick={listFiles} type="submit" disabled={!user||!listFilesPath}>listFile()</button>
          </td>
          <td>
            <span className="error">{errorListFiles}</span>&nbsp;<br/>
            <textarea defaultValue={resultListFiles} readOnly />
          </td>
        </tr>

        <tr>
          <td>getInfo</td>
          <td>
            <input type="text" placeholder="Directory (Starts with '/')" onChange={(e)=>setGetInfoPath(e.target.value)}/>
          </td>
          <td>
            <button onClick={getInfo} type="submit" disabled={!user||!getInfoPath}>getInfo()</button>
          </td>
          <td>
            <span className="error">{errorGetInfo}</span>&nbsp;<br/>
            <textarea defaultValue={resultGetInfo} readOnly />
          </td>
        </tr>

        <tr>
          <td>hasPermission</td>
          <td>
              <input type="text" placeholder="Directory (Starts with '/')" onChange={(e)=>setHasPermissionPath(e.target.value)}/><br/>
          </td>
          <td>
            <button onClick={hasPermission} type="submit" disabled={!user||!hasPermissionPath}>hasPermission()</button>
          </td>
          <td>
            <span>{resultHasPermission}</span>
            <span className="error">{errorHasPermission}</span>&nbsp;<br/>
          </td>
        </tr>

        <tr>
          <td>addPermission</td>
          <td>
              <input type="text" placeholder="Directory (Starts with '/')" onChange={(e)=>setAddPermissionPath(e.target.value)}/><br/>
              <select onChange={(e)=>setAddPermissionUser(e.target.value)}>
                <option value=""></option>
                {Object.keys(USERS).map((name, index) =>
                  <option value={name}>{name}</option>
                )}
              </select><br/>
              <select onChange={(e)=>setAddPermissionType(e.target.value)}>
                <option value="readable">readable</option>
                <option value="writable">writable</option>
                <option value="manageable">manageable</option>
              </select>
          </td>
          <td>
            <button onClick={addPermission} type="submit" disabled={!user||!addPermissionPath||!addPermissionUser}>addPermission()</button>
          </td>
          <td>
            <span>{resultAddPermission}</span>
            <span className="error">{errorAddPermission}</span>&nbsp;<br/>
          </td>
        </tr>

        <tr>
          <td>removePermission</td>
          <td>
              <input type="text" placeholder="Directory (Starts with '/')" onChange={(e)=>setRemovePermissionPath(e.target.value)}/><br/>
              <select onChange={(e)=>setRemovePermissionUser(e.target.value)}>
                <option value=""></option>
                {Object.keys(USERS).map((name, index) =>
                  <option value={name}>{name}</option>
                )}
              </select><br/>
              <select onChange={(e)=>setRemovePermissionType(e.target.value)}>
                <option value="readable">readable</option>
                <option value="writable">writable</option>
                <option value="manageable">manageable</option>
              </select>
          </td>
          <td>
            <button onClick={removePermission} type="submit" disabled={!user||!removePermissionPath||!removePermissionUser}>removePermission()</button>
          </td>
          <td>
            <span>{resultRemovePermission}</span>
            <span className="error">{errorRemovePermission}</span>&nbsp;<br/>
          </td>
        </tr>

        <tr>
          <td>createDirectory</td>
          <td>
              <input type="text" placeholder="Directory (Starts with '/')" onChange={(e)=>setCreateDirectoryPath(e.target.value)}/><br/>
          </td>
          <td>
            <button onClick={createDirectory} type="submit" disabled={!user||!createDirectoryPath}>createDirectory()</button>
          </td>
          <td>
            <span>{resultCreateDirectory}</span>
            <span className="error">{errorCreateDirectory}</span>&nbsp;<br/>
          </td>
        </tr>

        <tr>
          <td>deleteDirectory</td>
          <td>
              <input type="text" placeholder="Directory (Starts with '/')" onChange={(e)=>setDeleteDirectoryPath(e.target.value)}/><br/>
          </td>
          <td>
            <button onClick={deleteDirectory} type="submit" disabled={!user||!deleteDirectoryPath}>deleteDirectory()</button>
          </td>
          <td>
            <span>{resultDeleteDirectory}</span>
            <span className="error">{errorDeleteDirectory}</span>&nbsp;<br/>
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
