export default function Profile() {
  return (
    <div className="sm:h-full lg:min-h-screen flex flex-col items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-xl p-6 w-full md:max-w-xl lg:max-w-3xl grid grid-cols-1 gap-4 mx-auto">
        <div className="font-semibold text-2xl border-b pb-2">
          <span className="text-gray-600">Nome</span>
          <span className="text-gray-300 text-md">Matrícula</span>
        </div>
        <div className="space-y-2">
            <p>cpf</p>
            <p>numero</p>
            <p>endereço</p>
        </div>
      </div>
    </div>
  );
}
