import { FC, useEffect, useState } from "react";
import Channel from "./Channel";

const ChannelList: FC = () => {
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    (async () => {
      const chatInfo = await window.api.getChat();
      setChatInfo(chatInfo);
    })();
  }, []);

  return (
    <div>
      {...chatInfo.map((value: any) => (
        <Channel
          title={value.title}
          type={value.type}
          membersCount={value.membersCount}
        />
      ))}
    </div>
  );
};

export default ChannelList;
