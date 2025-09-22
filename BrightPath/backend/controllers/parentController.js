import bcrypt from "bcrypt";
import parentModel from "../models/parentModel.js";
import validator from "validator";

export const addParent = async (req, res) => {
    try {
        const {
            studentName,
            parentEmail,
            parentPassword,
            studentRegNo,
            department,
            section,
            fatherName,
            motherName,
            studentNumber,
            parentNumber,
            address1,
            address2,
        } = req.body;

        // Validate email format
        if (!validator.isEmail(parentEmail)) {
            return res.status(400).json({ success: false, message: "Please provide a valid email" });
        }

        // Validate password strength
        if (parentPassword.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hash the parent's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(parentPassword, salt);

        // Validate and prepare address
        if (!address1) {
            return res.status(400).json({ success: false, message: "Address 1 is required" });
        }

        const address = {
            address1,
            address2: address2 || "", // Address 2 is optional
        };

        // Prepare parent data
        const parentData = {
            studentName,
            parentEmail,
            parentPassword: hashedPassword,
            studentRegNo,
            department,
            section,
            fatherName,
            motherName,
            studentNumber,
            parentNumber,
            address,
        };

        // Save to database
        const newParent = new parentModel(parentData);
        await newParent.save();

        return res.status(201).json({
            success: true,
            message: "Parent added successfully",
            parentId: newParent._id,
        });
    } catch (error) {
        console.error("Error adding parent:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};



// export const detailsOfParent = async (req, res) => {
//     try {
//         const { parentEmail } = req.body; 
//         if (!parentEmail) {
//             return res.status(400).json({ success: false, message: "Parent email is required" });
//         }

//         // Find parent details by parentEmail
//         const details = await parentModel.findOne({ parentEmail });

//         if (!details) {
//             return res.status(404).json({ success: false, message: "Parent not found" });
//         }

//         // Respond with parent details
//         res.json({ success: true, details });
//     } catch (error) {
//         console.error("Error fetching parent details:", error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

export default  addParent ;
