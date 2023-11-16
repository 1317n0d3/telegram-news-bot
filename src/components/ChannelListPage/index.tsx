import { FC } from 'react';
import ChannelList from './ChannelList';

const ChannelListPage: FC = () => {

  return (
    <div>
      <h1>Channels list page</h1>
      <button>add channel</button>
      <ChannelList />
    </div>
  );
}

export default ChannelListPage;