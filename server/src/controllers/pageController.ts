import { Request, Response } from "express";
import Page from "../models/pageModel";
import Site from "../models/siteModel";
import Component from "../models/componentModel";

// יצירת עמוד חדש וקישור לאתר
export const createPage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { siteId, title, url, style } = req.body;

    // בדיקת קיום האתר
    const site = await Site.findById(siteId);
    if (!site) {
      res.status(404).json({ message: "Site not found" });
      return;
    }

    // בדיקה האם יש כבר עמוד עם title או url זהה באותו אתר
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

    // יצירת עמוד חדש
    const page = new Page({
      site: siteId,
      title,
      url,
      style,
    });
    await page.save();

    // קישור העמוד לאתר
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

    // שליפת כל הדפים שקשורים ל-siteId המסוים
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

// קריאת כל העמודים
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

// קריאת עמוד לפי ID
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

// עדכון עמוד
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

// מחיקת עמוד
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

    // הסרת העמוד מהאתר
    const site = await Site.findById(page.site);
    if (site) {
      site.pages = site.pages.filter((pageId) => pageId.toString() !== id);
      await site.save();
    }

    // מחיקת רכיבים שקשורים לעמוד
    await Component.deleteMany({ page: id });

    res.status(200).json({ message: "Page deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
