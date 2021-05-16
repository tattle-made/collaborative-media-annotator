import React, { useState, useEffect } from "react";
import { Box, Heading, Button } from "grommet";
import { useStore } from "../store/global";
import { Select } from "grommet";
import { Link } from "../components/Link";
import { api_url } from "../config/default.json";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const currentUser = useStore((state) => state.currentUser);
  // const setUsers = useStore((state) => state.setUsers);
  const [users, setUsers] = useState(undefined);
  const [value, setValue] = React.useState("");
  const [originalUsers, setOriginalUsers] = useState(undefined);

  function computeAndSetUser(id) {
    console.log({ id, originalUsers });
    const user = originalUsers.filter((user) => user.id === id);
    console.log({ USER: user[0] });
    setCurrentUser(user[0]);
  }

  useEffect(async () => {
    console.log(`${api_url}/users`);
    try {
      let users = await axios.get(`${api_url}/users`);

      const x = users.data.map((user) => ({
        label: user.name,
        value: user.id,
      }));
      console.log({ USERS: x });
      setUsers(x);
      setOriginalUsers(users.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Box>
      <Heading>Login</Heading>
      <Box width={"small"}>
        {users && (
          <Select
            label={"Select Username"}
            options={users}
            valueKey={{ key: "value", reduce: true }}
            labelKey="label"
            value={value}
            onChange={({ value: nextValue }) => {
              setValue(nextValue);
              computeAndSetUser(value);
            }}
          />
        )}
      </Box>

      <Box width={"small"} margin={{ top: "medium" }}>
        <Button label={"Enter"} onClick={() => history.push("/exercises")} />
      </Box>
    </Box>
  );
};

export default Home;
