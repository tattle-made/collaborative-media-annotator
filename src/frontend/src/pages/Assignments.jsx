import React from "react";
import { Box, Heading, Text, Button } from "grommet";
import { Switch, Route, Link } from "react-router-dom";
import AssignmentNew from "./AssignmentNew";

const Assignments = () => {
  return (
    <Box>
      <Heading>Exercises</Heading>
      <Text size={"large"}> List </Text>
      <Box>
        <Button>
          <Link to="/exercises/new">New</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default Assignments;
