const usuario_esperado = 'admin'
const senha_esperada = 'admin'
const formulario = document.querySelector('form')

formulario.addEventListener('submit', function(evento){
    evento.preventDefault()
    verificaLogin()
})

function verificaLogin(){
    const usuario = formulario.querySelector('#login_fullture_js').value
    const senha = formulario.querySelector('#senha').value

    if(usuario === usuario_esperado && senha === senha_esperada){
        sessionStorage.setItem('logado', JSON.stringify(true))
        window.location = 'index.html'
    }else{
        sessionStorage.setItem('logado', JSON.stringify(false))
        alert('Login ou senha incorretos')
    }
}
