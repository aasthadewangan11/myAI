import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(''); // Store Gemini response

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(question);

    axios.post('https://gemini-app-delta.vercel.app/getResponse', { question })
      .then(res => {
        console.log(res.data.response);
        setResponse(res.data.response); // Store response in state
      })
      .catch(err => {
        console.log(err);
      });
  };

  const speakHandler = () => {
    const a = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(a);
  };

  return (
    <div className="App">
      <div className="user">
        <div className="profile-pic">
          <img className='pic' alt='profile-pic' src={require('../src/assets/aastha.jpeg')} />
        </div>
        <p className="label">Question</p>
        <textarea onChange={(e) => setQuestion(e.target.value)} />
        <button onClick={submitHandler}>Send</button>
      </div>

      <div className="gemini">
        <div className="profile-pic">
          <img className='pic' alt='profile-pic' src={require('../src/assets/gemini.jpg')} />
        </div>
        <p className="label">Response</p>
        <textarea value={response} />
        <button onClick={speakHandler}>Speak</button>
      </div>
    </div>
  );
}

export default App;
