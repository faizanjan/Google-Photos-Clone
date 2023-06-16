import getDayMonthYear from "../modules/calendar.js";

import DayGrid from "./DayGrid.jsx";

const MonthGrid = ({ monthPhotos }) => {
  let { monthName, year } = getDayMonthYear(monthPhotos[0].timeCreated);

  let photos = monthPhotos.reduce((acc, photo) => {
    let key =
      monthName +
      "/" +
      year +
      "/" +
      getDayMonthYear(photo.timeCreated).dayOfMonth;
    if (acc[key]) acc[key].push(photo);
    else acc[key] = [photo];
    return acc;
  }, {});

  return (
    <div className="time-line mt-5">
      <span className="timeline-time mt-5 ms-1">
        <span className="month fs-4  fw-bold">{monthName}</span>
        <span className="year ms-2 fs-3">{year}</span>
      </span>
      <div className="day-grid d-flex flex-row flex-wrap">
        {Object.keys(photos).map((date, index) => (
          <DayGrid key={date + index} photos={photos[date]} />
        ))}
      </div>
    </div>
  );
};

export default MonthGrid;
