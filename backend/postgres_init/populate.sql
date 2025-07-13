INSERT INTO users (
    matricula, senha, cpf, nome, telefone, email, datanc, tipo, ativo
) VALUES (
    '01',
    '$2b$10$2UgQ2hO/FUnlwOXrWX1aZeF3ltnQdlko1Ougtoe8LkriyN.eIp5Au',
    '118.201.409-70',
    'Admin',
    '49999037319',
    'admin@example.com',
    '2020-01-01',
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
(3, 103, 2, 'indisponível', 2, 'Projetor', 'Projetor Epson', 'quebrado', '2021-05-05', 'eletrônico', false),
(4, 104, 1, 'disponível', 1, 'Mesa', 'Mesa de reunião grande', 'bom', '2023-05-22', 'mobília', true),
(5, 105, 3, 'disponível', 3, 'TV 60"', 'TV para apresentações', 'bom', '2024-02-01', 'eletrônico', true);

INSERT INTO prg_aula (
    userm, hraula, nmrsala, dthoradevolus, turma, disciplina, qtdaula, ativo
) VALUES
('01', '2025-07-15', 101, '2025-07-15', '1A', 'Matemática', 2, true),
('01', '2025-07-16', 102, '2025-07-16', '2B', 'Física', 1, true),
('01', '2025-07-17', 103, '2025-07-17', '1A', 'Química', 2, true),
('01', '2025-07-18', 104, '2025-07-18', '3C', 'Biologia', 1, true),
('01', '2025-07-19', 105, '2025-07-19', '1A', 'Educação Física', 1, true);

INSERT INTO rsr_material (
    userm, hraula, nmrm, dtddevolum, ativo
) VALUES
('01', '2025-07-15', 1, '2025-07-15', true),
('01', '2025-07-16', 2, '2025-07-16', true),
('01', '2025-07-17', 3, '2025-07-17', true),
('01', '2025-07-18', 4, '2025-07-18', true),
('01', '2025-07-19', 5, '2025-07-19', true);
