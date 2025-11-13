const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

function makeApiDocs(name) {
  if (!name) {
    console.log(chalk.red("❌ Please provide a apidocs name."));
    return;
  }

  const fileName = `${name.toLowerCase()}-docs.ts`;
  const targetDir = path.resolve("src", "apidocs");

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, fileName);
  if (fs.existsSync(filePath)) {
    console.log(chalk.yellow("⚠️ Apidocs already exists."));
    return;
  }

  const content = `/**
 * @swagger
 * /api/${name}:
 *   get:
 *     summary: Mengambil daftar semua ${name}
 *     tags: [${name}s]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Nomor halaman
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         required: false
 *         description: Jumlah data per halaman
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter berdasarkan nama (fullName)
 *     responses:
 *       200:
 *         description: Berhasil Get All Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 status_code:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           fullName:
 *                             type: string
 *                           email:
 *                             type: string
 *                           username:
 *                             type: string
 *                           password:
 *                             type: string
 *                             description: (Hashed password)
 *                           image_id:
 *                             type: string
 *                           image_url:
 *                             type: string
 *                             format: uri
 *                           is_verify:
 *                             type: boolean
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                           deleted_at:
 *                             type: string
 *                             format: date-time
 *                             nullable: true
 *                           role_id:
 *                             type: string
 *                             format: uuid
 *                     total_data:
 *                       type: integer
 *                     paging:
 *                       type: object
 *                       properties:
 *                         current_page:
 *                           type: integer
 *                         total_page:
 *                           type: integer

 */
`;

  fs.writeFileSync(filePath, content);
  console.log(chalk.green(`✅ Controller created at ${filePath}`));
}
module.exports = makeApiDocs;
