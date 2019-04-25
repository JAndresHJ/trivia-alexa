const Alexa = require('ask-sdk-core');

const intentRequest = "IntentRequest";
const launcherRequest = "LauncherRequest";
const canFulfillIntentRequest = "CanFulfillIntentRequest";

const startTriviaIntent = "StartGameIntent";
const rulesIntent = "RulesIntent";
const questionIntent = "QuestionIntent";
const answersIntent = "AnswerIntent";
const configurePlayersIntent = "ConfigurePlayersIntent";
const individualIntent = "IndividualIntent";
const duoIntent = "DuoIntent";
const individualTwoIntent = "IndividualTwoIntent";
const pvpIntent = "PvpIntent";
const topicIntent = "TopicIntent";
const mathIntent = "MathIntent";
const bioIntent = "BioIntent";
const geometryIntent = "GeometryIntent";
const computingIntent = "ComputingIntent";

const nextQuestion = {
    "speechText": ["Para la siguiente pregunta puedes decir: "],
    "helpPrompt": ["Siguiente, Otra Pregunta, Pregunta"]
};

let playersNumber = 0;
let currentTopic = "matematicas";
let currentQuestion = 0;
let score = [0, 0];
let teamNames = [];
let sequence = "";
let gameType = false; // false individual
let players = false; //false stands for individual mode, True for pvp mode

const randomPosition = function(length){
    return Math.floor(Math.random() * length)
};

//  questions

const maths = [
    {
        "question": "¿Cómo se calcula el área de un rectángulo?",
        "answers":
                {
                    1: "Multiplicando la base por la altura",
                    2: "Sumando la base y la altura",
                    3: "Dividiendo la base y la altura",
                    4: "Restando la base y la altura"
                },
        "correct": 1
    },
    {
    "question": "¿Qué es la secuencia de Fibonacci?",
    "answers":
            {1: "Una secuencia donde el elemento es generado por la suma de los dos anteriores",
            2: "Una suma donde hay un incremento constante",
            3: "Una serie aritmética",
            4: "Una serie donde el elemento es generado por la resta de los dos anteriores"
            },
    "correct": 1}
];

const biology = [
    {
    "question": "¿Qué es la biología?",
    "answers":
            {1: "Una ciencia que estudia las computadoras",
            2: "Es la ciencia que estudia a los seres vivos",
            3: "Es una ciencia que estudia fenómenos naturales",
            4: "Es una ciencia que estudia los minerales"
            },
    "correct": 2
    },
    {
    "question": "¿Los virus y las bacterias están vivas?",
    "answers":
            {1: "Los virus sí, bacterias no",
            2: "Las bacterias sí, los virus no",
            3: "Ninguno está vivo",
            4: "No sé"
            },
    "correct": 3
    }
];

const geometry = [{
    "question": "¿Qué estudia la geometría?",
    "answers":
            {1: "Los números y su naturaleza",
            2: "Los cuerpos celestiales",
            3: "La relación entre los números",
            4: "Las proporciones y singularidades de distintas figuras en un plano o el espacio"
            },
    "correct": 4},
    {
    "question": "¿Cuáles son las características de las rectas?",
    "answers":
            {1: "Se extienden en una misma dirección y son de una dimensión",
            2: "Se extienden en dos direcciones y son de dos dimensiones",
            3: "Se extienden en una dirección y son multidimensionales",
            4: "No se extienden en ninguna dirección y son unidimensionales"
            },
    "correct": 1}
];

const computing = [
    {
        "question": "¿Qué es la programación?",
        "answers":
            {
                1: "Decirle a una computadora qué hacer a base de un set de instrucciones",
                2: "Calcular el área de un cuadrado",
                3: "Arreglar una computadora",
                4: "Decirle a una computadora qué hacer a base de un set infinito de instrucciones"
            },
        "correct": 1
    },
    {
        "question": "¿Qué es una variable?",
        "answers":
            {
                1: "Una función",
                2: "Un parámetro",
                3: "Una manera de etiquetar información con un nombre descriptivo",
                4: "Un compilador"
            },
        "correct": 3}
];

// phrases

