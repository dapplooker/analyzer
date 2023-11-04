import { css } from "@emotion/react";
import html2canvas from "html2canvas";

export const SAVING_CHART_IMAGE_CLASS = "saving-chart-image";
export const SAVING_CHART_IMAGE_HIDDEN_CLASS = "saving-chart-image-hidden";

export const saveChartImageStyles = css`
  .${SAVING_CHART_IMAGE_CLASS} {
    .${SAVING_CHART_IMAGE_HIDDEN_CLASS} {
      visibility: hidden;
    }
  }
`;

export const saveChartImage = async (
  selector: string,
  fileName: string,
  cardId: number,
  isShowWatermark: boolean = true,
) => {
  const node = document.querySelector(selector);

  if (!node || !(node instanceof HTMLElement)) {
    console.warn("No node found for selector", selector);
    return;
  }

  node.classList.add(SAVING_CHART_IMAGE_CLASS);

  const canvas = await html2canvas(node);

  node.classList.remove(SAVING_CHART_IMAGE_CLASS);

  let combinedCanvas;
  if (isShowWatermark) {
    const watermarkImage = new Image();
    watermarkImage.setAttribute("crossorigin", "anonymous");
    watermarkImage.src =
      "https://d2yxqfr8upg55w.cloudfront.net/assets/img/dl_watermark_withtext_lighttheme.png";

    await new Promise(resolve => {
      watermarkImage.onload = resolve;
    });

    combinedCanvas = document.createElement("canvas");
    combinedCanvas.width = canvas.width;
    combinedCanvas.height = canvas.height;
    const ctx = combinedCanvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(canvas, 0, 0);

      const watermarkWidthPercentage = 25;
      const watermarkWidth = (canvas.width * watermarkWidthPercentage) / 100;
      const aspectRatio = watermarkImage.width / watermarkImage.height;
      const watermarkHeight = watermarkWidth / aspectRatio;
      const x = (canvas.width - watermarkWidth) / 2;
      const y = (canvas.height - watermarkHeight) / 2;
      ctx.drawImage(watermarkImage, x, y, watermarkWidth, watermarkHeight);
    }
  } else {
    combinedCanvas = canvas;
  }

  const link = document.createElement("a");

  link.setAttribute("download", fileName);
  link.setAttribute(
    "href",
    combinedCanvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream"),
  );

  link.click();
  link.remove();

  //Save Record in Download Stats
  const requestUrl = `https://localhost:4001/web/download?source=analyzer&exportFormat=png&cardId=${cardId}`;

  fetch(requestUrl, { method: "GET" })
    .then(async res => {
      if (!res) {
        console.error("Falied to save record");
      }
    })
    .catch(error => console.error(error));
};
