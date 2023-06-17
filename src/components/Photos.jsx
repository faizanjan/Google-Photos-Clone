import MonthGrid from "./MonthGrid.jsx";

function Photos({photos}) {
 
  return (
    <div
    className="photos-container ms-2"
    style={{
          position: "relative",
          overflowY: "scroll",
        }}
        >
        <div className="month-grid">
          {Object.keys(photos).map((month) => {
            return <MonthGrid key={month} monthPhotos={photos[month]} />;
          })}
        </div>
      </div>
  );
}

export default Photos;
