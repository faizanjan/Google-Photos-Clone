import MonthGrid from "./MonthGrid.jsx";

function Arhive({ photos }) {
  return (
    <div
      className="photos-container ms-2"
      style={{
        position: "relative",
        overflowY: "scroll",
      }}
    >
      <h1 className="mt-5 pb-3">Archive</h1>
      <div className="month-grid">
        {Object.keys(photos).map((month) => {
          return <MonthGrid key={month} monthPhotos={photos[month]} />;
        })}
      </div>
    </div>
  );
}

export default Arhive;
