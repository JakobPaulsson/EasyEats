import axios from "axios";

export const addPreset = async (
  userID: number,
  name: string,
  icon: string,
  color: string,
  ratingMetric: number,
  cookingTimeMetric: number,
  commonIngredientsMetric: number,
  numberOfIngredientsMetric: number,
) => {
  try {
    const response = await axios.post(
      `${
        process.env.REACT_APP_HOST
      }/preset?userID=${userID}&name=${name}&icon=${icon}&color=${color.replace(
        "#",
        "",
      )}&ratingMetric=${ratingMetric}&cookingTimeMetric=${cookingTimeMetric}&commonIngredientsMetric=${commonIngredientsMetric}&numberOfIngredientsMetric=${numberOfIngredientsMetric}`,
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
      `${process.env.REACT_APP_HOST}/preset?userID=${userID}`,
    );
    if (response && response.data) {
      localStorage.setItem("presets", JSON.stringify(response));
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch add preset", error);
  }
};
