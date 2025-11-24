import { type SchemaTypeDefinition } from 'sanity'
import { carType } from './carListingType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [carType],
}
