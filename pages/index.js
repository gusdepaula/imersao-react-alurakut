import React from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

const URL_GITHUBAPI = `https://api.github.com`;

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${propriedades.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />

      <p>
        <a
          className="boxLink"
          href={`https://github.com/${propriedades.githubUser}`}
        >
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home(props) {
  const usuarioAleatorio = props.githubUser;

  const [comunidades, setComunidades] = React.useState([]);
  // const comunidades = comunidades[0];
  // const alteradorDeComunidades/setComunidades = comunidades[1];

  const [userData, setUserData] = React.useState([]);
  React.useEffect(() => {
    fetch(`${URL_GITHUBAPI}/users/${usuarioAleatorio}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData((prevUserData) => ({ ...prevUserData, ...data }));
      })
      .catch((erro) => console.error(erro));

    fetch(`${URL_GITHUBAPI}/users/${usuarioAleatorio}/following`)
      .then((res) => res.json())
      .then((data) =>
        setUserData((prevUserData) => ({
          ...prevUserData,
          followingUsers: data,
        }))
      )
      .catch((erro) => console.error(erro));

    fetch(`${URL_GITHUBAPI}/users/${usuarioAleatorio}/followers`)
      .then((res) => res.json())
      .then((data) =>
        setUserData((prevUserData) => ({
          ...prevUserData,
          followersUsers: data,
        }))
      )
      .catch((erro) => console.error(erro));

    // API GraphQL
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "5f00c9765074431ca9b69d46509fe6",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const datoCMSCommunities = data.data.allCommunities;
        console.log(datoCMSCommunities);
        setComunidades(datoCMSCommunities);
      });
  }, []);
  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem-vindo, {userData && userData.name}</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                console.log("Campo: ", dadosDoForm.get("title"));
                console.log("Campo: ", dadosDoForm.get("image"));

                const comunidade = {
                  title: dadosDoForm.get("title"),
                  imageUrl: dadosDoForm.get("image"),
                  creatorSlug: usuarioAleatorio,
                };

                fetch("/api/comunidades", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(comunidade),
                }).then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas);
                });
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguidores ({userData && userData.followers})
            </h2>

            <ul>
              {userData?.followersUsers &&
                userData.followersUsers.slice(0, 6).map((user) => (
                  <li key={user.login}>
                    <a
                      href={`https://www.github.com/${user.login}`}
                      target="_blank"
                    >
                      <img
                        src={`https://www.github.com/${user.login}.png`}
                        alt={user.login}
                      />
                      <span>{user.login}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguindo ({userData && userData.following})
            </h2>

            <ul>
              {userData?.followingUsers &&
                userData.followingUsers.slice(0, 6).map((user) => (
                  <li key={user.login}>
                    <a
                      href={`https://www.github.com/${user.login}`}
                      target="_blank"
                    >
                      <img
                        src={`https://www.github.com/${user.login}.png`}
                        alt={user.login}
                      />
                      <span>{user.login}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { githubUser } = jwt.decode(token);

  const { isAuthenticated } = await fetch(
    "https://alurakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((resposta) => resposta.json());

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}
