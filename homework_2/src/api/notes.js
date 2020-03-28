export function getNotes() {
    const config = withToken({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return fetch('/notes', config)
        .then((res) => res.json())
}

export function deleteNote(id) {
    const config = withToken({
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id }),
    });

    return fetch('/notes', config);
}

export function createNote(note) {
    const config = withToken({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });

    return fetch('/notes', config);
}

export function editNote(note) {
    const config = withToken({
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });

    return fetch('/notes', config);
}

function withToken(httpConfig) {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        httpConfig.headers['Authorization'] = `jwt_token ${user.jwt_token}`;
    } catch(err) {
        console.log(err);
    }
    return httpConfig;
}