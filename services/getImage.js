import axios from "axios";
export const fetchImage = async (query) => {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: import.meta.env.VITE_PIXABAY_API_KEY,
        q: ` ${query} `,
        image_type: "photo",
      },
    });
    return response.data.hits[0]?.webformatURL || null;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};
