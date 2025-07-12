import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("identifier");

    console.log(userId);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuário não autenticado");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
  <div className="sm:h-full text-black lg:min-h-screen flex flex-col items-center justify-center w-full">
    <div className="bg-white shadow-md rounded-xl p-6 w-full md:max-w-xl lg:max-w-3xl grid grid-cols-1 gap-4 mx-auto">
      <div className="font-semibold text-2xl border-b pb-2 flex gap-3">
        <span className="text-gray-600">{user.nome}</span>
        <span className="text-gray-300 text-md">{user.matricula}</span>
      </div>
      <div className="space-y-2">
        <p>CPF: {user.cpf}</p>
        <p>Email: {user.email}</p>
        <p>Telefone: {user.telefone}</p>
        <p>Tipo: {user.tipo}</p>
        <p>Data de Nascimento: {user.datanc}</p>
      </div>
    </div>
  </div>
);
}
