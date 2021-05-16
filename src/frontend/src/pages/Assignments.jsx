import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Button } from "grommet";
import { Switch, Route } from "react-router-dom";
import AssignmentNew from "./AssignmentNew";
import axios from "axios";
import { api_url } from "../config/default.json";
import { View } from "grommet-icons";
import { Link } from "../components/Link";
import { useStore } from "../store/global";

const Assignments = () => {
  const [exercises, setExercises] = useState([]);
  useEffect(async () => {
    try {
      let exercisesResponse = (await axios.get(`${api_url}/exercises`)).data
        .exercises;
      console.log(exercisesResponse);
      setExercises(exercisesResponse);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <Box>
      <Heading>Exercises</Heading>
      <Box
        margin={{ bottom: "large" }}
        border={{ color: "brand" }}
        round
        width={"fit-content"}
        pad={"small"}
      >
        <Link to="/exercises/new">Create New Exercise</Link>
      </Box>

      <Box direction={"column"} gap={"small"}>
        {exercises.map((exercise, ix) => (
          <Box key={ix} border={{ color: "light-4" }} pad={"small"}>
            <Link to={`exercise/${exercise.id}`}>
              <Text size={"medium"} weight={600}>
                {exercise.name}
              </Text>
            </Link>
            <Text size={"medium"} weight={400}>
              {exercise.description}
            </Text>
            <Box margin={{ top: "small" }}></Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Assignments;
