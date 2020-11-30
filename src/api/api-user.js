//const link = 'http://localhost:8080';
const link = 'https://ochback.herokuapp.com';

const read = (params) => {
  return fetch(link + '/api/admin/' + params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}


const update = (params, credentials, user) => {
  return fetch(link + '/api/admin/' + params.userId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(user)
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}


const password = (params, credentials, user) => {
  return fetch(link + '/api/password/' + params.userId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(user)
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

export {
  read,
  update,
  password
}
