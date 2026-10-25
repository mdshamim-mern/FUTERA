import {expect,test} from "@playwright/test";

for(const theme of ["dark","light"] as const){
  test(`public navigation and declared interactions in ${theme} mode`,async({page,context,request},info)=>{
    await context.addCookies([{name:"futera-theme",value:theme,url:"http://127.0.0.1:3101"}]);
    const consoleErrors:string[]=[];
    const failedRequests:string[]=[];
    page.on("pageerror",error=>consoleErrors.push(error.message));
    page.on("console",message=>{if(message.type()==="error")consoleErrors.push(message.text());});
    page.on("requestfailed",req=>{if(!req.failure()?.errorText.includes("ERR_ABORTED"))failedRequests.push(`${req.url()}: ${req.failure()?.errorText}`);});
    const routes=new Set<string>();
    for(const path of ["/","/blog","/terms","/contact","/guides","/support","/products","/login","/register","/about","/assistant","/compare"]){
      const response=await page.goto(path);expect(response?.status(),path).toBe(200);
      await expect(page.getByRole("heading",{level:1})).toBeVisible({timeout:30000});
      await expect(page.locator("html")).toHaveAttribute("data-theme",theme);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${path}: overflow`).toBe(true);
      if(["/login","/about","/assistant","/compare"].includes(path))await page.screenshot({path:info.outputPath(`${path.slice(1)}-${theme}.png`),fullPage:true});
      for(const href of await page.locator('a[href^="/"]').evaluateAll(links=>links.map(link=>link.getAttribute("href")!)))routes.add(href);
      for(const link of await page.locator('nav[aria-label="Social links"] a, nav[aria-label="Contact social channels"] a').all()){
        expect(new URL((await link.getAttribute("href"))!).protocol).toBe("https:");
        await expect(link).toHaveAttribute("target","_blank");await expect(link).toHaveAttribute("rel","noopener noreferrer");
      }
    }
    // Public internal targets: response checks complement explicit browser interactions below.
    for(const route of routes){const response=await request.get(route);expect(response.status(),route).toBeLessThan(400);}
    await page.goto("/blog");
    await expect(page.locator('#articles article')).toHaveCount(10);
    await page.getByRole("link",{name:"Read article : Start with the work, then choose the hardware"}).click();
    await expect(page).toHaveURL(/\/blog\/plan-your-first-build$/);
    await expect(page.getByRole("heading",{level:1})).toHaveText("Start with the work, then choose the hardware");
    await page.getByRole("navigation",{name:"Article contents"}).getByRole("link").first().click();
    await expect(page).toHaveURL(/#section-1$/);
    await page.getByRole("link",{name:"All field notes"}).click();await expect(page).toHaveURL(/\/blog$/);
    await page.goto("/");
    const themeButton=page.getByRole("button",{name:`Switch to ${theme==="dark"?"light":"dark"} mode`});
    await themeButton.click();await expect(page.locator("html")).toHaveAttribute("data-theme",theme==="dark"?"light":"dark");
    await page.getByRole("banner").getByRole("link",{name:"Log in",exact:true}).click();await expect(page).toHaveURL(/\/login$/);
    await page.getByRole("link",{name:"Create an account",exact:true}).click();await expect(page).toHaveURL(/\/register$/);
    await page.goto("/");await page.getByRole("button",{name:"Cart information"}).click();
    await expect(page.getByRole("dialog")).toBeVisible();await page.getByRole("button",{name:"Close",exact:true}).click();await expect(page.getByRole("dialog")).toHaveCount(0);
    if(info.project.name==="mobile-360"){
      await page.getByRole("button",{name:"Open menu"}).click();
      await page.getByRole("navigation",{name:"Mobile navigation"}).getByRole("link",{name:"Log in",exact:true}).click();
      await expect(page).toHaveURL(/\/login$/);await expect(page.getByRole("dialog")).toHaveCount(0);
      await page.goto("/");
    }
    for(const name of ["Creating","Everyday","Gaming"]){await page.getByRole("tab",{name,exact:true}).click();await expect(page.getByRole("tab",{name,exact:true})).toHaveAttribute("aria-selected","true");}
    const details=page.locator("#faq details").first();await details.locator("summary").click();await expect(details).toHaveAttribute("open","");await details.locator("summary").click();await expect(details).not.toHaveAttribute("open","");
    await page.screenshot({path:info.outputPath(`home-${theme}.png`),fullPage:true});
    expect(consoleErrors).toEqual([]);expect(failedRequests).toEqual([]);
    await info.attach("public-route-inventory",{body:JSON.stringify([...routes].sort(),null,2),contentType:"application/json"});
  });
}
