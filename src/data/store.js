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
  location: {
    latitude: 40.8218887,
    longitude: -74.2198311,
    mapEmbedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=-74.2224%2C40.8204%2C-74.2173%2C40.8234&layer=mapnik&marker=40.8218887%2C-74.2198311',
    mapProvider: 'OpenStreetMap',
    streetViewEmbedUrl:
      'https://www.google.com/maps/embed?pb=!4v1788260000000!6m8!1m7!1sDQsmIN4XXa6V3eOitOKiDQ!2m2!1d40.821979851!2d-74.219975507!3f130!4f0!5f0.7820865974627469',
    streetViewUrl:
      'https://www.google.com/maps/@?api=1&map_action=pano&pano=DQsmIN4XXa6V3eOitOKiDQ&heading=130&pitch=0&fov=80',
    streetViewProvider: 'Google Street View',
    streetViewCapture: '2023-06',
  },
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
    coordinates: 'matched-to-public-address',
    hours: 'public-listings-owner-confirmation-required',
    email: 'not-publicly-listed',
    logo: 'no-verifiable-official-asset-found',
    streetView: 'provider-imagery-may-predate-current-storefront',
  },
};
