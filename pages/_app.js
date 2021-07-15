import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AlurakutStyles } from "../src/lib/AlurakutCommons";
import Head from 'next/head'

const GlobalStyle = createGlobalStyle`
  /* Reset CSS (Necolas Reset CSS <3) */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: #D9E6F6;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`;

const theme = {
  colors: {
    primary: "red",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
          {/* <!-- Primary Meta Tags --> */}
          <title>Alurakut</title>
          <meta name="title" content="Alurakut" />
          <meta name="description" content="Projeto construido durante a terceira edição Imersão React da Alura!" />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://alurakut-gusdepaula.vercel.app/" />
          <meta property="og:title" content="Alurakut" />
          <meta property="og:description" content="Projeto construido durante a terceira edição Imersão React da Alura!" />
          <meta property="og:image" content="https://raw.githubusercontent.com/gusdepaula/imersao-react-alurakut/main/alurakut.png" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://alurakut-gusdepaula.vercel.app/" />
          <meta property="twitter:title" content="Alurakut" />
          <meta property="twitter:description" content="Projeto construido durante a terceira edição Imersão React da Alura!" />
          <meta property="twitter:image" content="https://raw.githubusercontent.com/gusdepaula/imersao-react-alurakut/main/alurakut.png" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
