import { groq } from 'next-sanity';
import { client } from './lib/client';

export interface CarListing {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  mileageUnit?: 'km' | 'miles';
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  gallery?: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;
  originCountry?: string;
  status: 'in_stock' | 'sold';
  deliveryRegions?: string[];
  features?: string[];
  damageTags?: string[];
  engineDisplacement?: number;
  engineLayout?: string;
  fuelType?: 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'other';
  driveType?: 'fwd' | 'rwd' | 'awd' | '4matic' | 'xdrive' | 'quattro';
  transmission?: 'automatic' | 'manual' | 'semi_automatic';
}

const carListingFields = groq`
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  make,
  model,
  year,
  price,
  mileage,
  mileageUnit,
  mainImage {
    asset,
    alt
  },
  gallery[] {
    asset,
    alt
  },
  originCountry,
  status,
  deliveryRegions,
  features,
  damageTags,
  engineDisplacement,
  engineLayout,
  fuelType,
  driveType,
  transmission
`;

// Get featured cars (latest 6 cars in stock)
export const getFeaturedCars = groq`
  *[_type == "carListing" && status == "in_stock"] | order(_createdAt desc) [0...6] {
    ${carListingFields}
  }
`;

// Get all cars (excluding sold)
export const getAllCars = groq`
  *[_type == "carListing" && status != "sold"] | order(_createdAt desc) {
    ${carListingFields}
  }
`;

// Get latest arrivals (newest cars, excluding sold)
export const getLatestArrivals = groq`
  *[_type == "carListing" && status != "sold"] | order(_createdAt desc) [0...8] {
    ${carListingFields}
  }
`;

// Get car by slug
export const getCarBySlug = groq`
  *[_type == "carListing" && slug.current == $slug][0] {
    ${carListingFields}
  }
`;

// Get cars by filters
export const getCarsByFilters = (filters: {
  keyword?: string;
  make?: string;
  models?: string[];
  minPrice?: number;
  maxPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  fuelTypes?: string[];
  driveTypes?: string[];
  transmissions?: string[];
}) => {
  let filterConditions: string[] = ['_type == "carListing"', 'status != "sold"'];

  // Keyword search (searches in title, make, model)
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    filterConditions.push(
      `(lower(title) match "*${keyword}*" || lower(make) match "*${keyword}*" || lower(model) match "*${keyword}*")`,
    );
  }

  if (filters.make) {
    filterConditions.push(`make == "${filters.make}"`);
  }

  // Models array filter
  if (filters.models && filters.models.length > 0) {
    const modelConditions = filters.models.map((model) => `model == "${model}"`).join(' || ');
    filterConditions.push(`(${modelConditions})`);
  }

  if (filters.minPrice !== undefined) {
    filterConditions.push(`price >= ${filters.minPrice}`);
  }

  if (filters.maxPrice !== undefined) {
    filterConditions.push(`price <= ${filters.maxPrice}`);
  }

  if (filters.minMileage !== undefined) {
    filterConditions.push(`mileage >= ${filters.minMileage}`);
  }

  if (filters.maxMileage !== undefined) {
    filterConditions.push(`mileage <= ${filters.maxMileage}`);
  }

  // Fuel types array filter
  if (filters.fuelTypes && filters.fuelTypes.length > 0) {
    const fuelConditions = filters.fuelTypes.map((fuel) => `fuelType == "${fuel}"`).join(' || ');
    filterConditions.push(`(${fuelConditions})`);
  }

  // Drive types array filter
  if (filters.driveTypes && filters.driveTypes.length > 0) {
    const driveConditions = filters.driveTypes.map((drive) => `driveType == "${drive}"`).join(' || ');
    filterConditions.push(`(${driveConditions})`);
  }

  // Transmissions array filter
  if (filters.transmissions && filters.transmissions.length > 0) {
    const transConditions = filters.transmissions
      .map((trans) => `transmission == "${trans}"`)
      .join(' || ');
    filterConditions.push(`(${transConditions})`);
  }

  const filterString = filterConditions.join(' && ');

  return groq`
    *[${filterString}] | order(_createdAt desc) {
      ${carListingFields}
    }
  `;
};

// Get count of cars by filters (for pagination)
export const getCarsCountByFilters = (filters: Parameters<typeof getCarsByFilters>[0]) => {
  let filterConditions: string[] = ['_type == "carListing"', 'status != "sold"'];

  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    filterConditions.push(
      `(lower(title) match "*${keyword}*" || lower(make) match "*${keyword}*" || lower(model) match "*${keyword}*")`,
    );
  }

  if (filters.make) {
    filterConditions.push(`make == "${filters.make}"`);
  }

  if (filters.models && filters.models.length > 0) {
    const modelConditions = filters.models.map((model) => `model == "${model}"`).join(' || ');
    filterConditions.push(`(${modelConditions})`);
  }

  if (filters.minPrice !== undefined) {
    filterConditions.push(`price >= ${filters.minPrice}`);
  }

  if (filters.maxPrice !== undefined) {
    filterConditions.push(`price <= ${filters.maxPrice}`);
  }

  if (filters.minMileage !== undefined) {
    filterConditions.push(`mileage >= ${filters.minMileage}`);
  }

  if (filters.maxMileage !== undefined) {
    filterConditions.push(`mileage <= ${filters.maxMileage}`);
  }

  if (filters.fuelTypes && filters.fuelTypes.length > 0) {
    const fuelConditions = filters.fuelTypes.map((fuel) => `fuelType == "${fuel}"`).join(' || ');
    filterConditions.push(`(${fuelConditions})`);
  }

  if (filters.driveTypes && filters.driveTypes.length > 0) {
    const driveConditions = filters.driveTypes.map((drive) => `driveType == "${drive}"`).join(' || ');
    filterConditions.push(`(${driveConditions})`);
  }

  if (filters.transmissions && filters.transmissions.length > 0) {
    const transConditions = filters.transmissions
      .map((trans) => `transmission == "${trans}"`)
      .join(' || ');
    filterConditions.push(`(${transConditions})`);
  }

  const filterString = filterConditions.join(' && ');

  return groq`
    count(*[${filterString}])
  `;
};

