import { useState } from "react";

export default function AddMaterial({isOpen, onClose, onSubmit}) {
  const [material, setMaterial] = useState({
    numeracao: '',
    nome: '',
    descricao: '',
    tipo: '',
    quantidade: '',
    estado: '',
    dataCompra: '',
    disponibilidade: '',
  });

  const [mensagem, setMensagem] = useState('');

  const estado = ['Novo', 'Levemente danificado', 'Inutilizável', ];
  const disponibilidade = ['Disponível', 'Indisponível', 'Reservado'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples
    if (!material.numeracao || !material.descricao || !material.tipo || !material.quantidade ||
      !material.estado || !material.dataCompra || !material.disponibilidade) {
      setMensagem('Por favor, preencha os campos obrigatórios.');
      return;
    }

    // Aqui você pode salvar no backend, por exemplo
    console.log('Material cadastrado:', material);

    onSubmit(material);

    setMensagem('Material cadastrado com sucesso!');
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
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} 
    >
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow  bg-white" onClick={(e) => e.stopPropagation()}>
      <h2 className="text-xl font-bold mb-4">Cadastro de Material</h2>
        {mensagem && <p className="mb-4 text-green-600">{mensagem}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="numeracao"
            placeholder="Numeração do material *"
            value={material.numeracao}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="nome"
            placeholder="Nome do material *"
            value={material.nome}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="descricao"
            placeholder="Descrição do Material: *"
            value={material.descricao}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="tipo"
            placeholder="Tipo *"
            value={material.tipo}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="quantidade"
            placeholder="Quantidade *"
            value={material.quantidade} 
            onChange={handleChange}
            className="border p-2 rounded"
            min={1}
          />

          <select
            name="estado"
            value={material.estado}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Selecione o estado *</option>
            {estado.map((un) => (
              <option key={un} value={un}>{un}</option>
            ))}
          </select>

          <input 
            type="date" 
            name="dataCompra"
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            value={material.dataCompra}
            onChange={handleChange}
            className="border p-2 rounded"
          ></input>

          <select
            name="disponibilidade"
            value={material.disponibilidade}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Selecione a disponibilidade</option>
            {disponibilidade.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
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