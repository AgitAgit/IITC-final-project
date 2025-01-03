import { Request, Response } from "express";
import Page from "../models/pageModel";
import Site from "../models/siteModel";
import Component from "../models/componentModel";

export const createPage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { siteId, title, url, style } = req.body;

    const site = await Site.findById(siteId);
    if (!site) {
      res.status(404).json({ message: "Site not found" });
      return;
    }

    const existingPage = await Page.findOne({
      site: siteId,
      $or: [{ title }, { url }],
    });

    if (existingPage) {
      res.status(400).json({
        message: "Page with the same title or URL already exists in this site",
      });
      return;
    }

    const page = new Page({
      site: siteId,
      title,
      url,
      style,
    });
    await page.save();

    site.pages.push(page._id as any);
    await site.save();

    res.status(201).json(page);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPagesBySiteId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { siteId } = req.params;

    const pages = await Page.find({ site: siteId }).populate("components");

    if (!pages || pages.length === 0) {
      res
        .status(404)
        .json({ message: "No pages found for the specified site" });
      return;
    }

    res.status(200).json(pages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pages = await Page.find().populate("site").populate("components");
    res.status(200).json(pages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPageById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const page = await Page.findById(id)
      .populate("site")
      .populate("components");

    if (!page) {
      res.status(404).json({ message: "Page not found" });
      return;
    }

    res.status(200).json(page);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const page = await Page.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!page) {
      res.status(404).json({ message: "Page not found" });
      return;
    }

    res.status(200).json(page);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const page = await Page.findByIdAndDelete(id);
    if (!page) {
      res.status(404).json({ message: "Page not found" });
      return;
    }

    const site = await Site.findById(page.site);
    if (site) {
      site.pages = site.pages.filter((pageId) => pageId.toString() !== id);
      await site.save();
    }

    await Component.deleteMany({ page: id });

    res.status(200).json({ message: "Page deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
