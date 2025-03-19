import { setupExtractor } from "@/components/getlink";
import "./style.css";
import { handleDisclaimer } from "@/components/handleDisclaimer";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div>
      <p id="disclaimer" style="color: red; text-align: center; font-size: 0.9em">
        Warning: Any violations of the terms set by Coursera or its affiliates
        are solely the responsibility of the user. Developer is NOT responsible
        for any misuse of this extension or ANY and ALL effects it may cause.
      </p>
      <br>
      <button id="extract">Extract</button>
      <br>
      <div id="output"></div>
    </div>
`;
setupExtractor(
  document.querySelector<HTMLButtonElement>("#extract")!,
  document.querySelector<HTMLDivElement>("#output")!
);
handleDisclaimer(document.querySelector<HTMLDivElement>("#disclaimer")!);