import { useState, useEffect } from "react";

export default function AddRoom({ isOpen, onClose, initialClassroom, onSubmit, onError }) {
  const [room, setRoom] = useState({
    numeracao: '',
    especificacao: '',
    disponibilidade: '',
    qtdcadeira: '',
  });

  const [mensagem, setMensagem] = useState('');
  const [serverError, setServerError] = useState('');

  const disponibilidade = ['Disponível', 'Indisponível'];

  useEffect(() => {
    if (isOpen) {
      setMensagem('');
      setServerError('');
      if (initialClassroom) {
        setRoom({
          numeracao: initialClassroom.numeracao || '',
          especificacao: initialClassroom.especificacao || '',
          disponibilidade: initialClassroom.disponibilidade
            ? capitalizeFirstLetter(initialClassroom.disponibilidade)
            : '',
          qtdcadeira: initialClassroom.qtdcadeira || '',
        });
      } else {
        setRoom({
          numeracao: '',
          especificacao: '',
          disponibilidade: '',
          qtdcadeira: '',
        });
      }
    }
  }, [isOpen, initialClassroom]);

  function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    if (typeof onError === "string") {
      setServerError(onError);
    }
  }, [onError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
    setMensagem('');
    setServerError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [room.numeracao, room.disponibilidade, room.qtdcadeira, room.especificacao];
    if (requiredFields.some(val => val === undefined || val === '')) {
      setMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const numeracao = room.numeracao;

    if (parseInt(room.qtdcadeira) <= 0) {
      setMensagem('A quantidade de cadeiras precisa ser maior que zero.');
      return;
    }

    const payload = {
      ...room,
      disponibilidade: room.disponibilidade.toLowerCase(),
    };
    delete payload.numeracao;  

    onSubmit(numeracao, payload);

  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Atualização de Sala</h2>
        {mensagem && <p className="mb-4 text-green-600">{mensagem}</p>}
        {serverError && <p className="mb-4 text-red-700 font-semibold">{serverError}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="numeracao"
            placeholder="Numeração da sala *"
            value={room.numeracao}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          />

          <input
            type="text"
            name="especificacao"
            placeholder="Especificação da sala *"
            value={room.especificacao}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          />

          <select
            name="disponibilidade"
            value={room.disponibilidade}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          >
            <option value="">Selecione a disponibilidade *</option>
            {disponibilidade.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="qtdcadeira"
            placeholder="Quantidade de cadeiras *"
            value={room.qtdcadeira}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          />

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
