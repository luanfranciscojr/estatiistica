ALTER TABLE `Role` MODIFY `code` ENUM('admin', 'estatistica', 'verdinho', 'pastor', 'estatistica_culto', 'nova_teens', 'um_com_deus', 'nova_baby', 'nova_infantil', 'nova_kids') NOT NULL;
INSERT INTO `Role` (`code`, `nome`, `createdAt`, `updatedAt`) VALUES
('estatistica_culto', 'Culto de domingo', NOW(3), NOW(3)),
('nova_teens', 'Nova Teens', NOW(3), NOW(3)),
('um_com_deus', 'Um com Deus', NOW(3), NOW(3)),
('nova_baby', 'Nova Baby', NOW(3), NOW(3)),
('nova_infantil', 'Nova Infantil', NOW(3), NOW(3)),
('nova_kids', 'Nova Kids', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `nome` = VALUES(`nome`);
