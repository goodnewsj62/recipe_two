interface Props {
  message?: string;
}

const ErrorMessage = ({ message }: Props): JSX.Element | null => {
  if (!message) return null;
  return (
    <p className="mt-1 p-1 text-xs lowercase text-red-500 first-letter:uppercase">
      {message?.split('"')?.join("")}
    </p>
  );
};

export default ErrorMessage;
