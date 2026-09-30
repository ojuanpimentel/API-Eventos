"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const router = (0, express_1.Router)();
// Cadastrar um evento novo
router.post("/", async (req, res) => {
    try {
        const { nome, descricao, palestranteId, local, data } = req.body;
        if (!nome || !descricao || !palestranteId || !local || !data) {
            return res.status(400).json({
                error: "Todos os campos são obrigatórios."
            });
        }
        const eventoSalvo = await prismaClient_1.default.evento.create({
            data: {
                nome,
                descricao,
                local,
                data: new Date(data),
                palestrantes: {
                    connect: { id: Number(palestranteId) }
                }
            }
        });
        res.status(201).json(eventoSalvo);
    }
    catch (error) {
        console.error("erro ao cadastrar evento:", error);
        res.status(500).json("Erro interno do servidor");
    }
});
// Listar todos os eventos
router.get("/", async (req, res) => {
    try {
        const eventos = await prismaClient_1.default.evento.findMany({
            include: { palestrantes: true }
        });
        res.status(200).json(eventos);
    }
    catch (error) {
        console.error("Erro ao listar eventos:", error);
        res.status(500).json("Erro interno do servidor");
    }
});
// Buscar um evento pelo ID
router.get("/:id", async (req, res) => {
    try {
        const evento = await prismaClient_1.default.evento.findUnique({
            where: { id: Number(req.params.id) },
            include: { palestrantes: true }
        });
        if (!evento) {
            return res.status(404).json({ error: "Evento não encontrado." });
        }
        res.json(evento);
    }
    catch (error) {
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const { nome, descricao, palestranteId, local, data } = req.body;
        const evento = await prismaClient_1.default.evento.update({
            where: { id: Number(req.params.id) },
            data: {
                nome,
                descricao,
                local,
                data: data ? new Date(data) : undefined,
                palestrantes: palestranteId
                    ? { connect: { id: Number(palestranteId) } }
                    : undefined
            }
        });
        res.json(evento);
    }
    catch (error) {
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await prismaClient_1.default.evento.delete({
            where: { id: Number(req.params.id) }
        });
        return res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});
exports.default = router;