const stringsIndividualIntent = {
    speechText: [
        'Perfecto, será una partida individual, '
    ],
    helpPrompt: [
        'Ahora vamos a seleccionar el tema: Elige entre Matemáticas, Biología, Geometría y Computación'
    ]
}
const stringsPvpIntent = {
    speechText: [
        'Perfecto, será una partida competitiva, uno contra uno '
    ],
    helpPrompt: [
        'Ahora vamos a seleccionar el tema: Elige entre Matemáticas, Biología, Geometría y Computación'
    ]
}
const stringsTopicIntent = {
    speechText: [
        "Perfecto, iniciemos con " + currentTopic
    ],
    helpPrompt: [
        "Dime ¡LISTO! cuando estés preparado para iniciar"
    ]
}

const stringCorrectAnswer = [
    "Muy bien, tu respuesta es correcta"
];

const stringsConfigurePlayersIntent = {
    speechText: [
      'De acuerdo, comencemos por configurar el juego.'
    ],
    helpPrompt: [
      '¿Será individual o 1 contra 1?'
    ]
};

const stringsLaunchIntent = {
    speechText: [
        '¡Hola! aquí podrás estudiar de manera divertida, para ello tenemos preparada una trivia.'
    ],
    helpPrompt: [
        'Puedes iniciar la trivia diciendo: ¡Inicia!, ¡Empieza!, ¡Comienza! o ¡Vamos a jugar!'
    ]
};

const stringsStartTriviaIntent = {
    speechText: [
        '¡Comencemos con la trivia!'
    ],
    helpPrompt: [
        'Puedes elegir entre escuchar las reglas o jugar'
    ]
};

const stringsPlayersQuantityIntent = {
    speechText: [
        'Primero vamos a definir el número de jugadores. ¿Será una partida individual,'
    ],
    helpPrompt: [
        'o van a jugar más?...'
    ]
};

const stringsRulesIntent = {
    speechText: [
        'Debes decir el nombre de tu equipo'
    ],
    helpPrompt: [
        '¿Estás listo para inciar?'
    ]
};

const stringsEndGame = {
    speechText: [
        'Has terminado con las preguntas de este tema'
    ],
    helpPrompt: [
        'Tu calificación es '
    ]
}

const stringsAnswer = [
    '¿Cuál es tu respuesta?'
]

const stringsMath = {
    speechText: [
        "Perfecto, iniciemos con matemáticas"
    ],
    helpPrompt: [
        "Dime ¡LISTO! cuando estés preparado para iniciar"
    ]
};

const stringsBio = {
    speechText: [
        "Perfecto, iniciemos con biología"
    ],
    helpPrompt: [
        "Dime ¡LISTO! cuando estés preparado para iniciar"
    ]
};

const stringsGeometry = {
    speechText: [
        "Perfecto, iniciemos con geometría"
    ],
    helpPrompt: [
        "Dime ¡LISTO! cuando estés preparado para iniciar"
    ]
};


const stringsComputing = {
    speechText: [
        "Perfecto, iniciemos con computación"
    ],
    helpPrompt: [
        "Dime ¡LISTO! cuando estés preparado para iniciar"
    ]
};


// intents

const HandlerWithReprompt = function(handlerInput, speechText, helpPrompt){
    return handlerInput.responseBuilder
            .speak(speechText + helpPrompt)
            .reprompt(helpPrompt)
            .getResponse();
};

