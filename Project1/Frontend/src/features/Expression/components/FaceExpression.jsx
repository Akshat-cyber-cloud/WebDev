import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        const expression = detect({ landmarkerRef, videoRef, setExpression })
        onClick(expression);
    }

    return (
        <div style={{ textAlign: "center", height: "100vh" }}>
            <video
                ref={videoRef}
                style={{ width: "600px", borderRadius: "12px" }}
                playsInline
            />
            <h2>{expression}</h2>
            <button
                style={{
                    padding: "12px 24px",
                    backgroundColor: "#ff3b3b",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.2s ease-in-out"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#e02e2e"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#ff3b3b"}
                onClick={handleClick}
            >
                Detect expression
            </button>
        </div>
    );
}