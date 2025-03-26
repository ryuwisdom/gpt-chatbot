import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 600px;
`;

const ChatContainer = styled.div`
  padding: 20px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 16px;
  overflow-y: scroll;
`;

const MessageWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 16px 24px;
  margin-top: 20px;
  width: 100%;
  border-radius: 32px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const SendButton = styled.button`
  position: absolute;
  right: 8px;
  bottom: 7px;
  padding: 10px;
  width: 56px;
  color: white;
  border: none;
  border-radius: 32px;
  background-color: #9c9c9c;
  cursor: pointer;
`;

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY

function App() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<any>('');
const chatRef = useRef<any>(null);

console.log(messages)
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);
  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    // 사용자 메시지 추가
    const userMessage = { sender: '나', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: inputValue }]
        })
      });

      const data = await response.json();
      const aiMessage = {
        sender: 'AI',
        content: data.choices[0].message.content
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('error:', error);
      const errorMessage = { sender: 'System', content: 'error: 응답 실패' };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Container>
      <h1>ChatGPT with JavaScript</h1>
      <ChatContainer ref={chatRef}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </p>
        ))}
      </ChatContainer>
      <MessageWrapper>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메세지 ChatGPT"
        />
        <SendButton onClick={sendMessage}>전송</SendButton>
      </MessageWrapper>
    </Container>
  );
}

export default App;