import { NextResponse } from "next/server";
import prisma from "../../../../prisma/index";

// GET

export const GET = async (req: Request, res: Response) => {
  try {
    const datas = await prisma.students.findMany();
    return NextResponse.json({ message: "OK", datas }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};

// POST

export const POST = async (req: Request, res: Response) => {
  try {
    const { name, age, gender, city } = await req.json();

    const data = { id: new Date().getMilliseconds(), name, age, gender, city };

    const datas = await prisma.students.createMany({
      data: data,
      skipDuplicates: true,
    });

    if (datas.count !== 0) {
      return NextResponse.json({ message: "OK", datas }, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "Error" },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};
