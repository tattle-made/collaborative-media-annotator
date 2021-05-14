import React, { useState } from "react";
import {
  Box,
  Text,
  TextInput,
  CheckBoxGroup,
  RadioButtonGroup,
  Form,
  FormField,
} from "grommet";

function RectZone() {
  const [regions, setRegions] = useState([]);
  return <>{regions.map((region) => {})}</>;
}

function LabelWrapper({ children, label, type }) {
  const [value, setValue] = useState(FormComponentIndex[type].defaultValue);

  function set(e) {
    console.log("here");
    console.log(e);
    FormComponentIndex[type].onChange(setValue, e);
  }

  const WrappedChildren = React.cloneElement(children, {
    value: value,
    onChange: (e) => set(e),
  });

  return (
    <FormField name="name" label={label}>
      {WrappedChildren}
    </FormField>
  );
}

const FormBuilder = ({ formData }) => {
  const [value, setValue] = React.useState({});
  return (
    <Box gap={"medium"}>
      <Form
        value={value}
        onChange={(nextValue) => {
          console.log(value);
          setValue(nextValue);
        }}
      >
        {Object.keys(formData).map((formItem, index) => {
          const type = formData[formItem].type;
          const label = formData[formItem].label;
          const parameters = formData[formItem].parameters;
          return (
            <Box gap={"small"} key={index}>
              <LabelWrapper type={type} label={label}>
                {FormComponentIndex[type].component(parameters)}
              </LabelWrapper>
            </Box>
          );
        })}
      </Form>
    </Box>
  );
};

export default FormBuilder;

const FormComponentIndex = {
  number: {
    component: function Text() {
      return <TextInput type="number" />;
    },
    defaultValue: 0,
    onChange: (setValue, event) => {
      setValue(event.target.value);
    },
  },
  string: {
    component: function Text() {
      return <TextInput type="text" />;
    },
    defaultValue: "hello",
    onChange: (setValue, event) => {
      setValue(event.target.value);
    },
  },
  date: {
    component: function Text() {
      return <TextInput type="date" />;
    },
    defaultValue: "02/02/2021",
    onChange: (setValue, event) => {
      setValue(event.target.value);
    },
  },
  multiselect: {
    component: function CheckBox(parameters) {
      return <CheckBoxGroup options={parameters.options} />;
    },
    defaultValue: [],
    onChange: (setValue, event) => {
      setValue(event.value);
    },
  },
  singleselect: {
    component: function RadioButton(parameters) {
      return (
        <RadioButtonGroup name={parameters.name} options={parameters.options} />
      );
    },
    defaultValue: "a",
    onChange: (setValue, event) => {
      setValue(event.value);
    },
  },
  rectzone: {
    component: <RectZone />,
    defaultValue: [],
    onChange: (setValue, event) => {
      //setValue(event.value);
      console.log("TODO implemetation");
    },
  },
};
