import { FC } from "react";
import styled from "styled-components";

interface IChannel {
  title: string;
  type: string;
  membersCount: string;
}

const Channel: FC<IChannel> = ({ title, type, membersCount }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <span>{type}</span>
      <span>{membersCount} members</span>
      <Button>Edit</Button>
      <Button>Test</Button>
      <Button>Run</Button>
      <Button>Stop</Button>
      <Button>Remove</Button>
      <Button>Restart</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
  padding: 20px;
  border: 1px solid #0288d1;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Title = styled.span`
  color: #000;
  font-size: 18px;
`;

export default Channel;
