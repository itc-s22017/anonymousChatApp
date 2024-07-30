import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Chat: React.FC = () => {
  const router = useRouter();
  const { room, user } = router.query;

  return (
    <ChatContainer>
      <h1>チャットルーム</h1>
      <p>ルーム名: {room}</p>
      <p>ユーザー名: {user}</p>
      {/* チャットのメッセージを表示するコンポーネントなどをここに追加 */}
    </ChatContainer>
  );
};

export default Chat;

