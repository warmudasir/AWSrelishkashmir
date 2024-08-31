import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'warmudasir095@gmail.com', // Your email address
    pass: 'ytur vhte ffvx tufn', // Your app password
  },
});

export const sendOrderConfirmationEmail = async (to, orderDetails) => {
  const mailOptions = {
    from: 'warmudasir095@gmail.com',
    to,
    subject: 'Order Confirmation',
    text: `Thank you for your order! Here are your order details:\n\n${JSON.stringify(orderDetails, null, 2)}`,
  };

  return transporter.sendMail(mailOptions);
};
