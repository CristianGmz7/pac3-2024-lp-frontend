//hacer console.log de data y error para ver su estructura

// import axios from "axios";

import { blogApi } from "../../../config/api/blogApi";
//se cambio todo donde estaba blogApi por axios

export const loginAsync = async ( form ) => {
  try {
    const { data } = await blogApi.post(
      `/auth/login`, form
    );

    //`/auth/login`, form   form viene siendo el dto de Login

    return data;

  } catch (error) {
    console.error({error});
    return error?.response?.data;
  }
}