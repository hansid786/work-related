import { JewelryItem, MetalOption } from '../types/jewelry';

export const DEFAULT_METALS: MetalOption[] = [
  {
    id: '18k_yellow',
    name: '18K Yellow Gold',
    karat: '18K',
    colorHex: '#D4AF37',
    priceAdjustment: 0
  },
  {
    id: '18k_rose',
    name: '18K Rose Gold',
    karat: '18K',
    colorHex: '#B76E79',
    priceAdjustment: 4500
  },
  {
    id: 'platinum',
    name: 'Platinum 950',
    karat: 'Pt950',
    colorHex: '#E5E4E2',
    priceAdjustment: 28000
  },
  {
    id: '18k_white',
    name: '18K White Gold',
    karat: '18K',
    colorHex: '#F2F3F4',
    priceAdjustment: 6500
  }
];

export const CATALOG: JewelryItem[] = [
  // 1. ENGAGEMENT RINGS
  {
    id: 'item_solstice_ring',
    title: 'The Riva Solstice Solitaire Ring',
    collection: 'Solstice Heritage Collection',
    category: 'ENGAGEMENT_RINGS',
    categoryLabel: 'Engagement Rings',
    subtitle: '1.75 ct Oval Solitaire • Fluid Low-Profile Bezel',
    metalPurity: '18K BIS HALLMARKED YELLOW GOLD',
    gemstoneSpecs: '1.75 ct Natural Oval Solitaire • Color F • Clarity VVS1 • Triple Excellent Cut',
    price: 485000,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The crowning signature silhouette of Riva Jewels. The Solstice embraces a hand-selected 1.75-carat oval diamond in a fluid, low-profile bezel setting designed for timeless everyday grace. Sculpted entirely by hand in our master jewellery workshop.',
    craftsmanshipStory: 'Forged in 100% certified recycled 18-karat gold with traditional cold-forging techniques. Each setting is individually calibrated to the specific stone dimensions to ensure maximum brilliance and fire.',
    badge: 'Signature Solitaire',
    isBestseller: true,
    availableSizes: [10, 11, 12, 13, 14, 15, 16, 17, 18],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '4.85 g',
      diamondCarat: '1.75 ct',
      diamondClarity: 'VVS1',
      diamondColor: 'F (Colorless)',
      hallmarkCertification: 'BIS Hallmark 750 & IGI / GIA Certified',
      settingType: 'Hand-rubbed comfort bezel'
    }
  },
  {
    id: 'item_imperial_emerald_ring',
    title: 'The Imperial Emerald-Cut Engagement Ring',
    collection: 'High Jewellery Suite',
    category: 'ENGAGEMENT_RINGS',
    categoryLabel: 'Engagement Rings',
    subtitle: '2.20 ct Step-Cut • Tapered Platinum Basket',
    metalPurity: 'PLATINUM 950 HALLMARKED',
    gemstoneSpecs: '2.20 ct Emerald Cut Diamond • Color E • Clarity VVS2 • GIA Certified',
    price: 720000,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Architectural restraint and pure symmetry define the Imperial Emerald-Cut Ring. An elongated step-cut diamond held aloft by four delicate double prongs over an open gallery comfort band.',
    craftsmanshipStory: 'Cast in dense Platinum 950, renowned for its enduring white luster and hypoallergenic purity. Finished with a satin-brushed exterior and mirror-polished inner comfort-fit silhouette.',
    badge: 'Bespoke Icon',
    isNewArrival: true,
    availableSizes: [11, 12, 13, 14, 15, 16],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '5.60 g',
      diamondCarat: '2.20 ct',
      diamondClarity: 'VVS2',
      diamondColor: 'E (Colorless)',
      hallmarkCertification: 'BIS 950 Pt Hallmark & GIA Certified',
      settingType: 'Double-claw cathedral basket'
    }
  },
  {
    id: 'item_celeste_round_solitaire',
    title: 'The Celeste Cathedral Round Solitaire',
    collection: 'Solstice Heritage Collection',
    category: 'ENGAGEMENT_RINGS',
    categoryLabel: 'Engagement Rings',
    subtitle: '1.50 ct Hearts & Arrows Solitaire • Hidden Pavé Halo',
    metalPurity: '18K BIS HALLMARKED ROSE GOLD',
    gemstoneSpecs: '1.50 ct Round Brilliant Solitaire • Color D • Clarity IF • 0.15 ct Hidden Pavé',
    price: 520000,
    images: [
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A classic 6-prong cathedral setting concealing a delicate secret diamond pavé collar beneath the center diamond table. Hand-finished in warm 18-karat rose gold.',
    craftsmanshipStory: 'Precision-aligned prongs allow optimal light refraction from all 360 degrees. Each tiny hidden collar diamond is hand-set under 50x microscope.',
    badge: 'Flawless Cut',
    isBestseller: true,
    availableSizes: [10, 11, 12, 13, 14, 15, 16, 17],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '4.60 g',
      diamondCarat: '1.65 ctw (1.50 ct center + 0.15 ct collar)',
      diamondClarity: 'Internally Flawless (IF)',
      diamondColor: 'D (Exceptional White)',
      hallmarkCertification: 'BIS Hallmark 750 & GIA Diamond Dossier',
      settingType: 'Six-prong cathedral with hidden collar'
    }
  },

  // 2. DIAMOND RINGS
  {
    id: 'item_sapphire_cocktail',
    title: 'The Royal Blue Sapphire & Diamond Ring',
    collection: 'High Jewellery Suite',
    category: 'DIAMOND_RINGS',
    categoryLabel: 'Diamond Rings',
    subtitle: '2.80 ct Unheated Ceylon Sapphire • Tapered Baguettes',
    metalPurity: 'PLATINUM 950 & 18K WHITE GOLD',
    gemstoneSpecs: '2.80 ct Royal Velvet Blue Sapphire • 0.60 ct Tapered Diamond Baguettes',
    price: 890000,
    images: [
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An extraordinary natural unheated royal blue sapphire flanked by crisp step-cut diamond baguettes. The sapphire radiates a rich velvety depth certified by leading gemological laboratories.',
    craftsmanshipStory: 'Handcrafted with an open petal under-gallery allowing maximum light entry. The band is hand-finished by Riva Jewels senior master bench jewelers.',
    badge: 'One of a Kind',
    isBestseller: true,
    availableSizes: [12, 13, 14, 15, 16],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '6.40 g',
      diamondCarat: '0.60 ct Baguettes + 2.80 ct Sapphire',
      diamondClarity: 'VS1',
      diamondColor: 'F-G',
      hallmarkCertification: 'BIS Hallmark 750 & SSEF/GIA Sapphire Certificate',
      settingType: 'Tapered baguette channel & claw center'
    }
  },
  {
    id: 'item_eternity_band',
    title: 'The Riva Pavé Infinity Diamond Band',
    collection: 'Eternity Monograph',
    category: 'DIAMOND_RINGS',
    categoryLabel: 'Diamond Rings',
    subtitle: 'Full French Cut Pavé Eternity Ring • 1.10 ctw',
    metalPurity: '18K BIS HALLMARKED ROSE GOLD',
    gemstoneSpecs: '1.10 ct Round Natural Diamonds • Color E-F • VVS Clarity',
    price: 185000,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A seamless circle of optical light. Each diamond is micro-set under high magnification using French-cut v-split prongs to minimize visible metal and magnify raw diamond fire.',
    craftsmanshipStory: 'Every stone hole is individually laser-measured and hand-beaded by our master micro-setter in Mumbai.',
    badge: 'Bestseller',
    isBestseller: true,
    availableSizes: [11, 12, 13, 14, 15, 16, 17],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '3.40 g',
      diamondCarat: '1.10 ct total',
      diamondClarity: 'VVS2',
      diamondColor: 'E-F',
      hallmarkCertification: 'BIS Hallmark 750',
      settingType: 'Micro-pavé French split prong'
    }
  },
  {
    id: 'item_emerald_cocktail_ring',
    title: 'The Zambian Emerald & Diamond Cluster Ring',
    collection: 'High Jewellery Suite',
    category: 'DIAMOND_RINGS',
    categoryLabel: 'Diamond Rings',
    subtitle: '3.10 ct Natural Vivid Green Emerald • Marquise Diamond Crown',
    metalPurity: '18K BIS HALLMARKED YELLOW GOLD',
    gemstoneSpecs: '3.10 ct Zambian Octagonal Emerald • 0.90 ct Marquise & Round Diamonds',
    price: 980000,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A regal natural emerald boasting an intense verdant hue, encircled by an asymmetrical spray of hand-matched marquise cut brilliant diamonds.',
    craftsmanshipStory: 'Sourced from the Kagem mines of Zambia, certified with minor traditional cedarwood oil treatment, mounted on a dual-wire tapered comfort shank.',
    badge: 'Rare Emerald',
    isNewArrival: true,
    availableSizes: [12, 13, 14, 15, 16, 17],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '7.10 g',
      diamondCarat: '0.90 ctw Diamonds + 3.10 ct Emerald',
      diamondClarity: 'VVS',
      diamondColor: 'F Colorless',
      hallmarkCertification: 'BIS Hallmark 750 & Gübelin Certificate',
      settingType: 'Marquise cluster & four gold corner claws'
    }
  },

  // 3. NECKLACES
  {
    id: 'item_aurelia_pendant',
    title: 'The Aurelia Diamond Medallion Necklace',
    collection: 'Heritage Classics',
    category: 'NECKLACES',
    categoryLabel: 'Necklaces',
    subtitle: 'Hand-Hammered 18K Gold • Star-Set Solitaire Diamond',
    metalPurity: '18K BIS HALLMARKED SOLID GOLD',
    gemstoneSpecs: '0.25 ct Brilliant Cut Solitaire Diamond • Color G • Clarity VVS',
    price: 145000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Inspired by sacred heritage medallions. The Aurelia Medallion features an organic hand-hammered texture centered with a star-set sparkling natural diamond suspended on a 20-inch diamond-cut chain.',
    craftsmanshipStory: 'Every medallion disc is individually struck with custom steel dies and carved at the bench, ensuring no two pieces carry identical textures.',
    badge: '18K Solid Gold',
    isBestseller: true,
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '8.20 g',
      diamondCarat: '0.25 ct',
      diamondClarity: 'VVS',
      diamondColor: 'G',
      hallmarkCertification: 'BIS Hallmark 750',
      settingType: 'Celestial star flush setting'
    }
  },
  {
    id: 'item_classic_chain',
    title: 'The Riva Classic Oval Link Chain Necklace',
    collection: 'Heritage Classics',
    category: 'NECKLACES',
    categoryLabel: 'Necklaces',
    subtitle: 'Handmade Hollow Links • 18K Yellow Gold with Diamond Clasp',
    metalPurity: '18K BIS HALLMARKED YELLOW GOLD',
    gemstoneSpecs: '0.35 ct Micro-Pavé Diamonds on Proprietary Carabiner Clasp',
    price: 240000,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A striking statement chain of interlocking oval links, secured by the signature Riva Jewels diamond-dusted screw carabiner lock for versatile styling.',
    craftsmanshipStory: 'Constructed using seamless hydro-formed gold tubing to achieve bold volume and luxurious presence with featherweight everyday comfort.',
    badge: 'New Arrival',
    isNewArrival: true,
    metalOptions: DEFAULT_METALS,
    allowsEngraving: false,
    inStock: true,
    specifications: {
      grossWeight: '18.50 g',
      diamondCarat: '0.35 ct',
      diamondClarity: 'VS1',
      diamondColor: 'F-G',
      hallmarkCertification: 'BIS Hallmark 750',
      settingType: 'Pavé diamond threaded lock'
    }
  },
  {
    id: 'item_riviera_diamond_collar',
    title: 'The Cascade Diamond Riviera Collar',
    collection: 'High Jewellery Suite',
    category: 'NECKLACES',
    categoryLabel: 'Necklaces',
    subtitle: '12.50 ctw Graduated Solitaire Diamonds • Seamless 18K White Gold',
    metalPurity: '18K BIS HALLMARKED WHITE GOLD & PLATINUM',
    gemstoneSpecs: '12.50 ct Total Weight • 118 Graduated Natural Diamonds • Color E-F • VVS',
    price: 1850000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A continuous line of graduated brilliant-cut diamonds that gently curves around the clavicle with fluid grace. The center diamond graduates up to 0.70 carats with an invisible safety box closure.',
    craftsmanshipStory: 'Assembled by hand over 120 bench hours. Each articulation hinge is laser-welded with zero play to ensure the necklace sits completely flat without flipping.',
    badge: 'Haute Joaillerie',
    isBestseller: true,
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '32.40 g',
      diamondCarat: '12.50 ctw',
      diamondClarity: 'VVS1-VVS2',
      diamondColor: 'E-F Colorless',
      hallmarkCertification: 'BIS Hallmark 750 & Comprehensive IGI Collar Dossier',
      settingType: 'Four-prong articulated graduated collet'
    }
  },

  // 4. EARRINGS
  {
    id: 'item_seraphina_earrings',
    title: 'Seraphina Diamond Drop Earrings',
    collection: 'High Jewellery Suite',
    category: 'EARRINGS',
    categoryLabel: 'Earrings',
    subtitle: '1.80 ct Combined Diamonds • Articulated Draping',
    metalPurity: 'PLATINUM 950 & 18K WHITE GOLD',
    gemstoneSpecs: '1.80 ct Total Diamonds • D-F Colorless • VVS Clarity • Triple Excellent',
    price: 315000,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Graceful kinetic drops designed to capture and scatter candlelight with ethereal brilliance. Articulated platinum links connect a descending trio of bezel-set diamonds.',
    craftsmanshipStory: 'Engineered with hidden platinum jump links for smooth, silent drape. Secured with hand-tensioned friction posts and secure luxury comfort backs.',
    badge: 'Artisanal Drape',
    isNewArrival: true,
    metalOptions: DEFAULT_METALS,
    allowsEngraving: false,
    inStock: true,
    specifications: {
      grossWeight: '6.20 g',
      diamondCarat: '1.80 ctw',
      diamondClarity: 'VVS1',
      diamondColor: 'D-F Colorless',
      hallmarkCertification: 'BIS 750 & Pt 950 Hallmarked',
      settingType: 'Floating articulated bezel mount'
    }
  },
  {
    id: 'item_pearl_hoops',
    title: 'Lumière Baroque Pearl & Gold Huggies',
    collection: 'Heritage Classics',
    category: 'EARRINGS',
    categoryLabel: 'Earrings',
    subtitle: 'Natural Keshi Pearls • Hand-Textured 18K Gold',
    metalPurity: '18K BIS HALLMARKED YELLOW GOLD',
    gemstoneSpecs: 'Natural Lustrous Keshi Pearls with 0.10 ct Diamond Accents',
    price: 98000,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Natural organic baroque pearls suspended gently from fluted 18-karat gold huggie hoops. Each pearl displays a rich iridescent overtone and unique natural form.',
    craftsmanshipStory: 'Hand-selected in matched pairs from ethical coastal farms and set with delicate hidden gold peg mountings.',
    badge: 'Natural Keshi Pearl',
    isBestseller: true,
    metalOptions: DEFAULT_METALS,
    allowsEngraving: false,
    inStock: true,
    specifications: {
      grossWeight: '5.10 g',
      diamondCarat: '0.10 ct',
      diamondClarity: 'VS1',
      diamondColor: 'G',
      hallmarkCertification: 'BIS Hallmark 750',
      settingType: 'Hand-pinned baroque pearl post'
    }
  },
  {
    id: 'item_solitaire_studs',
    title: 'The Riva Signature Diamond Studs (2.0 ctw)',
    collection: 'Heritage Classics',
    category: 'EARRINGS',
    categoryLabel: 'Earrings',
    subtitle: '1.00 ct Each Ear • Martini Three-Prong Low Mount',
    metalPurity: 'PLATINUM 950 & 18K WHITE GOLD',
    gemstoneSpecs: '2.00 ctw Natural Round Diamonds • E Color • VVS2 • GIA Certified',
    price: 640000,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The quintessential luxury essential. Two precisely matched 1.00-carat round brilliant diamonds mounted in low-profile martini three-prong platinum settings that sit flush against the earlobe.',
    craftsmanshipStory: 'Equipped with proprietary screw-back locking mechanism for absolute peace of mind during everyday elegance.',
    badge: 'Timeless Essential',
    isBestseller: true,
    metalOptions: DEFAULT_METALS,
    allowsEngraving: false,
    inStock: true,
    specifications: {
      grossWeight: '3.80 g',
      diamondCarat: '2.00 ctw (1.00 ct each)',
      diamondClarity: 'VVS2',
      diamondColor: 'E',
      hallmarkCertification: 'BIS 950 Pt & Dual GIA Certificates',
      settingType: 'Three-prong low martini mount'
    }
  },

  // 5. BRACELETS
  {
    id: 'item_etoile_tennis',
    title: 'Riva Eternity Diamond Tennis Bracelet',
    collection: 'Heritage Classics',
    category: 'BRACELETS',
    categoryLabel: 'Bracelets',
    subtitle: '4.50 ctw Pavé Continuum • Secret Double Safety Clasp',
    metalPurity: '18K BIS HALLMARKED WHITE GOLD',
    gemstoneSpecs: '4.50 ct Total Weight • 56 Round Brilliant Natural Diamonds • F Color • VS1',
    price: 580000,
    images: [
      'https://images.unsplash.com/photo-1611591475168-96f7c132ce07?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The pinnacle of fluid wrist jewellery. Fifty-six impeccably matched brilliant diamonds set in seamless four-prong links with an integrated hidden double-safety clasp.',
    craftsmanshipStory: 'Our gemologists screen over 1,000 diamonds to assemble a single continuous line of uniform color, clarity, and optical refraction.',
    badge: 'Heritage Icon',
    isBestseller: true,
    availableSizes: [6.5, 7.0, 7.5],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '14.20 g',
      diamondCarat: '4.50 ctw (56 stones)',
      diamondClarity: 'VS1',
      diamondColor: 'F',
      hallmarkCertification: 'BIS Hallmark 750 & IGI Diamond Certificate',
      settingType: 'Four-prong articulated tennis link'
    }
  },
  {
    id: 'item_celeste_astral_bracelet',
    title: 'The Celeste Astral Diamond Charm Bracelet',
    collection: 'Solstice Heritage Collection',
    category: 'BRACELETS',
    categoryLabel: 'Bracelets',
    subtitle: 'Bezel-Set Mixed Cut Diamonds • 18K Yellow Gold Rolo Chain',
    metalPurity: '18K BIS HALLMARKED YELLOW GOLD',
    gemstoneSpecs: '1.20 ctw Marquise, Pear & Oval Natural Diamonds • F-G Color',
    price: 215000,
    images: [
      'https://images.unsplash.com/photo-1611591475168-96f7c132ce07?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Playful yet sophisticated rhythm of scattered fancy-cut diamonds caught in smooth bezel stations along a handcrafted 18-karat gold rolo link chain.',
    craftsmanshipStory: 'Constructed with double jump ring safety loops and an ornate filigree lobster clasp stamped with the Riva hallmark.',
    badge: 'New Arrival',
    isNewArrival: true,
    availableSizes: [6.5, 7.0, 7.5],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: false,
    inStock: true,
    specifications: {
      grossWeight: '7.80 g',
      diamondCarat: '1.20 ctw',
      diamondClarity: 'VVS2',
      diamondColor: 'F-G',
      hallmarkCertification: 'BIS Hallmark 750',
      settingType: 'Low-profile bezel stations'
    }
  },
  {
    id: 'item_art_deco_baguette_bracelet',
    title: 'The Art Deco Baguette & Round Diamond Link',
    collection: 'High Jewellery Suite',
    category: 'BRACELETS',
    categoryLabel: 'Bracelets',
    subtitle: '3.80 ctw Step-Cut Geometric Architecture • Platinum 950',
    metalPurity: 'PLATINUM 950 & 18K WHITE GOLD',
    gemstoneSpecs: '3.80 ctw Step-Cut Baguettes & Brilliant Cut Diamonds • Color E • VVS',
    price: 690000,
    images: [
      'https://images.unsplash.com/photo-1611591475168-96f7c132ce07?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A tribute to the 1920s architecture of Mumbai Marine Drive Art Deco. Alternating links of channel-set baguette diamonds and prong-set round solitaires create an opulent rhythmic luster.',
    craftsmanshipStory: 'Each rectangular baguette stone is custom-cut by hand to fit the channel with zero tolerance.',
    badge: 'Art Deco Edition',
    availableSizes: [6.5, 7.0, 7.5],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '16.50 g',
      diamondCarat: '3.80 ctw',
      diamondClarity: 'VVS1',
      diamondColor: 'E',
      hallmarkCertification: 'BIS 950 Platinum Hallmark',
      settingType: 'Precision channel & four-claw link'
    }
  },

  // 6. BANGLES
  {
    id: 'item_cuff_bangle',
    title: 'The Riva Sculpted Gold Cuff Bangle',
    collection: 'Solstice Heritage Collection',
    category: 'BANGLES',
    categoryLabel: 'Bangles',
    subtitle: 'Fluted 18K Solid Gold • Diamond Terminals',
    metalPurity: '18K BIS HALLMARKED YELLOW GOLD',
    gemstoneSpecs: '0.40 ct Pavé Diamond Terminal Caps • Color F • VVS',
    price: 360000,
    images: [
      'https://images.unsplash.com/photo-1611591475168-96f7c132ce07?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A sculptural ribbed open cuff in weighty 18-karat yellow gold, tipped with pavé diamond finials for effortless day-to-evening poise.',
    craftsmanshipStory: 'Engineered with inner spring-tempered flexibility allowing the cuff to slip on comfortably and retain its oval wrist profile indefinitely.',
    badge: 'Signature Piece',
    isBestseller: true,
    availableSizes: [2.2, 2.4, 2.6],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '22.80 g',
      diamondCarat: '0.40 ct',
      diamondClarity: 'VVS2',
      diamondColor: 'F',
      hallmarkCertification: 'BIS Hallmark 750',
      settingType: 'Diamond finial pavé cap'
    }
  },
  {
    id: 'item_aria_dual_twist_bangle',
    title: 'The Aria Diamond Twist Bangle',
    collection: 'Heritage Classics',
    category: 'BANGLES',
    categoryLabel: 'Bangles',
    subtitle: 'Intertwined Ribbons of Solid Gold & Pavé Diamonds',
    metalPurity: '18K BIS HALLMARKED ROSE & WHITE GOLD',
    gemstoneSpecs: '0.85 ctw Round Natural Diamonds • Color E-F • VVS',
    price: 295000,
    images: [
      'https://images.unsplash.com/photo-1611591475168-96f7c132ce07?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Two continuous sculptural ribbons—one mirror-polished rose gold and one diamond-encrusted white gold—twist in harmonious union around the wrist.',
    craftsmanshipStory: 'Constructed with a hidden pressure tongue clasp and two safety latches for a flush, seamless circumference.',
    badge: 'Two-Tone Harmony',
    isNewArrival: true,
    availableSizes: [2.2, 2.4, 2.6, 2.8],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '18.20 g',
      diamondCarat: '0.85 ctw',
      diamondClarity: 'VVS',
      diamondColor: 'E-F',
      hallmarkCertification: 'BIS Hallmark 750',
      settingType: 'Micro-pavé dual twisted band'
    }
  },
  {
    id: 'item_maharani_polki_kada',
    title: 'The Royal Maharani Polki & Diamond Kada',
    collection: 'Heritage Classics',
    category: 'BANGLES',
    categoryLabel: 'Bangles',
    subtitle: 'Uncut Natural Polki Diamonds • Openable Screw Mechanism',
    metalPurity: '18K BIS HALLMARKED YELLOW GOLD',
    gemstoneSpecs: '3.40 ctw Natural Uncut Polki Diamonds with Meenakari Enameling Backing',
    price: 540000,
    images: [
      'https://images.unsplash.com/photo-1611591475168-96f7c132ce07?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A heritage masterpiece celebrating timeless Indian royal wedding tradition. Natural uncut polki diamonds set in pure 24K gold foil collets with hand-painted Persian blue meenakari enamel on the inner rim.',
    craftsmanshipStory: 'Hand-wrought in Jaipur and Mumbai workshops over 3 weeks of painstaking stone setting and kiln enamel firing.',
    badge: 'Heritage Polki',
    availableSizes: [2.4, 2.6, 2.8],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: false,
    inStock: true,
    specifications: {
      grossWeight: '36.50 g',
      diamondCarat: '3.40 ctw Polki Diamonds',
      diamondClarity: 'Natural Uncut Grade',
      diamondColor: 'Natural Warm White',
      hallmarkCertification: 'BIS Hallmark 750 & Gemmological Polki Authenticity Dossier',
      settingType: 'Traditional Kundan collet with gold foil'
    }
  },

  // 7. PENDANTS
  {
    id: 'item_lotus_solitaire_pendant',
    title: 'The Riva Lotus Diamond Solitaire Pendant',
    collection: 'Solstice Heritage Collection',
    category: 'PENDANTS',
    categoryLabel: 'Pendants',
    subtitle: '1.05 ct Round Brilliant Diamond • Sculpted Petal Gallery',
    metalPurity: '18K BIS HALLMARKED ROSE GOLD',
    gemstoneSpecs: '1.05 ct Natural Round Brilliant Diamond • E Color • VVS1 Clarity',
    price: 320000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Gracefully resting upon the collarbone, the Lotus Pendant celebrates quiet splendour. A 1.05-carat center diamond nestles inside eight micro-sculpted gold petals on an adjustable Venetian chain.',
    craftsmanshipStory: 'The under-gallery mimics an unfurling lotus bud, hand-polished on thread cords to reach intricate internal crevices.',
    badge: 'New Arrival',
    isNewArrival: true,
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '5.20 g',
      diamondCarat: '1.05 ct',
      diamondClarity: 'VVS1',
      diamondColor: 'E',
      hallmarkCertification: 'BIS Hallmark 750 & GIA Dossier',
      settingType: 'Eight-petal comfort basket'
    }
  },
  {
    id: 'item_noor_emerald_pendant',
    title: 'The Noor Emerald-Cut Diamond Solitaire Pendant',
    collection: 'High Jewellery Suite',
    category: 'PENDANTS',
    categoryLabel: 'Pendants',
    subtitle: '1.50 ct Step-Cut Solitaire • Tapered Platinum Bale',
    metalPurity: 'PLATINUM 950 HALLMARKED',
    gemstoneSpecs: '1.50 ct Emerald Cut Natural Diamond • F Color • VVS2 Clarity',
    price: 495000,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Crisp geometrical clarity meets pure platinum. An elongated step-cut diamond suspended from a tapered pavé diamond bale on a 45cm diamond-cut wheat chain.',
    craftsmanshipStory: 'Precision-cornered platinum double claws secure the emerald cut without concealing the stone’s optical hall-of-mirrors effect.',
    badge: 'Collector Choice',
    isBestseller: true,
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '4.90 g',
      diamondCarat: '1.50 ct center + 0.08 ct bale',
      diamondClarity: 'VVS2',
      diamondColor: 'F',
      hallmarkCertification: 'BIS 950 Pt Hallmark & GIA Certified',
      settingType: 'Double-claw basket with pavé bale'
    }
  },
  {
    id: 'item_teardrop_constellation_pendant',
    title: 'The Constellation Diamond Teardrop Pendant',
    collection: 'Solstice Heritage Collection',
    category: 'PENDANTS',
    categoryLabel: 'Pendants',
    subtitle: 'Pear-Shaped Solitaire • Floating Diamond Halo',
    metalPurity: '18K BIS HALLMARKED YELLOW GOLD',
    gemstoneSpecs: '0.90 ct Pear Solitaire • 0.22 ct Micro-Pavé Halo • Color D • VS1',
    price: 260000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A sparkling pear diamond oriented vertically to elongate the silhouette, framed by a whisper-thin scalloped halo of micro-brilliants.',
    craftsmanshipStory: 'Crafted with a v-prong at the pear tip for impact protection and seamless comfort on silk or open necklines.',
    badge: 'Graceful Silhouette',
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '4.10 g',
      diamondCarat: '1.12 ctw',
      diamondClarity: 'VS1',
      diamondColor: 'D',
      hallmarkCertification: 'BIS Hallmark 750',
      settingType: 'V-tip pear basket & scalloped halo'
    }
  },

  // 8. FINE JEWELLERY (SUITES & BESPOKE HEIRLOOMS)
  {
    id: 'item_royal_crest_signet',
    title: 'The Royal Crest Signet Ring',
    collection: 'Heritage Monogram Collection',
    category: 'FINE_JEWELLERY',
    categoryLabel: 'Fine Jewellery',
    subtitle: 'Solid 18K Rose Gold • Hand-Chiseled Face',
    metalPurity: '18K BIS HALLMARKED ROSE GOLD',
    gemstoneSpecs: 'Heavy 14g Solid Gold Seal • Optional Secret Flush Inside Ruby',
    price: 165000,
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A substantial heirloom signet ring with a softly beveled oval face. Tailored for bespoke family monogram or initial hand-engraving by our master artisans.',
    craftsmanshipStory: 'Poured from solid gold billet weighed to exactly 14 grams for substantial tactile weight and optical mirror lap polish.',
    badge: 'Customizable Heirloom',
    availableSizes: [12, 13, 14, 15, 16, 17, 18, 19, 20],
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '14.00 g',
      diamondCarat: 'Flush hidden 0.03 ct Burmese Ruby',
      diamondClarity: 'VVS',
      diamondColor: 'Pigeon Blood Red',
      hallmarkCertification: 'BIS Hallmark 750',
      settingType: 'Solid cast engraved seal'
    }
  },
  {
    id: 'item_noor_choker_suite',
    title: 'The Noor Royal Diamond & Pearl Choker Suite',
    collection: 'High Jewellery Suite',
    category: 'FINE_JEWELLERY',
    categoryLabel: 'Fine Jewellery',
    subtitle: 'Six-Row Natural Basra Pearl Choker • Diamond Brooch Centerpiece',
    metalPurity: '18K BIS HALLMARKED YELLOW GOLD & PLATINUM',
    gemstoneSpecs: '6.80 ctw Brilliant & Rose-Cut Diamonds • Natural Graduated Basra Pearls',
    price: 1450000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An arresting celebration of princely grandeur. Six strands of matched natural pearls linked by hand-pierced diamond spacer bars and an interchangeable diamond brooch center.',
    craftsmanshipStory: 'Each pearl is hand-strung on pure silk thread and individually knotted. The center diamond medallion can be detached and worn as a standalone brooch or pendant.',
    badge: 'Princely Monograph',
    isNewArrival: true,
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '48.20 g',
      diamondCarat: '6.80 ctw',
      diamondClarity: 'VVS1',
      diamondColor: 'F-G',
      hallmarkCertification: 'BIS Hallmark 750 & Comprehensive Pearl Certification',
      settingType: 'Six-row hand-knotted pearl choker with detachable medallion'
    }
  },
  {
    id: 'item_nizam_emerald_brooch',
    title: 'The Nizam Heritage Emerald & Diamond Brooch',
    collection: 'Heritage Monogram Collection',
    category: 'FINE_JEWELLERY',
    categoryLabel: 'Fine Jewellery',
    subtitle: '5.20 ct Colombian Cabochon Emerald • Diamond Foliage',
    metalPurity: '18K BIS HALLMARKED YELLOW GOLD & SILVER FOIL',
    gemstoneSpecs: '5.20 ct Natural Colombian Cabochon Emerald • 2.60 ct Rose-Cut Diamonds',
    price: 1120000,
    images: [
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Inspired by the royal archives of the Deccan. A luminous sugarloaf cabochon emerald surrounded by stylized rose-cut diamond acanthus leaves, fitted with double safety locking pin.',
    craftsmanshipStory: 'Hand-pierced gallery in gold with antique closed-back diamond collets for a soft, historic candlelit glow.',
    badge: 'Archival Masterpiece',
    metalOptions: DEFAULT_METALS,
    allowsEngraving: true,
    inStock: true,
    specifications: {
      grossWeight: '24.60 g',
      diamondCarat: '5.20 ct Emerald + 2.60 ctw Diamonds',
      diamondClarity: 'VS',
      diamondColor: 'Natural Warm White',
      hallmarkCertification: 'BIS Hallmark 750 & SSEF Heritage Emerald Report',
      settingType: 'Sugarloaf bezel with foliage pierced frame'
    }
  }
];
