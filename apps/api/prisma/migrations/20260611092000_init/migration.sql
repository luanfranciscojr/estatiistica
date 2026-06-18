-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(120) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `nome` VARCHAR(160) NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` ENUM('admin', 'estatistica', 'verdinho', 'pastor') NOT NULL,
    `nome` VARCHAR(120) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Role_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRole` (
    `userId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserSession_token_key`(`token`),
    INDEX `UserSession_userId_expiresAt_idx`(`userId`, `expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rodada` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalId` VARCHAR(191) NULL,
    `referencia` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NULL,
    `turno` VARCHAR(80) NOT NULL,
    `origem` ENUM('api_nib', 'manual') NOT NULL,
    `status` ENUM('rascunho', 'ativa', 'encerrada', 'bloqueada') NOT NULL DEFAULT 'rascunho',
    `ativa` BOOLEAN NOT NULL DEFAULT false,
    `dataInicio` DATETIME(3) NULL,
    `dataFim` DATETIME(3) NULL,
    `importedAt` DATETIME(3) NULL,
    `createdByUserId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Rodada_externalId_key`(`externalId`),
    INDEX `Rodada_ativa_status_idx`(`ativa`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RodadaMateria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rodadaId` INTEGER NOT NULL,
    `externalId` VARCHAR(191) NULL,
    `externalRodadaId` VARCHAR(191) NULL,
    `materia` VARCHAR(191) NOT NULL,
    `sala` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NULL,
    `sessao` VARCHAR(120) NULL,
    `turno` VARCHAR(80) NULL,
    `professoresJson` JSON NOT NULL,
    `status` VARCHAR(80) NOT NULL,
    `origem` ENUM('api_nib', 'manual') NOT NULL,
    `datasAulasJson` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RodadaMateria_externalId_key`(`externalId`),
    INDEX `RodadaMateria_rodadaId_sala_idx`(`rodadaId`, `sala`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sala` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rodadaId` INTEGER NOT NULL,
    `codigo` VARCHAR(120) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NULL,
    `turno` VARCHAR(80) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Sala_rodadaId_codigo_key`(`rodadaId`, `codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rodadaId` INTEGER NOT NULL,
    `salaId` INTEGER NOT NULL,
    `alunos` INTEGER NOT NULL DEFAULT 0,
    `verdinhos` INTEGER NOT NULL DEFAULT 0,
    `amarelinhos` INTEGER NOT NULL DEFAULT 0,
    `professor` INTEGER NOT NULL DEFAULT 0,
    `total` INTEGER NOT NULL DEFAULT 0,
    `updatedByUserId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Contagem_rodadaId_salaId_key`(`rodadaId`, `salaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContagemEvento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contagemId` INTEGER NOT NULL,
    `categoria` ENUM('alunos', 'verdinhos', 'amarelinhos', 'professor') NOT NULL,
    `operacao` ENUM('incremento', 'decremento', 'ajuste') NOT NULL,
    `valorAnterior` INTEGER NOT NULL,
    `valorAtual` INTEGER NOT NULL,
    `userId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Importacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fonte` ENUM('api_nib', 'manual', 'texto') NOT NULL,
    `externalReference` VARCHAR(191) NULL,
    `status` ENUM('sucesso', 'erro', 'cancelada', 'pendente_confirmacao') NOT NULL,
    `payloadResumoJson` JSON NULL,
    `erro` TEXT NULL,
    `executedByUserId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auditoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `actorUserId` INTEGER NULL,
    `acao` VARCHAR(160) NOT NULL,
    `entidade` VARCHAR(160) NOT NULL,
    `entidadeId` VARCHAR(191) NULL,
    `payloadJson` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Auditoria_entidade_entidadeId_createdAt_idx`(`entidade`, `entidadeId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSession` ADD CONSTRAINT `UserSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rodada` ADD CONSTRAINT `Rodada_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RodadaMateria` ADD CONSTRAINT `RodadaMateria_rodadaId_fkey` FOREIGN KEY (`rodadaId`) REFERENCES `Rodada`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sala` ADD CONSTRAINT `Sala_rodadaId_fkey` FOREIGN KEY (`rodadaId`) REFERENCES `Rodada`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contagem` ADD CONSTRAINT `Contagem_rodadaId_fkey` FOREIGN KEY (`rodadaId`) REFERENCES `Rodada`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contagem` ADD CONSTRAINT `Contagem_salaId_fkey` FOREIGN KEY (`salaId`) REFERENCES `Sala`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contagem` ADD CONSTRAINT `Contagem_updatedByUserId_fkey` FOREIGN KEY (`updatedByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContagemEvento` ADD CONSTRAINT `ContagemEvento_contagemId_fkey` FOREIGN KEY (`contagemId`) REFERENCES `Contagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContagemEvento` ADD CONSTRAINT `ContagemEvento_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Importacao` ADD CONSTRAINT `Importacao_executedByUserId_fkey` FOREIGN KEY (`executedByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Auditoria` ADD CONSTRAINT `Auditoria_actorUserId_fkey` FOREIGN KEY (`actorUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

