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
            options: {
                maxLength: 96,
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
                    {title: 'Mercedes-Benz', value: 'mercedes_benz'},
                    {title: 'BMW', value: 'bmw'},
                    {title: 'Audi', value: 'audi'},
                    {title: 'Volkswagen', value: 'volkswagen'},
                    {title: 'Porsche', value: 'porsche'},
                    {title: 'Opel', value: 'opel'},

                    // Premium / Luxury
                    {title: 'Range Rover', value: 'range_rover'},
                    {title: 'Land Rover', value: 'land_rover'},
                    {title: 'Lexus', value: 'lexus'},
                    {title: 'Jaguar', value: 'jaguar'},
                    {title: 'Maserati', value: 'maserati'},
                    {title: 'Bentley', value: 'bentley'},
                    {title: 'Rolls-Royce', value: 'rolls_royce'},
                    {title: 'Alfa Romeo', value: 'alfa_romeo'},
                    {title: 'Infiniti', value: 'infiniti'},
                    {title: 'Acura', value: 'acura'},

                    // US brands (auction stuff)
                    {title: 'Cadillac', value: 'cadillac'},
                    {title: 'Chevrolet', value: 'chevrolet'},
                    {title: 'Dodge', value: 'dodge'},
                    {title: 'Ford', value: 'ford'},
                    {title: 'Chrysler', value: 'chrysler'},
                    {title: 'Jeep', value: 'jeep'},
                    {title: 'GMC', value: 'gmc'},
                    {title: 'Tesla', value: 'tesla'},
                    {title: 'Buick', value: 'buick'},
                    {title: 'Lincoln', value: 'lincoln'},

                    // Japanese / Korean
                    {title: 'Toyota', value: 'toyota'},
                    {title: 'Honda', value: 'honda'},
                    {title: 'Nissan', value: 'nissan'},
                    {title: 'Mazda', value: 'mazda'},
                    {title: 'Subaru', value: 'subaru'},
                    {title: 'Mitsubishi', value: 'mitsubishi'},
                    {title: 'Suzuki', value: 'suzuki'},
                    {title: 'Hyundai', value: 'hyundai'},
                    {title: 'Kia', value: 'kia'},

                    // French / others
                    {title: 'Renault', value: 'renault'},
                    {title: 'Peugeot', value: 'peugeot'},
                    {title: 'Citroën', value: 'citroen'},
                    {title: 'Dacia', value: 'dacia'},
                    {title: 'Fiat', value: 'fiat'},
                    {title: 'Skoda', value: 'skoda'},
                    {title: 'Seat', value: 'seat'},

                    // Scandinavian
                    {title: 'Volvo', value: 'volvo'},
                    {title: 'Saab', value: 'saab'},

                    // Other / fallback
                    {title: 'Mini', value: 'mini'},
                    {title: 'Smart', value: 'smart'},
                    {title: 'Other', value: 'other'},
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
            title: 'Mileage',
            type: 'number',
            description: 'Total mileage, e.g. 141526',
        }),
        defineField({
            name: 'mileageUnit',
            title: 'Mileage unit',
            type: 'string',
            initialValue: 'miles',
            options: {
                list: [
                    {title: 'Kilometers', value: 'km'},
                    {title: 'Miles', value: 'miles'},
                ],
                layout: 'radio',
            },
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
            description: 'Prejardhja, psh. USA, Gjermani, Itali',
            initialValue: 'USA',
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
            initialValue: 'available_to_order',
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
            description: 'p.sh. Shqipëri, Kosovë, Maqedoni',
        }),

        // Description & disclaimer
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
            description:
                'Marketing text (mund të jetë në shqip, p.sh. si përshkrimi i Instagramit).',
        }),
        defineField({
            name: 'disclaimer',
            title: 'Disclaimer',
            type: 'text',
            description:
                'P.S. për defektet, dëmtimet e padukshme, ankandi, etj.',
        }),

        // Contact
        defineField({
            name: 'contactPhones',
            title: 'Contact phone numbers',
            type: 'array',
            of: [{type: 'string'}],
            description: 'p.sh. 068 938 8587, 068 229 6290',
        }),
        defineField({
            name: 'contactNotes',
            title: 'Contact notes',
            type: 'string',
            description: 'p.sh. “Na kontaktoni DM / WhatsApp / telefon”',
        }),

        // Marketing / label tags
        defineField({
            name: 'labels',
            title: 'Labels / Marketing tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
                list: [
                    { title: 'Featured', value: 'featured' },
                    { title: 'New arrival', value: 'new_arrival' },
                    { title: 'Offer', value: 'offer' },
                    { title: 'Instagram', value: 'instagram' },
                    { title: 'TikTok', value: 'tiktok' },
                ],
            },
        }),
    ]
});
