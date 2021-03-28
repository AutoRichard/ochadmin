//const link = 'http://localhost:8080';
const link = 'https://ochback.herokuapp.com';

const create = (credentials, formData) => {
    return fetch(link + '/api/session', {
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

const listSession = () => {
    return fetch(link + '/api/session', {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}

const listJSession = (params) => {
    return fetch(link + '/api/jointsession', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}

export {
    create,
    listSession,
    listJSession
}