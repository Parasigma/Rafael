import { Guest, TableData, Seat, GuestCategory } from "./types";

export const WEDDING_DATE = new Date('2026-10-10T17:00:00'); // 5 PM
export const VENUE_NAME = "El Poblet de las Atalayas";
export const VENUE_ADDRESS = "Alicante, España";

// Helper to assign random category for demo purposes
const getRandomCategory = (): GuestCategory => {
  const r = Math.random();
  if (r < 0.33) return 'friend';
  if (r < 0.66) return 'family_rafa';
  return 'family_laura';
};

// Known Captains list for auto-assignment
const KNOWN_CAPTAINS = ['Zaky', 'Saray', 'Juanma', 'Pobi', 'Rafa', 'Laura'];

// Helper to create seat data
const createSeats = (names: string[], tablePrefix: string): Seat[] => {
  // Pad with empty seats to make round tables look balanced (min 8 or 10)
  // For rectangular tables (like presidential), we just use the exact length usually, or min 2
  const isPresidential = tablePrefix === 'presi';
  const minSeats = isPresidential ? 2 : (names.length <= 8 ? 8 : 10);
  const totalSeats = Math.max(names.length, minSeats);
  
  return Array.from({ length: totalSeats }).map((_, i) => {
    const name = names[i] || null;
    // Check if this person should be a captain
    const isCaptain = name ? KNOWN_CAPTAINS.some(c => name.includes(c)) : false;

    return {
      id: `${tablePrefix}-${i}`,
      guestName: name,
      isReserved: !!name,
      suggestedBy: null,
      category: name ? getRandomCategory() : 'other',
      isCaptain: isCaptain
    };
  });
};

// Real Data from PDF - COORDINATES ADJUSTED FOR SPACING
export const INITIAL_TABLES: TableData[] = [
  {
    id: 'mesa-presidencial',
    label: 'Mesa Presidencial',
    type: 'rect',
    x: 50, y: 5, 
    seats: createSeats(['Rafa', 'Laura'], 'presi')
  },
  // Row 1 - Adjusted Y to 38 for better clearance
  {
    id: 'mesa-1',
    label: 'Mesa 1',
    type: 'round',
    x: 10, y: 38,
    seats: createSeats(['Yesica', 'Adrián', 'Miriam', 'Julio', 'Triana', 'Silvia'], 'm1')
  },
  {
    id: 'mesa-2',
    label: 'Mesa 2',
    type: 'round',
    x: 30, y: 38,
    seats: createSeats(['Saray', 'Fernando', 'Eli', 'Ismael', 'Chus', 'Debora', 'Kevin', 'Edu', 'Zaky', 'Oksana', 'Cristian', 'Carmen'], 'm2')
  },
  {
    id: 'mesa-3',
    label: 'Mesa 3',
    type: 'round',
    x: 50, y: 38,
    seats: createSeats(['Jorge', 'Paola', 'Esther', 'Carlos', 'Carlos', 'Halima', 'Pablo', 'Lourdes', 'Cristina', 'Oksana'], 'm3')
  },
  {
    id: 'mesa-4',
    label: 'Mesa 4',
    type: 'round',
    x: 70, y: 38,
    seats: createSeats(['Tata', 'Juanma', 'Esther', 'Carlos', 'Lian', 'Samu', 'Claudia', 'Dani', 'Alba', 'Kike', 'Carmen'], 'm4')
  },
  {
    id: 'mesa-5',
    label: 'Mesa 5',
    type: 'round',
    x: 90, y: 38,
    seats: createSeats(['Angel', 'Alejandra', 'María', 'Irene', 'Lian', 'Samu', 'Claudia', 'Dani', 'Alba', 'Kike'], 'm5')
  },
  // Row 2 - Adjusted Y to 68
  {
    id: 'mesa-6',
    label: 'Mesa 6',
    type: 'round',
    x: 10, y: 68,
    seats: createSeats(['Maribel', 'Luis', 'Lian', 'Juan Luis', 'Beni', 'Sole', 'Mama', 'Papa', 'Yaya'], 'm6')
  },
  {
    id: 'mesa-7',
    label: 'Mesa 7',
    type: 'round',
    x: 30, y: 68,
    seats: createSeats(['Rajobos', 'Virginia', 'Mula', 'Ana', 'Elena', 'Fran', 'Victor', 'Bea', 'Paquito', 'Kevin'], 'm7')
  },
  {
    id: 'mesa-8',
    label: 'Mesa 8',
    type: 'round',
    x: 50, y: 68,
    seats: createSeats(['Jorge Orts', 'Reme', 'Andrea', 'Pepe', 'Alvarito', 'Ruben', 'Pobi', 'Norma'], 'm8')
  },
  {
    id: 'mesa-9',
    label: 'Mesa 9',
    type: 'round',
    x: 70, y: 68,
    seats: createSeats(['María', 'Novio María', 'Loli', 'Juanra', 'Cris', 'Novio Cris', 'Romi'], 'm9')
  },
  {
    id: 'mesa-10',
    label: 'Mesa 10',
    type: 'round',
    x: 90, y: 68,
    seats: createSeats(['Jose Luis', 'Miguel', 'Diana', 'Ana Jose Luis', 'Blanca', 'Carlos', 'Fran', 'Nuria'], 'm10')
  },
  // Row 3 - Adjusted Y to 98
  {
    id: 'mesa-11',
    label: 'Mesa 11',
    type: 'round',
    x: 20, y: 98,
    seats: createSeats(['Paula', 'Jose Luis', 'Mari', 'Mario', 'Eva', 'Novio Débora', 'Débora'], 'm11')
  },
  {
    id: 'mesa-12',
    label: 'Mesa 12',
    type: 'round',
    x: 40, y: 98,
    seats: createSeats(['Juanma', 'Aitor', 'Adhara', 'Saul', 'Izan', 'Irene', 'Carlota', 'Álvaro', 'Natalia', 'Helen', 'Carlitos'], 'm12')
  },
  {
    id: 'mesa-13',
    label: 'Mesa 13',
    type: 'round',
    x: 60, y: 98,
    seats: createSeats(['Javi', 'Maya', 'Luz', 'Tomas', 'Maxim', 'Aron', 'Ana Crucero', 'Jorge Crucero', 'David', 'Andrea'], 'm13')
  },
  {
    id: 'mesa-14',
    label: 'Mesa 14',
    type: 'round',
    x: 80, y: 98,
    seats: createSeats(['Mari Carmen', 'Rocio', 'Alberto', 'Aitana', 'Pedrito', 'Antonio', 'Ana'], 'm14')
  }
];

