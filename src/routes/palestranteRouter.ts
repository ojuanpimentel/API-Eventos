import { Router, Request, Response } from "express";
import prisma from "../prismaClient";
const router = Router();
 
// Cadastrar um palestrante novo
router.post("/", async (req: Request, res: Response) => {
    try {
        const { nome, email } = req.body;
 
        if ( !nome || !email ) {
            return res.status(400).json({
                error: "Todos os campos são obrigatórios." });
        }
 
        const palestranteSalvo = await prisma.palestrante.create({
            data: {
                nome,
                email
            }
        });
    res.status(201).json(palestranteSalvo);
 
    } catch (error) {
        console.error("erro ao cadastrar palestrante:", error);
        res.status(500).json("Erro interno do servidor");
    }
})
 
// Listar todos os palestrantes

router.get("/", async (req: Request, res: Response) => {
    try {
        const palestrantes = await prisma.palestrante.findMany();
        res.status(200).json(palestrantes);
 
    } catch (error) {
        console.error("Erro ao listar palestrantes:", error);
        res.status(500).json("Erro interno do servidor");
    }
})
 
// Buscar um palestrante pelo ID

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const palestrante = await prisma.palestrante.findUnique({
            where: { id: Number(req.params.id)}
        })
   
        if (!palestrante) {
            return res.status(404).json({ error: "Palestrante não encontrado."});
        }
        res.json(palestrante);
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor."});
    }
})
 
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { nome, email } = req.body;
 
        const palestrante = await prisma.palestrante.update({
            where: { id: Number(req.params.id)},
            data: { nome, email }
        })
        res.json(palestrante);
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor."});
    }
})
 
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        await prisma.palestrante.delete({
            where: { id: Number(req.params.id)}
        })
        return res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor."});
    }
})
 
 
 
export default router;