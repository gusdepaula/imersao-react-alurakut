import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response) {
  if (request.method === "POST") {
    const TOKEN = "24782c2a883b6186e19ade609d6771";
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
      itemType: "967710", // model ID of datoCMS
      ...request.body,
      //   title: "Comunidade de teste",
      //   imageUrl: "https://github.com/gusdepaula.png",
      //   creatorSlug: "gusdepaula",
    });

    response.json({
      dados: "Algum dado qualquer",
      registroCriado: registroCriado,
    });
    return;
  }
  response.status(404).json({
    message: "Ainda não temos nada no GET, mas no POST tem!",
  });
}
