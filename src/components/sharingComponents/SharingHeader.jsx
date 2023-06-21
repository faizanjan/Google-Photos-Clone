
const SharingHeader = ({ showSent, setShowSent }) => {
  return (
    <ul id="sharing-menu">
      <li
        onClick={() => setShowSent(false)}
        style={
          !showSent
            ? {
                color: "#0d6efd",
                borderBottom: "2px solid #0d6efd",
              }
            : {}
        }
      >
        Received
      </li>

      <li
        onClick={() => setShowSent(true)}
        style={
          showSent
            ? {
                color: "#0d6efd",
                borderBottom: "2px solid #0d6efd",
              }
            : {}
        }
      >
        Sent
      </li>
    </ul>
  );
};

export default SharingHeader;
