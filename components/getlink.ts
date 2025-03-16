import { storage } from "wxt/storage";

export function setupExtractor(
  button_elem: HTMLButtonElement,
  out_element: HTMLDivElement
) {
  // URL Formats
  // https://www.coursera.org/learn/{COURSE_SLUG}/peer/{ASSIGNMENT_ID}/{ASSIGNEMENT_SLUG}/submit
  // https://www.coursera.org/learn/{COURSE_SLUG}/peer/{ASSIGNMENT_ID}/{ASSIGNEMENT_SLUG}

  var url = "";
  // Get active tab
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    url = tabs[0].url || "";
    console.log("URL", url);
  });

  button_elem.addEventListener("click", async () => {
    if (url === "" || !url.includes("peer")) {
      out_element.innerText =
        "Please navigate to the a peer reviewed assignment page first!";
      return;
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
      )!.innerText = `Your review link is: \n${reviewLink}`;
    } else {
      document.getElementById("output")!.innerText =
        "No peer submission ID found. Please make a submission first.";
    }
  });
}
