import React, { useState } from "react";
import { FormClose } from "grommet-icons";
import { Box, Button, Heading, Text, Select } from "grommet";

const MultiUserSelect = ({ users, label, onOptionsChange }) => {
  const [selected, setSelected] = useState([]);
  const allSeasons = users.map((user) => user.name);

  const onRemoveSeason = (season) => {
    const seasonIndex = allSeasons.indexOf(season);
    setSelected(
      selected.filter((selectedSeason) => selectedSeason !== seasonIndex)
    );
  };

  const renderSeason = (season) => (
    <Button
      key={`season_tag_${season}`}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onRemoveSeason(season);
      }}
      onFocus={(event) => event.stopPropagation()}
    >
      <Box
        align="center"
        direction="row"
        gap="xsmall"
        pad={{ vertical: "xsmall", horizontal: "small" }}
        margin="xsmall"
        background="brand"
        round="large"
      >
        <Text size="small">{season}</Text>
        <Box round="full" margin={{ left: "xsmall" }}>
          <FormClose size="small" style={{ width: "12px", height: "12px" }} />
        </Box>
      </Box>
    </Button>
  );

  const renderOption = (option, state) => (
    <Box pad="small" background={state.active ? "active" : undefined}>
      {option}
    </Box>
  );
  return (
    <Select
      closeOnChange={false}
      multiple
      value={
        <Box wrap direction="row" width="small">
          {selected && selected.length ? (
            selected.map((index) => renderSeason(allSeasons[index]))
          ) : (
            <Box
              pad={{ vertical: "xsmall", horizontal: "small" }}
              margin="xsmall"
            >
              {label}
            </Box>
          )}
        </Box>
      }
      options={allSeasons}
      selected={selected}
      onChange={({ selected: nextSelected }) => {
        console.log({ val: [...nextSelected] });
        setSelected([...nextSelected].sort());
        onOptionsChange([...nextSelected].sort().map((i) => users[i].id));
      }}
    >
      {renderOption}
    </Select>
  );
};

export default MultiUserSelect;
