import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import Logout from './Logout';

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [selectedContactIndex, setSelectedContactIndex] = useState(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (data) {
        const parsedData = JSON.parse(data);
        setCurrentUserName(parsedData.username);
        setCurrentUserImage(parsedData.avatarImage);
      }
    };
    fetchUserData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setSelectedContactIndex(index);
    changeChat(contact);
  };

  return (
    <>
    
      {currentUserImage && (
      <Container>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h3>quickconvo</h3>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => (
            <div
              key={contact._id}
              className={`contact ${
                index === selectedContactIndex ? "selected" : ""
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt={contact.username}
                />
              </div>
              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
          <Logout />
        </div>
      </Container>
    )
    }
</>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 2rem;
    }

    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;

    &::-webkit-scrollbar {
      width: 0.2rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }

    .selected {
      background-color:  #00CED121;
    }
  }

  .current-user {
    background-color: #00FF0021;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: white;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;

      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