// Get all unique makes for filter dropdown
export const getAllMakes = groq`
  array::unique(*[_type == "carListing" && defined(make) && status != "sold"].make) | order(@ asc)
`;

// Get all unique models (optionally filtered by make)
export const getAllModels = (make?: string) => {
  if (make) {
    return groq`
      array::unique(*[_type == "carListing" && make == $make && defined(model) && status != "sold"].model) | order(@ asc)
    `;
  }
  return groq`
    array::unique(*[_type == "carListing" && defined(model) && status != "sold"].model) | order(@ asc)
  `;
};

// Get all unique fuel types
export const getAllFuelTypes = groq`
  array::unique(*[_type == "carListing" && defined(fuelType) && status != "sold"].fuelType) | order(@ asc)
`;

// Get all unique drive types
export const getAllDriveTypes = groq`
  array::unique(*[_type == "carListing" && defined(driveType) && status != "sold"].driveType) | order(@ asc)
`;

// Get all unique transmissions
export const getAllTransmissions = groq`
  array::unique(*[_type == "carListing" && defined(transmission) && status != "sold"].transmission) | order(@ asc)
`;

// Helper functions to execute queries
export async function fetchFeaturedCars(): Promise<CarListing[]> {
  return client.fetch<CarListing[]>(getFeaturedCars);
}

export async function fetchAllCars(): Promise<CarListing[]> {
  return client.fetch<CarListing[]>(getAllCars);
}

export async function fetchLatestArrivals(): Promise<CarListing[]> {
  return client.fetch<CarListing[]>(getLatestArrivals);
}

export async function fetchCarBySlug(slug: string): Promise<CarListing | null> {
  return client.fetch<CarListing | null>(getCarBySlug, { slug });
}

export async function fetchCarsByFilters(
  filters: Parameters<typeof getCarsByFilters>[0],
  options?: { page?: number; pageSize?: number },
): Promise<CarListing[]> {
  let filterConditions: string[] = ['_type == "carListing"', 'status != "sold"'];

  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    filterConditions.push(
      `(lower(title) match "*${keyword}*" || lower(make) match "*${keyword}*" || lower(model) match "*${keyword}*")`,
    );
  }

  if (filters.make) {
    filterConditions.push(`make == "${filters.make}"`);
  }

  if (filters.models && filters.models.length > 0) {
    const modelConditions = filters.models.map((model) => `model == "${model}"`).join(' || ');
    filterConditions.push(`(${modelConditions})`);
  }

  if (filters.minPrice !== undefined) {
    filterConditions.push(`price >= ${filters.minPrice}`);
  }

  if (filters.maxPrice !== undefined) {
    filterConditions.push(`price <= ${filters.maxPrice}`);
  }

  if (filters.minMileage !== undefined) {
    filterConditions.push(`mileage >= ${filters.minMileage}`);
  }

  if (filters.maxMileage !== undefined) {
    filterConditions.push(`mileage <= ${filters.maxMileage}`);
  }

  if (filters.fuelTypes && filters.fuelTypes.length > 0) {
    const fuelConditions = filters.fuelTypes.map((fuel) => `fuelType == "${fuel}"`).join(' || ');
    filterConditions.push(`(${fuelConditions})`);
  }

  if (filters.driveTypes && filters.driveTypes.length > 0) {
    const driveConditions = filters.driveTypes.map((drive) => `driveType == "${drive}"`).join(' || ');
    filterConditions.push(`(${driveConditions})`);
  }

  if (filters.transmissions && filters.transmissions.length > 0) {
    const transConditions = filters.transmissions
      .map((trans) => `transmission == "${trans}"`)
      .join(' || ');
    filterConditions.push(`(${transConditions})`);
  }

  const filterString = filterConditions.join(' && ');

  // Build query with optional pagination
  let query: string;
  if (options?.page !== undefined && options?.pageSize !== undefined) {
    const start = (options.page - 1) * options.pageSize;
    const end = start + options.pageSize;
    query = groq`
      *[${filterString}] | order(_createdAt desc) [${start}...${end}] {
        ${carListingFields}
      }
    `;
  } else {
    query = groq`
      *[${filterString}] | order(_createdAt desc) {
        ${carListingFields}
      }
    `;
  }

  return client.fetch<CarListing[]>(query);
}

export async function fetchCarsCountByFilters(
  filters: Parameters<typeof getCarsByFilters>[0],
): Promise<number> {
  const query = getCarsCountByFilters(filters);
  return client.fetch<number>(query);
}

export async function fetchAllMakes(): Promise<string[]> {
  return client.fetch<string[]>(getAllMakes);
}

export async function fetchAllModels(make?: string): Promise<string[]> {
  const query = getAllModels(make);
  return make
    ? client.fetch<string[]>(query, { make })
    : client.fetch<string[]>(query);
}

export async function fetchAllFuelTypes(): Promise<string[]> {
  return client.fetch<string[]>(getAllFuelTypes);
}

export async function fetchAllDriveTypes(): Promise<string[]> {
  return client.fetch<string[]>(getAllDriveTypes);
}

export async function fetchAllTransmissions(): Promise<string[]> {
  return client.fetch<string[]>(getAllTransmissions);
}

