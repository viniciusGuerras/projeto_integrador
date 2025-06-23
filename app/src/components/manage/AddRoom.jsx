import { useState } from "react";

export default function AddRoom({isOpen, onClose, onSubmit}) {
  const [room, setroom] = useState({
    numeracao: '',
    especializacao: '',
    disponibilidade: '',
    qtdCadeiras: '',
  });

  const [mensagem, setMensagem] = useState('');

  const disponibilidade = ['Disponível', 'Indisponível', 'Reservado'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setroom((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples
    if (!room.numeracao || !room.especializacao || !room.disponibilidade || !room.qtdCadeiras) {
      setMensagem('Por favor, preencha os campos obrigatórios.');
      return;
    }

    // Aqui você pode salvar no backend, por exemplo
    console.log('Sala cadastrada:', room);

    onSubmit(room);

    setMensagem('Sala cadastrado com sucesso!');
    setroom({
    numeracao: '',
    especializacao: '',
    disponibilidade: '',
    qtdCadeiras: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    onClick={onClose}
    >
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Cadastro de Sala</h2>
        {mensagem && <p className="mb-4 text-green-600">{mensagem}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="numeracao"
            placeholder="Numeração do sala *"
            value={room.numeracao}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="especializacao"
            placeholder="Expecialização da Sala: *"
            value={room.especializacao}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="disponibilidade"
            value={room.disponibilidade}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Selecione a disponibilidade</option>
            {disponibilidade.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="number"
            name="qtdCadeiras"
            placeholder="Quantidade de cadeiras na sala*"
            value={room.qtdCadeiras} 
            onChange={handleChange}
            className="border p-2 rounded"
          />
      
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};