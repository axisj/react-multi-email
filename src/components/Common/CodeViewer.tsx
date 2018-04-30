import * as React from 'react';

import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import prism from 'react-syntax-highlighter/styles/prism/prism';

function trimLineBreak(x: string) {
  return x.replace(/^\r?\n+/, '').replace(/\r?\n+\s*$/, '');
}

class CodeViewer extends React.Component<any, any> {
  render() {
    registerLanguage('jsx', jsx);

    prism['pre[class*="language-"]'].borderRadius = '5px';
    prism['pre[class*="language-"]'].border = '1px solid #e7e7e7';

    return (
      <SyntaxHighlighter language="jsx" style={prism}>
        {this.props.code
          ? trimLineBreak(this.props.code)
          : trimLineBreak('' + this.props.children)}
      </SyntaxHighlighter>
    );
  }
}

export default CodeViewer;
