
document.getElementById('form-login').addEventListener('submit', (e)=>{
    e.preventDefault()
    const email = document.getElementById('inputEmail').value
    const password = document.getElementById('inputPassword').value

    const regexEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/

    if (!regexEmail.test(email)) {
        alert('Email inválido!');
    }else if(!password) {
        alert('Preencha o campo senha para logar!')
    }else{
        (async () => {
            try {
             
                const response = await fetch(`/../../../user-register/server/controllers/login.php?email=${email}&password=${password}`)
                const data = await response.json()
                if (response.ok) {
                    console.log(data)
                    alert(data.message)
                }else {
                    alert(data.message)
                }
               
            } catch (error) {
                console.log(error);
            }
        })()
    }

})