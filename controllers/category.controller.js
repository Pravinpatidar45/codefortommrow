import { Category } from "../models/category.model.js";
import { Service } from "../models/service.model.js";

export const addCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);
        return category ? res.status(200).json({ message: "Category Added", status: true }) : res.status(400).json({ message: "Something Went Wrong", status: false })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", status: false, error: error.message })
    }
}
export const viewCategories = async (req, res, next) => {
    try {
        const category = await Category.find();
        return category.length > 0 ? res.status(200).json({ message: "Data Found", category, status: true }) : res.status(404).json({ message: "Not Found", status: false })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", status: false, error: error.message })
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const id = req.params.categoryId;
        const updatedData = req.body;
        const category = await Category.findByIdAndUpdate(id, updatedData, { new: true });
        return category ? res.status(200).json({ message: "Data Updated", status: true }) : res.status(404).json({ message: "Not Found", status: false })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", status: false, error: error.message })
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const id = req.params.categoryId;
        const category = await Category.findByIdAndDelete(id);
        return category ? res.status(200).json({ message: "Data Deleted", status: true }) : res.status(404).json({ message: "Not Found", status: false })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", status: false, error: error.message })
    }

}

export const addServices = async (req, res, next) => {
    try {
        const { categoryId, services } = req.body;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category Not Found", status: false })
        }
        const existingService = await Service.findOne({ CategoryID: categoryId })
        if (existingService) {
            existingService.services.push(...services);
            await existingService.save();
            res.status(200).json({ message: "Service Added", status: true })
        } else {
            const service = await Service.create({ ...req.body, CategoryID: categoryId });
            return service ? res.status(200).json({ message: "Service Added", status: true }) : res.status(400).json({ message: "Something Went Wrong", status: false })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", status: false, error: error.message })
    }
}

export const viewServicesforCategory = async (req, res, next) => {
    try {
        const id = req.params.categoryId;
        const findservicess = await Service.find({ CategoryID: id });
        const servicelist = findservicess.flatMap((item) => item.services);
        return servicelist.length > 0 ? res.status(200).json({ message: "Data found", servicelist, status: true }) : res.status(404).json({ message: "Not Found", status: false })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", status: false, error: error.message })
    }
}

export const deleteServiceforCategory = async (req, res, next) => {
    try {
        const { categoryId, serviceId } = req.params;
        const existingService = await Service.findOne({ CategoryID: categoryId });
        if (existingService.length > 0 && !existingService) {
            return res.status(404).json({ message: "Not Found", status: false })
        }
        const initialLength = existingService.services.length;

        existingService.services = existingService.services.filter((item) => !item.price.some(p => p.ServiceID === serviceId));
        if (existingService.services.length === initialLength) {
            return res.status(404).json({ message: "Service Not Found for Deletion" })
        }
        await existingService.save();
        return res.status(200).json({ message: "Service Deleted", status: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", status: false, error: error.message })
    }
}

export const updateServicePrice = async (req, res, next) => {
    try {
        const { categoryId, serviceId } = req.params;
        const updateService = req.body;
        const existingService = await Service.findOne({ CategoryID: categoryId });
        if (!existingService) {
            return res.status(404).json({ message: "Service Not Found", status: false });
        }
        const serviceIndex = existingService.services.findIndex(item => item.price.some(p => p.ServiceID === serviceId))
        if (serviceIndex === -1) {
            return res.status(404).json({ message: "Service Not Found", status: false });

        }
        existingService.services[serviceIndex] = { ...existingService.services[serviceIndex], ...updateService };
        await existingService.save();
        return res.status(200).json({ message: "Date Updated", status: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", status: false, error: error.message })
    }
}