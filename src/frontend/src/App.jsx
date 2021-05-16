import React from "react";
import { Grommet, Box, Text, Avatar } from "grommet";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Assignments from "./pages/Assignments";
import Assignment from "./pages/Assignment";
import AssignmentNew from "./pages/AssignmentNew";
import Home from "./pages/Home";
import { useStore } from "./store/global";

function App() {
  const currentUser = useStore((state) => state.currentUser);
  console.log({ CURRENT: currentUser });
  return (
    <Grommet full>
      <Box flex={"grow"}>
        <Box
          direction={"row"}
          pad={{
            top: "small",
            bottom: "small",
            left: "xsmall",
            right: "xsmall",
          }}
        >
          <Box></Box>
          <Box flex={"grow"}></Box>
          <Box background={"light-1"}>
            {currentUser && (
              <Avatar background={currentUser?.avatar_color} size={"small"}>
                <Text size={"xsmall"} color={"light-1"}>
                  {currentUser?.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </Text>
              </Avatar>
            )}
          </Box>
        </Box>
        <Router>
          {/* <Box>
            <nav>
              <ul style={{ listStyleType: "none" }}>
                <Box direction={"row"} gap={"small"}>
                  <li>
                    <Link to="/">home</Link>
                  </li>
                  <li>
                    <Link to="/exercises">exercises</Link>
                  </li>
                  <li>
                    <Link to="/exercise">exercise</Link>
                  </li>
                </Box>
              </ul>
            </nav>
          </Box> */}

          <Box flex={"grow"} pad={"medium"}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/exercises" exact>
                <Assignments />
              </Route>
              <Route path="/exercises/new" exact>
                <AssignmentNew />
              </Route>
              <Route path="/exercise/:exerciseId">
                <Assignment />
              </Route>
            </Switch>
          </Box>
        </Router>
      </Box>
    </Grommet>
  );
}

export default App;