const HandlerDefault = function(handlerInput, speechText){
    return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(currentTopic)
            .reprompt(speechText)
            .getResponse();
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        sequence = "A";
        const random = randomPosition(stringsStartTriviaIntent['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsLaunchIntent['speechText'][random], stringsLaunchIntent['helpPrompt'][random]);
    }
};

const RulesHandler = {
    canHandle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === rulesIntent;
    },
    handle(handlerInput){
        sequence = "B";
        const random = randomPosition(stringsRulesIntent['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsRulesIntent['speechText'][random], stringsRulesIntent['helpPrompt'][random]);
    }
    
};

const StartTriviaHandler = {
    canHandle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === startTriviaIntent
    },
    handle(handlerInput) {
        sequence = "B";
        const random = randomPosition(stringsStartTriviaIntent['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsStartTriviaIntent['speechText'][random], stringsStartTriviaIntent['helpPrompt'][random]);
    }
};

const ConfigurePlayersHandler = {
    canHandle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === configurePlayersIntent && sequence === "B";
    },
    handle(handlerInput){
        const random = randomPosition(stringsConfigurePlayersIntent['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsConfigurePlayersIntent['speechText'][random], stringsConfigurePlayersIntent['helpPrompt'][random]);
    }
};


const IndividualHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === individualIntent;
    },
    handle(handlerInput) {
        sequence = "C";
        const random = randomPosition(stringsIndividualIntent['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsIndividualIntent['speechText'][random], stringsIndividualIntent['helpPrompt'][random]);
    }
};

const PvpHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === pvpIntent;
    },
    handle(handlerInput) {
        sequence = "C";
        players = false;
        const random = randomPosition(stringsIndividualIntent['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsPvpIntent['speechText'][random], stringsPvpIntent['helpPrompt'][random]);
    }
};

const MathHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === mathIntent;
    },
    handle(handlerInput) {
        currentTopic = "matematicas";
        const random = randomPosition(stringsMath['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsMath['speechText'][random], stringsMath['helpPrompt'][random]);
    }
};

const GeometryHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === geometryIntent;
    },
    handle(handlerInput) {
        currentTopic = "geometria";
        const random = randomPosition(stringsGeometry['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsGeometry['speechText'][random], stringsGeometry['helpPrompt'][random]);
    }
};

const BiologyHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === bioIntent;
    },
    handle(handlerInput) {
        currentTopic = "biologia";
        const random = randomPosition(stringsBio['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsBio['speechText'][random], stringsBio['helpPrompt'][random]);
    }
};

const ComputingHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === computingIntent;
    },
    handle(handlerInput) {
        currentTopic = "computacion";
        const random = randomPosition(stringsComputing['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsComputing['speechText'][random], stringsComputing['helpPrompt'][random]);
    }
};

const QuestionHandler = {
    canHandle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === questionIntent;
    },
    handle(handlerInput){
        let question = ""; 
        let answers = "";

        try{
            switch(currentTopic){
                case 'matematicas':
                    question = maths[currentQuestion]['question'];
                    for(let [key, value] of Object.entries(maths[currentQuestion]['answers'])){
                        answers += key + " " + value + "...";
                    }
                    break;
                case 'biologia':
                    question = biology[currentQuestion]['question'];
                    for(let [key, value] of Object.entries(biology[currentQuestion]['answers'])){
                        answers += key + " " + value + "...";
                    }
                    break;
                case 'geometria':
                    question = geometry[currentQuestion]['question'];
                    for(let [key, value] of Object.entries(geometry[currentQuestion]['answers'])){
                        answers += key + " " + value + "...";
                    }
                    break;
                default:
                    question = computing[currentQuestion]['question'];
                    for(let [key, value] of Object.entries(computing[currentQuestion]['answers'])){
                        answers += key + " " + value + "...";
                    }
                    break;            
            }
            question += "..."; 
            return HandlerWithReprompt(handlerInput, question + answers, stringsAnswer[randomPosition(stringsAnswer.length)]);
        }catch(err){
            const random = randomPosition(stringsEndGame['speechText'].length);
            return HandlerWithReprompt(handlerInput, stringsEndGame["speechText"][random], stringsEndGame["helpPrompt"][random] + score[0]);
        }
        
    }
};

const AnswerHandler = {
    canHandle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === answersIntent;
    },
    handle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        const answerUser = request.intent.slots.Answer.value;
        let answer = "";
        switch(currentTopic){
            case 'matematicas':
                answer = maths[currentQuestion]['correct'];
                break;
            case 'biologia':
                answer = biology[currentQuestion]['correct'];
                break;
            case 'geometria':
                answer = geometry[currentQuestion]['correct'];
                break;
            default:
                answer = computing[currentQuestion]['correct'];
                break;            
        }
        if(answerUser === answer){
            score[0]++;
        }
        currentQuestion++;
        const random = randomPosition(nextQuestion['speechText'].length);
        return HandlerWithReprompt(handlerInput, nextQuestion['speechText'][random], nextQuestion['helpPrompt'][random]);
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        RulesHandler,
        StartTriviaHandler,
        ConfigurePlayersHandler,
        IndividualHandler,
        PvpHandler,
        MathHandler,
        BiologyHandler,
        GeometryHandler,
        ComputingHandler,
        QuestionHandler,
        AnswerHandler
    ) 
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
