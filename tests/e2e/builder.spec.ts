import { expect, test } from "@playwright/test";

test("pick parts, expose a conflict, fix it and share a healthy persisted build",async({page},testInfo)=>{
  test.setTimeout(120000);
  page.setDefaultTimeout(15000);
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/pc-builder");
  const noOverflow=async()=>expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await noOverflow();
  async function pick(category:string,name:string,incompatible=false){
    await page.getByRole("button",{name:`Select ${category}`,exact:true}).click();
    const dialog=page.getByRole("dialog",{name:`Select ${category}`,exact:true});
    await expect(dialog).toBeVisible();
    if(testInfo.project.name==="mobile-360") {const bounds=await dialog.boundingBox();expect(bounds?.x).toBe(0);expect(bounds?.y).toBe(0);expect(bounds?.width).toBe(360);}
    if(category==="CPU") {
      await dialog.getByRole("textbox",{name:"Search components"}).fill("Orbit 3");
      await dialog.getByRole("combobox",{name:"Brand",exact:true}).selectOption("Prototype Co");
      await dialog.getByRole("textbox",{name:"Spec filter"}).fill("AM5");
      await dialog.getByRole("spinbutton",{name:"Max price"}).fill("20000");
      await dialog.getByRole("button",{name:`Quick view ${name}`,exact:true}).click();
      await expect(page.getByRole("dialog",{name,exact:true})).toBeVisible();
      await page.keyboard.press("Escape");
    }
    if(incompatible) {await expect(dialog.getByRole("checkbox",{name:"Show only compatible"})).toBeChecked();await dialog.getByRole("checkbox",{name:"Show only compatible"}).uncheck();}
    await noOverflow();
    await dialog.getByRole("button",{name:`Select ${name}`,exact:true}).click();
    await expect(page.getByRole("button",{name:`Change ${name}`,exact:true})).toBeEnabled();
  }
  await pick("CPU","SAMPLE CPU Orbit 3");
  await pick("Motherboard","SAMPLE Motherboard Vector 2",true);
  const mobile=testInfo.project.name==="mobile-360"||testInfo.project.name==="tablet-768";
  if(mobile)await page.getByRole("button",{name:"View summary"}).click();
  const health=page.getByRole("region",{name:"Build health"}).filter({visible:true});
  await expect(health.getByRole("button",{name:/CPU \/ motherboard socket: incompatible/})).toBeVisible();
  await health.getByRole("button",{name:/CPU \/ motherboard socket: incompatible/}).click();
  await page.getByRole("button",{name:"Change SAMPLE Motherboard Vector 2"}).click();
  await page.getByRole("dialog",{name:"Select Motherboard",exact:true}).getByRole("button",{name:"Select SAMPLE Motherboard Orbit 3",exact:true}).click();
  await expect(page.getByRole("button",{name:"Change SAMPLE Motherboard Orbit 3"})).toBeEnabled();
  await pick("RAM","SAMPLE RAM Orbit 3");
  await pick("SSD","SAMPLE SSD Vector 2");
  await pick("Case","SAMPLE Case Vector 2");
  await pick("PSU","SAMPLE PSU Vector 2");
  await pick("CPU Cooler","SAMPLE CPU Cooler Vector 2");
  if(mobile)await page.getByRole("button",{name:"View summary"}).click();
  await expect(page.getByRole("heading",{name:"Healthy build",exact:true}).filter({visible:true})).toBeVisible();
  await noOverflow();
  await page.screenshot({path:testInfo.outputPath("builder-healthy.png"),fullPage:true});
  if(mobile)await page.keyboard.press("Escape");
  await page.getByRole("button",{name:"Save build",exact:true}).click();
  await expect(page.getByRole("button",{name:/Restore Build/})).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button",{name:"Change SAMPLE CPU Orbit 3"})).toBeEnabled();
  await page.getByRole("button",{name:"Copy link",exact:true}).click();
  const link=await page.getByRole("textbox",{name:"Share link"}).inputValue();
  expect(new URL(link).searchParams.get("build")).not.toContain("price");
  await page.getByRole("button",{name:"Reset",exact:true}).click();
  await expect(page.getByRole("button",{name:"Select CPU",exact:true})).toBeEnabled();
  await page.goto(link);
  await expect(page.getByRole("button",{name:"Change SAMPLE CPU Orbit 3"})).toBeEnabled();
  await noOverflow();
});

test("sample starters, duplicate snapshots and quantity conflicts stay honest",async({page},testInfo)=>{
  test.setTimeout(60000);page.setDefaultTimeout(15000);
  await page.goto("/pc-builder");
  await page.getByRole("button",{name:"Office",exact:true}).click();
  await expect(page.getByRole("button",{name:"Change SAMPLE RAM Orbit 3"})).toBeEnabled();
  await page.getByRole("combobox",{name:"Quantity SAMPLE RAM Orbit 3"}).selectOption("3");
  await expect(page.getByRole("button",{name:"RAM compatibility: error"})).toBeVisible();
  await page.getByRole("combobox",{name:"Quantity SAMPLE RAM Orbit 3"}).selectOption("1");
  await page.getByRole("button",{name:"৳120k",exact:true}).click();
  await expect(page.getByRole("button",{name:"Change SAMPLE RAM Origin 7"})).toBeEnabled();
  await page.getByRole("button",{name:"AI/ML",exact:true}).click();
  await expect(page.getByRole("button",{name:"Change SAMPLE GPU Vector 8"})).toBeEnabled();
  if(testInfo.project.name==="mobile-360"||testInfo.project.name==="tablet-768")await page.getByRole("button",{name:"View summary"}).click();
  await expect(page.getByRole("heading",{name:"Healthy build",exact:true}).filter({visible:true})).toBeVisible();
  if(testInfo.project.name==="mobile-360"||testInfo.project.name==="tablet-768")await page.keyboard.press("Escape");
  await page.getByRole("button",{name:"Duplicate",exact:true}).click();
  await expect(page.getByRole("button",{name:/Restore Copy/})).toBeVisible();
  await page.getByRole("button",{name:"Reset",exact:true}).click();
  await expect(page.getByRole("button",{name:"Select CPU",exact:true})).toBeEnabled();
  await page.reload();
  await expect(page.getByRole("button",{name:"Select CPU",exact:true})).toBeEnabled();
  await page.getByRole("button",{name:/Restore Copy/}).click();
  await expect(page.getByRole("button",{name:"Change SAMPLE GPU Vector 8"})).toBeEnabled();
});
