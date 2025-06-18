import loginCard from '../assets/loginCard.jpg';
import Button from "./ui/Button";
import Input from "./ui/Input";


export default function LoginBox() {
  return (
    <div className="w-1/3 h-[60vh] mx-auto text-gray-700 bg-white rounded-md shadow-lg flex p-2">
        <div className="w-full px-5 flex flex-col gap-3 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-12 self-center">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
            <div>
                <h2 className="text-lg font-bold text-gray-800 text-center">Bem vindo de volta!</h2>
                <p className="text-center">Coloque seus dados para entrar.</p>
            </div>

            <form className="space-y-5 flex flex-col">
                <Input label="Email" 
                    type="email"
                    placeholder="email@exemplo.com"
                    styleLabel={"block text-sm font-medium text-gray-500"}
                    styleInput={"w-full px-4 py-2 border bg-white border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2"}
                />
                <Input 
                    label="Password"
                    type="password"
                    placeholder="••••••••" 
                    styleLabel={"block text-sm font-medium text-gray-500"}
                    styleInput={"w-full px-4 py-2 border bg-white border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2"} 
                />
                <button
                type="submit"
                className="w-full h-14 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors self-center">
                Enviar
                </button>
            </form>
      </div>
    </div>
  );
}
