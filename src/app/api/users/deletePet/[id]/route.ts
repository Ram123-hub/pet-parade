import { connect } from "@/lib/dbconfig/dbconfig";
import { Pet } from "@/lib/userModel";
import { NextResponse } from "next/server";

connect();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    if (!id) throw new Error("ID is required");

    const result = await Pet.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Pet deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting pet", error);
    return NextResponse.json({ error: "Failed to delete pet" }, { status: 500 });
  }
}

