// this map is used for navigation through the site
// each button on the nav bar has its id, they are stored here
export const navigationMap = {
    whatsNew: [3],
    women: [4],
    men: [5],
    gear: [6],
    training: [7],
    sale: [8],
    womenTops: [4, 9],
    womenBottoms: [4, 10],
    menTops: [5, 17],
    menBottoms: [5, 18],
    gearBags: [6, 25],
    gearFitnessEquipment: [6, 26],
    gearWatches: [6, 27],
    trainingVideo: [7, 28],
    womenTopsJackets: [4, 9, 11],
    womenTopsHoodiesSweatshirts: [4, 9, 12],
    womenTopsTees: [4, 9, 13],
    womenTopsBrasTanks: [4, 9, 14],
    womenBottomsPants: [4, 10, 15],
    womenBottomsShorts: [4, 10, 16],
    menTopsJackets: [5, 17, 19],
    menTopsHoodiesSweatshirts: [5, 17, 20],
    menTopsTees: [5, 17, 21],
    menTopsBrasTanks: [5, 17, 22],
    menBottomsPants: [5, 18, 23],
    menBottomsShorts: [5, 18, 24],
}

// data for an existing account, for easier log in tests
export const existingUser = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'testingmail@test.com',
    password: 'Test.1234'
}

// data for one of to products from home page
export const product1 = {
    name: 'Radiant Tee',
    code: 'Radiant Tee Rating: 60% 3',
    size: 'XS',
    color: 'Purple'
}

export const hotSellerProducts = {
    product1: { code: 'Radiant Tee Rating: 60% 3', hasSizesAndColor: true, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Blue', 'Orange', 'Purple'] },
    product2: { code: 'Breathe-Easy Tank Rating: 70', hasSizesAndColor: true, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Purple', 'White', 'Yellow'] },
    product3: { code: 'Argus All-Weather Tank As low', hasSizesAndColor: true, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Gray'] },
    product4: { code: 'Hero Hoodie As low as $54.00', hasSizesAndColor: true, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black', 'Gray', 'Green'] },
    product5: { code: 'Fusion Backpack Rating: 67% 3', hasSizesAndColor: false },
    product6: { code: 'Push It Messenger Bag Rating', hasSizesAndColor: false }
}

// data for filling a review
export const review1 = {
    rating: 1,
    nickname: 'Jane',
    summary: 'Cool t-shirt',
    review: 'it is a cool t-shirt'
}

// list of keywords to test advanced search by product name
export const advancedSearchKeywords = ['tank', 'tanks cotton', 'backpack']