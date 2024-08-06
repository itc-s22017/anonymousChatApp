'use client'

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import socket from '../utils/socket';

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color:#c4e6ee;
;
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
  const [roomId, setRoomId] = useState<string>("");
  const router = useRouter();
  const [joinRoomStatus, setJoinRoomStatus] = useState<string | null>(null);

  useEffect(() => {
    const handleJoinRoomResponse = (response: { success: boolean }) => {
      if (response.success) {
        router.push(`/room/${roomId}`);
      } else {
        alert("ルームが存在しません");
        setJoinRoomStatus("failed");
      }
    };

    socket.on("joinRoomResponse", handleJoinRoomResponse);

    return () => {
      socket.off("joinRoomResponse", handleJoinRoomResponse);
    };
  }, [roomId, router]);

  const handleJoinRoom = () => {
    if (roomId.trim() !== "") {
      socket.emit("joinRoom", roomId);
      setJoinRoomStatus(null); 
    }
  };



  return (
    <JoinContainer>
      <h1>ルームに参加</h1>
      <Input
        type="text"
        placeholder="ルームID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <Button onClick={handleJoinRoom}>参加</Button>
    </JoinContainer>
  );
};

export default Join;



