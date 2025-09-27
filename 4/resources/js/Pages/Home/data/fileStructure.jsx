// data/fileStructure.js
export const initialFiles = {
    'src': {
        type: 'folder',
        expanded: false,
        children: {
            'components': {
                type: 'folder',
                expanded: false,
                children: {
                    'Header.jsx': {
                        type: 'file',
                        content: '// Header component\nconst Header = () => {\n  return <header>My App</header>;\n};\n\nexport default Header;'
                    },
                    'Button.jsx': {
                        type: 'file',
                        content: '// Button component\nconst Button = ({ onClick, children }) => {\n  return <button onClick={onClick}>{children}</button>;\n};\n\nexport default Button;'
                    }
                }
            },
            'App.jsx': {
                type: 'file',
                content: '// Main App component\nimport React from "react";\n\nfunction App() {\n  return <div>Hello World</div>;\n}\n\nexport default App;'
            }
        }
    },
    'package.json': {
        type: 'file',
        content: '{\n  "name": "my-app",\n  "version": "1.0.0"\n}'
    }
};