export const contactEmailTemplate = ({ name, email, mobile, state, country, message }) => {
  return `
    <div style="font-family: sans-serif; color: #000; background: #fff; padding: 20px;">
      <h2 style="border-bottom: 1px solid #000;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Message:</strong></p>
      <div style="border: 1px solid #000; padding: 10px; margin-top: 5px;">
        ${message}
      </div>
      <p style="margin-top: 20px; font-size: 12px; color: #666;">Sent from Blog Contact Form.</p>
    </div>
  `;
};
