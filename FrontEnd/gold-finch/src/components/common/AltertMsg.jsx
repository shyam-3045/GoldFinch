import React, { useEffect, useState } from "react";

export default function AlertMsg({ msg, setMsg }) {
  const [visible, setVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(100);
  const totalDuration = 3000;
  const updateInterval = 50;

  useEffect(() => {
    if (msg !== "") {
      setVisible(true);
      setTimeRemaining(100);
    } else {
      setVisible(false);
    }
  }, [msg]);

  useEffect(() => {
    let intervalId;
    let timerId;

    if (visible) {
      intervalId = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          return prev - (100 * updateInterval) / totalDuration;
        });
      }, updateInterval);

      timerId = setTimeout(() => {
        setVisible(false);
        setMsg("");
      }, totalDuration);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, [visible, setMsg]);

  if (!visible) return null;

  const alertContainerStyles = {
    position: "fixed",
    top: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "90%",
    maxWidth: "450px",
    backgroundColor: "#10b981",
    color: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(16, 185, 129, 0.25)",
    zIndex: 9999,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    animation: "slideDown 0.3s ease-out",
    fontFamily: "'Inter', sans-serif",
    ariaLive: "assertive",
  };

  const alertHeaderStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    fontWeight: "600",
    fontSize: "18px",
    textAlign: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
  };

  const alertContentStyles = {
    padding: "14px 16px",
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
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginTop: "auto",
  };

  const progressBarStyles = {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: `${timeRemaining}%`,
    transition: "width 0.1s linear",
    boxShadow: "0 0 5px rgba(255, 255, 255, 0.7)",
  };

  return (
    <div style={alertContainerStyles}>
      <div style={alertHeaderStyles}>
        <div style={{ flex: "1", textAlign: "center" }}>Alert</div>
        <button
          onClick={() => {
            setVisible(false);
            setMsg("");
          }}
          style={closeButtonStyles}
        >
          ×
        </button>
      </div>
      <div style={alertContentStyles}>
        <p style={{ margin: "0" }}>{msg}</p>
      </div>
      <div style={progressBarContainerStyles}>
        <div style={progressBarStyles} />
      </div>
    </div>
  );
}