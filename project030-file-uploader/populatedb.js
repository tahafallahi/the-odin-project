import { prisma } from "./lib/prisma.js";

async function main() {
  const ownerId = 1;

  // Top-level folders
  const documents = await prisma.folder.create({
    data: { name: "Documents", owner_id: ownerId },
  });

  const photos = await prisma.folder.create({
    data: { name: "Photos", owner_id: ownerId },
  });

  // Nested folder inside Documents
  const invoices = await prisma.folder.create({
    data: { name: "Invoices", owner_id: ownerId, parent_id: documents.id },
  });

  // Nested folder inside Photos
  const vacation = await prisma.folder.create({
    data: { name: "Vacation 2025", owner_id: ownerId, parent_id: photos.id },
  });

  // Files at root (no folder)
  await prisma.file.createMany({
    data: [
      {
        name: "readme.txt",
        size: 1200,
        storageKey: "files/readme.txt",
        owner_id: ownerId,
      },
    ],
  });

  // Files inside Documents
  await prisma.file.createMany({
    data: [
      {
        name: "resume.pdf",
        size: 245_000,
        storageKey: "files/resume.pdf",
        owner_id: ownerId,
        folder_id: documents.id,
      },
      {
        name: "cover_letter.docx",
        size: 34_000,
        storageKey: "files/cover_letter.docx",
        owner_id: ownerId,
        folder_id: documents.id,
      },
    ],
  });

  // Files inside Invoices
  await prisma.file.createMany({
    data: [
      {
        name: "invoice_jan.pdf",
        size: 88_000,
        storageKey: "files/invoice_jan.pdf",
        owner_id: ownerId,
        folder_id: invoices.id,
      },
      {
        name: "invoice_feb.pdf",
        size: 91_500,
        storageKey: "files/invoice_feb.pdf",
        owner_id: ownerId,
        folder_id: invoices.id,
      },
    ],
  });

  // Files inside Photos
  await prisma.file.createMany({
    data: [
      {
        name: "profile.jpg",
        size: 512_000,
        storageKey: "files/profile.jpg",
        owner_id: ownerId,
        folder_id: photos.id,
      },
    ],
  });

  // Files inside Vacation 2025
  await prisma.file.createMany({
    data: [
      {
        name: "beach.jpg",
        size: 3_200_000,
        storageKey: "files/beach.jpg",
        owner_id: ownerId,
        folder_id: vacation.id,
      },
      {
        name: "mountains.jpg",
        size: 4_100_000,
        storageKey: "files/mountains.jpg",
        owner_id: ownerId,
        folder_id: vacation.id,
      },
    ],
  });

  console.log("Seed complete ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
