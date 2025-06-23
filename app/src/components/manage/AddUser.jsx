import { useState } from "react";

export default function AddUser({isOpen, onClose, onSubmit}) {
  const [user, setUser] = useState({
    matricula: '',
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    tipo: '',
  });

  const [mensagem, setMensagem] = useState('');

  const tipo = ['Administrador', 'Docente', ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples
    if (!user.nome ) {
      setMensagem('Por favor, preencha os campos obrigatórios.');
      return;
    }

    // Aqui você pode salvar no backend, por exemplo
    console.log('Usuário cadastrado:', user);

    onSubmit(user);

    setMensagem('Usuário cadastrado com sucesso!');
    setUser({
    matricula: '',
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    tipo: '',
    });
  };

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Cadastro de Usuário</h2>
        {mensagem && <p className="mb-4 text-green-600">{mensagem}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula: *"
            value={user.matricula}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="nome"
            placeholder="Nome: *"
            value={user.nome}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="cpf"
            placeholder="CPF: *"
            value={user.cpf}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="email"
            placeholder="Email: *"
            value={user.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="telefone"
            placeholder="Telefone: *"
            value={user.telefone} 
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input type="date"
            name="dataNascimento"
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            value={user.dataNascimento}
            onChange={handleChange}
            className="border p-2 rounded"
          ></input>

          <select
            name="tipo"
            value={user.tipo}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Selecione o tipo de usuário *</option>
            {tipo.map((un) => (
              <option key={un} value={un}>{un}</option>
            ))}
          </select>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};