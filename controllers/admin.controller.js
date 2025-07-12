import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
export const Signup = async (req, res, next) => {
    try {
        console.log(req.body)
        const salt = bcryptjs.genSalt(10);
      
        req.body.Password =await bcryptjs.hash(req.body.Password, salt);
        const user = await Admin.create(req.body);
        return user ? res.status(200).json({ message: "Registration Successfully", status: true }) : res.status(401).json({ message: "Something Went Wrong", status: false })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", status: false, error: error.message })
    }
}

export const Login = async (req, res, next) => {
    try {
        const { Email, Password } = req.body;
        const admin = await Admin.findOne({ Email });
        if (admin) {
            const result = bcryptjs.compare(Password, admin.Password);
            if (result) {
                const token = JWT.sign({ subject: admin.Email }, process.env.Secreatkey)
                return res.status(200).json({ message: "Login Successfully", user: { ...admin.toObject(), Password: undefined, token } })
            } else {
                return res.status(404).json({ message: "Invalid Password", status: false })
            }
        } else {
            return res.status(404).json({ message: "Not Found", status: false })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", status: false, error: error.message })
    }
}