import { storage } from "wxt/storage";

export function setupExtractor(
  buttonElem: HTMLButtonElement,
  outElement: HTMLDivElement
) {
  let url = "";
  let tabId = -1;

  // Get active tab
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    tabId = activeTab?.id || -1;
    url = activeTab?.url || "";
    console.log("Active URL:", url);
  });

  buttonElem.addEventListener("click", async () => {
    if (!url.includes("peer")) {
      outElement.innerText =
        "Please navigate to a peer-reviewed assignment page first!";
      return;
    }

    if (!url.includes("/submit")) {
      if (tabId === -1) {
        outElement.innerText = "Please navigate to the submission page first!";
        return;
      }

      outElement.innerText =
        "Navigating to the submission page. Please wait...\nReopen the extension if it closes.";
      browser.tabs.update(tabId, { url: `${url}/submit` }, () => {
        setTimeout(() => window.location.reload(), 5000);
      });
      return;
    }

    const stripped = url.replace("https://www.coursera.org/learn/", "");
    const [, , assignmentId] = stripped.split("/");
    const storageKey = `peerSubmissionId-${assignmentId}`;

    try {
      const data = await storage.getItem(`local:${storageKey}`);
      data ? showReviewLink(url, data) : handleMissingData(url, storageKey);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  function showReviewLink(courseUrl: string, data: any) {
    const reviewLink = courseUrl.replace("/submit", `/review/${data}`);
    document.getElementById("assignmentLink")?.setAttribute("href", reviewLink);
    document.getElementById("output_link")?.removeAttribute("hidden");
    document.getElementById("output_no_link")?.setAttribute("hidden", "true");

    document.getElementById("copyButton")?.addEventListener("click", () => {
      navigator.clipboard
        .writeText(reviewLink)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.error("Failed to copy text:", err));
    });
  }

  async function handleMissingData(courseUrl: string, storageKey: string) {
    const outputNoLink = document.getElementById("output_no_link");
    outputNoLink?.removeAttribute("hidden");

    setTimeout(async () => {
      const data = await storage.getItem(`local:${storageKey}`);
      if (data) {
        showReviewLink(courseUrl, data);
      } else {
        outputNoLink!.innerText =
          "Failed to get the review link. Please try again by reloading the page!";
      }
    }, 10000);
  }
}
