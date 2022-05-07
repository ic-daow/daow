import { DaowActor, UserErrors } from "@daow/binding";
import { useEffect, useRef, useState } from "react";

let once = false;

function App() {
  const daowRef = useRef();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (once) return;
    once = true;
    (async function () {
      // 初始化 daow
      let daow = daowRef.current;
      if (!daow) {
        try {
          setLogs((logs) => [...logs, "初始化 daow..."]);
          daowRef.current = await new DaowActor().create(
            "rrkah-fqaaa-aaaaa-aaaaq-cai",
            {
              agentType: "anonymous",
              agentOptions: {
                production: false,
                host: "http://localhost:8000",
              },
            }
          );
          daow = daowRef.current;
          setLogs((logs) => [...logs, "daow 初始化成功"]);
        } catch (err) {
          setLogs((logs) => [
            ...logs,
            `daow 初始化失败 ${JSON.stringify(err)}`,
          ]);
        }
      }
      // 检查并创建用户对象
      let self;
      try {
        setLogs((logs) => [...logs, "获取当前用户..."]);
        self = await daow.getSelf();
      } catch (err) {
        setLogs((logs) => [...logs, `获取当前用户失败 ${JSON.stringify(err)}`]);
        if (err === UserErrors.NotFound) {
          setLogs((logs) => [...logs, "创建用户对象..."]);
          await daow.createUser({
            name: "张三",
            email: "zhangsan@dao.com",
            memo: "",
          });
          self = await daow.getSelf();
        }
      }
      setLogs((logs) => [...logs, `当前用户对象 ${JSON.stringify(self)}`]);
    })();
  }, []);

  return (
    <div>
      {logs.map((log) => (
        <p key={log}>{log}</p>
      ))}
    </div>
  );
}

export default App;
