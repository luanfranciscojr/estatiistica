ALTER TABLE `Role` MODIFY `code` ENUM('admin', 'estatistica', 'verdinho', 'pastor', 'estatistica_culto', 'nova_teens', 'um_com_deus', 'nova_baby', 'nova_infantil', 'nova_kids', 'nova_jovens') NOT NULL;
INSERT INTO `Role` (`code`, `nome`, `createdAt`, `updatedAt`) VALUES ('nova_jovens', 'Nova Jovens', NOW(3), NOW(3)) ON DUPLICATE KEY UPDATE `nome` = VALUES(`nome`);

CREATE TABLE `NovaJovens` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `dataReferencia` DATE NOT NULL,
  `domingoReferencia` DATE NOT NULL,
  `observacao` VARCHAR(240) NULL,
  `total` INTEGER NOT NULL DEFAULT 0,
  `createdByUserId` INTEGER NULL,
  `updatedByUserId` INTEGER NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  UNIQUE INDEX `NovaJovens_dataReferencia_key` (`dataReferencia`),
  UNIQUE INDEX `NovaJovens_domingoReferencia_key` (`domingoReferencia`),
  PRIMARY KEY (`id`),
  CONSTRAINT `NovaJovens_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `NovaJovens_updatedByUserId_fkey` FOREIGN KEY (`updatedByUserId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
