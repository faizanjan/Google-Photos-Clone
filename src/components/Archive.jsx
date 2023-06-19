import MonthGrid from "./MonthGrid.jsx";

function Arhive({ photos }) {
  return (
    <div
      className="photos-container ms-2"
      style={{
        position: "relative",
        overflowY: "scroll",
        width: "100%",
      }}
    >
      <div className="mt-4 pb-3 d-flex flex-row justify-content-between border-bottom">
        <span className="text-dark ms-3 fs-5">Archive</span>
      </div>
      <div className="month-grid">
        {Object.keys(photos).map((month) => {
          return <MonthGrid key={month} monthPhotos={photos[month]} />;
        })}
      </div>
    </div>
  );
}

export default Arhive;
