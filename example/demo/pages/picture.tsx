import type { NextPage } from "next";
import { PictureActor } from "@daow/binding";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";

const host = "http://127.0.0.1:8000";
const pictureCid = "ryjl3-tyaaa-aaaaa-aaaba-cai";

const Picture: NextPage = () => {
  const [image, setImage] = useState<string>();
  const pictureRef = useRef<PictureActor>();
  useEffect(() => {
    if (pictureRef.current) return;
    new PictureActor()
      .create(pictureCid, {
        agentOptions: {
          production: false,
          host,
        },
      })
      .then((actor) => {
        pictureRef.current = actor;
        console.log("picture actor 初始化成功");
      })
      .catch((err) => {
        console.log("picture actor 初始化失败", err);
      });
  }, []);

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = useCallback(
    (evt) => {
      if (!pictureRef.current) return;
      const actor = pictureRef.current;
      const {
        target: { files },
      } = evt;
      if (!files || files.length === 0) return;
      const file = files[0];
      const { name, type } = file;
      (async () => {
        const res = await actor.createPicture({
          name,
          description: "desc",
          owner: "abcd",
          picture: { type, buffer: file },
        });
        setImage(`${host}/?canisterId=${pictureCid}&picId=${res.id}`);
      })();
    },
    []
  );

  return (
    <div>
      <Link href={"/"}>
        <a>首页</a>
      </Link>
      <p>图片上传</p>
      <input type={"file"} accept={"image/*"} onChange={handleFileUpload} />
      {image && <img src={image} width={200} height={200} />}
    </div>
  );
};

export default Picture;
