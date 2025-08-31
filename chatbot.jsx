// const apiKey = import.meta.env.OPENAI_API_KEY;
function ChatInput({chatMessages, setChatMessages}){
  let textMessage;

  function updateMessage(event){
    textMessage = event.target.value;
  }

  const aiChat = async (message) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer <OPENAI_API_KEY>`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // or another available model
        messages: [{ role: 'user', content: message }]
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  };

  const sendMessage = async()=>{
    //The below function is used to update the data. The argument is the updated data.
    const aiResp = await aiChat(textMessage);
    
    await setChatMessages([
      ...chatMessages, {
        message: textMessage,
        sender: 'user'
      }, 
      {
          message: aiResp,
          sender: 'ai'
      }
    ])
  }


  return (
    <>
      <input 
        placeholder="Send a message to Chatbot" 
        size="34"
        className="chat-input"
        onChange={updateMessage} />
      <button 
        onClick={sendMessage}
        className="send-button">Send</button>  
    </>
  );
}



function ChatMessages({chatMessages}){

  return (
          <>
            {
              chatMessages.map((messageObj)=>{
                return (
                  <div>
                    {messageObj.sender==='ai' && <img src="ai.png" width="50"/>}
                    {messageObj.message}
                    {messageObj.sender==='user' && <img src="user.png" width="50"/>}
                  </div>
                )
              })
            }
          </>
        )
}

function App() {

  //You are initializing chatmessages as empty array and as a react state. Whenever you would update this array using setchatmessages method, this App componenet will be reran.
  const [chatMessages, setChatMessages] = React.useState([])
  return (
    <>
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages} />
      <ChatMessages 
        chatMessages={chatMessages} />
    </>
  )

}

const container = document.querySelector('.js-container');
ReactDOM.createRoot(container).render(<App />);