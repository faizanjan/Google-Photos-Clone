const SharingHeader = ({ showSent, setShowSent }) => {
  return (
    <>
      <ul className="nav nav-tabs my-3">
        <li className="nav-item hover-pointer" onClick={() => setShowSent(true)}>
          <span className={"nav-link fs-5" + (showSent ? " active text-primary" : " text-dark fw-light")}>Sent</span>
        </li>
        <li className="nav-item hover-pointer" onClick={() => setShowSent(false)}>
          <span className={"nav-link fs-5" + (showSent ? " text-dark fw-light" : " active text-primary")}>Received</span>
        </li>
      </ul>
    </>
  );
};

export default SharingHeader;
