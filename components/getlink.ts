import { storage } from "wxt/storage";

export function setupExtractor(
  button_elem: HTMLButtonElement,
  out_element: HTMLDivElement
) {
  // URL Formats
  // https://www.coursera.org/learn/{COURSE_SLUG}/peer/{ASSIGNMENT_ID}/{ASSIGNEMENT_SLUG}/submit
  // https://www.coursera.org/learn/{COURSE_SLUG}/peer/{ASSIGNMENT_ID}/{ASSIGNEMENT_SLUG}

  var url = "";
  var tabId = -1;
  // Get active tab
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    tabId = tabs[0].id || -1;
    url = tabs[0].url || "";
    console.log("URL", url);
  });

  button_elem.addEventListener("click", async () => {
    if (url === "" || !url.includes("peer")) {
      out_element.innerText =
        "Please navigate to the a peer reviewed assignment page first!";
      return;
    }
    // Make sure we are on the "submit" page
    if (!url.includes("/submit")) {
      // Ensure valid tabId
      if (tabId === -1) {
        // Update the output
        out_element.innerText = "Please navigate to the submission page first!";
        return;
      } else {
        // Update the output
        out_element.innerText =
          "Navigating to the submission page first. Please wait...";
        // Navigate to the submission page
        browser.tabs.update(tabId, { url: url + "/submit" });
        return;
      }
    }

    // Get the base URL
    const stripped = url.replace("https://www.coursera.org/learn/", "");
    // Structure: {COURSE_SLUG}/peer/{ASSIGNMENT ID}/{ASSIGNEMENT_SLUG}
    console.log("Stripped", stripped);
    const parts = stripped.split("/");
    const assignment_id = parts[2];
    const course_slug = parts[0];
    console.log("Assignment ID", assignment_id);
    console.log("Course Slug", course_slug);

    const storageKey = `peerSubmissionId-${assignment_id}`;

    var data = await storage.getItem(`local:${storageKey}`);

    console.log("Data", data);
    if (data) {
      const reviewLink = `https://www.coursera.org/learn/${course_slug}/peer/${assignment_id}/review/${data}`;
      document.getElementById(
        "output"
      )!.innerHTML = `Your review link is: <br><a href="${reviewLink}" target="_blank">${reviewLink}</a> <button id="copyButton">Copy</button>`;

      const copyButton = document.getElementById("copyButton")!;
      copyButton.addEventListener("click", () => {
        navigator.clipboard
          .writeText(reviewLink)
          .then(() => {
            alert("Link copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
      });
    } else {
      document.getElementById("output")!.innerText =
        "No peer submission ID found. Please make a submission first.";
    }
  });
}
