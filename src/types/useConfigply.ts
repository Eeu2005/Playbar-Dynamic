import { DEFAULT_VALUE, playbarConfig, SPICETIFY_KEY } from "../consts";
import { Configply } from "./type";

const { useState } = Spicetify.React
export function useConfigply() {
    const [data, setData] = useState<Configply>(playbarConfig)
    const setConfig = (config: Partial<Configply>) => {
        setData({...data,...config})
        globalThis.playbarConfig = { ...data, ...config }
        Spicetify.LocalStorage.set(SPICETIFY_KEY, JSON.stringify({ ...data, ...config }))
    }
    return { data, setConfig }
}