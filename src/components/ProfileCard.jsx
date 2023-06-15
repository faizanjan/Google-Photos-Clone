import { useAuth } from "../contexts/AuthContext.jsx";

const ProfileCard = () => {
  let { currentUser, logOut } = useAuth();

  return (
    <div
      className=" profile-container p-3 d-flex flex-column border shadow-lg rounded-5"
      style={{
        position: "fixed",
        right: "30px",
        top: "70px",
        minWidth: "400px",
        background: "#f3f6fc",
      }}
    >
      <div
        className="profile d-flex flex-row align-items-center p-4 border rounded-5 shadow"
        style={{ background: "white" }}
      >
        <div className="profile-picture " style={{ width: "70px" }}>
          <img
            className="img-fluid rounded-5 border"
            src="https://media.licdn.com/dms/image/C5603AQFniDLv2JCakw/profile-displayphoto-shrink_200_200/0/1639730969038?e=1692230400&v=beta&t=ASCa0waPnzbJ9o8LW93Uj9oPepsuBNkgOkTvkYurrpg"
            alt=""
          />
        </div>
        <div className="profile-detail d-flex flex-column align-items-start ms-4">
          <span className="name fs-5">{currentUser?.displayName}</span>
          <span className="email text-muted fw-light">{currentUser.email}</span>
        </div>
      </div>
      <button
        className="btn btn-light btn-outline btn-signout signout d-flex flex-row justify-content-center align-items-center p-3 mt-4"
        onClick={logOut}
      >
        <i className="fa-solid fa-arrow-right-from-bracket me-3"></i>
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default ProfileCard;
