import axios from "axios";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("http://localhost:5000/predict", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};