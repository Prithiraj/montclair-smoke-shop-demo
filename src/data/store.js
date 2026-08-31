export const dayOrder = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const store = {
  publicName: 'Montclair Smoke Shop',
  conceptName: 'MONTCLAIR // SIGNAL',
  signalCode: 'SIGNAL 127',
  description:
    'A futuristic, browse-only concept experience for a local Montclair smoke and lifestyle accessories shop.',
  address: {
    street: '127 Valley Road',
    city: 'Montclair',
    state: 'NJ',
    postalCode: '07042',
    country: 'US',
    formatted: '127 Valley Road, Montclair, NJ 07042',
  },
  phone: {
    display: '(973) 862-9684',
    e164: '+19738629684',
    href: 'tel:+19738629684',
  },
  email: null,
  website: null,
  timeZone: 'America/New_York',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=127+Valley+Road%2C+Montclair%2C+NJ+07042',
  mapSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Montclair+Smoke+Shop%2C+127+Valley+Road%2C+Montclair%2C+NJ+07042',
  hours: {
    monday: { open: '09:00', close: '23:00' },
    tuesday: { open: '09:00', close: '23:00' },
    wednesday: { open: '09:00', close: '23:00' },
    thursday: { open: '09:00', close: '23:00' },
    friday: { open: '09:00', close: '23:00' },
    saturday: { open: '09:00', close: '23:00' },
    sunday: { open: '10:00', close: '22:00' },
  },
  verification: {
    phone: 'confirmed-across-public-listings',
    address: 'confirmed-across-public-listings',
    hours: 'public-listings-owner-confirmation-required',
    email: 'not-publicly-listed',
    logo: 'no-verifiable-official-asset-found',
  },
};
