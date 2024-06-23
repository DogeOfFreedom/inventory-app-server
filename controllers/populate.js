const Item = require("../models/item");
const Category = require("../models/category");
// const upload = require("./upload");

const categories = ["vegetable", "meat"];
const vegetables = [
  "Carrot",
  "Broccoli",
  "Spinach",
  "Tomato",
  "Capsicum",
  "Cucumber",
];
const vegetablesDesc = [
  "Root vegetable, usually orange in color",
  "Green vegetable with tightly packed florets",
  "Leafy green vegetable, rich in iron and vitamins",
  "Red fruit often used in culinary dishes",
  "Colorful vegetable with a crisp texture",
  "Cool and refreshing vegetable often eaten raw or pickled",
];
const vegetablesPrices = [2, 3, 2, 1, 4, 5];
const vegetablesQuantities = [10, 20, 15, 10, 12, 22];
const vegetablesImgUrls = [
  "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1719127498/carrot_yd76j2.jpg",
  "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1719127499/broccoli_grpbag.jpg",
  "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1719127498/spinach_mtpoom.jpg",
  "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1719127498/tomato_ru77pq.jpg",
  "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1719127498/capsicum_eh66xq.jpg",
  "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1719127498/cucumber_m6jcct.jpg",
];

const meats = ["Chicken", "Beef", "Pork", "Lamb", "Turkey"];
const meatsDesc = [
  "Poultry meat, commonly white and dark cuts",
  "Red meat from cattle, varying in cuts and flavors",
  "Meat from pigs, known for its versatility in cooking",
  "Meat from young sheep, often tender and flavorful",
  "Poultry meat, usually lean and white in color",
];
const meatsPrices = [14, 16, 15, 18, 15];
const meatsQuantities = [20, 20, 15, 14, 21, 22];
const meatsImgUrls = [
  "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1719127498/chicken_ld6fmf.jpg",
  "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1719127498/beef_xndio0.jpg",
  "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1719127499/pork_v87gbd.jpg",
  "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1719127499/lamb_buz2xu.jpg",
  "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1719127498/turkey_qfigay.jpg",
];

const items = [vegetables, meats];
const descriptions = [vegetablesDesc, meatsDesc];
const prices = [vegetablesPrices, meatsPrices];
const quantities = [vegetablesQuantities, meatsQuantities];
const imgURLs = [vegetablesImgUrls, meatsImgUrls];

const populateCategories = async () => {
  const promises = [];
  for (let i = 0; i < categories.length; i += 1) {
    const category = categories[i];
    const document = {
      name: category,
    };
    const p = Category.create(document);
    promises.push(p);
  }
  Promise.all(promises)
    .then(() => console.log("Categories added"))
    .catch((e) => console.log(e));
};

const populateItems = async () => {
  const promises = [];
  for (let i = 0; i < items.length; i += 1) {
    const categoryName = categories[i];
    const categoryItems = items[i];
    const categoryDescs = descriptions[i];
    const categoryPrices = prices[i];
    const categoryQuantities = quantities[i];
    const categoryImgUrls = imgURLs[i];
    for (let j = 0; j < categoryItems.length; j += 1) {
      const newDoc = {
        name: categoryItems[j],
        description: categoryDescs[j],
        category: categoryName,
        price: categoryPrices[j],
        quantityInStock: categoryQuantities[j],
        imgURL: categoryImgUrls[j],
      };
      const p = Item.create(newDoc);
      promises.push(p);
    }
  }
  Promise.all(promises)
    .then(() => console.log("Items added"))
    .catch((e) => console.log(e));
};

const deleteDB = async (req, res, next) => {
  await Category.collection.drop();
  await Item.collection.drop();
  console.log("Deleted all documents from db");
  next();
};

const populate = () => {
  // Upload images
  //  upload();

  populateCategories();
  populateItems();
};

module.exports = {
  deleteDB,
  populate,
};
