const Alexa = require('ask-sdk-core');

const intentRequest = "IntentRequest";
const launcherRequest = "LauncherRequest";
const canFulfillIntentRequest = "CanFulfillIntentRequest";

const startTriviaIntent = "StartGameIntent";
const playersQuantityIntent = "PlayersQuantityIntent";
const rulesIntent = "RulesIntent";
const questionIntent = "QuestionIntent";
const answersIntent = "AnswersIntent";

let currentTopic = "a";
let currentQuestion = 0;

const randomPosition = function(length){
    return Math.floor(Math.random() * length)
};

//  questions

const maths = [
    {
        "question": "¿Cómo se calcula el área de un rectángulo?",
        "answers":
                {
                    'a': "Multiplicando la base por la altura",
                    'b': "Sumando la base y la altura",
                    'c': "Dividiendo la base y la altura",
                    'd': "Restando la base y la altura"
                },
        "correct": 'a'
    },
    {
    "question": "¿Qué es la secuencia de Fibonacci?",
    "answers":
            {'a': "Una secuencia donde el elemento es generado por la suma de los dos anteriores",
            'b': "Una suma donde hay un incremento constante",
            'c': "Una serie aritmética",
            'd': "Una serie donde el elemento es generado por la resta de los dos anteriores"
            },
    "correct": 'a'}
]

const biology = [
    {
    "question": "¿Qué es la biología?",
    "answers":
            {'a': "Una ciencia que estudia las computadoras",
            'b': "Es la ciencia que estudia a los seres vivos",
            'c': "Es una ciencia que estudia fenómenos naturales",
            'd': "Es una ciencia que estudia los minerales"
            },
    "correct": 'b'
    },
    {
    "question": "¿Los virus y las bacterias están vivas?",
    "answers":
            {'a': "Los virus sí, bacterias no",
            'b': "Las bacterias sí, los virus no",
            'c': "Ninguno está vivo",
            'd': "No sé"
            },
    "correct": 'c'
    }
]

const geometry = [{
    "question": "¿Qué estudia la geometría?",
    "answers":
            {'a': "Los números y su naturaleza",
            'b': "Los cuerpos celestiales",
            'c': "La relación entre los números",
            'd': "Las proporciones y singularidades de distintas figuras en un plano o el espacio"
            },
    "correct": 'd'},
    {
    "question": "¿Cuáles son las características de las rectas?",
    "answers":
            {'a': "Se extienden en una misma dirección y son de una dimensión",
            'b': "Se extienden en dos direcciones y son de dos dimensiones",
            'c': "Se extienden en una dirección y son multidimensionales",
            'd': "No se extienden en ninguna dirección y son unidimensionales"
            },
    "correct": 'a'}
]

const computing = [
    {
        "question": "¿Qué es la programación?",
        "answers":
            {
                'a': "Decirle a una computadora qué hacer a base de un set de instrucciones",
                'b': "Calcular el área de un cuadrado",
                'c': "Arreglar una computadora",
                'd': "Decirle a una computadora qué hacer a base de un set infinito de instrucciones"
            },
        "correct": 'a'
    },
    {
        "question": "¿Qué es una variable?",
        "answers":
            {
                'a': "Una función",
                'b': "Un parámetro",
                'c': "Una manera de etiquetar información con un nombre descriptivo",
                'd': "Un compilador"
            },
        "correct": 'c'}
]

// phrases

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

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        let random = randomPosition(stringsStartTriviaIntent['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsLaunchIntent['speechText'][random], stringsLaunchIntent['helpPrompt'][random]);
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const StartTriviaIntent = {
    canHandle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === startTriviaIntent
    },
    handle(handlerInput) {
        const random = randomPosition(stringsStartTriviaIntent['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsStartTriviaIntent['speechText'][random], stringsStartTriviaIntent['helpPrompt'][random]);
    }
};

const PlayersQuantityHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === playersQuantityIntent;
    },
    handle(handlerInput) {
        const random = randomPosition(stringsPlayersQuantityIntent['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsPlayersQuantityIntent['speechText'][random], stringsPlayersQuantityIntent['helpPrompt'][random]);
    }
};

const RulesHandler = {
    canHandle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === rulesIntent;
    },
    handle(handlerInput){
        const random = randomPosition(stringsStartTriviaIntent['speechText'].length);
        return HandlerWithReprompt(handlerInput, stringsStartTriviaIntent['speechText'][random], stringsStartTriviaIntent['helpPrompt'][random]);
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
                case 'maths':
                    question = maths[currentQuestion]['question'];
                    for(let [key, value] of Object.entries(maths[currentQuestion]['answers'])){
                        answers += key + " " + value + "...";
                    }
                    break;
                case 'biology':
                    question = biology[currentQuestion]['question'];
                    for(let [key, value] of Object.entries(biology[currentQuestion]['answers'])){
                        answers += key + " " + value + "...";
                    }
                    break;
                case 'geometry':
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
            currentQuestion++;
            return HandlerWithReprompt(handlerInput, question + answers, stringsAnswer[randomPosition(stringsAnswer.length)]);
        }catch(err){
            const random = randomPosition(stringsEndGame['speechText'].length);
            return HandlerWithReprompt(handlerInput, stringsEndGame["speechText"][random], stringsEndGame["helpPrompt"][random]);
        }
        
    }
};

/*const AnswerHandler = {
    canHandle(handlerInput){
        const request = handlerInput.requestEnvelope.request;
        return request.type === intentRequest && request.intent.name === answersIntent;
    },
    handle(handlerInput){
        // catch el slot
    }
};*/

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        PlayersQuantityHandler,
        StartTriviaIntent,
        RulesHandler,
        QuestionHandler,
        //AnswerHandler)
    ) 
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
