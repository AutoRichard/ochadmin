//const link = 'http://localhost:8080';
const link = 'https://ochback.herokuapp.com';

const create = (credentials, formData) => {
    return fetch(link + '/api/instructor', {
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

const update = (credentials, formData, id) => {
    return fetch(link + '/api/instructor/' + id, {
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

const updateEvent = (credentials, data, id) => {
    return fetch(link + '/api/instructorevent/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }




const listById = (id) => {
    return fetch(link + '/api/instructor/' + id, {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}




const listInstructor = () => {
    return fetch(link + '/api/instructor', {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}

const remove = (params, credentials) => {
    return fetch(link + '/api/instructor/' + params.newsId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}

export {
    create,
    listById,
    listInstructor,
    remove,
    update,
    updateEvent
} 