const nodemailer = require("nodemailer");

const otpStore = new Map(); // In-memory OTP store

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (toEmail, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"OTP System" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your OTP Code",
    html: `<h2>Your OTP is: <b>${otp}</b></h2><p>This OTP is valid for 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};


exports.sendOtp=async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore.set(email, { otp, expiresAt });

  try {
    await sendOTP(email, otp);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message });
  }
}

exports.verifyOtp=(req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);

  if (!record) {
    return res.status(400).json({ message: "No OTP sent to this email" });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  otpStore.delete(email); // valid, remove from store
  return res.status(200).json({ message: "OTP verified successfully" });
}