import { setupExtractor } from "@/components/getlink";
import "./style.css";
import { handleDisclaimer } from "@/components/handleDisclaimer";

setupExtractor(
  document.querySelector<HTMLButtonElement>("#extract")!,
  document.querySelector<HTMLDivElement>("#misc_message")!
);
handleDisclaimer(document.querySelector<HTMLDivElement>("#disclaimer")!);
