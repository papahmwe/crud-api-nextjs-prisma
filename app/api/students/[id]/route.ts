import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
// GET

export const GET = async (req: Request, res: Response) => {
  try {
    const id = req.url.split("students/")[1];
    const datas = await prisma.students.findMany({
      where: {
        id: Number(id),
      },
    });

    if (!datas) {
      return NextResponse.json({ message: "Error!" }, { status: 404 });
    }
    return NextResponse.json({ message: "OK", datas }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "OK", error }, { status: 500 });
  }
};

// PUT

export const PUT = async (req: Request, res: Response) => {
  try {
    const id = req.url.split("students/")[1];
    const { name, age, gender, city } = await req.json();
    const data = {
      name,
      age,
      gender,
      city,
    };
    const updateHandler = await prisma.students.updateMany({
      where: {
        id: Number(id),
      },
      data,
    });
    return NextResponse.json({ message: "OK", updateHandler }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "ERROR", error }, { status: 500 });
  }
};

// DELETE

export const DELETE = async (req: Request, res: Response) => {
  try {
    const id = req.url.split("students/")[1];
    const datas = await prisma.students.delete({
      where: {
        id: Number(id),
      },
    });

    if (!datas) {
      return NextResponse.json({ message: "Error!" }, { status: 404 });
    }
    return NextResponse.json({ message: "OK", datas }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "OK", error }, { status: 500 });
  }
};
