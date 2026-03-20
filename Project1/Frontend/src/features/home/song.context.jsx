import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/rinidclqd/cohort-2/moodify/songs/Naal_Nachna__Lyrics__-_Dhurandhar___Shashwat_S__Afsana_K__Rebel__Irshad_K___Ranveer_S__Akshay_K_WiBzojXa7.mp3",
        "posterUrl": "https://ik.imagekit.io/rinidclqd/cohort-2/moodify/posters/Naal_Nachna__Lyrics__-_Dhurandhar___Shashwat_S__Afsana_K__Rebel__Irshad_K___Ranveer_S__Akshay_K_eYIGQsf-R.jpeg",
        "title": "Naal Nachna (Lyrics) - Dhurandhar | Shashwat S, Afsana K, Rebel, Irshad K | Ranveer S, Akshay K",
        "mood": "happy",
    })

    const [loading, setLoading] = useState(false);

    return (
        <SongContext.Provider
            value={{ loading, setLoading, song, setSong }}
        >
            {children}
        </SongContext.Provider>
    )
}