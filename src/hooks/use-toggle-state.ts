import * as React from "react";

export const useToggleState = (initialState = false) => {
  const [isOn, setIsOn] = React.useState(initialState);

  const handleToggle = () => setIsOn((prev) => !prev);
  const handleOff = () => setIsOn(false);
  const handleOn = () => setIsOn(true);

  return { isOn, handleToggle, handleOff, handleOn };
};
