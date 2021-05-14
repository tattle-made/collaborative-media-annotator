```
const instance = await schema.InstanceFactory({
  first_field: await text.InstanceFactory({ label: "Your Name" }),

  second_field: await number.InstanceFactory({
    label: "Your Age",
    parameters: { min: 18, max: 50 },
  }),

  third_field: await date.InstanceFactory({ label: "date of birth" }),

  fourth_field: await singleselect.InstanceFactory({
    label: "choose one ",
    parameters: { name: "options", options: ["A", "B", "C"] },
  }),

  fifth_field: await multiselect.InstanceFactory({
    label: "choose one ",
    parameters: { options: ["A", "B", "C"] },
  }),

});
```
