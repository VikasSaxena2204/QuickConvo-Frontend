import React, { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/OZ9e3KYsaPGg4m`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isSettingAvatar, setIsSettingAvatar] = useState(false);

  const toastOptions = useMemo(
    () => ({
      position: "bottom-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    }),
    []
  );

  useEffect(() => {
    const checkUserLoggedIn = () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      }
    };
    checkUserLoggedIn();
  }, [navigate]);

  const fetchAvatars = useCallback(async () => {
    try {
      const avatarPromises = Array.from({ length: 4 }, async () => {
        const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`, {
          responseType: 'text'  
        });
        const svgData = response.data;
        return btoa(svgData);
      });
      const data = await Promise.all(avatarPromises);
      setAvatars(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching avatars:", error);
      toast.error("Failed to load avatars. Please try again later.", toastOptions);
    }
  }, [api, toastOptions]);
  

  useEffect(() => {
    fetchAvatars();
  }, [fetchAvatars]);

  const setProfilePicture = async () => {
    if (selectedAvatar === null) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const userData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    if (!userData) return;

    const user = JSON.parse(userData);
    setIsSettingAvatar(true);

    try {
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Failed to set avatar. Please try again later.", toastOptions);
      }
    } catch (error) {
      console.error("Error setting avatar:", error);
      toast.error("An error occurred while setting the avatar. Please try again.", toastOptions);
    } finally {
      setIsSettingAvatar(false);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <img src={loader} alt="loader" className="loader" />
      ) : (
        <>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="submit-btn" disabled={isSettingAvatar}>
            {isSettingAvatar ? "Setting Profile Picture..." : "Set as Profile Picture"}
          </button>
          <ToastContainer />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #262b36;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;

      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #1a0ed5;
    }
  }
  .submit-btn {
    background-color: #1a0ed5;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #1a0ed5;
    }
  }
`;
