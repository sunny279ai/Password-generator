import { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [length, setlength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [character, setcharacter] = useState(false);
  const [password, setpassword] = useState('');

  const passwordgenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberallowed) str += '0123456789';
    if (character) str += '()[]{}^&%$#!@+';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numberallowed, character]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-800 text-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">🔐 Password Generator</h1>

        <div className="flex items-center mb-6 bg-gray-700 rounded-lg overflow-hidden">
          <input
            type="text"
            value={password}
            className="flex-grow p-3 bg-transparent outline-none text-lg"
            placeholder="Generated password"
            readOnly
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium"
            onClick={() => navigator.clipboard.writeText(password)}
          >
            Copy
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-lg">Length: {length}</label>
            <input
              id="length"
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-2/3"
              onChange={(e) => setlength(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberinput" className="text-lg">Include Numbers</label>
            <input
              type="checkbox"
              id="numberinput"
              className="w-5 h-5 cursor-pointer"
              defaultChecked={numberallowed}
              onChange={() => setnumberallowed((prev) => !prev)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="characterinput" className="text-lg">Include Symbols</label>
            <input
              type="checkbox"
              id="characterinput"
              className="w-5 h-5 cursor-pointer"
              defaultChecked={character}
              onChange={() => setcharacter((prev) => !prev)}
            />
          </div>

          <button
            onClick={passwordgenerator}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold transition"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
