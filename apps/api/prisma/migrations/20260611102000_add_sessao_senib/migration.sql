ALTER TABLE `RodadaMateria`
    ADD COLUMN `sessaoSenib` INTEGER NOT NULL DEFAULT 1;

ALTER TABLE `Sala`
    ADD COLUMN `sessaoSenib` INTEGER NOT NULL DEFAULT 1;

CREATE UNIQUE INDEX `Sala_rodadaId_codigo_sessaoSenib_key`
    ON `Sala`(`rodadaId`, `codigo`, `sessaoSenib`);
DROP INDEX `Sala_rodadaId_codigo_key` ON `Sala`;

CREATE INDEX `RodadaMateria_rodadaId_sala_sessaoSenib_idx`
    ON `RodadaMateria`(`rodadaId`, `sala`, `sessaoSenib`);
DROP INDEX `RodadaMateria_rodadaId_sala_idx` ON `RodadaMateria`;
