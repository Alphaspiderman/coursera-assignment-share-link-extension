import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div>
        <p>Developed by Alphaspiderman (RG)</p>
        <p>
            <a 
                href="https://github.com/Alphaspiderman" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                GitHub: https://github.com/Alphaspiderman
            </a>
        </p>
        <p>
            <a href="/popup.html" style="margin-top: 20px; text-decoration: none; color: blue;">Back</a>
        </p>
    </div>`;
