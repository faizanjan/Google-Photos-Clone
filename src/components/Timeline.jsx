import Photo from "./Photo.jsx";
import getDayMonthYear from "../modules/calendar.js";

const Timeline = ({ monthPhotos }) => {
    let {monthName, year} = getDayMonthYear(monthPhotos[0].timeCreated);
  return (
    <div className="time-line mt-5">
    <span className="timeline-time mt-5 ms-1">
        <span className="month fs-4  fw-bold">
            {monthName}
        </span>
        <span className="year ms-2 fs-3">
            {year}
        </span>
    </span>
      <div className="d-flex flex-row flex-wrap">
        {monthPhotos?.map((photo) => 
            <Photo className="" key={photo.id} photo={photo} />
        )}
      </div>
    </div>
  );
};

export default Timeline;
