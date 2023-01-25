let API_key = 'bbc26608abe1711c29ab7d588542521a';


var lista = [
    {"url1":"trending","url2": "movie/week", "divTela": "carrossel", "tamDado": "5" },
    {"url1": "movie", "url2": "popular", "divTela": "mF", "tamDado": "10"},
    {"url1": "tv", "url2": "popular", "divTela": "mS", "tamDado": "10"},
    {"url1": "person", "url2": "popular", "divTela": "mFS", "tamDado": "3"}
]
for(j = 0; j < 4; j++){
    let xhr = new XMLHttpRequest();
    xhr.onload = exibeCarrossel;
    xhr.open('GET', `https://api.themoviedb.org/3/${lista[j].url1}/${lista[j].url2}?api_key=bbc26608abe1711c29ab7d588542521a&&language=pt-BR`, false);
    xhr.send();
    
    function exibeCarrossel() {
        let divTela = document.getElementById(lista[j].divTela);
        let texto = '';
        let dados = JSON.parse(this.responseText);
        if(divTela == document.getElementById('carrossel'));
            let data = new Date(dados.results[5].release_date);
        for(i = 0; i < lista[j].tamDado; i++){
            let filme = dados.results[i];
            data = new Date(filme.release_date);
            switch(lista[j].divTela){
                case 'carrossel':
                    texto = texto + `
                    <div class="itemCarrossel currentItem">
                    <a href=""><img src="https://image.tmdb.org/t/p/w400/${filme.poster_path}">
                    <div class="textoCarrossel">
                    <h3 class="tituloCarrossel">${filme.title}</h3>
                    <span class="resumoCarrossel"><b>Resumo:</b> ${filme.overview}</span>
                    <span class="lancamentoCarrossel"><b>Lançamento:</b> ${data.toLocaleDateString()}</span>
                    <span class="popularidadeCarrossel"><b>Popularidade:</b> ${filme.vote_average}</span>
                    </div>
                    </a>
                    </div>`;
                    break;
                case 'mF':
                    texto = texto + `
                    <div class="mF_filmes">
                        <a href="">
                            <img src="https://image.tmdb.org/t/p/w154/${filme.poster_path}" alt="Poster Filme">
                            <span>${filme.title}</span>
                        </a>
                    </div>`;
                    break;
                case 'mS':
                    texto = texto + `
                    <div class="mS_series">
                        <a href="">
                            <img src="https://image.tmdb.org/t/p/w154/${filme.poster_path}" alt="Poster Serie">
                            <span>${filme.name}</span>
                        </a>
                    </div>`;
                    break;
                case 'mFS':
                    texto = texto + `
                    <div class="mFS_famoso">
                        <a href="">
                            <img src="https://image.tmdb.org/t/p/w154/${filme.profile_path}" alt="Foto Famoso">
                            <span class="mFS_escrito">${filme.name}</span>
                        </a>
                    </div>`;
                    break;
                default:
                    console.log('erro');
            }
            
        };
        divTela.innerHTML = texto;
    }
};

onload = () => {
    document.querySelector('.arrow-left').onclick = () => passatela('esq');
    document.querySelector('.arrow-right').onclick = () => passatela('dir');
    document.querySelector('.maisMenosMF').onclick = () => expandeFilme('mF');
    document.querySelector('.maisMenosMS').onclick = () => expandeFilme('mS');
    document.querySelector('#btnFilme').onclick = () => centraliza('mainFilmes');
    document.querySelector('#btnSerie').onclick = () => centraliza('mainSerie');
    document.querySelector('#btnFamoso').onclick = () => centraliza('mainFamoso');
    document.querySelector('#btnSobre').onclick = function () {
        location.href = "index.html";
    };
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

    if(currentItem == 5)
        currentItem = 0;

    if(currentItem < 0){
        currentItem = maxItems - 1;
    };

    items.forEach((item) => item.classList.remove("currentItem"));

    items[currentItem].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
    
    items[currentItem].classList.add("currentItem");
};




const expandeFilme = (e) => {
    let el = document.querySelector(`.${e}`);
    if(el.style.height == '800px'){
        el.style.height = '400px'
        document.getElementById(`menosHori${e}`).style.transform = 'rotate(-180deg)'
        document.getElementById(`menosVert${e}`).style.transform = 'rotate(-180deg)'
    }
    else {
        el.style.height = '800px';
        document.getElementById(`menosHori${e}`).style.transform = 'rotate(180deg)';
        document.getElementById(`menosVert${e}`).style.transform = 'rotate(90deg)';
        setTimeout(centraliza, 500, el.parentNode);
    }
};



const centraliza = (e) => {
    let sup;
    if(e == 'mainFilmes' || e == 'mainSerie' || e == 'mainFamoso'){
        sup = document.querySelector(`.${e}`);
        sup.scrollIntoView({behavior: "smooth", block: "center"});
    }
    else{
        sup = e;
        sup.scrollIntoView({behavior: "smooth", block: "start"});
    }
};
