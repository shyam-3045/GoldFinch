import { useEffect, useState } from "react";

export default function AlertMsg({ msg, setMsg }) {
  const [visible, setVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(100);
  const totalDuration = 2000; // duration in milliseconds
  const updateInterval = 50; // update interval for progress bar

  useEffect(() => {
    if (msg !== "") {
      setVisible(true);
      setTimeRemaining(100); // Reset progress bar
    } else {
      setVisible(false);
    }
  }, [msg]); // Re-run when `msg` changes

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
          return prev - (100 * updateInterval) / totalDuration;
        });
      }, updateInterval);

      // Hide alert after duration
      timerId = setTimeout(() => {
        setVisible(false);
        setMsg(""); // Clear message after alert disappears
      }, totalDuration);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, [visible, setMsg]);

  if (!visible) return null;

  // Improved styles while keeping the same functionality
  const alertContainerStyles = {
    position: "fixed",
    top: "16px", // Slightly down from the very top for better visual appearance
    left: "50%",
    transform: "translateX(-50%)",
    width: "90%",
    maxWidth: "300px",
    backgroundColor: "#10b981", // Changed to green
    color: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(16, 185, 129, 0.25)", // Shadow with green tint
    zIndex: 9999,
    overflow: "hidden", // Ensures the rounded corners apply to children
    display: "flex",
    flexDirection: "column",
    animation: "slideDown 0.3s ease-out", // Smooth entrance animation
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  };

  const alertHeaderStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    fontWeight: "600",
    fontSize: "18px",
    textAlign: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.15)", // Subtle separator
  };

  const alertContentStyles = {
    padding: "12px 14px",
    fontSize: "15px",
    lineHeight: "1.5",
    fontWeight: "400",
    textAlign: "center",
  };

  const closeButtonStyles = {
    color: "white",
    background: "none",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    opacity: "0.8",
    transition: "opacity 0.15s ease",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    padding: "0",
  };

  const progressBarContainerStyles = {
    height: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.25)", // Semi-transparent white
    marginTop: "auto", // Push to bottom
  };
  
  const progressBarStyles = {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Almost white
    width: `${timeRemaining}%`,
    transition: "width 0.1s linear",
    boxShadow: "0 0 5px rgba(255, 255, 255, 0.7)", // Slight glow effect
  };

  // Define keyframes-like inline style for the entrance animation
  const styleTag = document.createElement('style');
  if (!document.head.querySelector('#alert-animation')) {
    styleTag.id = 'alert-animation';
    styleTag.innerHTML = `
      @keyframes slideDown {
        from { transform: translate(-50%, -20px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
      }
    `;
    document.head.appendChild(styleTag);

    // Add custom font if needed
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }

  return (
    <div style={alertContainerStyles}>
      {/* Alert Header */}
      <div style={alertHeaderStyles}>
      <div style={alertContentStyles}>
        <p style={{margin: "0"}}>{msg}</p>
      </div>        <button
          onClick={() => {
            setVisible(false);
            setMsg(""); // Clear the msg when close button is clicked
          }}
          style={closeButtonStyles}
          onMouseOver={(e) => {e.currentTarget.style.opacity = "1";}}
          onMouseOut={(e) => {e.currentTarget.style.opacity = "0.8";}}
        >
          ×
        </button>
      </div>

      {/* Alert Content */}
      

      {/* Progress Bar */}
      <div style={progressBarContainerStyles}>
        <div style={progressBarStyles} />
      </div>
    </div>
  );
}