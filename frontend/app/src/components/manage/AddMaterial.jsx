import { useState, useEffect } from "react";

export default function AddMaterial({ isOpen, onClose, onSubmit, onError }) {
    const [material, setMaterial] = useState({
    numeracao: '',
    nome: '',
    descricao: '',
    tipo: '',
    qtdmaterial: '',
    quantidade: '',
    estado: '',
    dataCompra: '',
    disponibilidade: '',
    });


  const [mensagem, setMensagem] = useState('');
  const [serverError, setServerError] = useState('');

  const estado = ['Novo', 'Levemente danificado', 'Inutilizável'];
  const disponibilidade = ['Disponível', 'Indisponível', 'Reservado'];

  useEffect(() => {
    if (isOpen) {
      setMensagem('');
      setServerError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof onError === "string") {
      setServerError(onError);
    }
  }, [onError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prev) => ({ ...prev, [name]: value }));
    setMensagem('');
    setServerError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const required = ['nome', 'descricao', 'tipo', 'quantidade', 'estado', 'dataCompra', 'disponibilidade'];
    const hasEmpty = required.some((key) => !material[key]);

    if (hasEmpty) {
      setMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (parseInt(material.quantidade) <= 0) {
      setMensagem('A quantidade deve ser maior que zero.');
      return;
    }

    const payload = {
      ...material,
      disponibilidade: material.disponibilidade.toLowerCase(),
      estado: material.estado.toLowerCase(),
    };

    onSubmit(payload);

    setMaterial({
      numeracao: '',
      nome: '',
      descricao: '',
      tipo: '',
      quantidade: '',
      estado: '',
      dataCompra: '',
      disponibilidade: '',
    });

    setMensagem('Material cadastrado com sucesso!');
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
        <h2 className="text-xl font-bold mb-4">Cadastro de Material</h2>
        {mensagem && <p className="mb-4 text-green-600">{mensagem}</p>}
        {serverError && <p className="mb-4 text-red-700 font-semibold">{serverError}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="numeracao"
            placeholder="Numeração do material *"
            value={material.numeracao}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          />

          <input
            type="text"
            name="nome"
            placeholder="Nome do material *"
            value={material.nome}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          />

          <input
            type="text"
            name="descricao"
            placeholder="Descrição do material *"
            value={material.descricao}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          />

          <input
            type="text"
            name="tipo"
            placeholder="Tipo do material *"
            value={material.tipo}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          />

          <input
            type="number"
            name="quantidade"
            placeholder="Quantidade *"
            value={material.quantidade}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          />

          <select
            name="estado"
            value={material.estado}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          >
            <option value="">Selecione o estado *</option>
            {estado.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>

          <input
            type="date"
            name="dataCompra"
            placeholder="Data de compra"
            value={material.dataCompra}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          />

          <select
            name="disponibilidade"
            value={material.disponibilidade}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
          >
            <option value="">Selecione a disponibilidade *</option>
            {disponibilidade.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
