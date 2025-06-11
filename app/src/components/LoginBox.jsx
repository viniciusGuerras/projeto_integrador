import loginCard from '../assets/loginCard.jpg';
export default function LoginBox() {
  return (
    <div className="w-1/2 h-[60vh] mx-auto mt-12 bg-white rounded-2xl shadow-lg flex p-2">
      <div className="w-1/2 p-5 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h3>

        <form className="space-y-5">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email 
            </label>
            <input
              type="email"
              id="email"
              placeholder="abcde@email.com"
              className="w-full px-4 py-2 border bg-slate-300 border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="senha_forte."
              className="w-full px-4 py-2 border bg-slate-300 border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-1/2 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
              Enviar
            </button>
          </div>
        </form>
      </div>

      <div className="w-1/2 h-auto rounded-lg flex items-center justify-center text-white">
        <img className="h-full w-full rounded-lg object-cover" src={loginCard} alt="Login"/>
      </div>
    </div>
  );
}
