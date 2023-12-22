import { FC } from 'react';
import styled from 'styled-components';

const Channel: FC = () => {

  return (
    <div>
      <span>Channel title</span>
      <span>subs count</span>
      <Button>Edit</Button>
      <Button>Test</Button>
      <Button>Run</Button>
      <Button>Stop</Button>
      <Button>Remove</Button>
      <Button>Restart</Button>
    </div>
  );
}


const Button = styled.button`
  color: #0288d1;
  font-size: 14px;
  padding: 7px 14px;
  border-radius: 5px;
  border: 1px solid #0288d1;
  background-color: transparent;
`;

export default Channel;