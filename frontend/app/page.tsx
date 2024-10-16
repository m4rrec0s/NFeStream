export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold">NFeStream</h1>{" "}
      <div>
        <p>
          NFeStream é uma aplicação de exemplo para demonstrar a integração de
          uma aplicação Next.js com a API de Nota Fiscal Eletrônica da Receita
          Federal.
        </p>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Repositório no GitHub</td>
              <td>Repositório com o código fonte do projeto</td>
              <td>
                <a href="#">Github</a>
              </td>
            </tr>
            <tr>
              <td>Documentação da API</td>
              <td>Documentação da API da Receita Federal</td>
              <td>
                <a href="#">API</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}
