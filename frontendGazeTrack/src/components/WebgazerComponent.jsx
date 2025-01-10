import { useEffect } from "react";

const WebgazerComponent = () => {
    const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/webgazer";
        script.async = true;
        document.body.appendChild(script);

    useEffect(() => {
        const webgazer = window.webgazer;
        webgazer.setGazeListener((data,timestamp)=>{
            console.log(data);
        }).begin();
        webgazer.showVideoPreview(true).showPredictionPoints(true);
    },[]);
};

export default WebgazerComponent;

