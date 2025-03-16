import { setupExtractor } from "@/components/getlink";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div>
      <button id="extract">Extract</button>
      <div id="output"></div>
    </div>
`;
setupExtractor(document.querySelector<HTMLButtonElement>("#extract")!, document.querySelector<HTMLDivElement>("#output")!);
