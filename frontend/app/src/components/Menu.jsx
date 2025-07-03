export default function Menu() {
  return (
    <nav className="sticky top-0 z-50 flex items-center bg-white shadow-md shadow-slate-200 h-14 w-full pl-6 pr-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
        <ul className="flex gap-6 w-fit h-1/3 justify-evenly items-center p-6 ml-auto">
          <li>
            <a
              className="block text-gray-700 hover:text-blue-700"
              href="http://localhost:5173/allocate"
            >
              Minhas reservas
            </a>
          </li>
          <li>
            <a
              className="block text-gray-700 hover:text-blue-700"
              href="http://localhost:5173/manage"
            >
              Cadastrar items
            </a>
          </li>
          <li>
            <a
              className="block text-gray-700 hover:text-blue-700"
              href="http://localhost:5173/report"
            >
              Gerar relatório
            </a>
          </li>
          <li>
            <a
              className="block text-blue-700 font-semibold hover:text-blue-900"
              href="http://localhost:5173/home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </a>
          </li>
          <li>
            <a
              className="block text-blue-700 font-semibold hover:text-blue-900"
              href="http://localhost:5173/home"
            ></a>
            <a href="http://localhost:5173/profile">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </a>
          </li>

        </ul>
    </nav>
  );
}
