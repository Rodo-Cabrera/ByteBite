export const validationsFields = {
  name: /^[a-zA-ZÀ-ÿ\s]{4,40}$/,
  lastName: /^[a-zA-ZÀ-ÿ\s]{4,40}$/,
  password: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  age: /^\d+$/,
};

export const ageValidator = (value) => {
  return value >= 18 && value <=100
}



export const isValidCountry = (value) => {
  const validCountries = [
    "Argentina",
    "Uruguay",
    "Brasil",
    "Bolivia",
    "Paraguay",
    "Chile",
  ];
  return validCountries.includes(value);
};