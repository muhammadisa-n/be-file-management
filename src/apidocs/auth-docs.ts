/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Register berhasil
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
 *                   example: Register Berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     fullName:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *          $ref: '#/components/responses/ValidationError'
 *       409:
 *         description: Konflik - akun sudah terdaftar
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
 *                   example: Akun Sudah Terdaftar!
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: tes@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 status_code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Login Berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         fullName:
 *                           type: string
 *                         email:
 *                           type: string
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       400:
 *          $ref: '#/components/responses/ValidationError'
 *       401:
 *         description: Login gagal - username,email atau password salah
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               status_code: 401
 *               message: Gagal Login! Detail login salah
 */

// me
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get informasi detail user yang sedang login
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get Detail User Berhasil
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
 *                     id:
 *                       type: string
 *                     fullName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                     deleted_at:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *       401:
 *         $ref: '#/components/responses/UnauthorizedATError'
 */

// Logout
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout User
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout berhasil
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
 *             example:
 *               status: true
 *               status_code: 200
 *               message: Logout Berhasil
 *       401:
 *         $ref: '#/components/responses/UnauthorizedNotLoginError'
 */

// refresh token
/**
 * @swagger
 * /api/auth/refresh-token:
 *   get:
 *     summary: Mendapatkan access token baru dari refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Access token berhasil diperbarui
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
 *                   example: Get Access Token Berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         fullName:
 *                           type: string
 *                         email:
 *                           type: string
 *                         password:
 *                           type: string
 *                         created_at:
 *                           type: string
 *                         updated_at:
 *                           type: string
 *                         deleted_at:
 *                           type: string
 *                           nullable: true
 *                     accessToken:
 *                       type: string
 *       401:
 *         $ref: '#/components/responses/UnauthorizedNotLoginError'
 */
// Update profile
/**
 * @swagger
 * /api/auth/update-profile:
 *   put:
 *     summary: Memperbarui profil pengguna yang sedang login
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: tes
 *               email:
 *                 type: string
 *                 example: tes@gmail.com
 *     responses:
 *       200:
 *         description: Data Berhasil Diupdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 status_code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Data Berhasil Diupdate
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: c1fa015f-48b0-456f-8c41-baf54ce092f5
 *                     fullName:
 *                       type: string
 *                       example: tes update
 *                     email:
 *                       type: string
 *                       example: tes@gmail.com
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedATError'
 */
