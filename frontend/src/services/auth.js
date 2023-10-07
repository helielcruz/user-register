
const auth = {
    verify: async () => {
        const token = localStorage.getItem('token')

        const response = await fetch(`http://localhost/user-register/server/midlewares/auth.php`, { method: 'GET', headers: { "Authorization": "Bearer "+token, "Content-Type": "application/json" } })

        if(response.ok && token) window.open('http://localhost/user-register/home', '_self')
    }
}

export default auth