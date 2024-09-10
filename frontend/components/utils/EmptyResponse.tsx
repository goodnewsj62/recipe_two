import React from "react";

interface Props {
  message: string;
  src: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles?: Record<string, any>;
}
const EmptyResponse: React.FC<Props> = ({ message, src, styles = {} }) => {
  return (
    <div
      className="flex w-full flex-col items-center justify-center"
      style={{ height: "calc(100vh - 100px)", ...styles }}
    >
      <img src={src} className="w-32" alt="image description" />
      <p className="mt-4 px-4 text-center">{message}</p>
    </div>
  );
};

export default EmptyResponse;
