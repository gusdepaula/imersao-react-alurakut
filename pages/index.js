import React, { useState, useEffect } from "react";
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

export default function Home() {
  const usuarioAleatorio = "gusdepaula";
  const [userData, setUserData] = useState(undefined);
  const [comunidades, setComunidades] = React.useState([
    {
      id: "d8043eb624c0414fb4384ebc0cd9c07e",
      title: "Eu odeio acordar cedo",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
    {
      id: "398082ebb2634700a45ec8870ff946b9",
      title: "Odeio esperar resposta no MSN",
      image:
        "https://img10.orkut.br.com/community/9197344aa3f8d682ece581e1146bec4a.jpg",
    },
    {
      id: "6f9ac2b5451a45e888ef394d3486fbbb",
      title: "Pareço metida(o) mas sou legal",
      image:
        "https://img10.orkut.br.com/community/43bf264aab209e4950ebf201789ed177.jpg",
    },
  ]);
  // const comunidades = comunidades[0];
  // const alteradorDeComunidades/setComunidades = comunidades[1];

  useEffect(() => {
    fetch(`${URL_GITHUBAPI}/users/${usuarioAleatorio}`)
      .then((res) => res.json())
      .then((data) =>
        setUserData((prevUserData) => ({ ...prevUserData, ...data }))
      );

    fetch(`${URL_GITHUBAPI}/users/${usuarioAleatorio}/following`)
      .then((res) => res.json())
      .then((data) =>
        setUserData((prevUserData) => ({
          ...prevUserData,
          followingUsers: data,
        }))
      );
  }, [usuarioAleatorio]);
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
                  id: new Date().toISOString(),
                  title: dadosDoForm.get("title"),
                  image: dadosDoForm.get("image"),
                };
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
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
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({userData && userData.following})
            </h2>

            <ul>
              {userData?.followingUsers &&
                userData.followingUsers.slice(0, 6).map((user) => (
                  <li key={user.login}>
                    <a href={`/users/${user.login}`}>
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
