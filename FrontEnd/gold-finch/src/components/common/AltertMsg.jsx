import { useState, useEffect } from "react";

export default function AlertButton() {
  const [visible, setVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(100);
  const totalDuration = 5000; // 5 seconds total
  const updateInterval = 50; // Update progress every 50ms

  // Show the alert when button is clicked
  const showAlert = () => {
    setVisible(true);
    setTimeRemaining(100);
  };

  useEffect(() => {
    let intervalId;
    let timerId;
    
    if (visible) {
      // Update progress bar
      intervalId = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          return prev - (100 * updateInterval / totalDuration);
        });
      }, updateInterval);
      
      // Hide alert after duration
      timerId = setTimeout(() => {
        setVisible(false);
      }, totalDuration);
    }
    
    // Cleanup
    return () => {
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, [visible]);

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      {/* Button to show alert */}
      <button 
        onClick={showAlert}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Show Alert
      </button>
      
      {/* Alert popup */}
      {visible && (
        <div className="fixed top-4 right-4 w-64 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
          {/* Alert Header */}
          <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            <div className="font-semibold">Alert</div>
            <button 
              onClick={() => setVisible(false)}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
          
          {/* Alert Content */}
          <div className="p-4">
            <p>This is an important alert message!</p>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200">
            <div 
              className="h-full bg-blue-500 transition-all duration-100 ease-linear"
              style={{ width: `${timeRemaining}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}