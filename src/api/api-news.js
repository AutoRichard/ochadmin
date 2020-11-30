//const link = 'http://localhost:8080';
const link = 'https://ochback.herokuapp.com';

const create = (credentials, formData) => {
    return fetch(link + '/api/news', {
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


const listById = (id) => {
    return fetch(link + '/api/news/' + id, {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}


const listNews = () => {
    return fetch(link + '/api/news', {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}

const remove = (params, credentials) => {
    return fetch(link + '/api/news/' + params.newsId, {
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
    listNews,
    remove
} 