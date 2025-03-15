import { storage } from "wxt/storage";

export default defineBackground(() => {
  // Storage Key - `peerSubmissionId-${assignment_id}`

  console.log("Background script running");

  browser.webRequest.onCompleted.addListener(
    async function (details) {
      if (details.url.includes("/api/onDemandPeerComments")) {
        const urlParams = new URLSearchParams(details.url);
        const peerSubmissionId = urlParams.get("peerSubmissionId");
        if (peerSubmissionId) {
          console.log("peerSubmissionId", peerSubmissionId);
          console.log("Split", peerSubmissionId.split("~"));
          // Format: {COURSE ID}~{ASSIGNMENT ID}~{PEER SUBMISSION ID}
          const [courseId, assignmentId, id] = peerSubmissionId.split("~");
          const storageKey = `peerSubmissionId-${assignmentId}`;
          await storage.setItem(`local:${storageKey}`, id);
        }
      }
    },
    { urls: ["*://www.coursera.org/*"] }
  );
});
