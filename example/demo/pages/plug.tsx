import type { NextPage } from "next";
import { DaowActor, IUser, UserErrors } from "@daow/binding";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const host = "https://raw.ic0.app/";
const cid = "oda5s-kqaaa-aaaah-qc23q-cai";
let once = false;

const Home: NextPage = () => {
  const daowRef = useRef<DaowActor>();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (once) return;
    once = true;
    if (daowRef.current) return;
    (async () => {
      setLogs((logs) => [...logs, "初始化 daow..."]);
      try {
        daowRef.current = await new DaowActor().create(cid, {
          agentType: 'plug',
          agentOptions: {
            production: true,
            whitelist: [cid],
            host,
          },
        });
      } catch (err) {
        setLogs((logs) => [...logs, `daow 初始化失败 ${JSON.stringify(err)}`]);
      }
      const daow = daowRef.current!!;
      // 检查并创建用户对象
      let self: IUser;
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
      <Link href={"/picture"}>
        <a>图片上传</a>
      </Link>
      {logs.map((log) => (
        <p key={log}>{log}</p>
      ))}
    </div>
  );
};

export default Home;
