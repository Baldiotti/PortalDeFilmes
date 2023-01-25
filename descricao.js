let API_key = 'bbc26608abe1711c29ab7d588542521a';

const params = new URLSearchParams(location.search);
let link1 = params.get('type');
let link2 = params.get('id');
console.log(link1, link2)


let xhr = new XMLHttpRequest();
xhr.onload = exibeTela;
xhr.open('GET', `https://api.themoviedb.org/3/${link1}/${link2}?api_key=bbc26608abe1711c29ab7d588542521a&&language=pt-BR`, false);
xhr.send();



function exibeTela() {
    let divTela = document.getElementById('geral');
    let texto, data;
    let dados = JSON.parse(this.responseText);
    console.log(dados);
    switch(link1) {
        case 'movie':
            data = new Date(dados.release_date);
            console.log(data);
            texto = `
            <img src="https://image.tmdb.org/t/p/w400/${dados.poster_path}"" alt="Poster Filme">
            <span class="titulo">Titulo: ${dados.title}</span>
            <span class="custo">Custo de Produção: R$${dados.budget}</span>
            <span class="genero">Genero: </span>
            <span class="resumo">Resumo: ${dados.overview}</span>
            <span class="lancamento">Lançamento: ${data.toLocaleDateString()}</span>
            <span class="valor">Valor Arrecadado: R$${dados.revenue}</span>
            <span class="tamanho">Duração: ${dados.runtime} minutos</span>
            `;
            break;
        case 'tv':
            data = new Date(dados.first_air_date);
            texto = `
            <img src="https://image.tmdb.org/t/p/w400/${dados.poster_path}" alt="Poster Filme">
            <span class="titulo">${dados.name}</span>
            <span class="homepage">HomePage: <a href="${dados.homepage}" target="_blank">${dados.homepage}</a></span>
            <span class="genero">Genero</span>
            <span class="resumo">Resumo: ${dados.overview}</span>
            <span class="lancamento">Lançamento: ${data.toLocaleDateString()}</span>
            <span class="episodios">Episodios: ${dados.number_of_episodes}</span>
            `;
            break;
        case 'person':
        default:
            console.log('Algo deu errado!');
    }
    divTela.innerHTML = texto;
}