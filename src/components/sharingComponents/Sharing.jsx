import { useEffect } from "react";
import { getAllUsers } from "../../modules/getAllUsers";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../../Redux/users.store";

const Sharing = () => {
  const dispatch = useDispatch();
  const users = useSelector(state=>state.allUsers);

  console.log(users)
  useEffect(() => {
    getAllUsers().then((allUsers) => {
        dispatch(setAllUsers(allUsers));
    });
  }, []);

  return <div>
    {Object.values(users).map(user=>user.name)}
  </div>;
};

export default Sharing;
