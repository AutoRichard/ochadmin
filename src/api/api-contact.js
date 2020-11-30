//const link = 'http://localhost:8080';
const link = 'https://ochbackend.herokuapp.com';


const listById = (id) => {
    return fetch(link + '/api/contact/' + id, {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}


const listContact = () => {
    return fetch(link + '/api/contact', {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}

const remove = (params, credentials) => {
    return fetch(link + '/api/contact/' + params.newsId, {
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
    listById,
    listContact,
    remove
} 