import { FC } from "react";
import ChannelList from "./ChannelList";
import styled from "styled-components";

const ChannelListPage: FC = () => {
  return (
    <Wrapper>
      <h1>Channels list</h1>
      <Button>add channel</Button>
      <Button>settings</Button>
      <ChannelList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 6px;
`;

const Button = styled.button`
  color: #0288d1;
  font-size: 14px;
  padding: 7px 14px;
  border-radius: 5px;
  border: 1px solid #0288d1;
  background-color: transparent;
  cursor: pointer;
`;

export default ChannelListPage;
