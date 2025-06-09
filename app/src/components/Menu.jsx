
export default function Menu() {
  return (
    <nav className="flex flex-col items-center bg-blue-50 min-h-screen w-1/6">
      <div className="h-1/6 bg-blue-100 w-full flex items-center justify-center">
        <a className="text-2xl font-semibold mb-4 inline-block" href="/">
          MySite
        </a>
      </div>
      <ul className="flex flex-col w-full h-1/3 justify-evenly items-center p-6">
        <li className="mb-2">
          <a
            className="block text-blue-700 font-semibold hover:text-blue-900"
            href="http://localhost:5173/"
          >
            Página inicial
          </a>
        </li>
        <li className="mb-2">
          <a
            className="block text-gray-700 hover:text-blue-700"
            href="http://localhost:5173/rent"
          >
            Empreestimar
          </a>
        </li>
        <li className="mb-2">
          <a
            className="block text-gray-700 hover:text-blue-700"
            href="http://localhost:5173/devolute"
          >
            Cancelar ou devolução
          </a>
        </li>
        <li className="mb-2">
          <a
            className="block text-gray-700 hover:text-blue-700"
            href="http://localhost:5173/report"
          >
            Gerar relatório
          </a>
        </li>
      </ul>
    </nav>
  );
}
