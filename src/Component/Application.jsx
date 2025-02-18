import { useState } from "react";

export default function Application() {
  const url = "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "57e03e9dd3mshc6787869786c601p1ce298jsne0e4e84698dc",
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
    },
  };

  const [quoteValue, setQuoteValue] = useState(
    "Click the button to generate a quote"
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchQuote = async () => {
    setIsLoading(true);
    document.title = "Fetching";
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ERROR ${response.status}`);
      }
      const data = await response.json();
      setQuoteValue(data.content);
      setIsError(false);
    } catch (error) {
      console.error(error);
      setQuoteValue("Failed to fetch quote. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
      document.title = "Enjoy";
    }
  };

  return (
    <div>
      <p
        className={`text-sm rounded-lg p-4 shadow-md w-full max-w-md text-center transition-all duration-500 ${
          isError
            ? "bg-red-100 border-red-300 text-red-900"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        {quoteValue}
      </p>
      <button
        className="mt-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transition-transform transform hover:scale-105"
        onClick={handleFetchQuote}
        disabled={isLoading}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-gray-900 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "Click to Generate"
        )}
      </button>
    </div>
  );
}
