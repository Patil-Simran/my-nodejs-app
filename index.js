import {Inter} from 'next/font/google'
import dynamic from 'next/dynamic';
import endent from 'endent';
import {useState} from 'react';
import Image from 'next/image';
import mypic from '../public/worqhatlogo.png';

import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
const inter = Inter({ subsets: ['latin'] });
// Import the Request library to make requests to the WorqHat API
const request = require("request");
// Load the WorqHat AI API key from a file named ".env"
require("dotenv").config();
// Store the WorqHat API & ORG key in a variable for later use
const worqhatApiKey = process.env.WORQHAT_API_KEY;
const worqhatOrgKey = process.env.WORQHAT_ORG_KEY;

// Set the URL for the API request
const url = "https://api.worqhat.com/api/ai/content/v2";

// Set the required headers for the API request
const headers = {
    "x-api-key": worqhatApiKey, // Replace with your API key
    "x-org-key": worqhatOrgKey, // Replace with your ORG key
    "Content-Type": "application/json",
};

// Prepare the request body in JSON format
const raw = JSON.stringify({
    question: "Hi, tell me about you", // The question or command for the AI model
    preserve_history: false, // Whether to preserve conversation history for the model. Set to false for one-off questions. Visit documentation for more info.
    randomness: 0.4, // Level of randomness for AI model response (0 to 1)
});

// Configure the options for the API request
const requestOptions = {
    url: url,
    method: "POST",
    headers: headers,
    body: raw,
};

// Send the API request
request(requestOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        console.log(body); // Print the response body if the request is successful
    } else {
        console.log("Error:", error); // Print the error message if the request fails
    }
});



function homePage(){
    return(
        <main>
            <HomeComponents></HomeComponents>
        </main>
    )
}

 
 //export default homePage;


function RegistrationForm({ onRegister }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [registrationMessage, setRegistrationMessage] = useState('');

    const handleRegister = () => {
        // Simulate user registration (you can replace this with your actual registration logic)
        if (name && age && mobileNumber && email) {
            onRegister({ name, age, mobileNumber, email });
            setRegistrationMessage('User registered successfully');
        } else {
            setRegistrationMessage('Please fill in all fields');
        }
    };

    return (
        <div>
            <h1>User Registration</h1>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button onClick={handleRegister}>Register</button>
            <p>{registrationMessage}</p>
        </div>
    );
}

function ManageMedicationPage() {
    return (
        <div>
            {/* Implement the UI to collect medication details (number, timing, quantity, days). */}
            {/* You can use forms or input fields for this purpose. */}
            <h1>Manage Medication</h1>
            {/* Medication details input */}
        </div>
    );
}

function FindDoctorPage() {
    return (
        <div>
            {/* Implement the UI to search for doctors based on location and user's problem. */}
            <h1>Find Doctor</h1>
            {/* Doctor search input */}
        </div>
    );
}

function App() {
    const history = useHistory();

    const handleRegister = (userData) => {
        // Simulate user registration success
        console.log('User registered:', userData);
        // Redirect to the next page after registration (e.g., Manage Medication)
        history.push('/manage-medication');
    };

    return (
        <Router>
            <Switch>
                <Route path="/manage-medication" component={ManageMedicationPage} />
                <Route path="/find-doctor" component={FindDoctorPage} />
                <Route path="/" render={() => <RegistrationForm onRegister={handleRegister} />} />
            </Switch>
        </Router>
    );
}

export default App;

const handleGenerateCodeClick = async () => {

    const language = document.getElementById('language').value;
    const questionText = document.getElementById('textbox1').value;
};
async function fetchAIResponse(selectedLanguage, question) {
    const API_ENDPOINT = 'https://api.worqhat.com/api/ai/content/v2';
    const API_KEY = 'sk-ed288224b836428a807fb6d6807b84bb'; // Replace with your API key

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            question: userMessage,
            randomness: 0.4,
        }),
    };

    try {
        const response = await fetch(API_ENDPOINT, requestOptions);
        const data = await response.json();

        if (data.status === 'success') {
            return data.content;
        } else {
            console.error('AI response error:', data.error);
            return 'AI response error';
        }
    } catch (error) {
        console.error('Error fetching AI response:', error);
        return 'Error fetching AI response';
    }
}

async function someAIIntegration(userMessage) {
    // Call the fetchAIResponse function to get the AI's response
    const aiResponse = await fetchAIResponse(userMessage);
    
    return aiResponse;
}



    const response = await fetch(API_ENDPOINT, requestOptions);
    return await response.json();



 function HomeComponents(){
    const [conversation, setConversation] = useState([]);
    const [inputText, setInputText] = useState('');
    const history = useHistory();

    const handleSendMessage = async () => {
        if (inputText.trim() === '') return;

        setConversation([...conversation, { text: inputText, type: 'user' }]);
        setInputText('');

  
        const response = await fetchAIResponse(inputText);

        setConversation([...conversation, { text: response.content, type: 'ai' }]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleManageMedicationClick = () => {
        history.push('/manage-medication');
    };

    const handleFindDoctorClick = () => {
        history.push('/find-doctor');
    };
    return (
            <div className="text-black">
               <h1 className="text-4xl md:text-5xl text-center mt-8 font-bold">Text to Code Generator</h1>
               <div className="text-center mt-8 text-xl md:text-2xl font-semibold">
                  Generate Code from Natural Language using WorqHat AI in a Click!
               </div>
 
               <div className="container">
                  <div className="mb-6">
                     <input type="text" id="textbox1" placeholder="Enter your Question here"
                            className="block mx-auto w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500">
                     </input>
                  </div>
                  <select id="language" className="mx-auto mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4">
                     <option value="">Select language</option>
                     <option value="c++">C++</option>
                     <option value="python">Python</option>
                     <option value="java">Java</option>
                     <option value="javascript">JavaScript</option>
                     <option value="c#">C#</option>
                     <option value="ruby">Ruby</option>
                     <option value="go">Go</option>
                     <option value="swift">Swift</option>
                     <option value="php">PHP</option>
                     <option value="typescript">TypeScript</option>
                     <option value="kotlin">Kotlin</option>
                     <option value="rust">Rust</option>
                     <option value="matlab">MATLAB</option>
                     <option value="r">R</option>
                     <option value="perl">Perl</option>
                     <option value="scala">Scala</option>
                     <option value="objective-c">Objective-C</option>
                     <option value="groovy">Groovy</option>
                     <option value="lua">Lua</option>
                     <option value="bash">Bash</option>
                     <option value="powershell">PowerShell</option>
                  </select>
 
                  <div className="w-full text-center">
                     <button id="generateButton"
                             className="mx-auto text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2">
                        Generate Code
                     </button>
                  </div>
               </div>
            </div>
    );
 }


 
