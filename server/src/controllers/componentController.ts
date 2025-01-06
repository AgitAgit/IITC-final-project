import { Request, Response } from "express";
import Component from "../models/componentModel";
import Page from "../models/pageModel";

export const createComponent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { pageId, type, content, position, style } = req.body;

    const page = await Page.findById(pageId);
    if (!page) {
      res.status(404).json({ message: "Page not found" });
      return;
    }

    const component = new Component({
      page: pageId,
      type,
      content,
      position,
      style,
    });

    await component.save();

    page.components.push(component._id as any);
    await page.save();

    res.status(201).json(component);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getComponentsByPage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { pageId } = req.params;

    const page = await Page.findById(pageId).populate("components");
    if (!page) {
      res.status(404).json({ message: "Page not found" });
      return;
    }

    res.status(200).json(page.components);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComponent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { type, content, position, style } = req.body;

    const component = await Component.findByIdAndUpdate(
      id,
      { type, content, position, style },
      { new: true }
    );

    if (!component) {
      res.status(404).json({ message: "Component not found" });
      return;
    }

    res.status(200).json(component);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComponent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const component = await Component.findByIdAndDelete(id);
    if (!component) {
      res.status(404).json({ message: "Component not found" });
      return;
    }

    const page = await Page.findById(component.page);
    if (page) {
      page.components = page.components.filter(
        (compId: any) => compId.toString() !== id
      );
      await page.save();
    }

    res.status(200).json({ message: "Component deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getComponentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const component = await Component.findById(id);
    if (!component) {
      res.status(404).json({ message: "Component not found" });
      return;
    }

    res.status(200).json(component);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
