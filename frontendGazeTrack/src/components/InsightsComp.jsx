import React, { useState, useEffect } from "react";
import NavbarMenu from "./NavbarMenu";
import Footer from "../pages/Footer";
import GraphComp from "./GraphComp"; // Ensure the graph component is correctly imported

const InsightsComp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("authToken");
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(
          `${apiUrl}/api/getpredict/?userId=${userId}`,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categoryName = (category_number) => {
    const categories = {
      1: "Nature pictures",
      2: "Male Faces",
      3: "Female Faces",
    };
    return categories[category_number] || "Unknown";
  };

  return (
    <div className="bg-theme-background min-h-screen flex flex-col justify-between">
      <NavbarMenu />
      <div className="flex-grow mt-16 flex items-center justify-center">
        {loading ? (
          <div className="text-center bg-white p-10 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700">Loading data...</p>
          </div>
        ) : data.length > 0 ? (
          <div className="w-full max-w-4xl p-5 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-4 text-theme-background">
              Your Previous Test Results
            </h1>
            {[...data]
              .sort((a, b) => new Date(b.test_date) - new Date(a.test_date))
              .map((record) => (
                <div key={record.id} className="mb-8">
                  <h2 className="text-xl font-semibold text-theme-background mb-2">
                    Test Date:{" "}
                    <span className="text-black">
                      {new Date(record.test_date).toLocaleString()}
                    </span>
                  </h2>
                  <h3 className="text-l font-semibold text-theme-background">
                    Category Chosen:
                    <span className="text-black ml-2">
                      {categoryName(record.category_number)}
                    </span>
                  </h3>
                  <h3 className="text-l font-semibold text-theme-background">
                    Final Prediction:
                    <span className="text-black ml-2">
                      {record.final_prediction}
                    </span>
                  </h3>
                  <GraphComp data={record} />
                  {/* <h3 className="text-l font-semibold text-theme-background mt-4">
                    Techniques to Enhance Positivity:
                  </h3> */}
                  <ul className="list-disc pl-6">
                  {record.response_llm && record.response_llm.length > 0 ? (
                    (() => {
                      try {
                        // Preprocess the response to modify the content as needed
                        const response = record.response_llm;
                        const keyword = "Write only the response content in a friendly and approachable tone, without echoing this instruction or examples. Do not change format in the response.";

                        // Remove content before the keyword
                        const keywordIndex = response.indexOf(keyword);
                        const trimmedResponse = keywordIndex > -1 ? response.substring(keywordIndex + keyword.length).trim() : response;

                        const formattedResponse = trimmedResponse.replace(/\n/g, '<br />');
                        // Define possible keywords for each section

                        // Render the content as separate lists
                        return (
                          <div>
                            <div dangerouslySetInnerHTML={{ __html: formattedResponse }} />
                          </div>
                        );
                      } catch (error) {
                        console.error("Error processing response_llm:", error); // Log the error
                        return <div>Error displaying the response.</div>;
                      }
                    })()
                  ) : (
                    <li>No techniques available.</li>
                  )}
                  </ul>
                  <hr className="h-4 border-t-4 bg-grey-500 mt-6" />
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center bg-white p-10 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-theme-primary">Insights</h1>
            <p className="text-lg text-gray-700">
              There is no information to show until you take a gaze test.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default InsightsComp;
