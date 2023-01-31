let API_key = 'bbc26608abe1711c29ab7d588542521a';

/* Pesquisa na URL para puxar os parametros de GET */
const params = new URLSearchParams(location.search);
let link1 = params.get('type');
let link2 = params.get('id');

/* Chama a API */
let xhr = new XMLHttpRequest();
xhr.onload = exibeTela;
xhr.open('GET', `https://api.themoviedb.org/3/${link1}/${link2}?api_key=${API_key}&&language=pt-BR`, false);
xhr.send();


/* Função que dará os GETs necessários e ira posicionalos no HTML */
function exibeTela() {
    let divTela = document.getElementById('geral');
    let texto, data, gen;
    var generos = '';
    let dados = JSON.parse(this.responseText);
    

    
    let genres = () => {
        for(i=0; i<dados.genres.length; i++){
            if(i < dados.genres.length - 1){
                generos = generos + `
                ${dados.genres[i].name},
                `
            } else {
                generos = generos + `
                ${dados.genres[i].name}.
                `
            }
        }
    }

    let imgFundo = () => {
        document.getElementById('conteudo').style.backgroundImage = `url(https://image.tmdb.org/t/p/original${dados.backdrop_path})`;
    }

    switch(link1) {
        case 'movie':
            genres();
            imgFundo();
            console.log(dados);
            data = new Date(dados.release_date);
            
            texto = `
            <img src="https://image.tmdb.org/t/p/w400/${dados.poster_path}" alt="Poster Filme" class="Foto">
            <div class="divTexto">
                <span class="nome">${dados.title}</span>
                <span class="custo cont2"><b>Custo de Produção:</b>  ${dados.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                <span class="genero cont2"><b>Genero:</b> ${generos}</span>
                <span class="tamanho cont2"><b>Duração:</b> ${dados.runtime} minutos</span>
                <span class="lancamento cont2"><b>Lançamento:</b> ${data.toLocaleDateString()}</span>
                <span class="valor cont2"><b>Valor Arrecadado:</b> ${dados.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                <span class="resumo cont3"><b>Resumo:</b> ${dados.overview}</span>
            </div>
            `;
            break;
        case 'tv':
            genres();
            imgFundo();
            data = new Date(dados.first_air_date);

            texto = `
            <img src="https://image.tmdb.org/t/p/w400/${dados.poster_path}" alt="Poster Serie" class="Foto">
            <div class="divTexto">
                <span class="nome">${dados.name}</span>
                <span class="episodios cont2"><b>Episodios:</b> ${dados. number_of_episodes}</span>
                <span class="genero cont2"><b>Genero:</b> ${generos}</span>
                <span class="lancamento cont2"><b>Lançamento:</b> ${data.toLocaleDateString()}</span>
                <span class="homepage cont2"><b>HomePage:</b> <a href="${dados.homepage}" target="_blank">${dados.homepage}</a></span>
                <span class="resumo cont3"><b>Resumo:</b> ${dados.overview}</span>
            </div>
            `;
            break;
        case 'person':
            data = new Date(dados.birthday);
            texto = `
            <img src="https://image.tmdb.org/t/p/w400/${dados.profile_path}" alt="Foto Famoso" class="Foto">
            <div class="divTexto">
                <span class="nome">${dados.name}</span>
                <span class="homepage cont2"><b>Departamento:</b> ${dados.known_for_department}</span>
                <span class="lancamento cont2"><b>Nascimento:</b> ${data.toLocaleDateString()}</span>
                <span class="resumo cont3"><b>Biografia:</b> ${dados.biography}</span>
            </div>
            `;
        default:
            console.log('Algo deu errado!');
    }
    divTela.innerHTML = texto;

}


onload = () => {
    document.querySelector('#btnInicio').onclick = function () {
        location.href = "index.html";
    };


    document.querySelector('#btnPesq').onclick = () => trataPesquisaa();
    
    /* Adição do botão Enter para a pesquisa */
    const input = document.querySelector("#inptPesq");
    input.addEventListener("keyup", ({key}) => {
        if (key === "Enter") 
        trataPesquisa();
    });
}

/* Tratamento para a pesquisa */
const trataPesquisa = () => {
    let valuePesq = document.getElementById('inptPesq').value;
    valuePesq = valuePesq.replaceAll(' ', '%20');
    console.log(valuePesq);
    location.href = `pesquisa.html?type=${valuePesq}&pag=1`;
}