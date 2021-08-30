"use strict";

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  // Create order associated with user
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.services.burgerorders.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services.burgerorders.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.burgerorders });
  },

  // Get all the orders for the logged in user
  async me(ctx) {
    // Get the user from ctx
    const user = ctx.state.user;

    // If no user is found, return the message
    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "You are not authorized" }] },
      ]);
    }

    // If there is an user, get the orders associated with the user
    const data = await strapi.services.burgerorders.find({ user: user.id });

    // Return the data
    return sanitizeEntity(data, { model: strapi.models.burgerorders });
  },
};
