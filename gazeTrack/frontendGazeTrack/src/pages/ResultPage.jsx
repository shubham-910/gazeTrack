import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    prediction = 'unknown',
    testDate = 'N/A',
    leftCount = 0,
    rightCount = 0,
    // id = 0,
    llm_fetch_response = 'unknown',
    // techniquesRes= 'unknown',
    // next_steps= 'unknown',
  } = location.state || {};

  // eslint-disable-next-line no-unused-vars
  const [gadResponse, setGadResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // To track the current page
  // const [llmLoading, setLlmLoading] = useState(false);
  // const [llmResponse, setLlmResponse] = useState(null); // For LLM API response
  const { width, height } = useWindowSize()

  const anxietyLevel = () => {
    const level = localStorage.getItem('score');
      if(localStorage.getItem('score')){
        if (level <= 4) return "Minimal anxiety";
        if (level <= 9) return "Mild anxiety";
        if (level <= 14) return "Moderate anxiety";
        return "Severe anxiety";
      }
  }

  const formatResponse = (response) => {
    if (!response || response === 'unknown') return '';

    // Step 1: Sanitize the response to remove unwanted spaces and line breaks
    const cleanedResponse = response;
        // .replace(/^\s+|\s+$/g, '') // Remove leading and trailing spaces (optional)
        // .replace(/\r?\n\s*\n/g, '\n'); // Replace multiple line breaks with a single one

    const instructionLine = "Write only the response content in a friendly and approachable tone, without echoing this instruction or examples. Do not change format in the response.";
    const instructionIndex = cleanedResponse.indexOf(instructionLine);

    // Step 2: Remove instruction line and its preceding content if it exists
    const effectiveResponse = instructionIndex !== -1
        ? cleanedResponse.slice(instructionIndex + instructionLine.length).trim()
        : cleanedResponse;

    // Step 3: Replace '\n' with '<br />' for HTML rendering
    const formattedResponse = effectiveResponse.replace(/\n/g, '<br />');

    return formattedResponse;
};

const responseLines = formatResponse(llm_fetch_response);

  

  useEffect(() => {
    const fetchGadData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('User ID not found in localStorage.');
          return;
        }

        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(
          `${apiUrl}/api/getgadform/${userId}/`,
          {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setGadResponse(response.data);
      } catch (error) {
        console.error('Error fetching GAD form data:', error);
        setGadResponse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGadData();
  }, []);

  const handleHomeclick = () => {
    localStorage.removeItem('selectedCategory');
    navigate('/home');
  };

  const handleRetakeclick = () => {
    navigate('/calibrate');
  };

  const generateFeedback = () => {
    const level = anxietyLevel(); // Get anxiety level dynamically
  
    if (!level) return <p>Anxiety level information is unavailable.</p>;
  
    let feedbackTitle = '';
    let feedbackContent = '';
  
    if (prediction === 'Left') {
      feedbackTitle = 'Your gaze leaned more toward Negative images.';
      switch (level) {
        case 'Severe anxiety':
          feedbackContent = `
            This indicates a focus on distressing thoughts and high anxiety levels.
            It's important to seek professional help and implement daily mindfulness and relaxation exercises.
          `;
          break;
        case 'Moderate anxiety':
          feedbackContent = `
            Your gaze reflects some focus on negative thoughts. Consider using gratitude journaling and relaxation techniques
            to manage stress effectively.
          `;
          break;
        case 'Mild anxiety':
          feedbackContent = `
            Your anxiety level is mild, with a slight tendency to focus on negative thoughts. Practice deep breathing and
            positive affirmations to maintain emotional stability.
          `;
          break;
        case 'Minimal anxiety':
          feedbackContent = `
            Although your gaze indicates a focus on negative aspects, your anxiety level is minimal.
            Continue building positive habits and staying mindful of stress triggers.
          `;
          break;
        default:
          feedbackContent = 'No specific feedback is available for this anxiety level.';
      }
    } else if (prediction === 'Right') {
      feedbackTitle = 'Your gaze leaned more toward Positive images.';
      switch (level) {
        case 'Severe anxiety':
          feedbackContent = `
            Despite your positive gaze focus, severe anxiety is present. Practice guided meditation and seek professional
            counseling for tailored support.
          `;
          break;
        case 'Moderate anxiety':
          feedbackContent = `
            While your gaze indicates a positive outlook, moderate anxiety is present. Reinforce positivity with gratitude journaling
            and social connections.
          `;
          break;
        case 'Mild anxiety':
          feedbackContent = `
            Your gaze shows a positive focus and mild anxiety. Celebrate small victories and maintain mindfulness practices
            to reduce stress further.
          `;
          break;
        case 'Minimal anxiety':
          feedbackContent = `
            You exhibit a strong positive focus with minimal anxiety. Keep reinforcing this mindset with acts of kindness
            and gratitude exercises.
          `;
          break;
        default:
          feedbackContent = 'No specific feedback is available for this anxiety level.';
      }
    } else {
      feedbackTitle = 'Prediction data is unavailable.';
      feedbackContent = 'Unable to generate specific feedback due to missing prediction data.';
    }
    return (
      <div>
        <p className="font-bold">{feedbackTitle}</p>
        <p>{feedbackContent}</p>
      </div>
    );
  };

  const chartData = {
    labels: ['Negative Image', 'Positive Image'],
    datasets: [
      {
        label: 'Gaze on image',
        data: [leftCount || 0, rightCount || 0],
        backgroundColor: ['#f56565', '#48bb78'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Gaze on Images',
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <Confetti
      width={width}
      height={height}
      numberOfPieces={50}
    />
      {/* {llmLoading ? (
        <ClipLoader size={50} color={"#123abc"} loading={llmLoading} />
      ) : ( */}
        <div className="flex flex-col w-full max-w-5xl bg-white rounded-lg shadow-md">
          {currentPage === 1 ? (
            <>
              <div className="grid grid-cols-2 gap-4 p-6">
                <div className="col-span-2 text-center">
                  <h2 className="text-2xl font-bold text-theme-background">Your Test Result</h2>
                </div>
                {/* Left Section: Text Results */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-theme-background">
                    Test Date: {new Date(testDate).toLocaleString()}
                  </h2>
                  <hr />
                  {loading ? (
                    <p>Loading GAD response...</p>
                  ) : (
                    <p className="text-lg text-gray-600 mb-6">{generateFeedback()}</p>
                  )}
                </div>
                {/* Right Section: Chart */}
                <div className="p-6 flex items-center justify-center">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </>
          ) : (
            <div className="p-6">
            <div className='text-base' dangerouslySetInnerHTML={{ __html: responseLines }} />
          </div>
          )}
          <div className='flex justify-center space-x-4'>
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(1)}
                className="w-8 h-8 flex items-center justify-center bg-white text-black border-black rounded-full hover:bg-white hover:text-theme-background hover:border-theme-background border transition duration-200"
              >
                <GrFormPrevious size={20} />
              </button>
            )}
            {currentPage < 2 && (
              <button
                onClick={() => setCurrentPage(2)}
                className="w-8 h-8 flex items-center justify-center bg-white text-black border-black rounded-full hover:bg-white hover:text-theme-background hover:border-theme-background border transition duration-200"
              >
                <MdNavigateNext size={20} />
              </button>
            )}  
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-4 pb-6">
            <button
              onClick={handleHomeclick}
              className="w-1/5 bg-theme-background text-white py-2 px-6 rounded-lg hover:bg-white hover:text-theme-background hover:border-theme-background border transition duration-200"
            >
              Home
            </button>
            <button
              onClick={handleRetakeclick}
              className="w-1/5 bg-white text-theme-background py-2 px-6 rounded-lg border-theme-background hover:bg-theme-background hover:text-white hover:border-theme-background border transition duration-200"
            >
              Retake Test
            </button>
          </div>
        </div>
    </div>
  );
};

export default ResultPage;
