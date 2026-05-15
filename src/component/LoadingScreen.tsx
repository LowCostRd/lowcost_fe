const LoadingScreen = () => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 9999,
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    background: "white", gap: "16px"
  }}>
    <div style={{
      width: "40px", height: "40px", borderRadius: "50%",
      border: "3px solid #f0f0f0",
      borderTop: "3px solid #7F77DD",
      animation: "spin 0.8s linear infinite"
    }}/>
    <p style={{ color: "#888", fontSize: "14px" }}>Please wait...</p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default LoadingScreen;