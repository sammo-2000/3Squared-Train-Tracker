const setCookies = (name, value) => {
  document.cookie = `${name}=${value}`;
};

const readCookies = (name) => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name));
  return cookie ? cookie.split("=")[1] : "";
};

const clearCookies = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
