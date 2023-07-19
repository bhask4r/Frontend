import { useState } from "react";

export default function CommandInput({ onCommandSubmit, messages }) {
  const [command, setCommand] = useState("");
  const [disableInput, setDisableInput] = useState(false); // State to disable input

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommand("");
    setDisableInput(true); // Disable input while waiting for response
    await onCommandSubmit(command);
    setDisableInput(false); // Enable input after response is received
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-6 w-[100%]">
      <input
        className="cmd-input text-base text-ellipsis px-18 w-[350px] overflow-hidden"
        type="text"
        placeholder="Please ask me"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
         // Disable input based on the disableInput state
      />
      {command.length === 0 ? (
        <div className="flex justify-center align-center py-2 px-5 bg-blue-500 rounded-full text-white">
          <div className="flex justify-center align-center">Submit</div>
        </div>
      ) : (
        <button type="submit" disabled={disableInput} className="py-2 px-5 bg-blue-500 rounded-full text-white" disabled={disableInput}>
          Submit
        </button>
      )}
    </form>
  );
}

