// Espera a página HTML carregar completamente antes de rodar o código
document.addEventListener("DOMContentLoaded", () => {
    
    // Passo 1: Busca o arquivo JSON (Carregamento Dinâmico exigido no roteiro)
    fetch('data/dados.json')
        .then(resposta => resposta.json()) // Converte o texto para um objeto JavaScript
        .then(dados => {
            
            // ========================================================
            // GRÁFICO 1: Destino do E-lixo (Público Geral) - Doughnut
            // ========================================================
            const destinoLixo = dados.publico_geral.destino_eletronicos;
            
            const contextoElixo = document.getElementById('graficoE-lixo').getContext('2d');
            new Chart(contextoElixo, {
                type: 'doughnut',
                data: {
                    labels: ['Lixo Comum', 'Na Gaveta', 'Reciclagem Especializada'],
                    datasets: [{
                        label: 'Quantidade de Pessoas',
                        data: [destinoLixo.lixo_comum, destinoLixo.gaveta, destinoLixo.reciclagem],
                        backgroundColor: ['#ff4757', '#ffa502', '#2ed573'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: 'O que a comunidade faz com Eletrônicos Antigos?' }
                    }
                }
            });

            // ========================================================
            // GRÁFICO 2: Políticas de Eficiência (Empresas) - Barras
            // ========================================================
            const politicasEmpresas = dados.empresas.politica_reducao_energia;
            
            const contextoEmpresas = document.getElementById('graficoEmpresas').getContext('2d');
            new Chart(contextoEmpresas, {
                type: 'bar', // Mudamos o tipo para barras
                data: {
                    labels: ['Possuem Política de Redução', 'Não Possuem Política'],
                    datasets: [{
                        label: 'Número de Empresas',
                        data: [politicasEmpresas.com_politica, politicasEmpresas.sem_politica],
                        backgroundColor: ['#1e90ff', '#a4b0be'], // Azul para 'Sim', Cinza para 'Não'
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 1 } // Força o eixo Y a usar números inteiros (1, 2, 3...)
                        }
                    },
                    plugins: {
                        title: { display: true, text: 'Adoção de Políticas de Redução de Energia (Amostra: 3 empresas)' },
                        legend: { display: false } // Esconde a legenda extra, já que o título explica bem
                    }
                }
            });

        })
        .catch(erro => {
            console.error("Erro ao carregar os dados dinâmicos do JSON:", erro);
        });
});