import { Request, Response } from "express";
import Site from "../models/siteModel";
import User from "../models/userModel";
import { ISite } from "../types/siteTypes";
import { IUser } from "../types/userTypes";
import { AuthenticatedRequest } from "../types/expressTypes";

export const createSite = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const ownerId = req.user?.id;
    const { name, domain } = req.body;

    const owner: IUser | null = await User.findById(ownerId);
    if (!owner) {
      res.status(404).json({ message: "Owner not found" });
      return;
    }

    const site: ISite = new Site({
      owner: ownerId,
      name,
      domain,
    });

    await site.save();

    owner.sites.push(site._id as any);
    await owner.save();

    res.status(201).json(site);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSitesByUserId = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    const sites = await Site.find({ owner: userId }).populate("owner");

    if (!sites.length) {
      res.status(404).json({ message: "No sites found for this user" });
      return;
    }

    res.status(200).json(sites);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSites = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("lkjkhgfghjkl;l");

    const sites = await Site.find().populate("owner");
    console.log(sites);
    res.status(200).json(sites);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSiteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const site = await Site.findById(id).populate("owner");

    if (!site) {
      res.status(404).json({ message: "Site not found" });
      return;
    }

    res.status(200).json(site);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const site = await Site.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!site) {
      res.status(404).json({ message: "Site not found" });
      return;
    }

    res.status(200).json(site);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const site = await Site.findByIdAndDelete(id);

    if (!site) {
      res.status(404).json({ message: "Site not found" });
      return;
    }

    const owner: IUser | null = await User.findById(site.owner);
    if (owner) {
      owner.sites = owner.sites.filter((siteId) => siteId.toString() !== id);
      await owner.save();
    }

    res.status(200).json({ message: "Site deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
