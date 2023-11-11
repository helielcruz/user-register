import Auth from "./auth/auth.js";
import currentUser from './user/currentUser.js'
import env from './env.js'


try {
    let user
    document.addEventListener('DOMContentLoaded', async () => {
        if (!await Auth.verify()) window.open('http://localhost/user-register', '_self')
        user = await currentUser()
            
            let initialMessage = document.getElementById('title')
            initialMessage.innerHTML = `Perfil de ${user.name}`

    })

    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem("token");
        window.open('http://localhost/user-register', '_self')
    })
    

    document.getElementById('formCurrencyExchange').addEventListener('submit', async (e)=>{
        e.preventDefault()

        let coins =  document.getElementById('selectCoins')
        let textHistory =  document.getElementById('text-history')
        if(!coins.value) {
            console.log('1', coins.value);
            coins.style.border = 'solid 1px #ad2828'
            setTimeout(() => {
                coins.style.border = 'solid 1px rgb(73, 187, 221)'
            }, 2000);
        } else {
            console.log('2', coins.value);
            let sendButton = document.getElementById('sendButton')
            let sendIcon = document.getElementById('sendIcon')
            sendIcon.style.cursor = 'wait'
            sendIcon.className = 'fa-solid fa-spinner fa-spin-pulse'

            const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${coins.value.trim()}`)

            if (response.ok) {
                const data = await response.json()
                console.log(data);
                const {bid, create_date, code, codein, name} = data[coins.value.replace('-', '')]
                sendIcon.className = 'fa-solid fa-paper-plane'
                sendIcon.style.cursor = 'default'
                let date = new Date(create_date)
                date.toLocaleString('pt-BR')
                textHistory.innerHTML = 'A áltima cotação registrada em '+`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}
                 às `+' para '+name+' foi de '+bid
            }


        }
    })

} catch (error) {
    console.log(error);
}