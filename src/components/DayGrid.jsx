import Photo from "./Photo.jsx";
import getDayMonthYear from "../modules/calendar.js";

const DayGrid = ({ photos }) => {
  let { monthName, dayOfWeek, dayOfMonth } = getDayMonthYear(
    photos[0].timeCreated
  );
  return (
    <div className="time-line mt-4">
      <div className="d-flex flex-column flex-wrap">
        <p className="align-self-start ms-3">
          {dayOfWeek + ", " + dayOfMonth + " " + monthName}
        </p>
        <div className="d-flex flex-row flex-wrap">
        {photos?.map((photo) => (
            <Photo className="" key={photo.id} photo={photo} />
            ))}
            </div>
      </div>
    </div>
  );
};

export default DayGrid;
