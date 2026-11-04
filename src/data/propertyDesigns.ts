// Built-in Promitto property designs (photos live in public/house_designs).

export interface PropertyDesign {
  id: string;
  name: string;
  bedrooms: number;
  roofType: string;
  houseType: string;
  /** Cover photo */
  imagePath: string;
  area?: string;
  description?: string;
  features?: string[];
  /** Only used by the built-in designs */
  folderPath?: string;
  images: string[];
}

export const ROOF_TYPES = ['Flat Roof', 'Pitched Roof', 'Hidden Roof'];
export const HOUSE_TYPES = ['Bungalow', 'Mansionette', 'Hybrid Mansionette'];

export const propertyDesigns: PropertyDesign[] = [
    // 2 Bedroom Designs
    {
      id: '2br-flat-bungalow',
      name: '2 Bedroom Flat Roof Bungalow',
      bedrooms: 2,
      roofType: 'Flat Roof',
      houseType: 'Bungalow',
      folderPath: '/house_designs/2BR FLAT ROOF BUNGALOW',
      imagePath: '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_1 - Photo (2).webp',
      area: '92 sqm',
      description: 'Modern 2-bedroom bungalow with flat roof design, perfect for small families.',
      features: ['2 Bedrooms', '2 Bathrooms', 'Open Plan Living', 'Kitchen', 'Parking Space'],
      images: [
        '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_1 - Photo (2).webp',
        '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_3 - Photo (2).webp',
        '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_4 - Photo (2).webp',
        '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_5 - Photo (1).webp',
        '/house_designs/2BR FLAT ROOF BUNGALOW/2BRFLAT ROOF  92SQ_7 - Photo.webp'
      ]
    },
    {
      id: '2br-hidden-bungalow',
      name: '2 Bedroom Hidden Roof Bungalow',
      bedrooms: 2,
      roofType: 'Hidden Roof',
      houseType: 'Bungalow',
      folderPath: '/house_designs/2BR HIDDEN ROOF BUNGALOW',
      imagePath: '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_1 - Photo (1).webp',
      area: '80 sqm',
      description: 'Contemporary 2-bedroom bungalow featuring a hidden roof design.',
      features: ['2 Bedrooms', '2 Bathrooms', 'Modern Design', 'Kitchen', 'Garden Space'],
      images: [
        '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_1 - Photo (1).webp',
        '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_2 - Photo.webp',
        '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_3 - Photo.webp',
        '/house_designs/2BR HIDDEN ROOF BUNGALOW/2BR -HIDDEN  ROOF-80SQ_7 - Photo (1).webp'
      ]
    },
    {
      id: '2br-pitched-bungalow',
      name: '2 Bedroom Pitched Roof Bungalow',
      bedrooms: 2,
      roofType: 'Pitched Roof',
      houseType: 'Bungalow',
      folderPath: '/house_designs/2BR PITCHED BUNGALOW',
      imagePath: '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_1 - Photo.webp',
      area: '80-92 sqm',
      description: 'Classic 2-bedroom bungalow with traditional pitched roof design.',
      features: ['2 Bedrooms', '2 Bathrooms', 'Classic Design', 'Kitchen', 'Veranda'],
      images: [
        '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_1 - Photo.webp',
        '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_2 - Photo.webp',
        '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_3 - Photo.webp',
        '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_5 - Photo.webp',
        '/house_designs/2BR PITCHED BUNGALOW/2BR -PITCHED ROOF-80SQ & 92SQ (1)_7 - Photo.webp'
      ]
    },

    // 3 Bedroom Designs
    {
      id: '3br-flat-bungalow',
      name: '3 Bedroom Flat Roof Bungalow',
      bedrooms: 3,
      roofType: 'Flat Roof',
      houseType: 'Bungalow',
      folderPath: '/house_designs/3BR FLAT ROOF BUNGALOW',
      imagePath: '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_1 - Photo.webp',
      area: '140 sqm',
      description: 'Spacious 3-bedroom bungalow with modern flat roof design.',
      features: ['3 Bedrooms', '2 Bathrooms', 'Large Living Area', 'Kitchen', 'Double Parking'],
      images: [
        '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_1 - Photo.webp',
        '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_3 - Photo.webp',
        '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_5 - Photo.webp',
        '/house_designs/3BR FLAT ROOF BUNGALOW/3BR FLAT ROOF BUNGALOW 140 SQM_7 - Photo.webp'
      ]
    },
    {
      id: '3br-flat-mansionette',
      name: '3 Bedroom Flat Roof Mansionette',
      bedrooms: 3,
      roofType: 'Flat Roof',
      houseType: 'Mansionette',
      folderPath: '/house_designs/3BR FLAT ROOF MANSIONETTE',
      imagePath: '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._1 - Photo.webp',
      area: '180 sqm',
      description: 'Luxurious 3-bedroom mansionette with flat roof and premium features.',
      features: ['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Garden'],
      images: [
        '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._1 - Photo.webp',
        '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._3 - Photo.webp',
        '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._5 - Photo.webp',
        '/house_designs/3BR FLAT ROOF MANSIONETTE/3BR FLAT ROOF PRODUCT (1)._7 - Photo.webp'
      ]
    },
    {
      id: '3br-hidden-bungalow',
      name: '3 Bedroom Hidden Roof Bungalow',
      bedrooms: 3,
      roofType: 'Hidden Roof',
      houseType: 'Bungalow',
      folderPath: '/house_designs/3BR HIDDEN ROOF BUNGALOW',
      imagePath: '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_1 - Photo.webp',
      area: '110 sqm',
      description: 'Contemporary 3-bedroom bungalow with sleek hidden roof design.',
      features: ['3 Bedrooms', '2 Bathrooms', 'Modern Interior', 'Kitchen', 'Balcony'],
      images: [
        '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_1 - Photo.webp',
        '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_5 - Photo.webp',
        '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_7 - Photo.webp',
        '/house_designs/3BR HIDDEN ROOF BUNGALOW/3BEDROOM BUNGALOW-HIDDEN ROOF-110 SQ M_9 - Photo.webp'
      ]
    },
    {
      id: '3br-pitched-bungalow',
      name: '3 Bedroom Pitched Roof Bungalow',
      bedrooms: 3,
      roofType: 'Pitched Roof',
      houseType: 'Bungalow',
      folderPath: '/house_designs/3BR PITCHED ROOF BUNGALOW',
      imagePath: '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_1 - Photo.webp',
      area: '110 sqm',
      description: 'Classic 3-bedroom bungalow with pitched roof and traditional charm.',
      features: ['3 Bedrooms', '2 Bathrooms', 'Traditional Design', 'Kitchen', 'Veranda'],
      images: [
        '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_1 - Photo.webp',
        '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_5 - Photo.webp',
        '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_7 - Photo.webp',
        '/house_designs/3BR PITCHED ROOF BUNGALOW/3BEDROOM BUNGALOW-PITCHED ROOF-110 SQM_9 - Photo.webp'
      ]
    },
    {
      id: '3br-pitched-mansionette',
      name: '3 Bedroom Pitched Roof Mansionette',
      bedrooms: 3,
      roofType: 'Pitched Roof',
      houseType: 'Mansionette',
      folderPath: '/house_designs/3BR PITCHED ROOF MANSIONETTE',
      imagePath: '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._1 - Photo.webp',
      area: '200 sqm',
      description: 'Elegant 3-bedroom mansionette with traditional pitched roof design.',
      features: ['3 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'],
      images: [
        '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._1 - Photo.webp',
        '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._3 - Photo.webp',
        '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._5 - Photo.webp',
        '/house_designs/3BR PITCHED ROOF MANSIONETTE/3BR PITCHED ROOF PRODUCT._7 - Photo.webp'
      ]
    },

    // 4 Bedroom Designs
    {
      id: '4br-flat-mansionette-172',
      name: '4 Bedroom 172 sqm Standard Pitched Mansionette',
      bedrooms: 4,
      roofType: 'Pitched Roof',
      houseType: 'Mansionette',
      folderPath: '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE',
      imagePath: '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED_1 - Photo.webp',
      area: '172 sqm',
      description: 'Standard 4-bedroom mansionette with pitched roof design.',
      features: ['4 Bedrooms', '3 Bathrooms', 'Master Suite', 'Kitchen', 'Garden'],
      images: [
        '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED_1 - Photo.webp',
        '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED _2 - Photo.webp',
        '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED _3 - Photo.webp',
        '/house_designs/4BR 172 SQ PITCHED STANDARD MANSIONETTE/STANDARD 4BEDROOM PITCHED _4 - Photo.webp'
      ]
    },
    {
      id: '4br-flat-mansionette-224',
      name: '4 Bedroom 224 sqm Flat Roof Mansionette',
      bedrooms: 4,
      roofType: 'Flat Roof',
      houseType: 'Mansionette',
      folderPath: '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE',
      imagePath: '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._1 - Photo.webp',
      area: '224 sqm',
      description: 'Luxurious 4-bedroom mansionette with flat roof design.',
      features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'],
      images: [
        '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._1 - Photo.webp',
        '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._3 - Photo.webp',
        '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._5 - Photo.webp',
        '/house_designs/4BR 224 SQ FLAT ROOF MANSIONETTE/4BR STANDARD FLAT ROOF 224 SQM._6 - Photo.webp'
      ]
    },
    {
      id: '4br-pitched-bungalow',
      name: '4 Bedroom Pitched Roof Bungalow',
      bedrooms: 4,
      roofType: 'Pitched Roof',
      houseType: 'Bungalow',
      folderPath: '/house_designs/4BR PITCHED ROOF BUNGALOW',
      imagePath: '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_1 - Photo.webp',
      area: '280 sqm',
      description: 'Elegant 4-bedroom bungalow with traditional pitched roof design.',
      features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'],
      images: [
        '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_1 - Photo.webp',
        '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_3 - Photo.webp',
        '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_4 - Photo.webp',
        '/house_designs/4BR PITCHED ROOF BUNGALOW/4bedroom pitched roof bungalow Promitto_5 - Photo.webp'
      ]
    },
    {
      id: '4br-pitched-hybrid-mansionette',
      name: '4 Bedroom Pitched Roof Hybrid Mansionette',
      bedrooms: 4,
      roofType: 'Pitched Roof',
      houseType: 'Hybrid Mansionette',
      folderPath: '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE',
      imagePath: '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._1 - Photo.webp',
      area: '300 sqm',
      description: 'Elegant Hybrid 4-bedroom mansionette with pitched roof design.',
      features: ['4 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'],
      images: [
        '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._1 - Photo.webp',
        '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._2 - Photo.webp',
        '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._7 - Photo.webp',
        '/house_designs/4BR PITCHED ROOF HYBRID MANSIONETTE/HYBRID 4BEDROOM pitched  (1)._8 - Photo.webp'
      ]
    },

    // 5 Bedroom Designs
    {
      id: '5br-flat-mansionette',
      name: '5 Bedroom Flat Roof Mansionette',
      bedrooms: 5,
      roofType: 'Flat Roof',
      houseType: 'Mansionette',
      folderPath: '/house_designs/5BR FLAT ROOF MANSIONETTE',
      imagePath: '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_1 - Photo.webp',
      area: '380 sqm',
      description: 'Luxurious 5-bedroom mansionette with modern flat roof design.',
      features: ['5 Bedrooms', '4 Bathrooms', 'Master Suite', 'Kitchen', 'Swimming Pool'],
      images: [
        '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_1 - Photo.webp',
        '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_2 - Photo.webp',
        '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_3 - Photo.webp',
        '/house_designs/5BR FLAT ROOF MANSIONETTE/5 bedroom flat roof [1]_7 - Photo.webp'
      ]
    },
    {
      id: '5br-pitched-mansionette',
      name: '5 Bedroom Pitched Roof Mansionette',
      bedrooms: 5,
      roofType: 'Pitched Roof',
      houseType: 'Mansionette',
      folderPath: '/house_designs/5BR PITCHED ROOF MANSIONETTE',
      imagePath: '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_2 - Photo.webp',
      area: '380 sqm',
      description: 'Elegant 5-bedroom mansionette with traditional pitched roof.',
      features: ['5 Bedrooms', '5 Bathrooms', 'Master Suite', 'Kitchen', 'Large Garden'],
      images: [
        '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_2 - Photo.webp',
        '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_5 - Photo.webp',
        '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_7 - Photo.webp',
        '/house_designs/5BR PITCHED ROOF MANSIONETTE/5br pitched 380sqm_8 - Photo.webp'
      ]
    }
];

export const getPropertyDesign = (id: string) => propertyDesigns.find((d) => d.id === id);
