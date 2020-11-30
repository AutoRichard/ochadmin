//const link = 'http://localhost:8080';
const link = 'https://ochback.herokuapp.com';



const list = () => {
  return fetch(link + '/api/users', {
    method: 'GET',
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

const read = (params) => {
  return fetch(link + '/api/users/' + params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const image = (params, credentials, formData) => {
  return fetch(link + '/api/image/' + params.userId, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: formData
  })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

const update = (params, credentials, user) => {
  return fetch(link + '/api/adminupdate/' + params.userId, {
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
  list,
  read,
  update,
  image,
}
