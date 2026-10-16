import { useEffect, useState } from "react";
import { render, Box, Text, useInput, useStdin } from "ink";

function KeyProbe() {
  const { stdin } = useStdin();
  const [lines, setLines] = useState<string[]>([]);
  const add = (line: string) => setLines((prev) => [...prev.slice(-12), line]);

  // Raw bytes, before Ink interprets them
  
  useEffect(() => {
    const onData = (data: Buffer) =>
      add("raw:   " + [...data].map((b) => b.toString(16).padStart(2, "0")).join(" "));
    stdin.on("data", onData);
    return () => {
      stdin.off("data", onData);
    };
  }, [stdin]);

  // What Ink makes of the same keypress
  useInput((input, key) => {
    const flags = Object.entries(key)
      .filter(([, value]) => value)
      .map(([name]) => name)
      .join("+");
    add(`ink:   input=${JSON.stringify(input)} key=${flags || "none"}`);
  });

  return (
    <Box flexDirection="column">
      <Text bold>Key probe: press keys, Ctrl+C to quit</Text>
      {lines.map((line, i) => (
        <Text key={i}>{line}</Text>
      ))}
    </Box>
  );
}

render(<KeyProbe />);
