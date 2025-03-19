import { storage } from "wxt/storage";

export async function handleDisclaimer(element: HTMLDivElement) {
    // Get Storage
    const hidden = await storage.getItem("local:disclaimerHidden");
    if (hidden) {
        element.style.display = "none";
    }
    element.addEventListener("click", async () => {
        element.style.display = "none";
        await storage.setItem("local:disclaimerHidden", true);
    });
}
