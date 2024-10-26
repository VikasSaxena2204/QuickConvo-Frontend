import React, { useState, useRef } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import emojis from '../utils/emojis';

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker((prev) => !prev);
    if (!showEmojiPicker) {
      inputRef.current.focus();
    }
  };

  const handleEmojiClick = (emoji) => {
    setMsg((prev) => prev + emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.trim()) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill 
            onClick={handleEmojiPickerToggle} 
            aria-label="Toggle emoji picker" 
            aria-expanded={showEmojiPicker} // Added aria-expanded
          />
          {showEmojiPicker && (
            <EmojiPicker>
              {emojis.slice(0, 200).map((emoji) => ( 
                <span 
                  key={emoji.id} 
                  onClick={() => handleEmojiClick(emoji.emoji)}
                  role="button" // Added role for accessibility
                  aria-label={`Insert ${emoji.emoji}`} // Added aria-label for each emoji
                >
                  {emoji.emoji}
                </span>
              ))}
            </EmojiPicker>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <label htmlFor="chat-input" style={{ display: "none" }}>Chat input</label>
        <input
          ref={inputRef}
          id="chat-input"
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          autoComplete="off"
        />
        <button type="submit" aria-label="Send message">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.5rem;
        color: #FFEA00;
        cursor: pointer;
        transition: transform 0.2s;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #20C997;
      border: none;

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

const EmojiPicker = styled.div`
  position: absolute;
  bottom: 30px; 
  left: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: grid; 
  grid-template-columns: repeat(5, 1fr); 
  max-height: 200px; 
  overflow-y: auto; 

  span {
    font-size: 2rem; 
    cursor: pointer;
    padding: 10px; 

    &:hover {
      background-color: #f0f0f0; 
    }
  }
`;
