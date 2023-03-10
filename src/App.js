import './App.css';
import 'bulma'
import FileUploadMultiple from './form.jsx'
import { textArray } from './initial_text';
import { useReducer, useState } from 'react';
import { Wrapper } from './LiftingStateTest.jsx';
import { Translations } from './Translations.jsx'

function App() {
  const [currentWord, setCurrentWord] = useState('black')
  return (
    <div className="container">
      <div className="columns navbar">
        <div className='column background-green'>
          <Wrapper />
        </div>
      </div>
      <div className="columns">
        <div className='column is-one-fifth background-gold'>
          <Login />
          <FileUploadMultiple />
        </div>
        <div className='column is-three-fifths background-pink'>
          <Text onChangeCurrentWord={setCurrentWord} />
        </div>
        <div className='column is-one-fifth background-burlywood'>
          <Translations currentWord={currentWord} />
        </div>
      </div>
      <div className="columns navbar">
        <div className='column background-silver'>
        </div>
      </div>
    </div>
  );
}

function Login() {
  let [state, dispatch] = useReducer((state, action) => ({
    ...state,
    ...action
  }), {
    email: '',
    password: ''
  })
  return (
    <div>
      <div className="filed">
        <div className="control">
          <label value={state.email} className="label is-sucess">Email</label>
          <input className="input" type="text" onChange={(e) => { dispatch({ email: e.target.value }) }}></input>
        </div>
      </div>

      <div className="filed">
        <div className="control">
          <label className="label is-sucess">Password</label>
          <input value={state.password} className="input" type="password" onChange={(e) => { dispatch({ password: e.target.value }) }}></input>
        </div>
      </div>

    </div>
  )
}

// function UploadFile() {
//   return (
//     <div className="field">
//         <div className="file">
//           <label className="file-label">
//             <input className="file-input" type="file" name="resume"/>
//             <span className="file-cta">
//              <span className="file-icon">
//             <i className="fas fa-upload"></i>
//           </span>
//           <span className="file-label">
//             Upload
//           </span>
//         </span>
//       </label>
//     </div>
// </div>
//   )
// }


function Word({ learned = false, word, onChangeCurrentWord }) {

  const [active, setActive] = useState(false);
  function getproperClass(learned, active) {
    const lightness = learned ? 'is-light' : 'is-link'
    const activeness = active ? 'has-background-success' : '';
    return `tag is-link is-medium px-1 mx-0 ${lightness} ${activeness}`
  }
  function toggleActive() {
    if (active) {
      setActive(false)
    } else {
      setActive(true)
    }
  }
  return (
    <span className={getproperClass(learned, active)}
      onClick={() => {
        toggleActive();
        onChangeCurrentWord(word)
      }}>
      {word}
    </span>
  )
}

function Text({ onChangeCurrentWord }) {
  const testArrayOfWords = textArray

  return (
    <div>
      {testArrayOfWords.map((word, index) => {
        return <Word
          word={word}
          key={index}
          onChangeCurrentWord={onChangeCurrentWord}
          learned={Math.random() < 0.5}
        />
      })}
    </div>
  )
}
export default App;
