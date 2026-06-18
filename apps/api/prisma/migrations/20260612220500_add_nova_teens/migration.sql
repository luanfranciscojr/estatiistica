CREATE TABLE `NovaTeens` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `dataReferencia` DATE NOT NULL,
  `ordem` INTEGER NOT NULL,
  `nome` VARCHAR(80) NOT NULL,
  `teens` INTEGER NOT NULL DEFAULT 0,
  `lideres` INTEGER NOT NULL DEFAULT 0,
  `total` INTEGER NOT NULL DEFAULT 0,
  `status` ENUM('ativa', 'encerrada') NOT NULL DEFAULT 'ativa',
  `createdByUserId` INTEGER NULL,
  `updatedByUserId` INTEGER NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  UNIQUE INDEX `NovaTeens_dataReferencia_ordem_key`(`dataReferencia`, `ordem`),
  INDEX `NovaTeens_dataReferencia_status_idx`(`dataReferencia`, `status`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `NovaTeens`
  ADD CONSTRAINT `NovaTeens_createdByUserId_fkey`
  FOREIGN KEY (`createdByUserId`) REFERENCES `User`(`id`)
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `NovaTeens`
  ADD CONSTRAINT `NovaTeens_updatedByUserId_fkey`
  FOREIGN KEY (`updatedByUserId`) REFERENCES `User`(`id`)
  ON DELETE SET NULL ON UPDATE CASCADE;
