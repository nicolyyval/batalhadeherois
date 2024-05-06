CREATE DATABASE batalha_herois;

\c batalha_herois;

CREATE TABLE IF NOT EXISTS heroi (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    poder VARCHAR(255) NOT NULL,
    level INTEGER NOT NULL,
    hp INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS batalha (
    id SERIAL PRIMARY KEY,
    id_heroi_1 INTEGER NOT NULL,
    id_heroi_2 INTEGER NOT NULL,
    vencedor INTEGER NOT NULL,
    FOREIGN KEY (id_heroi_1) REFERENCES heroi(id),
    FOREIGN KEY (id_heroi_2) REFERENCES heroi(id),
    FOREIGN KEY (vencedor) REFERENCES heroi(id)
);

-- inserir herois da monster high

INSERT INTO heroi (nome, poder, level, hp) VALUES ('Draculaura', 'Vampira', 5, 600);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Frankie Stein', 'Eletricidade', 6, 210);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Clawdeen Wolf', 'Lobisomem', 4, 109);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Cleo de Nile', 'Múmia', 9, 900);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Lagoona Blue', 'Sereia', 1, 160);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Ghoulia Yelps', 'Zumbi', 1, 100);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Deuce Gorgon', 'Medusa', 4, 400);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Toralei Stripe', 'Gata', 2, 250);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Abbey Bominable', 'Abominável', 4, 100);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Spectra Vondergeist', 'Fantasma', 4, 150);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Operetta', 'Fantasma', 2, 100);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Nefera de Nile', 'Múmia', 5, 200);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Holt Hyde', 'Monstro', 3, 300);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Jackson Jekyll', 'Monstro', 1, 110);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Rochelle Goyle', 'Gárgula', 1, 260);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Robecca Steam', 'Robô', 1, 120);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Venus McFlytrap', 'Planta', 3, 150);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Catty Noir', 'Gata', 1, 140);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Twyla', 'Monstro', 1, 140);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Skelita Calaveras', 'Esqueleto', 1, 100);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Jinafire Long', 'Dragão', 1, 340);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Catrine DeMew', 'Gata', 1, 210);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Gigi Grant', 'Gênio', 4, 107);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Amanita Nightshade', 'Planta', 6, 100);
INSERT INTO heroi (nome, poder, level, hp) VALUES ('Elissabat', 'Vampira', 2, 180);