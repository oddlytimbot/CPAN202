const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const foods = [
  {
    name: "Belgian Waffles",
    price: "$5.95",
    description:
      "Two of our famous Belgian Waffles with plenty of real maple syrup",
    calories: "650",
    copy: "Copyright: OddlyStudios."
  },
  {
    name: "Strawberry Belgian Waffles",
    price: "$7.95",
    description:
      "Light Belgian waffles covered with strawberries and whipped cream",
    calories: "900",
    copy: "Copyright: OddlyStudios."
  },
  {
    name: "Berry-Berry Belgian Waffles",
    price: "$8.95",
    description:
      "Light Belgian waffles covered with an assortment of fresh berries and whipped cream",
    calories: "900",
    copy: "Copyright: OddlyStudios."
  },
  {
    name: "French Toast",
    price: "$4.50",
    description: "Thick slices made from our homemade sourdough bread",
    calories: "600",
    copy: "Copyright: OddlyStudios."
  },
  {
    name: "Homestyle Breakfast",
    price: "$6.95",
    description:
      "Two eggs, bacon or sausage, toast, and our ever-popular hash browns",
    calories: "950",
    copy: "Copyright: OddlyStudios."
  }
];

const FoodType = new GraphQLObjectType({
  name: "Food",
  fields: () => ({
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    description: { type: GraphQLString },
    calories: { type: GraphQLInt },
    copy: { type: GraphQLString }
  })
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    food: {
      type: FoodType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        for (let i = 0; i < foods.length; i++) {
          if (foods[i].name == args.name) {
            return foods[i];
          }
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
