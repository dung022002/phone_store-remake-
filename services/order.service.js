const Order = require("../models/order");
const OrderPhone = require("../models/order_phone");
const Phone = require("../models/phone");

async function allOrder() {
  return Order.findAll();
}

async function create(data) {
  const { customerId, staffId, phoneIds } = data;
  const newOrder = await Order.create({ customerId, staffId });

  for (const phoneId of phoneIds) {
    await OrderPhone.create({ orderId: newOrder.id, phoneId });
  }
  return newOrder;
}

async function orderDetail(id) {
  const order = await Order.findByPk(id, {
    include: {
      model: OrderPhone,
      as: "phones",
      include: { model: Phone, as: "phone" },
    },
  });
  if (!id) {
    return null;
  }
  return order;
}

module.exports = { allOrder, create, orderDetail };
