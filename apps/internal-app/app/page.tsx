'use client'
import { WebContainer } from '@webcontainer/api';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import React, { useState, useEffect } from 'react';
import { z, ZodSchema } from 'zod';

// Define component prop schemas
const componentSchemas = {
  Input: z.object({
    type: z.string().optional(),
    placeholder: z.string().optional(),
    onChange: z.function().args(z.string()).returns(z.void()),
    onBlur: z.function().args().returns(z.void()).optional(),
    children: z.any().optional()
  }).strict(),
  Button: z.object({
    onClick: z.function().args().returns(z.void()),
    disabled: z.boolean().optional(),
    children: z.any()
  }).strict(),
  Custom: z.object({
    prop1: z.string(),
    prop2: z.string(),
    prop3: z.string()
  }).strict()
} satisfies Record<string, ZodSchema>;

type ComponentType = keyof typeof componentSchemas;


interface SafeFunction {
  __fn: string;
  __id: string;
}

type SanitizedProps<T> = {
  [K in keyof T]: T[K] extends Function ? SafeFunction : T[K];
};

interface Block<T extends ComponentType> {
  component: T;
  props: z.infer<typeof componentSchemas[T]>;
  sanitizedProps: SanitizedProps<z.infer<typeof componentSchemas[T]>>;
}

const stringifyWithFunctions = (obj: any): string => {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'function') {
      return `@@function ${value.toString()}`;
    }
    return value;
  }, 2);
};

export const useWebContainer = () => {
  const [webcontainer, setWebcontainer] = useState<WebContainer | null>(null);

  useEffect(() => {
    const init = async () => {
      const wc = await WebContainer.boot();
      await wc.mount({
        'index.js': `export const render = (component, props) => {
          // Safe function handling
          const handlers = new Map();
          const sanitizedProps = Object.fromEntries(
            Object.entries(props).map(([key, value]) => {
              if (value?.__fn) {
                const fn = new Function('return ' + value.__fn)();
                handlers.set(value.__id, fn);
                return [key, (...args) => postMessage({ type: 'fn', id: value.__id, args })];
              }
              return [key, value];
            })
          );
          
          return { element: component(sanitizedProps), handlers };
        }`
      });
      setWebcontainer(wc);
    };
    init();
  }, []);

  return webcontainer;
};

const PropEditor = <T extends ComponentType>({ block }: { block: Block<T> }) => {
  console.log(block.props);
  const [propsText, setPropsText] = useState(stringifyWithFunctions(block.props));
  console.log(propsText);
  const [variables] = useState({ placeholderValue: "Email" });
  const [validProps, setValidProps] = useState(block.props);
  const [error, setError] = useState('');

  const wc = useWebContainer();
  const [instance, setInstance] = useState<{ element: React.ReactNode; handlers: Map<string, Function> } | null>(null);

  const serializeFunctions = (props: any): SanitizedProps<any> => {
    return Object.fromEntries(
      Object.entries(props).map(([key, value]) => [
        key,
        typeof value === 'function' 
          ? { __fn: value.toString(), __id: crypto.randomUUID() }
          : value
      ])
    );
  };

  const deserializeFunctions = (sanitized: SanitizedProps<any>) => {
    return Object.fromEntries(
      Object.entries(sanitized).map(([key, value]) => [
        key,
        (value as SafeFunction)?.__fn 
          ? new Function(`return ${(value as SafeFunction).__fn}`)()
          : value
      ])
    );
  };

  const validateAndRender = async (propsText: string) => {
    try {
      const parsed = JSON.parse(propsText);
      const validated = validateProps(parsed);
      
      if (wc) {
        const { component } = block;
        const sanitized = serializeFunctions(validated);
        const { element, handlers } = await wc.run('index.js', [
          'render',
          component,
          sanitized
        ]);
        
        setInstance({ element, handlers });
      }
    } catch (err) {
      // Handle errors
    }
  };


  const validateProps = (input: unknown): z.infer<typeof componentSchemas[T]> => {
    return componentSchemas[block.component].parse(input);
  };

  const evaluateProps = () => {
    try {
      // 1. Replace variables
      const withVariables = propsText.replace(
        /\{\{(\w+)\}\}/g, 
        (_, key) => JSON.stringify(variables[key])
      );

      // 2. Safely parse input
      const parsed = JSON.parse(withVariables, (key, value) => {
        // Handle function strings
        if (typeof value === 'string' && value.startsWith('@@function ')) {
          return new Function(`return ${value.replace('@@function ', '')}`);
        }
        return value;
      });

      // 3. Validate against schema
      const validated = validateProps(parsed);
      setValidProps(validated);
      setError('');
    } catch (err) {
      setError(err instanceof z.ZodError 
        ? `Validation error: ${err.errors.map(e => `${e.path}: ${e.message}`).join(', ')}`
        : `Syntax error: ${err.message}`
      );
    }
  };

  useEffect(() => {
    validateAndRender(propsText);
  }, [propsText]);

  const ComponentMap = {
    Input: Input,
    Button: Button,
    Custom: CustomComponent
  }[block.component];

  return (
    <div className="prop-editor">
      <textarea
        value={propsText}
        onChange={(e) => setPropsText(e.target.value)}
        placeholder={`Enter props for ${block.component} as JSON`}
        className='w-full'
        rows={10}
      />
      
      <div className="preview">
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <ComponentMap {...validProps} />
        )}
      </div>
    </div>
  );
};

const CustomComponent = ({prop1, prop2, prop3}: {prop1: string, prop2: string, prop3: string}) => {
  return <div>
    <h1>{prop1}</h1>
    <p>{prop2}</p>
    <button onClick={() => console.log(prop3)}>Click me</button>
  </div>
}

// Usage example
const App = () => {
  const inputBlock: Block<'Input'> = {
    component: 'Input',
    props: {
      type: 'email',
      placeholder: 'Enter email',
      onChange: (value: string) => console.log(value)
    },
    sanitizedProps: {
      type: 'email',
      placeholder: 'Enter email',
      onChange: { __fn: '(value) => console.log(value)', __id: '123' }
    }
  };

  const customBlock: Block<'Custom'> = {
    component: 'Custom',
    props: {
      prop1: 'Hello',
      prop2: 'World',
      prop3: 'Click me'
    },
    sanitizedProps: {
      prop1: 'Hello',
      prop2: 'World',
      prop3: 'Click me'
    }
  };

  return <PropEditor block={inputBlock} />;
};

export default App;