
const auth = {
    verify: async () => {
        const token = localStorage.getItem('token')
        let response
        if(token) response = await fetch(`http://localhost/user-register/server/midlewares/auth.php`, { method: 'GET', headers: { "Authorization": "Bearer "+token, "Content-Type": "application/json" } })

        if(!response?.ok || !token) return false
        else return true
    }
}

export default auth