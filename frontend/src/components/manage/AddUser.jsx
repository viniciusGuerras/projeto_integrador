import { useEffect } from "react";
import { useState } from "react";

export default function AddUser({isOpen, onClose, onSubmit, onError}) {
    const [user, setUser] = useState({
        matricula: '',
        senha: '',
        cpf: '',
        nome: '',
        telefone: '',
        email: '',
        dataNascimento: '',
        tipo: '',
    });

    const [mensagem, setMensagem] = useState('');
    const [serverError, setServerError] = useState(''); 

    const tipo = [
        { label: 'Administrador', value: 'admin' },
        { label: 'Docente', value: 'docente' },
    ];

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
        setUser((prev) => ({ ...prev, [name]: value }));
        setMensagem('');
        setServerError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user.nome ) {
        setMensagem('Por favor, preencha os campos obrigatórios.');
        return;
        }

        const payload = {
            ...user,
            datanc: user.dataNascimento,
            };
        delete payload.dataNascimento;

        console.log('Tentando cadastramento de:', user);

        onSubmit(payload);
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
            {serverError && <p className="mb-4 text-red-700 font-semibold">{serverError}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="matricula"
                        placeholder="Matrícula: *"
                        value={user.matricula}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    />

                    <input
                        type="password"
                        name="senha"
                        placeholder="* * * * * * *"
                        value={user.senha}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    />


                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome: *"
                        value={user.nome}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    />

                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF: *"
                        value={user.cpf}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    />

                    <input
                        type="text"
                        name="email"
                        placeholder="Email: *"
                        value={user.email}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    />

                    <input
                        type="text"
                        name="telefone"
                        placeholder="Telefone: *"
                        value={user.telefone} 
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    />

                    <input type="date"
                        name="dataNascimento"
                        placeholder="Data de Nascimento (DD/MM/AAAA)"
                        value={user.dataNascimento}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    ></input>

                    <select
                        name="tipo"
                        value={user.tipo}
                        onChange={handleChange}
                        className="border p-2 rounded bg-white"
                    >
                        <option value="">Selecione o tipo de usuário *</option>
                        {tipo.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
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