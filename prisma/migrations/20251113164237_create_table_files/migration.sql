-- CreateTable
CREATE TABLE `files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `public_id` VARCHAR(100) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `size` BIGINT NOT NULL,
    `is_public` BOOLEAN NOT NULL DEFAULT false,
    `folder_id` INTEGER NULL,
    `owner_id` INTEGER NOT NULL,
    `url_download` VARCHAR(500) NOT NULL,
    `url_preview` VARCHAR(500) NOT NULL,
    `url_cloudinary` VARCHAR(500) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `files_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `files_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
