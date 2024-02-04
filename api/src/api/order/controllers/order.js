("use strict");
const stripe = require("stripe")(process.env.STRIPE_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body; // take user information
    try {
      //because we have more than product
      const lineItems = await Promise.all(
        products.map(async (product) => {
          //try to find the product in our db,it's not a good idea to use client-side price because the user can change it
          //we have to find the item 'product' in our db first then we check it's properties
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.title,
              },
              //*100 because stripe take the amount as a cent
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.quantity,
          };
        })
      );

      // Calculate the total amount of the line items in cents
      const totalAmount = lineItems.reduce((total, item) => {
        return total + item.price_data.unit_amount * item.quantity;
      }, 0);

      // Determine shipping options based on the total amount
      let shippingOptions;
      if (totalAmount > 10000) {
        // More than 100 euros, considering amounts are in cents
        shippingOptions = [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0, // Free shipping
                currency: "eur",
              },
              display_name: "Livraison gratuite",
            },
          },
        ];
      } else {
        shippingOptions = [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1000, // 10 euro shipping fee
                currency: "eur",
              },
              display_name: "Livraison Standard (Gratuite > 100€)",
            },
          },
        ];
      }

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["FR", "BE"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + "/payment-success",
        cancel_url: process.env.CLIENT_URL + "?success=false",
        line_items: lineItems,
        shipping_options: shippingOptions,
        locale: "fr", // Set the checkout page to French
      });

      //if everything is okey we'r gonna write this information to DB
      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id } });

      return { stripeSession: session };
    } catch (error) {
      console.log("Error creating order:", error);
      ctx.response.status = 500;
      return { error };
    }
  },
}));
