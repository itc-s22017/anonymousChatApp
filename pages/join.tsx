import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
  width: 300px;

  &:hover {
    background-color: #005bb5;
  }
`;

const Join: React.FC = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const router = useRouter();

  const handleJoin = () => {
    if (username && roomName) {
      // ここでルーム参加の処理を実行（例：API呼び出しなど）
      router.push(`/chat?room=${roomName}&user=${username}`);
    } else {
      alert('ユーザー名とルーム名を入力してください');
    }
  };

  return (
    <JoinContainer>
      <h1>ルームに参加</h1>
      <Input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button onClick={handleJoin}>参加</Button>
    </JoinContainer>
  );
};

export default Join;

