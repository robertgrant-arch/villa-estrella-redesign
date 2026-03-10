// src/app/api/bookings/route.ts
// ─────────────────────────────────────────────────────────────
// Villa Estrella — Bookings API Route (Next.js App Router)
// Stores bookings in /data/bookings.json on the server filesystem.
// Gracefully handles missing file on first run.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ── Data location ──────────────────────────────────────────────
// Stored in <project_root>/data/bookings.json
// Add /data to .gitignore if you don't want to commit booking data.
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

// ── Types ──────────────────────────────────────────────────────
type Booking = {
  id: string;
  checkIn: string;   // "YYYY-MM-DD"
  checkOut: string;  // "YYYY-MM-DD"
  guestName?: string;
  createdAt?: string;
};

// ── Helpers ────────────────────────────────────────────────────
function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

function readBookings(): Booking[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

function writeBookings(bookings: Booking[]): void {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

function parseDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function rangesOverlap(
  aIn: string, aOut: string,
  bIn: string, bOut: string
): boolean {
  const aStart = parseDate(aIn).getTime();
  const aEnd   = parseDate(aOut).getTime();
  const bStart = parseDate(bIn).getTime();
  const bEnd   = parseDate(bOut).getTime();
  // Overlap when one range starts before the other ends
  return aStart < bEnd && bStart < aEnd;
}

// ── GET /api/bookings ──────────────────────────────────────────
// Returns all bookings, optionally filtered by ?month=YYYY-MM
export async function GET(req: NextRequest) {
  try {
    const bookings = readBookings();
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month"); // optional "YYYY-MM"

    if (month) {
      const filtered = bookings.filter(
        (b) => b.checkIn.startsWith(month) || b.checkOut.startsWith(month)
      );
      return NextResponse.json({ bookings: filtered }, { status: 200 });
    }

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (err) {
    console.error("[bookings GET]", err);
    return NextResponse.json({ error: "Failed to read bookings." }, { status: 500 });
  }
}

// ── POST /api/bookings ─────────────────────────────────────────
// Creates a new booking. Returns 409 if dates conflict.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Partial<Booking>;

    // Validate
    if (!body.id || !body.checkIn || !body.checkOut) {
      return NextResponse.json(
        { error: "Missing required fields: id, checkIn, checkOut." },
        { status: 400 }
      );
    }

    const ciDate = parseDate(body.checkIn);
    const coDate = parseDate(body.checkOut);
    if (isNaN(ciDate.getTime()) || isNaN(coDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format. Use YYYY-MM-DD." }, { status: 400 });
    }
    if (ciDate >= coDate) {
      return NextResponse.json(
        { error: "Check-out must be after check-in." },
        { status: 400 }
      );
    }

    const bookings = readBookings();

    // Conflict check
    const conflict = bookings.find((b) =>
      rangesOverlap(body.checkIn!, body.checkOut!, b.checkIn, b.checkOut)
    );
    if (conflict) {
      return NextResponse.json(
        {
          error: "Date range conflicts with an existing booking.",
          conflict: { checkIn: conflict.checkIn, checkOut: conflict.checkOut },
        },
        { status: 409 }
      );
    }

    const newBooking: Booking = {
      id: body.id,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      guestName: body.guestName ?? "Guest",
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    writeBookings(bookings);

    return NextResponse.json({ booking: newBooking }, { status: 201 });
  } catch (err) {
    console.error("[bookings POST]", err);
    return NextResponse.json({ error: "Failed to create booking." }, { status: 500 });
  }
}

// ── DELETE /api/bookings ───────────────────────────────────────
// Deletes a booking by ?id=<bookingId>
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing required query param: id." }, { status: 400 });
    }

    const bookings = readBookings();
    const index = bookings.findIndex((b) => b.id === id);

    if (index === -1) {
      return NextResponse.json({ error: `Booking with id "${id}" not found.` }, { status: 404 });
    }

    const [removed] = bookings.splice(index, 1);
    writeBookings(bookings);

    return NextResponse.json({ deleted: removed }, { status: 200 });
  } catch (err) {
    console.error("[bookings DELETE]", err);
    return NextResponse.json({ error: "Failed to delete booking." }, { status: 500 });
  }
}
