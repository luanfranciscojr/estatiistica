CREATE TABLE `NovaInfantil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataReferencia` DATE NOT NULL,
    `ordem` INTEGER NOT NULL,
    `nome` VARCHAR(80) NOT NULL,
    `participantes` INTEGER NOT NULL DEFAULT 0,
    `lideres` INTEGER NOT NULL DEFAULT 0,
    `total` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('ativa', 'encerrada') NOT NULL DEFAULT 'ativa',
    `createdByUserId` INTEGER NULL,
    `updatedByUserId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `NovaInfantil_dataReferencia_ordem_key`(`dataReferencia`, `ordem`),
    INDEX `NovaInfantil_dataReferencia_status_idx`(`dataReferencia`, `status`),
    CONSTRAINT `NovaInfantil_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `NovaInfantil_updatedByUserId_fkey` FOREIGN KEY (`updatedByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `NovaKids` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataReferencia` DATE NOT NULL,
    `ordem` INTEGER NOT NULL,
    `nome` VARCHAR(80) NOT NULL,
    `participantes` INTEGER NOT NULL DEFAULT 0,
    `lideres` INTEGER NOT NULL DEFAULT 0,
    `total` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('ativa', 'encerrada') NOT NULL DEFAULT 'ativa',
    `createdByUserId` INTEGER NULL,
    `updatedByUserId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `NovaKids_dataReferencia_ordem_key`(`dataReferencia`, `ordem`),
    INDEX `NovaKids_dataReferencia_status_idx`(`dataReferencia`, `status`),
    CONSTRAINT `NovaKids_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `NovaKids_updatedByUserId_fkey` FOREIGN KEY (`updatedByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
