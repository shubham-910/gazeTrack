import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const GazeTest = () => {
  const [pairs, setPairs] = useState([]); // Store fetched image pairs
  const [currentPair, setCurrentPair] = useState(null); // Current pair to display
  const [countdown, setCountdown] = useState(15); // Timer for each pair
  const [loading, setLoading] = useState(false); // Loading state between pairs
  const [loadingCountdown, setLoadingCountdown] = useState(3); // Timer for loading interval
  // eslint-disable-next-line no-unused-vars
  const [currentIndex, setCurrentIndex] = useState(0); // Track current pair index
  const [xCoordinates, setXCoordinates] = useState([]); // Store all x-coordinates
  const intervalRef = useRef(null); // Interval reference for gaze collection
  const navigate = useNavigate();
  const [finalizing, setFinalizing] = useState(false);

  // Fetch pairs from the API
  const fetchPairs = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.get(`${apiUrl}/api/getstimulis/`, {
        params: { category_number: localStorage.getItem('selectedCategory') },
      });
      if (response.data.pairs.length > 0) {
        setPairs(response.data.pairs);
        setCurrentPair(response.data.pairs[0]);
      } else {
        toast.error('No pairs available for this category.');
      }
    } catch (error) {
      console.error('Error fetching pairs:', error);
    }
  };

  useEffect(() => {
    fetchPairs();
  }, []);

  // Collect x-coordinates during the test
  useEffect(() => {
    if (currentPair) {
      intervalRef.current = setInterval(() => {
        const webgazer = window.webgazer;
        if (webgazer) {
          webgazer.getCurrentPrediction().then((data) => {
            if (data?.x) {
              setXCoordinates((prev) => [...prev, data.x]);
            }
          });
        }
      }, 1); // Adjust interval as needed
    }
    return () => clearInterval(intervalRef.current); // Cleanup
  }, [currentPair]);

  // Handle 1-minute timer for each pair
  useEffect(() => {
    if (currentPair && !loading) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setLoading(true); // Start loading interval
            setCountdown(15); // Reset the countdown
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentPair, loading]);

  // Handle 3-second loading interval
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setLoading(false); // End loading interval
            setLoadingCountdown(3); // Reset loading countdown
  
            setCurrentIndex((prevIndex) => {
              const nextIndex = prevIndex + 1;
              if (nextIndex < pairs.length) {
                setCurrentPair(pairs[nextIndex]); // Move to the next pair
              } else {
                setFinalizing(true); // Show loader for finalization
                sendXCoordinates(); // Send data after the last pair
              }
              return nextIndex;
            });
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, pairs, navigate]);

  // Send accumulated x-coordinates to the API
  const sendXCoordinates = useCallback(async () => {
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const userId = localStorage.getItem('userId');
      const categoryNumber = localStorage.getItem('selectedCategory');
      const token = localStorage.getItem('authToken');
      const anxietyScore = localStorage.getItem('score');
  
      const getAnxietyMessage = () => {
        if (anxietyScore <= 4) return "Minimal anxiety";
        if (anxietyScore <= 9) return "Mild anxiety";
        if (anxietyScore <= 14) return "Moderate anxiety";
        return "Severe anxiety";
      };
  
      // Step 1: Prediction Phase
      const predictionPayload = {
        x: xCoordinates,
        user_id: userId,
        category_number: categoryNumber,
      };
  
      const predictionResponse = await axios.post(`${apiUrl}/api/prediction/`, predictionPayload, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const { final_prediction, test_date, left_count, right_count, id } = predictionResponse.data;
      
      const prompt = `
      User's gaze data shows a ${final_prediction} focus, with ${left_count} negative gaze points and ${right_count} positive gaze points, 
      and an anxiety level of ${getAnxietyMessage()}.
      Generate actionable guidance with TWO clearly labeled sections on persuasive techniques to improve mental health:

      1. Techniques To Enhance Positivity:
      - Provide 2 actionable persuasive techniques in concise in bullet points, practical sentences.

      2. Next Steps For You:
      - Provide 2 simple next steps on persuasive techniques in bullet points, using clear and concise language.
      
      Do not include any extra notes, explanations, or additional sections.
      Write only the response content in a friendly and approachable tone, without echoing this instruction or examples. Do not change format in the response.
    `;

    // Call LLM API
    const llmResponse = await axios.post(process.env.REACT_APP_LLM_URL, {
      inputs: prompt,
      parameters: {
        max_new_tokens: 300,
        temperature: 0.7,
        top_p: 0.9,
      },
    }, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_LLM_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const llmData = llmResponse.data;

    const extractionPayload = {
      user_id: userId,
      prediction_id: id,
      llm_response: llmData,
    };

    const extractionResponse = await axios.post(`${apiUrl}/api/generate/`, extractionPayload, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const {llm_fetch_response, techniques, next_steps } = extractionResponse.data;


      // Step 2: LLM Phase
      // const llmPayload = {
      //   user_id: userId,
      //   prediction_id: id,
      //   prediction: final_prediction,
      //   negative_gaze: left_count,
      //   positive_gaze: right_count,
      //   anxiety_level: getAnxietyMessage(),
      // };
  
      // const generatAPI = await axios.post(`${apiUrl}/api/generate/`, llmPayload, {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //     'Content-Type': 'application/json',
      //   },
      // });
  
      // const { techniques, next_steps } = generatAPI.data;
  
      // Finalizing and navigating to the result page
      if (window.webgazer) {
        window.webgazer.end();
        window.webgazer.clearData();
      }
  
      setXCoordinates([]);
      setFinalizing(false); // Hide final loader
      toast.info('Gaze Test completed.'); // Toast message
  
      navigate('/result', {
        state: {
          prediction: final_prediction,
          testDate: test_date,
          leftCount: left_count,
          rightCount: right_count,
          techniquesRes: techniques,
          next_steps: next_steps,
          llm_fetch_response:llm_fetch_response,
        },
      });
    } catch (error) {
      console.error('Error during prediction and LLM process:', error);
      setFinalizing(false); // Hide final loader in case of error
      toast.error('Failed to complete gaze test. Please try again.');
    }
  }, [xCoordinates, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-hover-navcolor">
      {finalizing ? (
        <div className="flex flex-col items-center">
          <div className="text-2xl text-theme-background font-bold mb-4">
            Finalizing your test...
          </div>
          <div className="loader"></div> {/* Replace with your loader */}
        </div>
      ) : (
        <>
          {currentPair && !loading ? (
            <div className="flex w-[70%] gap-10">
              <img
                src={currentPair.negative_image.image_metadata}
                alt="stimuli 1"
                className="w-1/2 h-[70vh] object-cover rounded-lg"
                loading="lazy"
              />
              <img
                src={currentPair.positive_image.image_metadata}
                alt="stimuli 2"
                className="w-1/2 h-[70vh] object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="text-2xl text-theme-background font-bold">
              {loading ? `Loading next pair in: ${loadingCountdown}` : 'Loading...'}
            </div>
          )}
  
          {!loading && currentPair && (
            <div className="mt-4 text-xl text-gray-600">
              <p>Time left: {countdown} seconds</p>
            </div>
          )}
  
          <button
            onClick={() => navigate('/home')}
            className="mt-8 w-[15%] py-2 px-6 bg-white border-solid border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-500 hover:text-white hover:border-none transition"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default GazeTest;
