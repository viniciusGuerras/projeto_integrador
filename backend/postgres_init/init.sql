CREATE TABLE "user" (
    matricula VARCHAR NOT NULL,
    senha VARCHAR NOT NULL, 
    cpf VARCHAR NOT NULL,
    nome VARCHAR NOT NULL,
    telefone VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    datanc DATE NOT NULL,
    tipo VARCHAR NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT pk_user PRIMARY KEY (matricula)
);

CREATE TABLE sala (
    numeracao INT NOT NULL,
    especificacao VARCHAR NOT NULL,
    disponibilidade VARCHAR NOT NULL,
    qtdcadeira INT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT pk_sala PRIMARY KEY (numeracao)
);

CREATE TABLE material (
    numeracao INT NOT NULL,
    nmrsala INT NULL,
    qtdmaterial INT NULL,
    disponibilidade VARCHAR NOT NULL,
    quantidade INT NOT NULL,
    nome VARCHAR NOT NULL,
    dscr VARCHAR NOT NULL,
    estado VARCHAR NOT NULL,
    datacpra DATE NOT NULL,
    tipo VARCHAR NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT pk_material PRIMARY KEY (numeracao)
);

CREATE TABLE prg_aula (
    userm VARCHAR NOT NULL,
    hraula TIME NOT NULL,
    nmrsala INT NULL,
    dthoradevolus DATE NULL,
    turma VARCHAR NOT NULL,
    disciplina VARCHAR NOT NULL,
    qtdaula INT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT pk_prg_aula PRIMARY KEY (userm, hraula)
);

CREATE TABLE rsr_material (
    userm VARCHAR NOT NULL,
    hraula TIME NOT NULL,         
    nmrm INT NOT NULL,
    dtddevolum DATE NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT pk_rsr_material PRIMARY KEY (userm, hraula, nmrm)
);

ALTER TABLE material 
    ADD CONSTRAINT fk_material_nmrsala 
    FOREIGN KEY (nmrsala) REFERENCES sala (numeracao);

ALTER TABLE prg_aula 
    ADD CONSTRAINT fk_prg_aula_userm 
    FOREIGN KEY (userm) REFERENCES "user" (matricula);

ALTER TABLE prg_aula 
    ADD CONSTRAINT fk_prg_aula_nmrsala 
    FOREIGN KEY (nmrsala) REFERENCES sala (numeracao);

ALTER TABLE rsr_material 
    ADD CONSTRAINT fk_rsr_material_prg_aula 
    FOREIGN KEY (userm, hraula) REFERENCES prg_aula (userm, hraula);

ALTER TABLE rsr_material 
    ADD CONSTRAINT fk_rsr_material_nmrm 
    FOREIGN KEY (nmrm) REFERENCES material (numeracao);
