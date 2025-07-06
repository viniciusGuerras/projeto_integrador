-- Create the user table to store user information.
CREATE TABLE "user" (
    matricula VARCHAR NOT NULL,
    senha VARCHAR NOT NULL, 
    cpf VARCHAR NOT NULL,
    nome VARCHAR NOT NULL,
    telefone VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    datanc DATE NOT NULL,
    tipo VARCHAR NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (matricula)
);

-- Create the sala table to store room information.
CREATE TABLE sala (
    numeracao INT NOT NULL,
    especificacao VARCHAR NOT NULL,
    disponibilidade VARCHAR NOT NULL,
    qtdcadeira INT NOT NULL,
    CONSTRAINT pk_sala PRIMARY KEY (numeracao)
);

-- Create the material table to store information about equipment.
CREATE TABLE material (
    numeracao INT NOT NULL,
    nmr_sala INT NULL,
    qtd_material INT NULL,
    disponibilidade VARCHAR NOT NULL,
    quantidade INT NOT NULL,
    nome VARCHAR NOT NULL,
    dscr VARCHAR NOT NULL,
    estado VARCHAR NOT NULL,
    datacpra DATE NOT NULL,
    tipo VARCHAR NOT NULL,
    CONSTRAINT pk_material PRIMARY KEY (numeracao)
);

-- Create the prg_aula table for class schedules.
-- This table links a user (teacher) to a class time.
CREATE TABLE prg_aula (
    userm VARCHAR NOT NULL,
    hr_aula INT NOT NULL,
    nmr_sala INT NULL,
    dt_hora_devolus DATE NULL,
    turma VARCHAR NOT NULL,
    disciplina VARCHAR NOT NULL,
    qtd_aula INT NOT NULL,
    CONSTRAINT pk_prg_aula PRIMARY KEY (userm, hr_aula)
);

-- This table now correctly references the composite primary key of prg_aula.
CREATE TABLE rsr_material (
    userm VARCHAR NOT NULL, -- Added to correctly reference prg_aula
    hr_aula INT NOT NULL,
    nmr_m INT NOT NULL,
    dt_devolum DATE NOT NULL,
    CONSTRAINT pk_rsr_material PRIMARY KEY (userm, hr_aula, nmr_m)
);


-- Link material to a specific room.
ALTER TABLE material ADD CONSTRAINT fk_material_nmr_sala FOREIGN KEY (nmr_sala) REFERENCES sala (numeracao);

-- Link class schedule to a user.
ALTER TABLE prg_aula ADD CONSTRAINT fk_prg_aula_userm FOREIGN KEY (userm) REFERENCES "user" (matricula);

-- Link class schedule to a room.
ALTER TABLE prg_aula ADD CONSTRAINT fk_prg_aula_nmr_sala FOREIGN KEY (nmr_sala) REFERENCES sala (numeracao);

-- Link material reservation to a specific class schedule using the composite key.
ALTER TABLE rsr_material ADD CONSTRAINT fk_rsr_material_prg_aula FOREIGN KEY (userm, hr_aula) REFERENCES prg_aula (userm, hr_aula);

-- Link material reservation to a specific material.
ALTER TABLE rsr_material ADD CONSTRAINT fk_rsr_material_nmr_m FOREIGN KEY (nmr_m) REFERENCES material (numeracao);
