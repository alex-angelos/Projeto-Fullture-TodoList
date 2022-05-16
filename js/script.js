let jsonLogado = sessionStorage.getItem('logado');
let logado = JSON.parse(jsonLogado);

if (!logado) {
    window.location = 'login.html'
};

console.log("Tá funcionando");


const formulario = document.querySelector("form");

const retorno = localStorage.getItem("todos");


let lista = JSON.parse(retorno);

const logoff = document.querySelector('#logoff');



let tarefa = document.querySelector(".todo-input");



const ul = document.querySelector(".todo-list");



let select = document.querySelector('.filter-todo');


if(lista == null){
    lista = []
};

carregaStorage(lista);

function carregaStorage(lista) {
    for(let item of lista){
        addLinha(item)
    }
    };

logoff.addEventListener('click', function () {
    sessionStorage.setItem('logado', JSON.stringify(false));
    window.location = 'login.html'
});



function atualizaStorage() {
    localStorage.setItem('todos', JSON.stringify(lista));
    
};

formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();


    let obj = criaItem();

    if (tarefaRepetida()) {
        alert("Tarefa já foi inserida!")
    } else


    if (tarefa.value == "") {
        alert("Informe a tarefa!")

    } else {
        lista.push(obj)
        atualizaStorage()
        addLinha(obj)
    };


});


function criaItem() {
    let item = {
        id: lista.length + 1,
        task: tarefa.value,
        completed: false
    }
    return item
};


function tarefaRepetida() {
    console.log(lista);

    for (let i = 0; i < lista.length; i++) {

        if (lista[i].task == tarefa.value) {

            console.log("Tarefa Repedita " + lista[i].task);
            return true
            
        };

        
    }
}

function addLinha(obj) {

    let btncheck = document.createElement("button");

    btncheck.classList.add("check-btn");
    btncheck.id = lista.length
    btncheck.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';

    let div = document.createElement("div");
    div.classList.add("todo")

    div.id = 'div' + lista.length

    console.log(div);

    let li = document.createElement("li");

    li.id = 'li' + lista.length

    li.classList.add("todo-item");

    console.log(li);

    li.innerHTML = obj.task

    ul.append(div);

    div.append(li);

    let botaotrash = criaBotaoTrash()

    div.append(btncheck);

    div.append(botaotrash);

    btncheck.addEventListener('click', (stl) => {

        let s = stl.target.id

        for (let i = 0; i < lista.length; i++) {
            if (s == lista[i].id) {
                li.classList.add('completed')
                lista[i].completed = true
                console.log(lista)
            };

        };
    });
};
//excluir tarefa
function criaBotaoTrash() {
    let btntrash = document.createElement("button");
    btntrash.classList.add("trash-btn");
    btntrash.id =  lista.length
    btntrash.innerHTML = '<i class="fas fa-trash" aria-hidden="true"></i>'

    btntrash.addEventListener('click', function (b) {

        let btn = b.target
        let id = btn.id

        for (let i = 0; i < lista.length; i++) {
            if (id == lista[i].id) {
                lista.splice(i, 1)

                atualizaStorage()

                console.log(lista)

            }
        }

        let div_remove = document.querySelector('#div' + id)
        ul.removeChild(div_remove);

        

        console.log(div_remove);
        console.log("Tarefa removida");
        atualizaStorage()
    })

    return btntrash

}

//filtrar tarefas finalizadas
function completas() {

    for (let i = 0; i < lista.length; i++) {

        console.log(i);
        console.log(lista[i]);

        let div_hide = document.getElementById('div'+ (i++))

        console.log(div_hide);

        console.log(lista);
        div_hide.classList.remove('hide');
        if (lista[i].completed !== true) {
            div_hide = document.getElementById('div'+ (i++))
            div_hide.classList.add('hide');
        } else {}

    }

}
//Filtrar tarefas pendentes
function incompletas(){
    
    for(i=0;i<lista.length;i++){
        let div_hide = document.getElementById('div' + (i++))
        div_hide.classList.remove('hide')
        if(lista[i].completed == true){
            console.log(lista[i])
            div_hide = document.getElementById('div' + (i++))
            div_hide.classList.toggle('hide')
                
        }
        else {}

}
}
//Filtrar todas as tarefas
function todas(){
    for(i=0;i<lista.length;i++){
            console.log(lista[i])
            let div_hide = document.getElementById('div' + (i++))
            div_hide.classList.remove('hide')
            console.log(div_hide)                        

}}

select.addEventListener('change',function(){
    selValue = select.value
    switch(selValue){
        case 'completed': completas();
        break;
        case 'uncompleted':incompletas();
        break;
        case 'all': todas();
        break;
        default:''

    }
})

