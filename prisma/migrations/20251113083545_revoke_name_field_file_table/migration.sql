/*
  Warnings:

  - You are about to drop the column `cloudinary_url` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `files` table. All the data in the column will be lost.
  - Added the required column `url_cloudinary` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_download` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_preview` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `files` DROP COLUMN `cloudinary_url`,
    DROP COLUMN `url`,
    ADD COLUMN `url_cloudinary` VARCHAR(191) NOT NULL,
    ADD COLUMN `url_download` VARCHAR(191) NOT NULL,
    ADD COLUMN `url_preview` VARCHAR(191) NOT NULL;
