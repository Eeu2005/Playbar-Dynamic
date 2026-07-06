const {
    fetchExtractedColorForTrackEntity,
    fetchExtractedColorForEpisodeEntity,
} = Spicetify.GraphQL.Definitions;

export const verificarTipo = () => {
    if (Spicetify.Player.data.item?.type == "episode") {
        console.log(Spicetify.Player.data.item?.type);
        return fetchExtractedColorForEpisodeEntity;
    } else {
        console.log(Spicetify.Player.data.item?.type);
        return fetchExtractedColorForTrackEntity;
    }
};
export const percorrerObjs = (obj: any): { hex: string } => {
    if (typeof obj != "object") return
    if (obj.hasOwnProperty("hex")) {
        return obj;
    } else {
        let o;
        for (let i of Object.keys(obj)) {
            o = percorrerObjs(obj[i]);
            if (o?.hex) return o;
        }
    }
}; 
