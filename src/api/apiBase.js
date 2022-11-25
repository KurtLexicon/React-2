import axios from "axios";

const URL_BASE = "https://localhost:7085";
function fullUrl(url) {
  return `${URL_BASE}/${url}`;
}
const configGetJson = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
};

const configPostJson = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

function checkResponse(response) {
  let errText = "";
  if (!response) {
    errText = `API Call status No Response`;
  }
  if (!response.status) {
    errText = `API Call Missing Response status`;
  } else if (response.status < 200 || response.status > 299) {
    errText = `API Call status ${response.status}`;
  } else if (!response.data) {
    errText = `API Call No data returned`;
  } else if (response.data.errorMessage) {
    errText = `API Call Error Message: ${response.data.errorMessage}`;
  }
  if (errText) {
    throw new Error(errText);
  }
}

export async function getJson(url, data) {
  try {
    const response = await axios.get(fullUrl(url), data, configGetJson);
    checkResponse(response);
    return response.data;
  } catch (error) {
    return { isError: true, errText: error.message || error };
  }
}

export async function deleteJson(url, data) {
  try {
    const response = await axios.delete(fullUrl(url), data, configGetJson);
    checkResponse(response);
    return response.data;
  } catch (error) {
    return { isError: true, errText: error.message || error };
  }
}

export async function postJson(url, data) {
  try {
    const response = await axios.post(fullUrl(url), data, configPostJson);
    checkResponse(response);
    return response.data;
  } catch (error) {
    console.log(error.message || error);
    return { isError: true, errText: error.message || error };
  }
}
