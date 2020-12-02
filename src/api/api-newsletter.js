const link = 'http://localhost:8080';
//const link = 'https://ochback.herokuapp.com';

const listNewsletter = () => {
    return fetch(link + '/api/newsletter', {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}


export {
    listNewsletter
}