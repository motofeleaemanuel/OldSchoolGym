import { deleteImageById } from "@/actions/gallery.actions";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    try {
        if (!id) {
            return NextResponse.json(
                { error: "Missing gallery image id" },
                { status: 400 }
            );
        }
        const deletedImage = await deleteImageById(id);
        return NextResponse.json(deletedImage, { status: 200 });
    } catch (error: unknown) {
        console.error('Error deleting gallery image:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }

    
}
