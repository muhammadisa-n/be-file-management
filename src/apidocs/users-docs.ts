/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Mengambil daftar semua user
 *     tags: [Users]
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
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Mengambil detail user berdasarkan ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID user yang akan diambil
 *     responses:
 *       200:
 *         description: Berhasil Get Detail Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean }
 *                 status_code: { type: integer }
 *                 message: { type: string }
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: { type: string, format: uuid }
 *                     fullName: { type: string }
 *                     email: { type: string, format: email }
 *                     username: { type: string }
 *                     role_id: { type: string, format: uuid }
 */
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Menambahkan user baru
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ fullName, email, password ]
 *             properties:
 *               fullName: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       201:
 *         description: Data Berhasil Ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean }
 *                 status_code: { type: integer }
 *                 message: { type: string }
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: { type: string, format: uuid }
 *                     fullName: { type: string }
 *                     email: { type: string }
 */
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Memperbarui data user berdasarkan ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID user yang akan diupdate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName: { type: string }
 *               email: { type: string, format: email }
 *     responses:
 *       200:
 *         description: Data Berhasil Diupdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean }
 *                 status_code: { type: integer }
 *                 message: { type: string }
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: { type: string, format: uuid }
 *                     fullName: { type: string }
 *                     email: { type: string }
 */
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Menghapus user secara permanen
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID user yang akan dihapus permanen
 *     responses:
 *       200:
 *         description: Data Berhasil Dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean }
 *                 status_code: { type: integer }
 *                 message: { type: string }
 *                 data:
 *                   type: object
 *                   nullable: true
 */
