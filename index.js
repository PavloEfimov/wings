// import { Configuration, OpenAIApi } from 'openai'

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// const openai = new OpenAIApi(configuration)

const chatbotConversation = document.getElementById('chatbot-conversation')
 
let conversationStr = ''
 
document.addEventListener('submit', (e) => {
    e.preventDefault()
    const userInput = document.getElementById('user-input') 
    conversationStr += ` ${userInput.value} ->`
    fetchReply()
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value
    userInput.value = ''
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
}) 

async function fetchReply(){
    const url = 'https://main--gorgeous-shortbread-3287b8.netlify.app/.netlify/functions/fetchAI'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": 'text/plain'
        },
        body: conversationStr
    })

    const data = await response.json()
    console.log(data)

    // const response = await openai.createCompletion({
    //     model: 'davinci:ft-scrimba-2023-03-30-23-10-03',
    //     prompt: conversationStr,
    //     presence_penalty: 0,
    //     frequency_penalty: 0.3,
    //     max_tokens: 100,
    //     temperature: 0,
    //     stop: ['\n', '->']
    // })
    conversationStr += ` ${data.reply.choices[0].text} \n`
    renderTypewriterText(data.reply.choices[0].text)
}

function renderTypewriterText(text) {
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor')
    chatbotConversation.appendChild(newSpeechBubble)
    let i = 0
    const interval = setInterval(() => {
        newSpeechBubble.textContent += text.slice(i-1, i)
        if (text.length === i) {
            clearInterval(interval)
            newSpeechBubble.classList.remove('blinking-cursor')
        }
        i++
        chatbotConversation.scrollTop = chatbotConversation.scrollHeight
    }, 50)
}