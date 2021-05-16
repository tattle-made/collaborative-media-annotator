import React, { useEffect } from "react";
import { Box, Heading, Button, TextInput, TextArea } from "grommet";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import theme from "react-json-editor-ajrm/themes";
import axios from "axios";
import { api_url } from "../config/default.json";
import { sampleSchema, samplePostUrls } from "../config/sample-exercise-data";
import { useStore } from "../store/global";
import MultiUserSelect from "../components/MultiUserSelect";

const AssignmentNew = () => {
  const setUsers = useStore((state) => state.setUsers);
  const users = useStore((state) => state.users);

  const [exerciseName, setExerciseName] = React.useState("");
  const [exerciseDescription, setExerciseDescription] = React.useState("");
  const [exerciseSchema, setExerciseSchema] = React.useState(sampleSchema);
  const [postUrls, setPostUrls] = React.useState(samplePostUrls);
  const [participants, setParticipants] = React.useState([]);

  useEffect(async () => {
    console.log(`${api_url}/users`);
    try {
      let users = await axios.get(`${api_url}/users`);
      setUsers(users.data);
      console.log({ USERS: users });
    } catch (err) {
      console.log(err);
    }
  }, []);

  async function onClickCreate() {
    try {
      const res = await axios.post(`${api_url}/exercise`, {
        name: exerciseName,
        description: exerciseDescription,
        schema: exerciseSchema,
        post_urls: postUrls,
        participants,
      });
      console.log({ res });

      // console.log({
      //   exerciseName,
      //   exerciseDescription,
      //   exerciseSchema,
      //   postUrls,
      //   partcipants,
      // });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box fill>
      <Heading>Create New Exercise</Heading>
      <Box fill>
        <Heading level={2}> Name</Heading>
        <TextInput
          placeholder="Exercise name"
          value={exerciseName}
          onChange={(event) => setExerciseName(event.target.value)}
        />
        <Heading level={2}> Description</Heading>
        <TextArea
          placeholder="Describe the exercise"
          value={exerciseDescription}
          onChange={(event) => setExerciseDescription(event.target.value)}
        />

        <Heading level={2}> Image Urls</Heading>

        <JSONInput
          id="posts"
          placeholder={samplePostUrls}
          locale={locale}
          colors={theme.light_mitsuketa_tribute}
          width="100%"
          height={"fit-content"}
          onChange={(data) => setPostUrls(data.jsObject)}
        />

        <Heading level={2}> Form Schema</Heading>

        <JSONInput
          id="schema"
          placeholder={sampleSchema}
          locale={locale}
          colors={theme.light_mitsuketa_tribute}
          width="100%"
          height={"fit-content"}
          onChange={(data) => setExerciseSchema(data.jsObject)}
        />

        <Heading level={2}> Participants</Heading>

        <MultiUserSelect
          users={users}
          label={"Select Users"}
          onOptionsChange={setParticipants}
        />

        <Box width={"small"} margin={{ top: "large", bottom: "medium" }}>
          <Button label={"Create"} onClick={onClickCreate}></Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AssignmentNew;
