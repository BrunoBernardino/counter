import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const analyticsJS = `
(function(f, a, t, h, o, m){
a[h]=a[h]||function(){
(a[h].q=a[h].q||[]).push(arguments)
};
o=f.createElement('script'),
m=f.getElementsByTagName('script')[0];
o.async=1; o.src=t; o.id='fathom-script';
m.parentNode.insertBefore(o,m)
})(document, window, 'https://cdn.usefathom.com/tracker.js', 'fathom');
fathom('set', 'siteId', 'UAIVVKJN');
fathom('trackPageview');
`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: analyticsJS }} />
        </body>
      </Html>
    );
  }
}
