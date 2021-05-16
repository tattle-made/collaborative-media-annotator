import React, { useState, useEffect } from "react";
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

function LabelWrapper({ children, label, socket, type, fieldId }) {
  const [value, setValue] = useState(FormComponentIndex[type].defaultValue);

  function sendEvent(fieldValue) {
    console.log("Sending : ", { id: fieldId, value: fieldValue });
    socket.emit("data", { id: fieldId, value: fieldValue });
  }

  useEffect(() => {
    socket.on("data", (msg) => {
      if (fieldId === msg.id) {
        console.log(`rcvd ${fieldId} : ${msg.value}`);
        if (type === "multiselect") {
          setValue(msg.value.split(","));
        } else {
          setValue(msg.value);
        }
      }
    });
  }, [socket]);

  function set(e) {
    console.log("here");
    console.log(e);
    // send formId too
    FormComponentIndex[type].onChange(setValue, e, sendEvent);
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

const FormBuilder = ({ formData, socket }) => {
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
          const id = formData[formItem].id;
          const type = formData[formItem].type;
          const label = formData[formItem].label;
          const parameters = formData[formItem].parameters;

          return (
            <Box gap={"small"} key={index}>
              <LabelWrapper
                type={type}
                label={label}
                fieldId={id}
                socket={socket}
              >
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
    onChange: (setValue, event, sendEvent) => {
      setValue(event.target.value);
      sendEvent(event.target.value);
    },
  },
  string: {
    component: function Text() {
      return <TextInput type="text" />;
    },
    defaultValue: "hello",
    onChange: (setValue, event, sendEvent) => {
      setValue(event.target.value);
      sendEvent(event.target.value);
    },
  },
  date: {
    component: function Text() {
      return <TextInput type="date" />;
    },
    defaultValue: "02/02/2021",
    onChange: (setValue, event, sendEvent) => {
      setValue(event.target.value);
      sendEvent(event.target.value);
    },
  },
  multiselect: {
    component: function CheckBox(parameters) {
      return <CheckBoxGroup options={parameters.options} />;
    },
    defaultValue: [],
    onChange: (setValue, event, sendEvent) => {
      setValue(event.value);
      sendEvent(event.value.join(","));
    },
  },
  singleselect: {
    component: function RadioButton(parameters) {
      return (
        <RadioButtonGroup name={parameters.name} options={parameters.options} />
      );
    },
    defaultValue: "a",
    onChange: (setValue, event, sendEvent) => {
      setValue(event.target.value);
      sendEvent(event.target.value);
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
