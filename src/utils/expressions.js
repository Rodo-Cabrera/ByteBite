
const expressions = {
  name: /^[a-zA-ZÀ-ÿ\s]{4,40}$/,
  lastName: /^[a-zA-Z0-9_-]{4,16}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 
  userName: /^[a-zA-Z0-9_-]{4,16}$/,
  password: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, 
}

export default expressions