"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const router = (0, express_1.Router)();
// Cadastrar um palestrante novo
router.post("/", async (req, res) => {
    try {
        const { nome, email } = req.body;
        if (!nome || !email) {
            return res.status(400).json({
                error: "Todos os campos são obrigatórios."
            });
        }
        const palestranteSalvo = await prismaClient_1.default.palestrante.create({
            data: {
                nome,
                email
            }
        });
        res.status(201).json(palestranteSalvo);
    }
    catch (error) {
        console.error("erro ao cadastrar palestrante:", error);
        res.status(500).json("Erro interno do servidor");
    }
});
// Listar todos os palestrantes
router.get("/", async (req, res) => {
    try {
        const palestrantes = await prismaClient_1.default.palestrante.findMany();
        res.status(200).json(palestrantes);
    }
    catch (error) {
        console.error("Erro ao listar palestrantes:", error);
        res.status(500).json("Erro interno do servidor");
    }
});
// Buscar um palestrante pelo ID
router.get("/:id", async (req, res) => {
    try {
        const palestrante = await prismaClient_1.default.palestrante.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (!palestrante) {
            return res.status(404).json({ error: "Palestrante não encontrado." });
        }
        res.json(palestrante);
    }
    catch (error) {
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const { nome, email } = req.body;
        const palestrante = await prismaClient_1.default.palestrante.update({
            where: { id: Number(req.params.id) },
            data: { nome, email }
        });
        res.json(palestrante);
    }
    catch (error) {
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await prismaClient_1.default.palestrante.delete({
            where: { id: Number(req.params.id) }
        });
        return res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});
exports.default = router;
