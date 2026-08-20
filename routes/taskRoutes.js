import express from "express";
import {
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask
} from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateTask } from "../middleware/taskValidation.js";

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - priority
 *               - dueDate
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete backend project
 *               description:
 *                 type: string
 *                 example: Finish API documentation
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: high
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-25
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *                 example: pending
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid task data
 *       401:
 *         description: Missing or invalid JWT token
 *       500:
 *         description: Server error
 */
router.post("/", authMiddleware, validateTask, createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get user's tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of tasks per page
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filter tasks by priority
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed]
 *         description: Filter tasks by status
 *       - in: query
 *         name: dueDateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Get tasks from this date
 *       - in: query
 *         name: dueDateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Get tasks until this date
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [dueDate, priority]
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sorting direction
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       401:
 *         description: Missing or invalid JWT token
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleware, getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a single task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the task
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 priority:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: string
 *                 userId:
 *                   type: string
 *                   format: uuid
 *       401:
 *         description: Missing or invalid JWT token
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleware, getTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - priority
 *               - dueDate
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete Swagger documentation
 *               description:
 *                 type: string
 *                 example: Document all remaining APIs
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: medium
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-30
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *                 example: completed
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid task data
 *       401:
 *         description: Missing or invalid JWT token
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, validateTask, updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the task
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Missing or invalid JWT token
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", authMiddleware, deleteTask);

export default router;