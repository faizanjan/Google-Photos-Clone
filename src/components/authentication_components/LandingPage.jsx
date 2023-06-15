import { Tab, Tabs, Box } from "@mui/material";
import { useState } from "react";

import TabPanel from "../secondary_components/TabPanel";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const LandingPage = () => {
  const [userHasAccount, setUserHasAccount] = useState(false);

  const handleChange = () => {
    setUserHasAccount(!userHasAccount);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={userHasAccount ? 1 : 0} onChange={handleChange} centered>
          <Tab label="Sign Up" />
          <Tab label="Sign In" />
        </Tabs>
      </Box>
      <TabPanel showPanel={!userHasAccount}>
        <SignUp />
      </TabPanel>
      <TabPanel showPanel={userHasAccount}>
        <SignIn />
      </TabPanel>
    </Box>
  );
};

export default LandingPage;
