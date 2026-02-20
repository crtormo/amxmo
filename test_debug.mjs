import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto("http://localhost:8000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  
  // Press P for cheat
  await page.keyboard.press("p");
  await page.waitForTimeout(200);
  
  // Check game state
  const state1 = await page.evaluate(() => {
    if (typeof window.render_game_to_text === "function") {
      return window.render_game_to_text();
    }
    return null;
  });
  console.log("After cheat:", state1);
  
  // Click on centrifuge button
  await page.click("#btn-centrifuge");
  await page.waitForTimeout(200);
  
  // Get canvas and click on it
  const canvas = await page.locator("#game-canvas");
  const bbox = await canvas.boundingBox();
  console.log("Canvas bbox:", bbox);
  
  // Move mouse to center and trigger mousemove event
  const x = bbox.width / 2;
  const y = bbox.height / 2;
  await page.mouse.move(bbox.x + x, bbox.y + y);
  
  // Trigger mousemove on canvas
  await page.evaluate(({ mx, my }) => {
    const c = document.getElementById("game-canvas");
    if (c) {
      const rect = c.getBoundingClientRect();
      const event = new MouseEvent("mousemove", {
        clientX: rect.left + mx,
        clientY: rect.top + my,
        bubbles: true
      });
      c.dispatchEvent(event);
    }
  }, { mx: x, my: y });
  
  await page.waitForTimeout(100);
  
  // Check hover state
  const hoverState = await page.evaluate(() => {
    return window.gameState.hoverTile;
  });
  console.log("Hover state:", hoverState);
  
  // Click on canvas
  await page.mouse.down({ button: "left" });
  await page.waitForTimeout(50);
  await page.mouse.up({ button: "left" });
  
  await page.waitForTimeout(200);
  
  // Check final state
  const state2 = await page.evaluate(() => {
    if (typeof window.render_game_to_text === "function") {
      return window.render_game_to_text();
    }
    return null;
  });
  console.log("After click:", state2);
  
  await browser.close();
}

main().catch(console.error);
