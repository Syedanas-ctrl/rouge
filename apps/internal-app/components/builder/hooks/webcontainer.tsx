import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";

const useWebContainer = () => {
  const [webContainer, setWebContainer] = useState<WebContainer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initWebContainer() {
      const wc = await WebContainer.boot();
      setWebContainer(wc);
      setIsLoading(false);
    }
    initWebContainer();
  }, []);

  const writeFunctions = async (functions: Record<string, string>) => {
    if (!webContainer) return;
    const functionContent = Object.entries(functions)
      .map(([name, body]) => `function ${name}() { ${body} }`)
      .join('\n');
    await webContainer.fs.writeFile('functions.js', functionContent);
    // const runProcess = await webContainer.spawn('node', ['functions.js']);
    // const runWriter = runProcess.input.getWriter();
    // const output: string[] = [];
    // const reader = runProcess.output.getReader();

    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) break;
    //   output.push(value);
    // }

    // await runProcess.exit;
    // runWriter.releaseLock();
    // return output;
  };

  const runFunctions = async (functionName: string) => {
    if (!webContainer) return;
    const runProcess = await webContainer.spawn('node', ['functions.js']);
    const runWriter = runProcess.input.getWriter();
    const output: string[] = [];
    const reader = runProcess.output.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      output.push(value);
    }

    await runProcess.exit;
    runWriter.releaseLock();
    return output;
  };

  return { webContainer, isLoading, writeFunctions, runFunctions };
};

export default useWebContainer;