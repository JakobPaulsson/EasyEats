import axios from "axios";

axios.defaults.withCredentials = true;

export const setSelectedPreset = async (userID: number, name: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/user/preset?userID=${userID}&name=${name}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to set selected preset", error);
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/user?username=${username}&password=${password}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to set selected preset", error);
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/user/login?username=${username}&password=${password}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to set selected preset", error);
  }
};
export const logoutUser = async (userID: number) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/user/logout?userID=${userID}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to set selected preset", error);
  }
};

export const currentUser = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/user/currentUser`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to get current user", error);
  }
};
