// const apiKey = import.meta.env.OPENAI_API_KEY;
function ChatInput({chatMessages, setChatMessages}){
  const [textMessage, setTextMessage] = React.useState(""); // Use state

  function updateMessage(event) {
    setTextMessage(event.target.value); // Only updates input value, not the whole component
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
    // const aiResp = await aiChat(textMessage);
    const aiResp = "This is a placeholder response from the AI.";
    
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

    setTextMessage("");
  }


  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size="34"
        className="chat-input"
        value={textMessage}
        onChange={updateMessage} />
      <button 
        onClick={sendMessage}
        className="send-button">Send</button>  
    </div>
  );
}



function ChatMessages({chatMessages}){

  return (
          <>
              {
                chatMessages.map((messageObj)=>{
                  return (
                    <div className={
                      messageObj.sender==='user' 
                        ? "chat-message-user" 
                        : "chat-message-ai"}>
                      {messageObj.sender==='ai' && <img src="ai.png" width="50"/>}
                      <div className="message-text"> 
                        {messageObj.message}
                      </div>                      
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
    <div className="app-container">
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages} />
      <ChatMessages 
        chatMessages={chatMessages} />
    </div>
  )

}

const container = document.querySelector('.js-container');
ReactDOM.createRoot(container).render(<App />);