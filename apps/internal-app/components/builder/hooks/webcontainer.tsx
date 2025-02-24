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
      .join('\n') + '\nmodule.exports = {' + Object.keys(functions).join(', ') + '};';
    await webContainer.fs.writeFile('functions.js', functionContent);
  };

  const invokeFunction = async (name: string, args: any[] = []) => {
    if (!webContainer) throw new Error("WebContainer not initialized");
    
    // Generate temporary runner script
    const runnerCode = `
      const { ${name} } = require('./functions.js');
      const args = JSON.parse(process.argv[2]);
      (async () => {
        try {
          const result = await ${name}(...args);
          console.log(JSON.stringify({ 
            success: true, 
            data: result 
          }));
        } catch (error) {
          console.log(JSON.stringify({ 
            success: false, 
            error: error.message 
          }));
        }
      })();
    `;
    await webContainer.fs.writeFile('runner.js', runnerCode);
    
    // Execute the runner script
    const process = await webContainer.spawn('node', [
      'runner.js',
      JSON.stringify(args)
    ]);
    const writer = process.input.getWriter();

    let output;
    process.output.pipeTo(new WritableStream({
      write(chunk) {
        output = JSON.parse(chunk);
      }
    }));

    const exitCode = await process.exit;
    writer.releaseLock();
    if (exitCode !== 0) {
      throw new Error(`Process exited with code ${exitCode}`);
    }
    return output;
  };

  return { webContainer, isLoading, writeFunctions, invokeFunction };
};

export default useWebContainer;