const destinos = [

    {
        id:1,
        nome:"Fernando de Noronha",
        pais:"Brasil",
        regiao:"Nordeste",
        preco:2990,
        imagem:"/user/img/card1.jpg",
        galeria:[
            "/user/img/card1.jpg",
            "/user/img/card1-2.jpg",
            "/user/img/card1-3.jpg"
        ],
        estrelas:5,
        categoria:"Praia",
        descricao:
        "Um dos destinos mais paradisíacos do Brasil, famoso pelas águas cristalinas, praias preservadas e uma natureza incrível."
    },

    {
        id: 2,
        nome: "Paris",
        pais: "França",
        regiao: "Europa",
        preco: 5490,
        imagem:"/user/img/card2.jpg",
        galeria:[
            "/user/img/card2.jpg",
            "/user/img/card2-2.jpg",
            "/user/img/card2-3.jpg"
        ],
        estrelas: 5,
        categoria: "Cidade",

        descricao:
        "A cidade luz encanta com sua arquitetura histórica, gastronomia refinada, museus famosos e o charme inesquecível da Torre Eiffel."
    },

    {
        id: 3,
        nome: "Suíça",
        pais: "Suíça",
        regiao: "Europa",
        preco: 7990,
        imagem:"/user/img/card3.jpg",
        galeria:[
            "/user/img/card3.jpg",
            "/user/img/card3-2.jpg",
            "/user/img/card3-3.jpg"
        ],
        estrelas: 5,
        categoria: "Montanha",

        descricao:
        "Um destino cercado por paisagens deslumbrantes, montanhas nevadas, lagos cristalinos e vilarejos encantadores."
    },

    {
        id: 4,
        nome: "Maldivas",
        pais: "Maldivas",
        regiao: "Ásia",
        preco: 9990,
        imagem:"/user/img/card4.jpg",
        galeria:[
            "/user/img/card4.jpg",
            "/user/img/card4-2.jpg",
            "/user/img/card4-3.jpg"
        ],
        estrelas: 5,
        categoria: "Praia",

        descricao:
        "Um verdadeiro paraíso tropical com praias de areia branca, águas azul-turquesa e resorts exclusivos sobre o oceano."
    },

    {
        id: 5,
        nome: "Cancún",
        pais: "México",
        regiao: "América",
        preco: 4890,
        imagem:"/user/img/card5.jpg",
        galeria:[
            "/user/img/card5.jpg",
            "/user/img/card5-2.jpg",
            "/user/img/card5-3.jpg"
        ],
        estrelas: 5,
        categoria: "Praia",

        descricao:
        "Conhecido pelas praias de águas transparentes, resorts luxuosos, vida noturna animada e rica cultura mexicana."
    },

    {
        id: 6,
        nome: "Tóquio",
        pais: "Japão",
        regiao: "Ásia",
        preco: 8900,
        imagem:"/user/img/card6.jpg",
        galeria:[
            "/user/img/card6.jpg",
            "/user/img/card6-2.jpg",
            "/user/img/card6-3.jpg"
        ],
        estrelas: 5,
        categoria: "Cidade",

        descricao:
        "Uma metrópole fascinante que combina tecnologia avançada, tradições milenares, gastronomia única e uma cultura vibrante."
    },

    {
        id: 7,
        nome: "Dubai",
        pais: "Emirados Árabes Unidos",
        regiao: "Oriente Médio",
        preco: 9800,
        imagem:"/user/img/card7.jpg",
        galeria:[
            "/user/img/card7.jpg",
            "/user/img/card7-2.jpg",
            "/user/img/card7-3.jpg"
        ],
        estrelas: 5,
        categoria: "Cidade",

        descricao:
        "Um destino luxuoso com arranha-céus impressionantes, experiências exclusivas, praias incríveis e muita inovação."
    },

    {
        id: 8,
        nome: "Santorini",
        pais: "Grécia",
        regiao: "Europa",
        preco: 8200,
        imagem:"/user/img/card8.jpg",
        galeria:[
            "/user/img/card8.jpg",
            "/user/img/card8-2.jpg",
            "/user/img/card8-3.jpg"
        ],
        estrelas: 5,
        categoria: "Praia",

        descricao:
        "Uma ilha encantadora conhecida pelas casas brancas, vistas incríveis do mar Egeu, pôr do sol inesquecível e clima romântico."
    },

];


export default destinos;