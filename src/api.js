export const isDevelopment = () => {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
}

export const getApiLocation = () => {
  if (isDevelopment()) {
    return "http://localhost:8045/";
  } else {
    return "https://api.stratako.com/";
  }
}