// Guests extracted from tables
const SEATED_GUESTS: Guest[] = INITIAL_TABLES.flatMap(table => 
  table.seats
    .filter(s => s.isReserved && s.guestName)
    .map((s, i) => ({
      id: `seated-${table.id}-${i}`,
      fullName: s.guestName!,
      email: `${s.guestName!.replace(/\s/g, '').toLowerCase()}@example.com`,
      attending: 'yes' as const,
      companions: 0,
      dietaryRestrictions: '',
      needsTransport: 'No',
      message: 'Asignado en mesa',
      submittedAt: new Date().toISOString()
    }))
);

// Extra pending guests for Drag & Drop testing
const PENDING_GUESTS: Guest[] = [
  { id: 'p-1', fullName: 'Tío Manolo', email: 'manolo@test.com', attending: 'yes', companions: 0, dietaryRestrictions: '', needsTransport: 'No', message: '', submittedAt: new Date().toISOString() },
  { id: 'p-2', fullName: 'Prima Clara', email: 'clara@test.com', attending: 'yes', companions: 0, dietaryRestrictions: 'Vegana', needsTransport: 'Sí', message: '', submittedAt: new Date().toISOString() },
  { id: 'p-3', fullName: 'Amigo Luis', email: 'luis@test.com', attending: 'yes', companions: 1, dietaryRestrictions: '', needsTransport: 'No', message: '', submittedAt: new Date().toISOString() },
  { id: 'p-4', fullName: 'Compañero Trabajo', email: 'work@test.com', attending: 'yes', companions: 0, dietaryRestrictions: '', needsTransport: 'No', message: '', submittedAt: new Date().toISOString() },
  { id: 'p-5', fullName: 'Vecina Juana', email: 'juana@test.com', attending: 'yes', companions: 0, dietaryRestrictions: '', needsTransport: 'No', message: '', submittedAt: new Date().toISOString() },
];

export const INITIAL_GUESTS: Guest[] = [...SEATED_GUESTS, ...PENDING_GUESTS];