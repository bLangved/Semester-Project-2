export const save = (key, value) => {
  console.log(value);
  if (typeof value === "string") {
    localStorage.setItem(key, value);
    console.log(value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(value);
  }
};
