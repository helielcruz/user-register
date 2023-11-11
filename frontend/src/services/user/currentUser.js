let currentUser

try {

    currentUser = async () => {

        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost/user-register/server/controllers/get-user.php`, { method: 'GET', headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" } })

        if (response.ok) {
            const data = await response.json()
            currentUser = data;
            return data
        } else {
            window.open('http://localhost/user-register/', '_self')
        }
    }

} catch (error) {
    window.open('http://localhost/user-register/', '_self')
    console.error(error);
}

export default currentUser