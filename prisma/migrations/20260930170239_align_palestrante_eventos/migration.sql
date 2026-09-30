/*
  Warnings:

  - You are about to alter the column `data` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to drop the column `EventoId` on the `Palestrante` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_EventoToPalestrante" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EventoToPalestrante_A_fkey" FOREIGN KEY ("A") REFERENCES "Evento" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EventoToPalestrante_B_fkey" FOREIGN KEY ("B") REFERENCES "Palestrante" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Evento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "data" DATETIME NOT NULL
);
INSERT INTO "new_Evento" ("data", "descricao", "id", "local", "nome") SELECT "data", "descricao", "id", "local", "nome" FROM "Evento";
DROP TABLE "Evento";
ALTER TABLE "new_Evento" RENAME TO "Evento";
CREATE TABLE "new_Palestrante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Palestrante" ("email", "id", "nome") SELECT "email", "id", "nome" FROM "Palestrante";
DROP TABLE "Palestrante";
ALTER TABLE "new_Palestrante" RENAME TO "Palestrante";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_EventoToPalestrante_AB_unique" ON "_EventoToPalestrante"("A", "B");

-- CreateIndex
CREATE INDEX "_EventoToPalestrante_B_index" ON "_EventoToPalestrante"("B");
