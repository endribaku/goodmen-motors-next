import {defineField, defineType} from 'sanity';

export const carType = defineType({
    name: 'carListing',
    title: 'Car Listing',
    type: 'document',
    fields: [
        // Main / hero image
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true, // allows cropping focus
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alternative text',
                    type: 'string',
                    description: 'Për SEO dhe aksesueshmëri. p.sh. "Mercedes-Benz G 550 i zi, pamje anësore".',
                }),
            ],
        }),

        // Gallery
        defineField({
            name: 'gallery',
            title: 'Image gallery',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {hotspot: true},
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alternative text',
                            type: 'string',
                        },
                    ],
                },
            ],
            options: {
                layout: 'grid',
            },
            description: 'Ngarko fotot e ankandit, interior, exterior, dëmtime, etj.',
        }),

        // Basic info
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Short title, e.g. "Mercedes-Benz G 550" ',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Slug will be generated automatically based on the title given. You can change it if you want.',
            options: {
                maxLength: 96,
                source: (doc, context) => (context.parent as { title?: string })?.title || '',
                slugify: (input) => input.toLowerCase().replace(/ /g, '-'),
                
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'make',
            title: 'Make',
            type: 'string',
            description: 'Zgjidh markën e makinës',
            options: {
                list: [
                    // German
                    {title: 'Mercedes-Benz', value: 'Mercedes-Benz'},
                    {title: 'BMW', value: 'BMW'},
                    {title: 'Audi', value: 'Audi'},
                    {title: 'Volkswagen', value: 'Volkswagen'},
                    {title: 'Porsche', value: 'Porsche'},
                    {title: 'Opel', value: 'Opel'},

                    // Premium / Luxury
                    {title: 'Range Rover', value: 'Range Rover'},
                    {title: 'Land Rover', value: 'Land Rover'},
                    {title: 'Lexus', value: 'Lexus'},
                    {title: 'Jaguar', value: 'Jaguar'},
                    {title: 'Maserati', value: 'Maserati'},
                    {title: 'Bentley', value: 'Bentley'},
                    {title: 'Rolls-Royce', value: 'Rolls-Royce'},
                    {title: 'Alfa Romeo', value: 'Alfa Romeo'},
                    {title: 'Infiniti', value: 'Infiniti'},
                    {title: 'Acura', value: 'Acura'},

                    // US brands (auction stuff)
                    {title: 'Cadillac', value: 'Cadillac'},
                    {title: 'Chevrolet', value: 'Chevrolet'},
                    {title: 'Dodge', value: 'Dodge'},
                    {title: 'Ford', value: 'Ford'},
                    {title: 'Chrysler', value: 'Chrysler'},
                    {title: 'Jeep', value: 'Jeep'},
                    {title: 'GMC', value: 'GMC'},
                    {title: 'Tesla', value: 'Tesla'},
                    {title: 'Buick', value: 'Buick'},
                    {title: 'Lincoln', value: 'Lincoln'},

                    // Japanese / Korean
                    {title: 'Toyota', value: 'Toyota'},
                    {title: 'Honda', value: 'Honda'},
                    {title: 'Nissan', value: 'Nissan'},
                    {title: 'Mazda', value: 'Mazda'},
                    {title: 'Subaru', value: 'Subaru'},
                    {title: 'Mitsubishi', value: 'Mitsubishi'},
                    {title: 'Suzuki', value: 'Suzuki'},
                    {title: 'Hyundai', value: 'Hyundai'},
                    {title: 'Kia', value: 'Kia'},

                    // French / others
                    {title: 'Renault', value: 'Renault'},
                    {title: 'Peugeot', value: 'Peugeot'},
                    {title: 'Citroën', value: 'Citroën'},
                    {title: 'Dacia', value: 'Dacia'},
                    {title: 'Fiat', value: 'Fiat'},
                    {title: 'Skoda', value: 'Skoda'},
                    {title: 'Seat', value: 'Seat'},

                    // Scandinavian
                    {title: 'Volvo', value: 'Volvo'},
                    {title: 'Saab', value: 'Saab'},

                    // Other / fallback
                    {title: 'Mini', value: 'Mini'},
                    {title: 'Smart', value: 'Smart'},
                    {title: 'Other', value: 'Other'},
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'model',
            title: 'Model',
            type: 'string',
            description: 'e.g. G 550, 328d, A4',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
            validation: (Rule) =>
                Rule.required().min(1885).max(new Date().getFullYear() + 1),
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'Price in euros, e.g. 76000',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'mileage',
            title: 'Mileage (mi)',
            type: 'number',
            description: 'Total mileage, e.g. 141526',
        }),
        // Engine & drivetrain
        defineField({
            name: 'engineDisplacement',
            title: 'Engine displacement (L)',
            type: 'number',
            description: 'e.g. 4.0',
        }),
        defineField({
            name: 'engineLayout',
            title: 'Engine layout',
            type: 'string',
            description: 'e.g. V8, V6, I4',
        }),
        defineField({
            name: 'fuelType',
            title: 'Fuel type',
            type: 'string',
            options: {
                list: [
                    {title: 'Benzinë', value: 'petrol'},
                    {title: 'Naftë', value: 'diesel'},
                    {title: 'Hibrid', value: 'hybrid'},
                    {title: 'Elektrik', value: 'electric'},
                    {title: 'Tjetër', value: 'other'},
                ],
            },
        }),
        defineField({
            name: 'driveType',
            title: 'Drive type',
            type: 'string',
            description: 'e.g FWD, RWD, AWD',
            options: {
                list: [
                    {title: 'FWD (Front-wheel drive)', value: 'fwd'},
                    {title: 'RWD (Rear-wheel drive)', value: 'rwd'},
                    {title: 'AWD / 4x4', value: 'awd'},
                    {title: '4MATIC (Mercedes AWD)', value: '4matic'},
                    {title: 'xDrive (BMW AWD)', value: 'xdrive'},
                    {title: 'quattro (Audi AWD)', value: 'quattro'},
                ],
                layout: 'dropdown',
            },
        }),
        defineField({
            name: 'transmission',
            title: 'Transmission',
            type: 'string',
            options: {
                list: [
                    {title: 'Automatic', value: 'automatic'},
                    {title: 'Manual', value: 'manual'},
                    {title: 'Semi-Automatic', value: 'semi_automatic'},
                ],
            },
        }),
        defineField({
            name: 'windowsTinted',
            title: 'Tinted windows',
            type: 'boolean',
            description: 'Xhamat e zi',
        }),

        // Origin / usage
        defineField({
            name: 'originCountry',
            title: 'Origin country',
            type: 'string',
            description: 'Prejardhja, psh. USA, Canada, South Korea',
            options: {
                list: [
                    {title: 'USA', value: 'USA'},
                    {title: 'Canada', value: 'Canada'},
                    {title: 'South Korea', value: 'South Korea'},
                    {title: 'Other', value: 'Other'},
                ],
            }
        }),
        defineField({
            name: 'primaryUse',
            title: 'Primary use / condition',
            type: 'string',
            description: 'e.g. “Përdorim normal”',
        }),
        defineField({
            name: 'secondaryUse',
            title: 'Secondary use / notes',
            type: 'string',
            description: 'e.g. “Nuk ka”',
        }),

        // Status & delivery
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            initialValue: 'in_stock',
            options: {
                list: [
                    {title: 'Në gjendje', value: 'in_stock'},
                    {title: 'E shitur', value: 'sold'},
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'deliveryRegions',
            title: 'Delivery regions',
            type: 'array',
            of: [{type: 'string'}],
            description: 'p.sh. Shqipëri, Kosovë',
            options: {
                list: [
                    {title: 'Albania', value: 'Albania'},
                    {title: 'Kosovo', value: 'Kosovo'},
                    {title: 'Other', value: 'Other'},
                ],
                layout: 'list',
            },
        }),


        
    ]
});
