
import { useEffect } from "react";
import "./GameLoader.scss";
import { getUserInfoApi } from "../../api/userApi";
import { postGameApi } from "../../api/gameApi";

type InputProps = {
    gameName: string;
};

function GameLoader({ gameName }: InputProps) {
    useEffect(() => {
        (window as any).Module = {
            print: (() => {
                const element = document.getElementById("output") as HTMLTextAreaElement | null;
                if (element) element.value = "";
                return (...args: any[]) => {
                    const text = args.join(" ");
                    if (element) {
                        element.value += text + "\n";
                        element.scrollTop = element.scrollHeight;
                    }
                };
            })(),
            canvas: (() => {
                const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
                if (canvas) {
                    canvas.addEventListener(
                        "webglcontextlost",
                        (e: Event) => {
                            alert("WebGL context lost. Reload the page.");
                            e.preventDefault();
                        },
                        false
                    );
                }
                return canvas;
            })(),
            onRuntimeInitialized: function () {
                console.log("WASM carregado e inicializado");

                window.addEventListener("GameEvent", async (event: Event) => {
                    try{
                        const custom = event as CustomEvent<{ type: string; amount: number }>;
                        const { type, amount } = custom.detail;

                        console.log(`Evento do jogo: ${type} ${amount}`);
                        await postGameApi({
                            gameName: gameName,
                            cdb: amount,
                            result: type as "WIN" | "LOSE"
                        });

                        const element = document.getElementById("output") as HTMLTextAreaElement | null;
                        if (element) {
                            element.value += `${type}: ${amount}\n`;
                            element.scrollTop = element.scrollHeight;
                        }
                    }
                    catch (error) {
                        console.error("Erro:", error);
                    }
                });

                async function iniciarJogo() {
                    try {
                        const info = await getUserInfoApi();
                        console.log(info);

                        const dinheiro = info.cdb;
                        (window as any).Module.ccall("setPlayerMoney", "null", ["number"], [dinheiro]);
                    } catch (error) {
                        console.error("Erro:", error);
                        (window as any).Module.ccall("setPlayerMoney", "null", ["number"], [1000]);
                    }
                }

                iniciarJogo();
            },
        };

        const script = document.createElement("script");
        script.src = "/index.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            window.location.reload();
        };
    }, []);

    return (
        <div id="game" style={{ display: "flex", justifyContent: "center" }}>
            <div className="emscripten_border">
                <canvas
                    className="emscripten"
                    id="canvas"
                    onContextMenu={(e) => e.preventDefault()}
                    tabIndex={-1}
                    width={800}
                    height={600}
                ></canvas>
            </div>

            <textarea
                id="output"
                rows={8}
            />
        </div>
    );
}


export default GameLoader;