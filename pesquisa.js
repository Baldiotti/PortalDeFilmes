let API_key = 'bbc26608abe1711c29ab7d588542521a';


/* Pesquisa na URL para puxar os parametros de GET */
const params = new URLSearchParams(location.search);
let tipo = params.get('type');
let pag = params.get('pag');


/* Chama a API */
let xhr = new XMLHttpRequest();
xhr.onload = exibeResultado;
xhr.open('GET', `https://api.themoviedb.org/3/search/multi?api_key=${API_key}&&language=pt-BR&query=${tipo}&page=${pag}`, false);
xhr.send();



function exibeResultado () {
    let divTela = document.getElementById('resultados');
    let texto = '';
    let dados = JSON.parse(this.responseText);
    window.pagFinal = dados.total_pages
    console.log(dados);

    for(i = 0; i < dados.results.length; i++) {
        let filme = dados.results[i];
        let overview, imagem, titulo;

        switch(filme.media_type) {
            case 'movie':
            case 'tv':

                if(filme.overview.charAt(0) == 0)
                    overview = 'Resumo não disponível';
                else
                    overview = filme.overview; 

                if(typeof(filme.poster_path) != "object")
                    imagem = `https://image.tmdb.org/t/p/w400/${filme.poster_path}`;
                else
                    imagem = "imagens/fotoDeletada.jpg";

                if(filme.title != undefined)
                    titulo = filme.title;
                else
                    titulo = filme.name;
                

                
                texto = texto + `
                <div class="result">
                <a href="descricao.html?type=${filme.media_type}&id=${filme.id}">
                <img src=${imagem} alt="Foto Resultado" class="imgResult">
                <div class="textoResult">
                    <span class="txtTitulo">${titulo}</span>
                    <span class="txtResumo">${overview}</span>
                    <span class="txtTpMd"><b>Tipo de mídia:</b> ${filme.media_type}</span>
                </div>
                </a>
                </div>
                `
                break;
            case 'person':

                if(typeof(filme.profile_path) != "object")
                    imagem = `https://image.tmdb.org/t/p/w400/${filme.profile_path}`;
                else
                    imagem = "imagens/fotoDeletada.jpg";

                texto = texto + `
                <div class="result">
                <a href="descricao.html?type=${filme.media_type}&id=${filme.id}">
                <img src=${imagem} alt="Foto Resultado" class="imgResult">
                <div class="textoResult">
                    <span class="txtTitulo">${filme.name}</span>
                    <span class="txtResumo">Popularidade: ${filme.popularity}</span>
                </div>
                </a>
                </div>
                `
                break;
            default:
                console.log('erro!');
        }
    }
    divTela.innerHTML = texto;
}

onload = () => {

    document.querySelector('#btnInicio').onclick = function () {
        location.href = "index.html";
    };
    let teste = document.getElementById('ultPag');
    teste.innerHTML = pagFinal;
    let esq = document.querySelector('.btnEsq');
    let mid = document.querySelector('.btnMid');
    let dir = document.querySelector('.btnDir');
    let ult = document.querySelector('.btnUlt');
    let pri = document.querySelector('.btnPri');
    let arrMenos = document.querySelector('.arrMenos');
    let arrMais = document.querySelector('.arrMais');



    /* Estilização de quando um botão de passar pagina aparece ou some */
    if(pag == 1){
        arrMenos.style.display = 'none';
        esq.style.display = 'none';
    }
    if(pag > pagFinal-2){
        document.querySelector('.retiUlt').style.display = 'none';
        ult.style.display = 'none';
    }
    if(pag == pagFinal){
        arrMais.style.display = 'none';
        dir.style.display = 'none';
        ult.style.display = 'none';
    }
    if(pag < 3){
        pri.style.display = 'none';
        document.querySelector('.retiPri').style.display = 'none';
    }
    if(pagFinal == 1){
        arrMenos.style.display = 'none';
        arrMais.style.display = 'none';
        dir.style.display = 'none';
        esq.style.display = 'none';
        ult.style.display = 'none';
    }



    mid.style.backgroundColor = '#404040';    
    esq.innerHTML = pag-1;
    mid.innerHTML = pag;
    dir.innerHTML = parseInt(pag)+1;


    arrMenos.onclick = () => passaResult(parseInt(pag) - 1);
    arrMais.onclick = () => passaResult(parseInt(pag) + 1);
    esq.onclick = () => passaResult(esq.innerHTML);
    mid.onclick = () => passaResult(mid.innerHTML);
    dir.onclick = () => passaResult(dir.innerHTML);
    ult.onclick = () => passaResult(pagFinal);

    /* Adição do botão Enter para a pesquisa */
    const input = document.querySelector("#inptPesq");
    input.addEventListener("keyup", ({key}) => {
        if (key === "Enter") 
        trataPesquisaa();
    });
}

/* Troca de página */
const passaResult = (x) => {
    location.href = `pesquisa.html?type=${tipo}&pag=${x}`;
}


/* Tratamento para a pesquisa */

document.querySelector('#btnPesq').onclick = () => trataPesquisaa();

const trataPesquisaa = () => {
    let valuePesq = document.getElementById('inptPesq').value;
    valuePesq = valuePesq.replaceAll(' ', '%20');
    console.log(valuePesq);
    location.href = `pesquisa.html?type=${valuePesq}&pag=1`;
}