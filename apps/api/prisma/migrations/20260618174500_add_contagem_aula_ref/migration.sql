ALTER TABLE `Contagem`
  ADD COLUMN IF NOT EXISTS `aulaRef` VARCHAR(40) NOT NULL DEFAULT 'consolidado' AFTER `salaId`;

SET @has_sala_idx := (
  SELECT COUNT(*)
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'Contagem'
    AND index_name = 'Contagem_salaId_idx'
);
SET @sql := IF(
  @has_sala_idx = 0,
  'CREATE INDEX `Contagem_salaId_idx` ON `Contagem`(`salaId`)',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @has_new_unique := (
  SELECT COUNT(*)
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'Contagem'
    AND index_name = 'Contagem_rodadaId_salaId_aulaRef_key'
);
SET @sql := IF(
  @has_new_unique = 0,
  'CREATE UNIQUE INDEX `Contagem_rodadaId_salaId_aulaRef_key` ON `Contagem`(`rodadaId`, `salaId`, `aulaRef`)',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @has_rodada_aula_idx := (
  SELECT COUNT(*)
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'Contagem'
    AND index_name = 'Contagem_rodadaId_aulaRef_idx'
);
SET @sql := IF(
  @has_rodada_aula_idx = 0,
  'CREATE INDEX `Contagem_rodadaId_aulaRef_idx` ON `Contagem`(`rodadaId`, `aulaRef`)',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @has_old_unique := (
  SELECT COUNT(*)
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'Contagem'
    AND index_name = 'Contagem_rodadaId_salaId_key'
);
SET @sql := IF(
  @has_old_unique > 0,
  'DROP INDEX `Contagem_rodadaId_salaId_key` ON `Contagem`',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
