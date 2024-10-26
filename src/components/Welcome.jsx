import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import ServerStatus from "./ServerStatus";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const DEFAULT_USERNAME = "Guest";

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserName(parsedData.username || DEFAULT_USERNAME);
        } else {
          setUserName(DEFAULT_USERNAME);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setUserName(DEFAULT_USERNAME); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchUserName();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <>
          <StyledImage src={Robot} alt="Robot" />
          <h1>
            Welcome, <Span>{userName}!</Span>
          </h1>
          <h3>Please select a chat to start messaging.</h3>
          <ServerStatus />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
`;

const LoadingMessage = styled.h1`
  color: white;
`;

const StyledImage = styled.img`
  height: 20rem;
  max-width: 100%;
`;

const Span = styled.span`
  color: #1A0ED5;
`;
