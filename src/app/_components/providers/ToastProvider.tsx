import React from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const ToastProvider = (props: Props) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {props.children}
    </>
  );
};

export default ToastProvider;
