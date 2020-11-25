const link =  'http://localhost:8080';
//const link = 'https://ochbackend.herokuapp.com';
 
const signin = (user) => {
  return fetch(link + '/adminauth/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //credentials: 'include',
    body: JSON.stringify(user)
  })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
} 

const signout = () => {
  return fetch(link + '/adminauth/signout', {
    method: 'GET',
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

export {
  signin,
  signout
}
