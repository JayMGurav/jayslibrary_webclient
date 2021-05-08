import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@JayMGurav" />
          <meta name="twitter:title" content="Jay's Library" />
          <meta name="twitter:description" content="Jay's Library is a collection of all the books that I am reading, read or would read and also the ones that I found interesting and are worth paying attention to." />
          <meta name="twitter:image" content="/twitterImage" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument