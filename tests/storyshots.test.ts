import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";
import { resolve } from "path";
import { StoryIndex } from "@storybook/store";

const storybookDir = resolve(__dirname, "..", "storybook-static");
const data: StoryIndex = JSON.parse(
  readFileSync(resolve(storybookDir, "stories.json")).toString()
);

test.describe.parallel("visual regression testing", () => {
  Object.values(data.stories).forEach((story) => {
    test(`snapshot test ${story.title}: ${story.name}`, async ({ page }) => {
      //   await page.goto(`http://localhost:8080/iframe.html?id=${story.id}`, {
      await page.goto(
        `http://localhost:6006/iframe.html?id=${story.id}`
        //   {
        // waitUntil: "networkidle",
        //   }
      );
      expect(await page.screenshot({ fullPage: true })).toMatchSnapshot([
        story.title,
        `${story.id}.png`,
      ]);
    });
  });
});
