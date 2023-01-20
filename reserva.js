let API_key = 'bbc26608abe1711c29ab7d588542521a';


let xhr = new XMLHttpRequest();
xhr.onload = exibeCarrossel;
xhr.open('GET', 'https://api.themoviedb.org/3/trending/movie/week?api_key=bbc26608abe1711c29ab7d588542521a&language=pt-BR');
xhr.send();


function exibeCarrossel() {
    let divTela = document.getElementById('carrossel');
    let texto = '';
    
    let dados = JSON.parse(this.responseText);
    let data = new Date(dados.results[5].release_date);
    for(i = 0; i < 5; i++){
        let filme = dados.results[i];
        data = new Date(filme.release_date);


        texto = texto + `
        <div class="itemCarrossel currentItem">
            <img src="https://image.tmdb.org/t/p/w400/${filme.poster_path}">
            <div class="textoCarrossel">
                <h3 class="tituloCarrossel">${filme.title}</h3>
                <div><span class="resumoCarrossel">${filme.overview} </span><a href="#">Leia Mais...</a></div
                <span class="lancamentoCarrossel">Lançamento: ${data.toLocaleDateString()}</span>
                <span class="popularidadeCarrossel">Popularidade: ${filme.vote_average}</span>
            </div>
        </div>`;
    };
    divTela.innerHTML = texto;
}

onload = () => {
    document.querySelector('.arrow-left').onclick = () => passatela('esq');
    document.querySelector('.arrow-right').onclick = () => passatela('dir');
    document.querySelector('.mF_button').onclick = () => expandeFilme('mF');
    document.querySelector('.mS_button').onclick = () => expandeFilme('mS');
};

let currentItem = 0;

const passatela = (e) => {
    const items = document.querySelectorAll(".itemCarrossel");
    const maxItems = items.length;


    let btn = e;
    if(e == "esq")
        currentItem -= 1;
    else if (e == "dir")
            currentItem += 1;

    if(currentItem == 6)
        currentItem = 0;

    if(currentItem < 0){
        currentItem = maxItems - 1;
    };

    items.forEach((item) => item.classList.remove("currentItem"));

    console.log(currentItem);
    items[currentItem].scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
    
    items[currentItem].classList.add("currentItem");
};




const expandeFilme = (e) => {
    let el = document.querySelector(`.${e}`);
    if(el.style.height == '600px')
        el.style.height = '300px'
    else
        el.style.height = '600px'
}

xhr.onload = mFfilme;
xhr.open('GET', 'https://api.themoviedb.org/3/movie/popular?api_key=bbc26608abe1711c29ab7d588542521a&language=pt-BR');
xhr.send();

const mFfilme {
    
}
