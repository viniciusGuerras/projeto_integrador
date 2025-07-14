import { useState, useEffect } from "react";

export default function EditMaterial({ isOpen, onClose, initial, onSubmit, onError }) {
    const [material, setMaterial] = useState({
        numeracao: '',
        nmrsala: '',
        qtdmaterial: '',
        disponibilidade: '',
        quantidade: '',
        nome: '',
        dscr: '',
        estado: '',
        datacpra: '',
        tipo: ''
    })

    const [mensagem, setMensagem] = useState('');
    const [serverError, setServerError] = useState('');

    const disponibilidade = ['Disponível', 'Indisponível'];

    function formatDateToInput(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // "2025-07-07"
    }

    useEffect(() => {
        if (isOpen) {
            setMensagem('');
            setServerError('');
            if (initial) {
                setMaterial({
                    numeracao: initial.numeracao || '',
                    nmrsala: initial.nmrsala || '',
                    qtdmaterial: initial.qtdmaterial || '',
                    disponibilidade: initial.disponibilidade
                        ? capitalizeFirstLetter(initial.disponibilidade)
                        : '',
                    quantidade: initial.quantidade || '',
                    nome: initial.nome || '',
                    dscr: initial.dscr || '',
                    estado: initial.estado || '',
                    datacpra: formatDateToInput(initial.datacpra) || '',    
                    tipo: initial.tipo || ''
                });
            } else {
                setMaterial({
                    numeracao: '',
                    nmrsala: '',
                    qtdmaterial: '',
                    disponibilidade: '',
                    quantidade: '',
                    nome: '',
                    dscr: '',
                    estado: '',
                    datacpra: '',
                    tipo: ''
                });
            }
        }
    }, [isOpen, initial]);

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
        setMaterial((prev) => ({ ...prev, [name]: value }));
        setMensagem('');
        setServerError('');
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = [material.numeracao, material.disponibilidade, material.quantidade,
        material.nome, material.dscr, material.estado, material.datacpra, material.tipo];
        if (requiredFields.some(val => val === undefined || val === '')) {
            setMensagem('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const numeracao = material.numeracao;

        if (parseInt(material.quantidade) <= 0) {
            setMensagem('A quantidade de materiais precisa ser maior que zero.');
            return;
        }
        
        const payload = {
            ...material,
            disponibilidade: material.disponibilidade.toLowerCase(),
        };
        delete payload.numeracao;

        onSubmit(numeracao, payload);

    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Atualização de Material</h2>
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
                        name="dscr"
                        placeholder="Descrição do material *"
                        value={material.dscr}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    />

                    <input
                        type="text"
                        name="quantidade"
                        placeholder="Quantidade *"
                        value={material.quantidade}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    />

                    <input
                        type="text"
                        name="estado"
                        placeholder="Estado do material *"
                        value={material.estado}
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
                        {disponibilidade.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="tipo"
                        placeholder="Tipo do material *"
                        value={material.tipo}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    />

                    <input type="date"
                        name="datacpra"
                        placeholder="Data de Compra (DD/MM/AAAA)"
                        value={material.datacpra}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    ></input>

                    <input
                        type="text"
                        name="nmrsala"
                        placeholder="Sala associada ao material"
                        value={material.nmrsala}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    />

                    <input
                        type="number"
                        name="qtdmaterial"
                        placeholder="Quantidade de materiais na sala "
                        value={material.qtdmaterial}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    />

                    <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
                        Salvar
                    </button>
                </form>
            </div>
        </div>
    );
}
