-- CreateTable
CREATE TABLE `users_storage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `quota` BIGINT NOT NULL DEFAULT 1073741824,
    `used` BIGINT NOT NULL DEFAULT 0,
    `plan` VARCHAR(100) NOT NULL DEFAULT 'free',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `users_storage_uuid_key`(`uuid`),
    UNIQUE INDEX `users_storage_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users_storage` ADD CONSTRAINT `users_storage_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
