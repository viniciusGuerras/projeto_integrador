INSERT INTO users (
    matricula, senha, cpf, nome, telefone, email, datanc, tipo, ativo
) VALUES (
    '01',
    '$2b$10$2UgQ2hO/FUnlwOXrWX1aZeF3ltnQdlko1Ougtoe8LkriyN.eIp5Au', 
    '118.201.409-70',
    'Admin',
    '49999037319',
    'admin@example.com',
    '1980-01-01',
    'admin',
    true
);

INSERT INTO sala (numeracao, especializacao, disponibilidade, qtdcadeira, ativo) VALUES
(101, 'Laboratório de Informática', 'disponível', 30, true),
(102, 'Sala de Aula 1', 'disponível', 25, true),
(103, 'Sala de Aula 2', 'indisponível', 20, true),
(104, 'Auditório Principal', 'disponível', 100, true),
(105, 'Sala de Reunião', 'indisponível', 15, true);

INSERT INTO material (
    numeracao, nmrsala, qtdmaterial, disponibilidade, quantidade, nome, dscr, estado, datacpra, tipo, ativo
) VALUES
(1, 101, 5, 'disponível', 5, 'Notebook', 'Notebook Dell para aulas', 'bom', '2023-01-10', 'eletrônico', true),
(2, 102, 3, 'disponível', 3, 'Quadro Branco', 'Quadro branco para anotações', 'novo', '2023-03-15', 'mobília', true),
(3, 103, 2, 'indisponível', 2, 'Projetor', 'Projetor Epson com defeito', 'quebrado', '2021-05-05', 'eletrônico', false),
(4, 104, 1, 'disponível', 1, 'Mesa', 'Mesa de reunião grande', 'bom', '2023-05-22', 'mobília', true),
(5, 105, 3, 'disponível', 3, 'TV 60"', 'TV para apresentações', 'bom', '2024-02-01', 'eletrônico', true);

INSERT INTO prg_aula (
    userm, hraula, nmrsala, dthoradevolus, turma, disciplina, qtdaula, ativo
) VALUES
('01', '2025-07-15 08:00:00', 101, '2025-07-15 10:00:00', '1A', 'Matemática', 2, true),
('01', '2025-07-16 09:00:00', 102, '2025-07-16 10:00:00', '2B', 'Física', 1, true),
('01', '2025-07-17 10:00:00', 103, '2025-07-17 12:00:00', '1A', 'Química', 2, true),
('01', '2025-07-18 14:00:00', 104, '2025-07-18 15:00:00', '3C', 'Biologia', 1, true),
('01', '2025-07-19 07:00:00', 105, '2025-07-19 08:00:00', '1A', 'Educação Física', 1, true);

INSERT INTO rsr_material (
    userm, hraula, nmrm, dtdevolum, ativo
) VALUES
('01', '2025-07-15 08:00:00', 1, '2025-07-15 10:00:00', true),
('01', '2025-07-16 09:00:00', 2, '2025-07-16 10:00:00', true),
('01', '2025-07-17 10:00:00', 3, '2025-07-17 12:00:00', true),
('01', '2025-07-18 14:00:00', 4, '2025-07-18 15:00:00', true),
('01', '2025-07-19 07:00:00', 5, '2025-07-19 08:00:00', true);
