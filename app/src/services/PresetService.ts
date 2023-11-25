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
      `http://localhost:8080/preset?userID=${userID}&name=${name}&icon=${icon}&color=${color.replace(
        "#",
        "",
      )}&ratingMetric=${ratingMetric}&cookingTimeMetric=${cookingTimeMetric}&commonIngredientsMetric=${commonIngredientsMetric}&numberOfIngredientsMetric=${numberOfIngredientsMetric}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch add preset", error);
  }
};

export const getPresets = async (userID: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/preset?userID=${userID}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch add preset", error);
  }
};