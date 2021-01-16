import React from "react";

export interface Props {
  buttonText: string;
}

const ButtonComponent: React.SFC<Props> = ({ buttonText }) => {
  return <button>{buttonText}</button>;
};

export default ButtonComponent;
