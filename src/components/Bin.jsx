import MonthGrid from "./MonthGrid.jsx";

function Bin({ photos }) {
  return (
    <div
      className="photos-container ms-2"
      style={{
        position: "relative",
        overflowY: "scroll",
      }}
    >
      <h1 className="mt-5 pb-3">Bin</h1>
      <div className="month-grid">
        {photos && Object.keys(photos).map((month) => {
          return <MonthGrid key={month} monthPhotos={photos[month]} />;
        })}
      </div>
    </div>
  );
}

export default Bin;
