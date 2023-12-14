import axios from "axios";
axios.defaults.withCredentials = true;

export const addPreset = async (
  userID: number,
  name: string,
  icon: string,
  color: string,
  ratingMetric: number,
  cookingTimeMetric: number,
  commonIngredientsMetric: number,
  numberOfIngredientsMetric: number
) => {
  try {
    const response = await axios.post(
      `${
        process.env.REACT_APP_HOST
      }/preset?userID=${userID}&name=${name}&icon=${icon}&color=${color.replace(
        "#",
        ""
      )}&ratingMetric=${ratingMetric}&cookingTimeMetric=${cookingTimeMetric}&commonIngredientsMetric=${commonIngredientsMetric}&numberOfIngredientsMetric=${numberOfIngredientsMetric}`
    );
    if (response && response.data) {
      getPresets(userID);
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch add preset", error);
  }
};

export const getPresets = async (userID: number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/preset?userID=${userID}`
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch add preset", error);
  }
};

export const removePreset = async (userID: number, presetName: string) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_HOST}/preset?userID=${userID}&name=${presetName}`
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};
