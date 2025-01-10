import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const GadForm = () => {
    const [formValues, setFormValues] = useState({
        question_1: 0,
        question_2: 0,
        question_3: 0,
        question_4: 0,
        question_5: 0,
        question_6: 0,
        question_7: 0,
        user_id: localStorage.getItem('userId'),
        difficulty: '',
        is_filled: 1
    });

    const [flagValue, setFlagValue] = useState(false); // State to store form submission flag
    // eslint-disable-next-line no-unused-vars
    const [totalScore, setTotalScore] = useState(null); // Store total score
    const [anxietyMessage, setAnxietyMessage] = useState(''); // Store anxiety level message
    const [showForm, setShowForm] = useState(false); // Toggle between message and form
    // const navigate = useNavigate();

    // Function to check form submission status from localStorage
    useEffect(() => {
        const isFilled = localStorage.getItem("is_filled");
        setFlagValue(isFilled === '1');  
    }, []);

    useEffect(() => {
        const fetchGadResponse = async () => {
            const token = localStorage.getItem('authToken');
            const apiUrl = process.env.REACT_APP_BACKEND_URL;
            const userId = localStorage.getItem('userId');

            try {
                const response = await axios.get(
                    `${apiUrl}/api/getgadform/${userId}/`,
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const data = response.data;
                if (data.total_score !== undefined) {
                    // If the form is already filled
                    localStorage.setItem("score",data.total_score);
                    setTotalScore(data.total_score);
                    setAnxietyMessage(getAnxietyMessage(data.total_score));
                    setFlagValue(true);
                }
            } catch (error) {
                console.error("Failed to fetch GAD response:", error);
                // Proceed with showing the form if no response exists or an error occurs
            }
        };

        fetchGadResponse();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const getAnxietyMessage = (score) => {
        if (score <= 4) return "Minimal anxiety";
        if (score <= 9) return "Mild anxiety";
        if (score <= 14) return "Moderate anxiety";
        return "Severe anxiety";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
        const apiUrl = process.env.REACT_APP_BACKEND_URL;

        try {
            const endpoint = showForm
                ? `${apiUrl}/api/updategadform/${userId}/` // Update API endpoint
                : `${apiUrl}/api/gadform/`; // Create API endpoint
    
            const method = showForm ? 'put' : 'post'; // Determine method dynamically
    
            const response = await axios({
                method: method, // Use dynamic method
                url: endpoint,
                data: formValues,
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            const { total_score } = response.data; // Extract total_score from the response
            setTotalScore(total_score);
            setAnxietyMessage(getAnxietyMessage(total_score));
    
            localStorage.setItem("is_filled", 1);
            localStorage.setItem("score", response.data.total_score);
            setFlagValue(true); // Update state to show the message instead of the form
            setShowForm(false); // Reset the form view toggle
        } catch (error) {
            console.error('Failed to submit the form', error);
        }
    };

    const handleRefill = () => {
        setShowForm(true); // Show the form when "Re-Fill" is clicked
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
                GAD-7 Anxiety Assessment
                <hr />
            </h2>
            {flagValue && !showForm ? (
                <div className="text-center">
                    <h1 className="text-2xl text-green-500 mb-4">You have filled this form.</h1>
                    <p className="text-xl">You have a</p>
                    <p className="text-lg text-theme-background m-4">{anxietyMessage}.</p>
                    <button 
                        onClick={handleRefill} 
                        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Re-Fill
                    </button>
                    <p className="text-xs text-gray-500 mt-4 mb-3">
                        If you feel better and want to fill out the
                        <br />
                        form again, click the above "Re-Fill" button.
                    </p>
                </div>
            ) : (
                <div>
                    {flagValue && (
                        <h1 className="text-red-500 text-center mb-4">You are updating your GAD form.</h1>
                    )}
                    {!flagValue && (
                        <h1 className="text-red-500 text-center mb-4">This is a mandatory GAD form.</h1>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <p>Over the last two weeks, how often have you been bothered by the following problems?</p>
                        {[
                            "Feeling nervous, anxious, or on edge?",
                            "Not being able to stop or control worrying?",
                            "Worrying too much about different things?",
                            "Trouble relaxing?",
                            "Being so restless that it is hard to sit still?",
                            "Becoming easily annoyed or irritable?",
                            "Feeling afraid, as if something awful might happen?"
                        ].map((question, index) => (
                            <div key={index}>
                                <label className="block mb-2">{index + 1}. {question}</label>
                                <div className="space-y-2">
                                    {["Not at all", "Several days", "More than half the days", "Nearly every day"].map((option, idx) => (
                                        <label key={idx} className="block">
                                            <input
                                                type="radio"
                                                name={`question_${index + 1}`}
                                                value={idx}
                                                onChange={handleChange}
                                                required
                                            />
                                            {` ${option}`}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <hr />
                        <div className="mt-4">
                            <label className="block mb-2">If you checked any problems, how difficult have they made it for you to do your work, take care of things at home, or get along with other people?</label>
                            {["Not difficult at all", "Somewhat difficult", "Very difficult", "Extremely difficult"].map((option, idx) => (
                                <label key={idx} className="block">
                                    <input
                                        type="radio"
                                        name="difficulty"
                                        value={option}
                                        onChange={handleChange}
                                        required
                                    />
                                    {` ${option}`}
                                </label>
                            ))}
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-6 hover:bg-blue-600">
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default GadForm;
